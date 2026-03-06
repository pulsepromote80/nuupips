"use client"
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";
import gtcfxBackendAPI from "../services/gtcfxApi";
import { gtcfxTokenService } from "../services/gtcfxTokenService";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const GTCFxAuthContext = createContext(null);

export const useGTCFxAuth = () => {
	const context = useContext(GTCFxAuthContext);
	if (!context)
		throw new Error("useGTCFxAuth must be used within GTCFxAuthProvider");
	return context;
};

export const GTCFxAuthProvider = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const [gtcUser, setGtcUser] = useState(null);
	const [gtcLoading, setGtcLoading] = useState(true);
	const [gtcAuthenticated, setGtcAuthenticated] = useState(false);
	const [gtcError, setGtcError] = useState(null);

	// Trigger Smart Copy status check after GTC login (NEW)
	const [gtcJustLoggedIn, setGtcJustLoggedIn] = useState(false);

	useEffect(() => {
		if (isAuthenticated) checkGTCAuth();
		else setGtcLoading(false);
	}, [isAuthenticated]);

	useEffect(() => {
		if (!isAuthenticated) {
			gtcfxTokenService.clearTokens();
			setGtcUser(null);
			setGtcAuthenticated(false);
			setGtcError(null);
		}
	}, [isAuthenticated]);

	const fetchGTCUserInfo = useCallback(async () => {
		try {
			const response = await gtcfxBackendAPI.post("accountinfo");
			if (response.data.code === 200 && response.data.data) {
				const d = response.data.data;
				const userInfo = {
					id: d.id,
					nickname: d.nickname,
					email: d.email,
					phone: d.phone,
					realname: d.realname,
					avatar: d.avatar,
					amount: d.amount,
					userType: d.userType,
					status: d.status,
					createtime: d.createtime,
				};
				setGtcUser(userInfo);
				gtcfxTokenService.setUser(userInfo);
				await api
					.post("gtcfx/sync-user")
					.catch((err) =>
						console.warn("Failed to sync user to backend", err),
					);
				return userInfo;
			}
			return null;
		} catch (error) {
			console.error("Failed to fetch GTC FX user info", error);
			return null;
		}
	}, []);

	const checkGTCAuth = useCallback(async () => {
		if (!isAuthenticated) {
			setGtcLoading(false);
			return;
		}
		try {
			const response = await api.get("gtcfx/session");
			if (response.data.authenticated && response.data.data) {
				const { accesstoken, refreshtoken, user } = response.data.data;
				gtcfxTokenService.setToken(accesstoken);
				gtcfxTokenService.setRefreshToken(refreshtoken);
				if (user) {
					setGtcUser(user);
					gtcfxTokenService.setUser(user);
				}
				setGtcAuthenticated(true);
				await fetchGTCUserInfo();
			} else {
				setGtcAuthenticated(false);
				setGtcUser(null);
			}
		} catch (error) {
			console.error("GTC FX auth check failed", error);
			gtcfxTokenService.clearTokens();
			setGtcAuthenticated(false);
			setGtcUser(null);
		} finally {
			setGtcLoading(false);
		}
	}, [isAuthenticated, fetchGTCUserInfo]);

	const gtcLogin = useCallback(
		async (userData) => {
			try {
				const { accesstoken, refreshtoken, user } = userData;
				if (!accesstoken || !refreshtoken)
					throw new Error("Missing GTC FX tokens in response");
				gtcfxTokenService.setToken(accesstoken);
				gtcfxTokenService.setRefreshToken(refreshtoken);
				setGtcAuthenticated(true);
				setGtcError(null);
				if (user) {
					setGtcUser(user);
					gtcfxTokenService.setUser(user);
				}
				await fetchGTCUserInfo();
				setGtcJustLoggedIn(true); // NEW — signals SmartCopy page to check status
				return true;
			} catch (error) {
				console.error("GTC FX login processing error", error);
				setGtcError(error.message || "Failed to process GTC FX login");
				setGtcAuthenticated(false);
				setGtcUser(null);
				return false;
			}
		},
		[fetchGTCUserInfo],
	);

	const gtcLogout = useCallback(async () => {
		try {
			await api.post("gtcfx/logout");
		} catch (error) {
			console.error("GTC FX logout error", error);
		} finally {
			gtcfxTokenService.clearTokens();
			setGtcUser(null);
			setGtcAuthenticated(false);
			setGtcError(null);
			setGtcJustLoggedIn(false);
			// Only redirect on client side
			if (typeof window !== 'undefined') {
				window.location.href = "/gtcfx/auth";
			}
		}
	}, []);

	const clearGTCError = useCallback(() => setGtcError(null), []);

	const value = {
		gtcUser,
		gtcAuthenticated,
		gtcLoading,
		gtcError,
		gtcJustLoggedIn, // NEW — consumed by GTCFxAuth page
		gtcLogin,
		gtcLogout,
		checkGTCAuth,
		clearGTCError,
		refreshGTCUserInfo: fetchGTCUserInfo,
	};

	return (
		<GTCFxAuthContext.Provider value={value}>
			{children}
		</GTCFxAuthContext.Provider>
	);
};
