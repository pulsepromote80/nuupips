"use client" 
import React, { useState } from 'react'; 

export default function LoginPage() {
  const [userEmail, setUserEmail] = useState('test1@gmail.com');
  const [userPassword, setUserPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRememberChecked, setIsRememberChecked] = useState(false);

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
          <p className="sub-heading">
            Please enter your details to sign in 
          </p>
        </div>

        {/* Login Form */}
        <form className="login-form">
          
          {/* Email Field */}
          <div className="form-field-group">
            <label className="field-label">
              <svg className="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Email Address
            </label>
            <div className="input-container">
              <input 
                type="email" 
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="text-input-field"
              />
              <svg className="success-check-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 6L9 17l-5-5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Password Field */}
          <div className="form-field-group">
            <div className="label-row-container">
              <label className="field-label">
                <svg className="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2"/>
                </svg>
                Password
              </label>
              <button type="button" className="forgot-password-link">Forgot?</button>
            </div>
            <div className="input-container">
              <input 
                type={isPasswordVisible ? "text" : "password"}
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className="text-input-field"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="password-visibility-toggle"
              >
                {isPasswordVisible ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M1 1l22 22" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <label className="remember-me-container">
            <input 
              type="checkbox" 
              checked={isRememberChecked}
              onChange={(e) => setIsRememberChecked(e.target.checked)}
              className="checkbox-input"
            />
            <span className="checkbox-label-text">
              <svg className="shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2"/>
              </svg>
              Remember me
            </span>
          </label>

          {/* Sign In Button */}
          <button type="submit" className="sign-in-button">
            <span>Sign In</span>
            <svg className="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Divider Line */}
          <div className="divider-container">
            <span className="divider-line"></span>
            <span className="divider-text">Or continue with</span>
            <span className="divider-line"></span>
          </div>

          {/* Social Login Buttons */}
          <div className="social-buttons-grid">
            <button type="button" className="social-login-btn google-btn">
              <svg className="social-icon-svg google-icon" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button type="button" className="social-login-btn apple-btn">
              <svg className="social-icon-svg apple-icon" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="currentColor"/>
              </svg>
              Apple
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <p className="sign-up-text">
          New here? 
          <button className="create-account-btn">
            Create an account
            <svg className="small-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </p>
      </div>
    </div>
  );
}