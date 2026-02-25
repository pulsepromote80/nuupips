"use client";

import { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactUs } from "@/app/redux/slices/blogSlice";
import { addQuery } from "@/app/services/contact.service";
import { useMutation } from "@tanstack/react-query";

const ContactUs = () => {
  const dispatch = useDispatch();
  const { contactUsData, loading } = useSelector((state) => state.blog);
  const [activeFaq, setActiveFaq] = useState(null);
  const [apiMessage, setApiMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({});
  const [query, setQuery] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  useEffect(() => {
    dispatch(getContactUs());
  }, [dispatch]);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What types of educational programs do you offer?",
      answer:
        "We offer comprehensive educational programs in Forex trading, stock market analysis, technical analysis, fundamental analysis, risk management, and trading psychology. All programs are designed for educational purposes only.",
    },
    {
      question: "Do you provide financial advice or trading signals?",
      answer:
        "No. NUPIPS is strictly an educational platform. We do not provide financial advice, investment recommendations, or trading signals. All content is for educational purposes only.",
    },
    {
      question: "How can I become a partner institution?",
      answer:
        "Visit our Academy Partnership Program page to learn about eligibility criteria and benefits. You can submit a partnership application through our contact form or email us at education@nupips.com.",
    },
    {
      question: "Are your courses suitable for beginners?",
      answer:
        "Yes! We offer programs for all levels, from complete beginners to intermediate learners. Our structured curriculum helps you progress at your own pace.",
    },
    {
      question: "What certifications do your instructors have?",
      answer:
        "All our instructors hold professional certifications such as CFA, CMT, FRM, and have extensive real-world experience in financial markets. Visit our Experts page to learn more about our faculty.",
    },
  ];

  const mutation = useMutation({
    mutationFn: addQuery,
    onSuccess: (data) => {
      setQuery({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      console.log("data---", data);
      setApiMessage(data?.message || "Query submitted successfully!");
      setTimeout(() => {
        setApiMessage("");
      }, 3000);
    },
    onError: (error) => {
      setApiError(error?.response?.data?.message || "Something went wrong!");
      console.log("error---", error);
      setTimeout(() => setApiError(""), 3000);
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
  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!query.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!query.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(query.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (!query.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!query.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    // Agar koi error nahi hai tabhi mutation call hoga
    if (Object.keys(newErrors).length === 0) {
      mutation.mutate(query);
    }
  };
  return (
    <>
      {/* Page Content */}
      <div className="contactus-page">
        {/* Top Hero Section */}
        <section className="contactus-hero">
          <div className="contactus-container">
            <h1 className="contactus-main-title">Contact Us</h1>
            <p className="contactus-hero-desc">
              Have questions about our educational programs? We're here to help.
              Reach out to our team for information, support, or partnership
              inquiries.
            </p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="contactus-main-content">
          <div className="contactus-container">
            <div className="contactus-content-grid">
              {/* Left Column - Contact Info */}
              <div>
                <h2 className="contactus-section-title">Get in Touch</h2>
                <p className="contactus-section-desc">
                  Whether you're interested in our educational programs, have
                  partnership inquiries, or need support, we'd love to hear from
                  you.
                </p>

                {/* Email Card */}
                <div className="contactus-info-card">
                  <div className="contactus-card-icon-blue">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                  </div>
                  <div className="contactus-card-content">
                    <h3 className="contactus-card-title">Email</h3>
                    <p className="contactus-card-text-primary">
                      education@nupips.com
                    </p>
                    <p className="contactus-card-text-secondary">
                      We'll respond within 24-48 hours
                    </p>
                  </div>
                </div>

                {/* Global Reach Card */}
                <div className="contactus-info-card">
                  <div className="contactus-card-icon-green">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 01-2.288 4.04l-.723.724a1.125 1.125 0 01-1.298.21l-.153-.076a1.125 1.125 0 01-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 01-.21-1.298L9.75 12l-1.64-1.64a6 6 0 01-1.676-3.257l-.172-1.03z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="contactus-card-content">
                    <h3 className="contactus-card-title">Global Reach</h3>
                    <p className="contactus-card-text-primary">
                      LLC,Office- 405, Warba Center, Al Muraqabad, Dubai, Dubai,
                      AE
                    </p>
                  </div>
                </div>

                {/* Office Hours Card */}
                <div className="contactus-info-card">
                  <div className="contactus-card-icon-purple">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="contactus-card-content">
                    <h3 className="contactus-card-title">Office Hours</h3>
                    <p className="contactus-card-text-primary">
                      Monday - Friday
                      <br />
                      9:00 AM - 6:00 PM (GMT)
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div>
                <div className="contactus-form-card">
                  <h2 className="contactus-form-title">Send us a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="contactus-form-group">
                      <label className="contactus-form-label">
                        Full Name <span className="contactus-required">*</span>
                      </label>
                      <input
                        name="name"
                        value={query.name}
                        onChange={handleChange}
                        type="text"
                        className="contactus-form-input"
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )}
                    </div>
                    <div className="contactus-form-group">
                      <label className="contactus-form-label">
                        Email Address{" "}
                        <span className="contactus-required">*</span>
                      </label>
                      <input
                        name="email"
                        value={query.email}
                        onChange={handleChange}
                        type="email"
                        className="contactus-form-input"
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>
                    <div className="contactus-form-group">
                      <label className="contactus-form-label">
                        Subject <span className="contactus-required">*</span>
                      </label>
                      <input
                        name="subject"
                        value={query.subject}
                        onChange={handleChange}
                        type="text"
                        className="contactus-form-input"
                        placeholder="Program Inquiry / Partnership / Support"
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm">{errors.subject}</p>
                      )}
                    </div>
                    <div className="contactus-form-group">
                      <label className="contactus-form-label">
                        Message <span className="contactus-required">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={query.message}
                        onChange={handleChange}
                        className="contactus-form-textarea"
                        rows={4}
                        placeholder="Tell us about your inquiry..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm">{errors.message}</p>
                      )}
                    </div>
                    {apiMessage && (
                      <div className="bg-green-100 text-green-700 text-center px-4 py-2 rounded-md mb-3">
                        {apiMessage}
                      </div>
                    )}
                    {apiError && (
                      <div className="bg-red-100 text-red-700 px-4 text-center py-2 rounded-md mb-3">
                        {apiError}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className={`contactus-submit-btn 
                        ${mutation.isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                        `}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="contactus-btn-icon"
                      >
                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                      </svg>
                      {mutation.isPending
                        ? "Sending Message..."
                        : "Send Message"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Inquiries Section */}
        <section className="contactus-inquiries-section">
          <div className="contactus-container">
            <div className="contactus-section-header">
              <h2 className="contactus-section-title">Common Inquiries</h2>
              <p className="contactus-section-subtitle">
                Quick answers to frequently asked questions
              </p>
            </div>
            <div className="contactus-inquiries-grid">
              <div className="contactus-inquiry-card">
                <h3 className="contactus-inquiry-title">Program Information</h3>
                <p className="contactus-inquiry-text">
                  Questions about our Forex, Stock Market, or Risk Management
                  courses
                </p>
              </div>
              <div className="contactus-inquiry-card">
                <h3 className="contactus-inquiry-title">Technical Support</h3>
                <p className="contactus-inquiry-text">
                  Help with accessing courses, community features, or video
                  content
                </p>
              </div>
              <div className="contactus-inquiry-card">
                <h3 className="contactus-inquiry-title">
                  Partnership Opportunities
                </h3>
                <p className="contactus-inquiry-text">
                  Interested in academy partnerships or institutional
                  collaborations
                </p>
              </div>
              <div className="contactus-inquiry-card">
                <h3 className="contactus-inquiry-title">Media & Press</h3>
                <p className="contactus-inquiry-text">
                  Press inquiries, interviews, or collaboration requests
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="contactus-faq-section">
          <div className="contactus-container">
            <h2 className="contactus-faq-main-title">
              Frequently Asked Questions
            </h2>
            <div className="contactus-faq-container">
              {faqs.map((faq, index) => (
                <div key={index} className="contactus-faq-item">
                  <button
                    className={`contactus-faq-question ${activeFaq === index ? "active" : ""}`}
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`contactus-faq-icon ${activeFaq === index ? "rotated" : ""}`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    className={`contactus-faq-answer ${activeFaq === index ? "show" : ""}`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="contactus-notice-section">
          <div className="contactus-container">
            <div className="contactus-notice-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="contactus-notice-icon"
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="contactus-notice-content">
                <strong>Important Notice:</strong> Please note that NUPIPS
                provides educational services only. We do not offer financial
                advice, investment recommendations, or trading signals. All
                inquiries related to such services cannot be addressed.
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default memo(ContactUs);
