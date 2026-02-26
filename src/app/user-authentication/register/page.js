"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  register,
  fetchCountry,
  sendOtp,
} from "@/app/services/authentication.service";
import {
  FaArrowAltCircleRight,
  FaArrowCircleRight,
  FaFlag,
  FaKey,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import CountryDropdown from "@/app/components/CountryDropdown";

export default function ForgetPassword() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    data: countryData,
    isLoading: countryLoading,
    error: countryError,
    isError: countryIsError,
  } = useQuery({
    queryKey: ["country"],
    queryFn: fetchCountry,
  });
  const [apiMessage, setApiMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({});
  const [query, setQuery] = useState({
    fullName: "",
    email: "",
    passwordHash: "",
    phoneNo: "",
    otp: "",
    countryId: "",
  });
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setQuery({
        fullName: "",
        email: "",
        passwordHash: "",
        phoneNo: "",
        otp: "",
        countryId: "",
      });
      setApiMessage(data?.message || "Query submitted successfully!");
      setTimeout(() => {
        setApiMessage("");
      }, 10000);
    },
    onError: (error) => {
      setApiError(error?.response?.data?.message || "Something went wrong!");
      setTimeout(() => setApiError(""), 10000);
    },
  });
  const sendOtpMutation = useMutation({
    mutationFn: sendOtp, // ye tumhari dusri API function hogi
    onSuccess: (data) => {
      console.log("OTP Sent:", data);
      setApiMessage(data?.message || "OTP Sent Successfully!");
      setTimeout(() => setApiMessage(""), 3000);
    },
    onError: (error) => {
      setApiError(error?.response?.data?.message || "Failed to send OTP!");
      setTimeout(() => setApiError(""), 3000);
    },
  });
  const validateEmailOnly = () => {
    let newErrors = {};

    if (!query.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(query.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));

    return Object.keys(newErrors).length === 0;
  };
  const handleSendOtp = () => {
    const isValid = validateEmailOnly();

    if (isValid) {
      sendOtpMutation.mutate({
        emailId: query.email,
      });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const validateForm = (data) => {
    let newErrors = {};

    // Full Name
    if (!data.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    // Email
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    // Password
    if (!data.passwordHash.trim()) {
      newErrors.passwordHash = "Password is required";
    } else if (data.passwordHash.length < 6) {
      newErrors.passwordHash = "Password must be at least 6 characters";
    }

    // Phone Number
    if (!data.phoneNo || data.phoneNo.trim() === "") {
      newErrors.phoneNo = "Phone number is required";
    }
    // Agar koi bhi non-digit character hoga to fail karega
    else if (!/^\d+$/.test(data.phoneNo)) {
      newErrors.phoneNo = "Phone number must contain only digits";
    }
    // OTP
    if (!data.otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (!/^[0-9]{6}$/.test(data.otp)) {
      newErrors.otp = "OTP must be 6 digits";
    }

    // Country
    if (!data.countryId) {
      newErrors.countryId = "Country is required";
    }

    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(query);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      mutation.mutate(query);
    }
  };
  return (
    <div className="login-wrapper">
      {/* Background Design Elements */}
      <div className="design-circle-one"></div>
      <div className="design-circle-two"></div>
      <div className="design-circle-three"></div>

      {/* Main Login Box */}
      <div className="login-box">
        {/* Heading Section */}
        <div className="heading-section">
          <h1 className="main-heading">Welcome Back</h1>
          <p className="sub-heading">Please enter your details to sign up</p>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Select Country */}
            <div className="form-field-group flex-1">
              <div className="form-field-group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaUser />
                  Full Name
                </label>
                <div className="input-container">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter Your Name"
                    value={query.fullName}
                    onChange={handleChange}
                    className="text-input-field"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}
                </div>
              </div>
            </div>

            {/* mobile Field */}
            <div className="form-field-group flex-1">
              <div className="form-field-group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaPhone />
                  Phone Number
                </label>
                <div className="input-container">
                  <input
                    type="tel"
                    name="phoneNo"
                    placeholder="Enter Your Mobile"
                    value={query.phoneNo}
                    onChange={handleChange}
                    maxLength={10}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault(); // letters block
                      }
                    }}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="text-input-field"
                  />
                  {errors.phoneNo && (
                    <p className="text-red-500 text-sm">{errors.phoneNo}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Select Country */}
            <div className="form-field-group flex-1">
              <div className="form-field-group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaFlag />
                  Select Country
                </label>

                {/* <div className="input-container">
                  <select
                    name="countryId"
                    value={query.countryId}
                    onChange={handleChange}
                    className="text-input-field"
                  >
                    <option value="">Select Country</option>
                    {countryLoading && <option disabled>Loading...</option>}
                    {!countryLoading &&
                      countryData?.map((data, index) => (
                        <option key={index} value={data?.country_Id}>
                          {data?.country_Name}
                        </option>
                      ))}
                  </select>
                  {errors.countryId && (
                    <p className="text-red-500 text-sm">{errors.countryId}</p>
                  )}
                </div> */}
                <CountryDropdown
                  countryData={countryData}
                  countryLoading={countryLoading}
                  query={query}
                  setQuery={setQuery}
                  errors={errors}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-field-group flex-1">
              {/* Password Field */}
              <div className="form-field-group">
                <div className="label-row-container">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <svg
                      className="label-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                        strokeWidth="2"
                      />
                      <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2" />
                    </svg>
                    Password
                  </label>
                </div>
                <div className="input-container">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="passwordHash"
                    value={query.passwordHash}
                    onChange={handleChange}
                    className="text-input-field"
                    placeholder="Password"
                  />

                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="password-visibility-toggle"
                  >
                    {isPasswordVisible ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M1 1l22 22"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          strokeWidth="2"
                        />
                        <circle cx="12" cy="12" r="3" strokeWidth="2" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.passwordHash && (
                  <p className="text-red-500 text-sm">{errors.passwordHash}</p>
                )}
              </div>
            </div>
          </div>
          {/* Email Field */}
          <div className="form-field-group">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg
                className="label-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Email Address
            </label>
            <div className="input-container">
              <input
                type="email"
                name="email"
                value={query.email}
                onChange={handleChange}
                placeholder="Enter Your Email Address"
                className="text-input-field"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="w-full space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaKey />
              OTP Verification
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                name="otp"
                maxLength="6"
                placeholder="Enter OTP"
                value={query.otp}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 text-sm"
              />

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={sendOtpMutation.isPending}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white 
             text-sm font-medium hover:bg-blue-700 
             disabled:opacity-50"
              >
                {sendOtpMutation.isPending ? "Sending..." : "Send OTP"}
              </button>
            </div>
            {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
          </div>

          <p
            className="text-right underline text-blue-500 cursor-pointer"
            onClick={() => router.push("/user-authentication/forget-password")}
          >
            Forget Password
          </p>
          {apiMessage && (
            <div className="bg-green-100 text-green-700 text-center px-4 py-2 rounded-md ">
              {apiMessage}
            </div>
          )}
          {apiError && (
            <div className="bg-red-100 text-red-700 px-4 text-center py-2 rounded-md ">
              {apiError}
            </div>
          )}

          {/* Sign In Button */}
          <button type="submit" className="sign-in-button">
            <span>{mutation.isPending ? "Registering..." : "Register"}</span>
            <FaArrowAltCircleRight />
          </button>

          {/* Divider Line */}
          <div className="divider-container">
            <span className="divider-line"></span>
            <span className="divider-text">Or continue with</span>
            <span className="divider-line"></span>
          </div>
        </form>

        {/* Sign Up Link */}
        <p className="sign-up-text">
          Already have an account?
          <button
            className="create-account-btn"
            onClick={() => router.push("/user-authentication/login")}
          >
            Log in
            <FaArrowCircleRight />
          </button>
        </p>
      </div>
    </div>
  );
}
