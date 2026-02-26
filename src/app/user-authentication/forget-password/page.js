"use client";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FaArrowAltCircleRight,
  FaEnvelopeSquare,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { login } from "@/app/services/authentication.service";
import { useRouter } from "next/navigation";
import { forgetPassword } from "@/app/services/authentication.service";
export default function LoginPage() {
  const router = useRouter();
  const [apiMessage, setApiMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({});
  const [query, setQuery] = useState({
    email: "",
  });
  const mutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: (data) => {
      setQuery({
        email: "",
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
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
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
          <p className="sub-heading">Please enter your Email</p>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-field-group">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaEnvelopeSquare />
              Email
            </label>
            <div className="input-container">
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={query.email}
                onChange={handleChange}
                className="text-input-field"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>
          {apiMessage && (
            <div className="bg-green-100 text-green-700 text-center px-4 py-2 rounded-md">
              {apiMessage}
            </div>
          )}
          {apiError && (
            <div className="bg-red-100 text-red-700 px-4 text-center py-2 rounded-md">
              {apiError}
            </div>
          )}
          {/* Sign In Button */}
          <button type="submit" className="sign-in-button">
            <span>{mutation.isPending ? "Sending Email..." : "Send Email"} </span>
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
          Remember your password?
          <button className="create-account-btn" onClick={() => router.push("/user-authentication/login")} >
            Log in
            <svg
              className="small-arrow-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </p>
      </div>
    </div>
  );
}
