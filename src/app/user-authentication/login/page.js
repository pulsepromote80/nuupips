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
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({});
  const [query, setQuery] = useState({
    username: "",
    password: "",
  });
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (!data?.token) {
        toast.error(data?.message || "Login failed ❌");
        return; // 🚨 stop here
      }
      setQuery({
        username: "",
        password: "",
      });
      toast.success(data?.message || "Login successful 🎉");
      // setApiMessage(data?.message || "Query submitted successfully!");
      setTimeout(() => {
        setApiMessage("");
      }, 10000);
      router.push("/");
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
    if (!data.username.trim()) {
      newErrors.username = "Email is required";
    }

    // Password
    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
          <p className="sub-heading">Please enter your details to sign in</p>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-field-group">
            <label className="field-label">
              <FaEnvelopeSquare />
              Email
            </label>
            <div className="input-container">
              <input
                type="email"
                name="username"
                placeholder="Enter Your Email"
                value={query.username}
                onChange={handleChange}
                className="text-input-field"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="form-field-group">
            <div className="label-row-container">
              <label className="field-label">
                <FaLock />
                Password
              </label>
            </div>
            <div className="input-container">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="Enter Your password"
                value={query.password}
                onChange={handleChange}
                className="text-input-field"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="password-visibility-toggle"
              >
                {isPasswordVisible ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      strokeWidth="2"
                    />
                    <circle cx="12" cy="12" r="3" strokeWidth="2" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <p
            className="text-right underline text-blue-500 cursor-pointer"
            onClick={() => router.push("/user-authentication/forget-password")}
          >
            Forget Password
          </p>
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
            <span>{mutation.isPending ? "Loging..." : "LogIn"} </span>
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
          Don't have an account?
          <button
            className="create-account-btn"
            onClick={() => router.push("/user-authentication/register")}
          >
            Register
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
