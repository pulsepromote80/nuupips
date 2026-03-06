"use client"
import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { useGTCFxAuth } from "../contexts/GTCFxAuthContext";

export const useSmartCopyStatus = () => {
    const { gtcAuthenticated, gtcLoading } = useGTCFxAuth();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [smartCopyUuid, setSmartCopyUuid] = useState(null);
    const [subscriptionDetails, setSubscriptionDetails] = useState(null);

    const checkSubscription = useCallback(async () => {
        if (!gtcAuthenticated) {
            setIsSubscribed(false);
            setSubscriptionDetails(null);
            return;
        }
        setLoading(true);
        try {
            const configRes = await api.get("system/public/smartcopy-config");
            const uuid = configRes.data?.data?.smartCopyUuid;
            if (!uuid || !configRes.data?.data?.smartCopyEnabled) {
                setIsSubscribed(false);
                setSmartCopyUuid(null);
                setSubscriptionDetails(null);
                return;
            }
            setSmartCopyUuid(uuid);

            const subsRes = await api.post("smartcopy/subscribe-list", {
                page: 1,
                page_size: 100,
            });

            if (subsRes.data?.success && subsRes.data?.data?.list) {
                // FIX: was s.mstatus — actual GTC field is m_status
                const active = subsRes.data.data.list.find(
                    (s) => s.m_status === 1
                );
                if (active) {
                    setIsSubscribed(true);
                    setSubscriptionDetails(active);
                } else {
                    setIsSubscribed(false);
                    setSubscriptionDetails(null);
                }
            } else {
                setIsSubscribed(false);
                setSubscriptionDetails(null);
            }
        } catch (error) {
            console.error("Error checking Smart Copy subscription status:", error);
            setIsSubscribed(false);
            setSubscriptionDetails(null);
        } finally {
            setLoading(false);
        }
    }, [gtcAuthenticated]);

    useEffect(() => {
        checkSubscription();
    }, [checkSubscription]);

    return {
        isSubscribed,
        loading: loading || gtcLoading,
        smartCopyUuid,
        subscriptionDetails,
        refreshStatus: checkSubscription,
    };
};
