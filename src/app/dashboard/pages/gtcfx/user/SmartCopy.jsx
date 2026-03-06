import React, { useState, useEffect, useCallback } from "react";
import {
    TrendingUp, DollarSign, BarChart3, CheckCircle, AlertCircle,
    Loader2, RefreshCw, Copy, ArrowUpRight, ArrowDownRight, Clock,
} from "lucide-react";
import { useSmartCopyStatus } from "../../../hooks/useSmartCopyStatus";
import SubscribeSmartCopyModal from "../../../components/SubscribeSmartCopyModal";
import api from "../../../services/api";

const SmartCopy = () => {
    const { isSubscribed, loading, subscriptionDetails, refreshStatus } = useSmartCopyStatus();
    const [showModal, setShowModal] = useState(false);
    const [profitLogs, setProfitLogs] = useState([]);
    const [logsLoading, setLogsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchProfitLogs = useCallback(async () => {
        if (!isSubscribed || !subscriptionDetails?.copyid) return;
        setLogsLoading(true);
        try {
            // earningrate[] is returned in subscriptionDetails directly from subscribe-list
        } catch { /* silent */ } finally {
            setLogsLoading(false);
        }
    }, [isSubscribed, subscriptionDetails]);

    useEffect(() => {
        fetchProfitLogs();
    }, [fetchProfitLogs]);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await refreshStatus();
        setRefreshing(false);
    }, [refreshStatus]);

    const formatCurrency = (val) => {
        const n = parseFloat(val || 0);
        return `${n >= 0 ? "+" : ""}${n.toFixed(2)}`;
    };

    const earningRate = subscriptionDetails?.earningrate || [];
    const last30Days = earningRate.slice(-30);

    return (
        <div className="min-h-screen bg-white p-4 md:p-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Copy className="w-5 h-5 text-white" />
                        </div>
                        Smart Copy
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">GTC FX Copy Trading Strategy</p>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing || loading}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 text-gray-600 ${refreshing ? "animate-spin" : ""}`} />
                    <span className="text-sm font-medium text-gray-600">Refresh</span>
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                    <p className="text-gray-500 text-sm">Loading Smart Copy status...</p>
                </div>
            )}

            {/* Not Subscribed */}
            {!loading && !isSubscribed && (
                <div className="max-w-lg mx-auto">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Copy className="w-10 h-10 text-blue-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Smart Copy Trading</h2>
                        <p className="text-gray-500 text-sm mb-6">
                            Subscribe to automatically copy trades from our expert GTC FX strategy. Your funds are managed proportionally with daily profit sharing.
                        </p>
                        <ul className="text-left space-y-3 mb-8">
                            {[
                                "Automated trade copying in real-time",
                                "Daily profit & loss settlement",
                                "Proportional fund management",
                                "Unsubscribe anytime",
                            ].map((f) => (
                                <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                                    <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            <Copy className="w-5 h-5" />
                            Subscribe to Smart Copy
                        </button>
                    </div>
                </div>
            )}

            {/* Subscribed — Dashboard */}
            {!loading && isSubscribed && subscriptionDetails && (
                <div className="space-y-6">
                    {/* Active Badge */}
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-blue-800">Smart Copy Active</p>
                            <p className="text-xs text-blue-600">Your subscription is running · Copy ID: {subscriptionDetails.copyid}</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {
                                label: "Total Investment",
                                value: `$${parseFloat(subscriptionDetails.totalinvestment || 0).toFixed(2)}`,
                                icon: DollarSign, color: "blue",
                            },
                            {
                                label: "Current Balance",
                                value: `$${parseFloat(subscriptionDetails.balance || 0).toFixed(2)}`,
                                icon: TrendingUp, color: "green",
                            },
                            {
                                label: "Total Profit",
                                value: formatCurrency(subscriptionDetails.totalprofit),
                                icon: BarChart3,
                                color: parseFloat(subscriptionDetails.totalprofit || 0) >= 0 ? "green" : "red",
                            },
                            {
                                label: "Performance Fee",
                                value: `$${parseFloat(subscriptionDetails.totalperformacefee || 0).toFixed(2)}`,
                                icon: Clock, color: "orange",
                            },
                        ].map(({ label, value, icon: Icon, color }) => (
                            <div key={label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-${color}-50`}>
                                    <Icon className={`w-4 h-4 text-${color}-600`} />
                                </div>
                                <p className="text-xs text-gray-500 font-medium">{label}</p>
                                <p className={`text-lg font-bold mt-0.5 text-${color}-600`}>{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Daily Earnings Chart / Table */}
                    {last30Days.length > 0 && (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                            <h3 className="text-base font-bold text-gray-900 mb-4">Daily Earnings (Last 30 Days)</h3>
                            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                                {[...last30Days].reverse().map((day, i) => {
                                    const rate = parseFloat(day.earningrate || 0);
                                    const amount = parseFloat(day.earningamount || 0);
                                    const positive = rate >= 0;
                                    const date = new Date(day.dateh * 1000);
                                    return (
                                        <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${positive ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
                                            <div className="flex items-center gap-3">
                                                {positive
                                                    ? <ArrowUpRight className="w-4 h-4 text-green-600" />
                                                    : <ArrowDownRight className="w-4 h-4 text-red-600" />
                                                }
                                                <span className="text-xs text-gray-600 font-medium">
                                                    {date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-sm font-bold ${positive ? "text-green-700" : "text-red-700"}`}>
                                                    {positive ? "+" : ""}{amount.toFixed(4)}
                                                </p>
                                                <p className={`text-xs ${positive ? "text-green-600" : "text-red-600"}`}>
                                                    {positive ? "+" : ""}{rate.toFixed(4)}%
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Subscribe Modal */}
            <SubscribeSmartCopyModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={() => { setShowModal(false); refreshStatus(); }}
            />
        </div>
    );
};

export default SmartCopy;
