"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    X, TrendingUp, DollarSign, AlertCircle, Loader,
    CheckCircle, Lock, Shield, ArrowRight,
} from "lucide-react";
import api from "../services/api";

const SubscribeSmartCopyModal = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [strategyDetails, setStrategyDetails] = useState(null); // now holds publish-list data
    const [formData, setFormData] = useState({
        amount: "",
        fundpassword: ["", "", "", "", "", ""],
    });
    const [formErrors, setFormErrors] = useState({});
    const inputRefs = useRef([]);

    useEffect(() => {
        if (isOpen) {
            fetchStrategyDetails();
            if (typeof document !== 'undefined') {
                document.body.style.overflow = "hidden";
            }
        } else {
            setFormData({ amount: "", fundpassword: ["", "", "", "", "", ""] });
            setFormErrors({});
            setError(null);
            setStrategyDetails(null);
            if (typeof document !== 'undefined') {
                document.body.style.overflow = "unset";
            }
        }
        return () => { 
            if (typeof document !== 'undefined') {
                document.body.style.overflow = "unset";
            }
        };
    }, [isOpen]);

    const fetchStrategyDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            // Step 1: check system config
            const configRes = await api.get("system/public/smartcopy-config");
            if (!configRes.data?.success || !configRes.data?.data?.smartCopyUuid) {
                setError("Smart Copy strategy is not configured.");
                setLoading(false);
                return;
            }
            if (!configRes.data.data.smartCopyEnabled) {
                setError("Smart Copy is currently disabled.");
                setLoading(false);
                return;
            }

            // FIX: Use publish-list to get actual strategy details (name, fees, min deposit etc.)
            const publishRes = await api.post("/smartcopy/publish-list", {
                page: 1,
                page_size: 10,
                m_status: 1,
            });

            if (publishRes.data?.success && publishRes.data?.data?.list?.length > 0) {
                // Find matching strategy by uuid from config
                const uuid = configRes.data.data.smartCopyUuid;
                const matched = publishRes.data.data.list.find((s) => s.uuid === uuid)
                    || publishRes.data.data.list[0]; // fallback to first active

                const condition = publishRes.data.data.condition || {};
                setStrategyDetails({
                    uuid,
                    strategy_name: matched.strategy_name,
                    strategy_profile_photo: matched.strategy_profile_photo,
                    performace_fee: matched.performace_fee,
                    management_fee: matched.management_fee,
                    minimum_deposit: matched.minimum_deposit,
                    currency_symbol: matched.currency_symbol,
                    settle_interval_type: matched.settle_interval_type,
                    account_type: matched.account_type,
                    description: matched.description,
                    min_in_amount: condition.min_in_amount,
                });
            } else {
                // No publish list — still allow subscribe with config uuid
                setStrategyDetails({ uuid: configRes.data.data.smartCopyUuid });
            }
        } catch (err) {
            setError(err?.response?.data?.message || err.message || "Failed to load Smart Copy details.");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = useCallback((index, value) => {
        const sanitized = value.replace(/[^0-9]/g, "").slice(-1);
        setFormData((prev) => {
            const otp = [...prev.fundpassword];
            otp[index] = sanitized;
            return { ...prev, fundpassword: otp };
        });
        if (formErrors.fundpassword) setFormErrors((prev) => ({ ...prev, fundpassword: "" }));
        if (error) setError(null);
        if (sanitized && index < 5) inputRefs.current[index + 1]?.focus();
    }, [formErrors.fundpassword, error]);

    const handleOtpKeyDown = useCallback((index, e) => {
        if (e.key === "Backspace") {
            if (!formData.fundpassword[index] && index > 0) {
                setFormData((prev) => {
                    const otp = [...prev.fundpassword];
                    otp[index - 1] = "";
                    return { ...prev, fundpassword: otp };
                });
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }, [formData.fundpassword]);

    const handleOtpPaste = useCallback((e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
        const otp = [...formData.fundpassword];
        for (let i = 0; i < pasted.length; i++) otp[i] = pasted[i];
        setFormData((prev) => ({ ...prev, fundpassword: otp }));
        const nextEmpty = otp.findIndex((v) => !v);
        if (nextEmpty !== -1) inputRefs.current[nextEmpty]?.focus();
        else inputRefs.current[5]?.focus();
    }, [formData.fundpassword]);

    const validateForm = useCallback(() => {
        const errors = {};
        const amount = parseFloat(formData.amount);
        if (!formData.amount || isNaN(amount) || amount <= 0)
            errors.amount = "Please enter a valid amount";
        // FIX: validate against minimum_deposit from strategy if available
        if (strategyDetails?.minimum_deposit && amount < parseFloat(strategyDetails.minimum_deposit))
            errors.amount = `Minimum deposit is ${strategyDetails.currency_symbol || ""} ${strategyDetails.minimum_deposit}`;
        const fp = formData.fundpassword.join("");
        if (!fp || fp.length < 6) errors.fundpassword = "Fund password must be 6 digits";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formData, strategyDetails]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        setError(null);
        try {
            const fundPassword = formData.fundpassword.join("");
            const response = await api.post("/smartcopy/subscribe", {
                amount: parseFloat(formData.amount),
                fund_password: fundPassword,
            });
            if (response.data?.success) {
                onSuccess?.(response.data?.data);
            } else {
                setError(response.data?.message || "Subscription failed.");
            }
        } catch (err) {
            setError(err?.response?.data?.message || err.message || "Failed to subscribe. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
    }, [submitting, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 px-6 py-5 flex items-center justify-between z-10 shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/30">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                {strategyDetails?.strategy_name || "Subscribe to Smart Copy"}
                            </h2>
                            <p className="text-orange-100 text-xs mt-0.5">GTC FX Copy Trading Strategy</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={submitting}
                        className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                    {/* Loading */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16 px-6">
                            <Loader className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                            <p className="text-gray-500 text-sm">Loading Smart Copy details...</p>
                        </div>
                    )}

                    {/* Error — config not set */}
                    {!loading && !strategyDetails && error && (
                        <div className="p-6">
                            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700 font-medium">{error}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="mt-4 w-full px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    )}

                    {/* Form */}
                    {!loading && strategyDetails && (
                        <div className="p-6 space-y-5">
                            {/* Strategy Info — shown when publish-list data available */}
                            {strategyDetails.strategy_name && (
                                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl grid grid-cols-2 gap-3 text-xs">
                                    {strategyDetails.performace_fee && (
                                        <div>
                                            <p className="text-gray-500">Performance Fee</p>
                                            <p className="font-bold text-gray-800">{strategyDetails.performace_fee}%</p>
                                        </div>
                                    )}
                                    {strategyDetails.minimum_deposit && (
                                        <div>
                                            <p className="text-gray-500">Min. Deposit</p>
                                            <p className="font-bold text-gray-800">
                                                {strategyDetails.currency_symbol} {strategyDetails.minimum_deposit}
                                            </p>
                                        </div>
                                    )}
                                    {strategyDetails.settle_interval_type && (
                                        <div>
                                            <p className="text-gray-500">Settlement</p>
                                            <p className="font-bold text-gray-800 capitalize">{strategyDetails.settle_interval_type}</p>
                                        </div>
                                    )}
                                    {strategyDetails.account_type && (
                                        <div>
                                            <p className="text-gray-500">Account Type</p>
                                            <p className="font-bold text-gray-800">{strategyDetails.account_type}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Info Banner */}
                            <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <Shield className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                    <ul className="text-xs text-orange-800 space-y-1">
                                        <li className="flex items-start gap-1.5">
                                            <CheckCircle className="w-3.5 h-3.5 text-orange-600 mt-0.5 flex-shrink-0" />
                                            Automated trade copying starts immediately
                                        </li>
                                        <li className="flex items-start gap-1.5">
                                            <CheckCircle className="w-3.5 h-3.5 text-orange-600 mt-0.5 flex-shrink-0" />
                                            Profit sharing calculated daily
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Runtime error */}
                            {error && (
                                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-700 font-medium">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Amount */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">
                                        Subscription Amount
                                        {strategyDetails.currency_symbol && (
                                            <span className="text-gray-400 font-normal ml-1">({strategyDetails.currency_symbol})</span>
                                        )}
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-focus-within:bg-green-200 transition-colors">
                                            <DollarSign className="w-5 h-5 text-green-600" />
                                        </div>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={(e) => {
                                                setFormData((prev) => ({ ...prev, amount: e.target.value }));
                                                if (formErrors.amount) setFormErrors((prev) => ({ ...prev, amount: "" }));
                                                if (error) setError(null);
                                            }}
                                            placeholder={
                                                strategyDetails.minimum_deposit
                                                    ? `Min: ${strategyDetails.minimum_deposit}`
                                                    : "Enter amount"
                                            }
                                            step="0.01"
                                            min={strategyDetails.minimum_deposit || "0"}
                                            className={`w-full pl-14 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm font-medium ${
                                                formErrors.amount ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        />
                                    </div>
                                    {formErrors.amount && (
                                        <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5" /> {formErrors.amount}
                                        </p>
                                    )}
                                </div>

                                {/* Fund Password OTP */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">
                                        <Lock className="inline w-4 h-4 mr-1.5 text-gray-600" />
                                        Fund Password
                                    </label>
                                    <div className="flex gap-2 justify-between">
                                        {formData.fundpassword.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => (inputRefs.current[index] = el)}
                                                type="password"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                onPaste={handleOtpPaste}
                                                className={`w-12 h-12 text-center text-lg font-bold border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                                                    formErrors.fundpassword ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                                } ${digit ? "bg-orange-50 border-orange-300" : ""}`}
                                            />
                                        ))}
                                    </div>
                                    {formErrors.fundpassword && (
                                        <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5" /> {formErrors.fundpassword}
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        disabled={submitting}
                                        className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-bold text-gray-700 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        {submitting ? (
                                            <>
                                                <Loader className="w-5 h-5 animate-spin relative z-10" />
                                                <span className="relative z-10">Subscribing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <TrendingUp className="w-5 h-5 relative z-10" />
                                                <span className="relative z-10">Subscribe Now</span>
                                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubscribeSmartCopyModal;
