"use client"
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { GTCFxAuthProvider } from "./contexts/GTCFxAuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
	Home,
	User as NavUser,
	Book,
	ShoppingBag,
	TrendingUp,
	Wallet,
	Users,
	Link2,
	Swords,
} from "lucide-react";
import { CONFIG } from "./constants";
import Deposit from "./pages/wallet/Deposit";
import Withdrawal from "./pages/wallet/Withdrawal";
import TransactionHistory from "./pages/wallet/TransactionHistory";
import BrokerSelection from "./pages/user/BrokerSelection";
import Auth from "./pages/gtcfx/Auth";
import Dashboard from "./pages/user/Dashboard";
import ProfitLogs from "./pages/gtcfx/user/ProfitLogs";
import AgentMembers from "./pages/gtcfx/user/AgentMembers";
import SmartCopy from "./pages/gtcfx/user/SmartCopy"; // NEW
import Profile from "./pages/user/Profile";
import Transfer from "./pages/wallet/Transfer";
import NupipsTeam from "./pages/user/NupipsTeam";
import Shop from "./pages/others/Shop";
import Orders from "./pages/user/Orders";
import ProductItem from "./pages/others/ProductItem";
import PlaceOrder from "./pages/others/PlaceOrder";
import Learn from "./pages/others/Learn";
import CourseView from "./pages/others/CourseView";
import LessonView from "./pages/others/LessonView";
import NupipsIncomes from "./pages/user/NupipsIncomes";
import Competition from "./pages/Competition";
import Notifications from "./pages/user/Notifications";
import { usePathname } from "next/navigation";

// Navigation configuration — defined outside component to avoid re-creation
const NAVBAR_LINKS = [
	{ name: "My Profile", href: "/profile", icon: NavUser },
	{ name: "My Orders", href: "/orders", icon: ShoppingBag },
];

const BASE_SIDEBAR_LINKS = [
	{ name: "Nupips Dashboard", href: "/dashboard", icon: Home },
	{ name: "Nupips Team", href: "/nupips-team", icon: Users },
	{ name: "Shop", href: "/shop", icon: ShoppingBag },
	{ name: "Learn", href: "/learn", icon: Book },
	{ name: "Competition", href: "/competition", icon: Swords },
];

const GTC_FX_SECTION = {
	name: "GTC FX",
	icon: TrendingUp,
	subItems: [
		{ name: "Authentication", href: "//auth" },
		{ name: "GTC FX Dashboard", href: "//dashboard" },
		{ name: "Profit Logs", href: "//profit-logs" },
		{ name: "Agent Members", href: "//agent/members" },
		{ name: "Smart Copy", href: "//smart-copy" }, // NEW
	],
};

const BROKER_CONNECTION_LINK = {
	name: "Connect Your Broker",
	href: "/brokers",
	icon: Link2,
};

const WALLET_SECTION = {
	name: "Wallet",
	icon: Wallet,
	subItems: [
		{ name: "Nupips Incomes", href: "/nupips-incomes" },
		{ name: "Deposit", href: "/deposit" },
		{ name: "Withdrawal", href: "/withdrawal" },
		{ name: "Internal Transfer", href: "/transfer" },
		{ name: "Transaction History", href: "/transaction-history" },
	],
};

const NO_LAYOUT_ROUTES = new Set([
	"/login",
	"/register",
	"/verify-otp",
	"/forgot-password",
	"/reset-password",
]);

const MOBILE_BREAKPOINT = 768;

// Loading screen extracted as a stable component
const LoadingScreen = () => (
	<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-orange-200">
		<div className="text-center">
			<div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
			<p className="text-gray-700 text-lg">Loading...</p>
		</div>
	</div>
);




// Layout Wrapper Component
const LayoutWrapper = React.memo(({ children }) => {
	const location = useLocation();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const { gtcAuthenticated, gtcUser } = useAuth();

	const showLayout = !NO_LAYOUT_ROUTES.has(location.pathname);

	const toggleSidebar = useCallback(() => {
		setSidebarOpen((prev) => !prev);
	}, []);

	const sidebarLinks = useMemo(() => {
		const links = [...BASE_SIDEBAR_LINKS];
		if (!gtcAuthenticated && !gtcUser) {
			links.push(BROKER_CONNECTION_LINK);
		}
		if (gtcAuthenticated && gtcUser) {
			links.push(GTC_FX_SECTION);
		}
		links.push(WALLET_SECTION);
		return links;
	}, [gtcAuthenticated, gtcUser]);

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < MOBILE_BREAKPOINT;
			setIsMobile(mobile);
			setSidebarOpen(!mobile);
		};

		// Set initial values on client side
		handleResize();

		window.addEventListener("resize", handleResize);
		window.toggleSidebar = toggleSidebar;
		return () => {
			window.removeEventListener("resize", handleResize);
			delete window.toggleSidebar;
		};
	}, [toggleSidebar]);

	const mainClasses = useMemo(
		() =>
			isMobile
				? "pt-16 px-0 md:px-6"
				: `pt-20 md:pt-24 px-4 sm:px-6 lg:px-8 ${sidebarOpen ? "ml-64" : "ml-16"}`,
		[isMobile, sidebarOpen],
	);

	const contentClasses = useMemo(
		() =>
			`pb-0 pt-0 md:pb-8 md:pt-2 max-w-full ${!isMobile && sidebarOpen ? "max-w-[calc(100vw-16rem)]" : ""
			}`,
		[isMobile, sidebarOpen],
	);

	if (!showLayout) return <>{children}</>;

	return (
		<div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30 relative overflow-x-hidden">
			<Navbar
				toggleSidebar={toggleSidebar}
				navigationLinks={NAVBAR_LINKS}
				config={CONFIG}
			/>
			<Sidebar
				isOpen={sidebarOpen}
				onToggle={toggleSidebar}
				navigationLinks={sidebarLinks}
				config={CONFIG}
			/>
			{isMobile && sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
					onClick={toggleSidebar}
				/>
			)}
			<div className="bg-orange-50">
				<main
					className={`transition-all duration-300 ease-in-out ${mainClasses}`}
				>
					<div className={contentClasses}>
						<div className="md:rounded-xl overflow-hidden relative top-8 border border-gray-200">
							{children}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
});
LayoutWrapper.displayName = "LayoutWrapper";

// Main App Component
export default function App() {
	return (
		<>
			<Router>
				<AuthProvider>
					<GTCFxAuthProvider>
						<LayoutWrapper>
							<Routes>


								{/* Protected routes */}
								<Route
									path="/dashboard"
									element={

										<Dashboard />

									}
								/>
								<Route
									path="/notifications"
									element={

										<Notifications />

									}
								/>
								<Route
									path="/nupips-team"
									element={

										<NupipsTeam />

									}
								/>
								<Route
									path="/nupips-incomes"
									element={

										<NupipsIncomes />

									}
								/>
								<Route
									path="/shop"
									element={

										<Shop />

									}
								/>
								<Route
									path="/orders"
									element={
										<>
											<Orders />
										</>
									}
								/>
								<Route
									path="/product/:id"
									element={
										<>
											<ProductItem />
										</>
									}
								/>
								<Route
									path="/place-order"
									element={
										<>
											<PlaceOrder />
										</>
									}
								/>
								<Route
									path="/learn"
									element={
										<>
											<Learn />
										</>
									}
								/>
								<Route
									path="/learn/course/:id"
									element={
										<>
											<CourseView />
										</>
									}
								/>
								<Route
									path="/learn/course/:courseId/lesson/:lessonId"
									element={
										<>
											<LessonView />
										</>
									}
								/>
								<Route
									path="/profile"
									element={
										<>
											<Profile />
										</>
									}
								/>
								<Route
									path="/competition"
									element={
										<>
											<Competition />
										</>
									}
								/>
								<Route
									path="/brokers"
									element={
										<>
											<BrokerSelection />
										</>
									}
								/>

								{/* Wallet routes */}
								<Route
									path="/deposit"
									element={
										<>
											<Deposit />
										</>
									}
								/>
								<Route
									path="/withdrawal"
									element={
										<>
											<Withdrawal />
										</>
									}
								/>
								<Route
									path="/transaction-history"
									element={
										<>
											<TransactionHistory />
										</>
									}
								/>
								<Route
									path="/transfer"
									element={
										<>
											<Transfer />
										</>
									}
								/>

								{/* GTC FX routes */}
								<Route
									path="//auth"
									element={
										<>
											<Auth />
										</>
									}
								/>
								<Route
									path="//dashboard"
									element={
										<>
											<>
												<Dashboard />
											</>
										</>
									}
								/>
								<Route
									path="//profit-logs"
									element={
										<>
											<>
												<ProfitLogs />
											</>
										</>
									}
								/>
								<Route
									path="//agent/members"
									element={
										<>
											<>
												<AgentMembers />
											</>
										</>
									}
								/>
								{/* NEW — Smart Copy */}
								<Route
									path="//smart-copy"
									element={
										<>
											<>
												<SmartCopy />
											</>
										</>
									}
								/>


							</Routes>
						</LayoutWrapper>
					</GTCFxAuthProvider>
				</AuthProvider>
			</Router>
		</>
	);
}
