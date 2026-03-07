"use client"
import React from "react";
import dynamic from "next/dynamic";

const App = dynamic(() => import("../dashboard/App"), { ssr: false });

const LoadingScreen = () => (
	<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-orange-200">
		<div className="text-center">
			<div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
			<p className="text-gray-700 text-lg">Loading...</p>
		</div>
	</div>
);

export default function ShopPage() {
	return (
		<React.Suspense fallback={<LoadingScreen />}>
			<App />
		</React.Suspense>
	);
}

