"use client";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { memo, useState } from "react";

const Section7 = () => {
  const [acknowledged, setAcknowledged] = useState(false);

  const disclaimerPoints = [
    {
      title: "Educational Purpose Only",
      text: "All content is for educational purposes and should not be construed as financial advice or investment recommendations."
    },
    {
      title: "No Guaranteed Returns",
      text: "We make no claims or guarantees about potential profits, returns, or trading performance. Past performance does not indicate future results."
    },
    {
      title: "Market Risk",
      text: "Trading and investing in financial markets involves substantial risk of loss. You may lose some or all of your invested capital."
    },
    {
      title: "Personal Responsibility",
      text: "Any decisions you make regarding trading or investing are your sole responsibility. You should conduct your own research and consider consulting with licensed financial advisors."
    },
    {
      title: "No Professional Relationship",
      text: "Participation in our educational programs does not create an advisor-client, broker-dealer, or fiduciary relationship."
    },
    {
      title: "Regulatory Compliance",
      text: "Users are responsible for complying with their local financial regulations and laws regarding trading and investment activities."
    },
    {
      title: "Age Restriction",
      text: "Our services are available only to individuals aged 18 years and older."
    },
    {
      title: "Content Accuracy",
      text: "While we strive for accuracy, we do not guarantee that all information is current, complete, or error-free."
    }
  ];

  const riskWarningPoints = [
    "Assess your financial situation and risk tolerance.",
    "Only invest money you can afford to lose.",
    "Understand the specific risks of each market and instrument.",
    "Consider seeking advice from licensed financial professionals.",
    "Start with education before committing capital."
  ];

  const notFinancialAdvicePoints = [
    "Financial, investment, or trading advice.",
    "Recommendations to buy or sell specific securities or currencies.",
    "Predictions of future market performance.",
    "Guarantees of profits or returns.",
    "Professional financial planning services."
  ];

  const compliancePoints = [
    "Understanding and complying with their local financial regulations.",
    "Obtaining necessary licenses or permissions for trading activities.",
    "Reporting income and paying applicable taxes on trading activities.",
    "Working only with properly regulated brokers and financial institutions."
  ];

  return (
    <div className="legal-disclaimer-page">

      {/* Header Section */}
      <section className="disclaimer-header">
        <div className="container">
          <div className="text-center">
            <div className="warning-icon">⚠️</div>
            <h1 className="disclaimer-title">Important Legal Disclaimer</h1>
            <p className="disclaimer-subtitle">
              Please read this disclaimer carefully before accessing any NUPIPS educational content or programs.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Highlight Card - Educational Purpose Only */}
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card highlight-card shadow-lg mt-4">
              <div className="card-body p-4">
                <h2 className="highlight-card-title text-center h4">Educational Purpose Only</h2>
                <p className="card-text text-center mb-0 text-dark">
                  NUPIPS is an educational platform exclusively focused on providing knowledge about financial markets, including Forex and Stock Markets.
                  We do not provide financial advice, investment recommendations, or any form of investment services.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* Key Disclaimer Points */}
        <h2 className="section-title text-center">Key Disclaimer Points</h2>

        <div className="row g-4">
          {disclaimerPoints.map((point, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card disclaimer-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-start mb-3">
                    <div className={`card-icon ${index < 3 ? 'warning' : 'info'}`}>
                      {index < 3 ? '⚠️' : 'ℹ️'}
                    </div>
                    <h5 className="card-title fw-bold mb-0" style={{ color: '#2c3e50' }}>
                      {point.title}
                    </h5>
                  </div>
                  <p className="card-text" style={{ color: '#5d6d7e' }}>
                    {point.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="divider" />

        {/* Risk Warning Section */}
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card risk-warning-card shadow-sm">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <div className="warning-icon" style={{ fontSize: '32px' }}>⚠️</div>
                  <h3 className="risk-warning-title">Risk Warning</h3>
                </div>
                <p className="card-text mb-4 text-dark">
                  <strong className="text-dark">Trading and investing in financial markets carries substantial risk.</strong> You can lose some or all of your invested capital. Market conditions are unpredictable and can change rapidly.
                </p>
                <p className="fw-bold mb-3 text-dark">Before engaging in any trading or investment activity, you should:</p>
                <ul className="warning-list ">
                  {riskWarningPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <p className="card-text mt-4 text-dark fst-italic ">
                  NUPIPS provides education only. All trading and investment decisions are your sole responsibility.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-4">
          {/* Not Financial Advice Card */}
          <div className="col-lg-6">
            <div className="card white-card">
              <div className="card-body p-4">
                <h4 className="white-card-title">Not Financial Advice</h4>
                <p className="card-text mb-4 text-dark">
                  No content provided by NUPIPS—including videos, articles, courses, webinars, or community discussions—should be interpreted as:
                </p>
                <ul className="bullet-list">
                  {notFinancialAdvicePoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <p className="card-text mt-4 text-dark">
                  Our educators share knowledge and frameworks for understanding markets. Application of this knowledge is entirely at your discretion and risk.
                </p>
              </div>
            </div>
          </div>

          {/* Regulatory Compliance Card */}
          <div className="col-lg-6">
            <div className="card white-card">
              <div className="card-body p-4">
                <h4 className="white-card-title">Regulatory Compliance</h4>
                <p className="card-text mb-4 text-dark">
                  Financial markets are regulated differently in various jurisdictions. Users are responsible for:
                </p>
                <ul className="bullet-list">
                  {compliancePoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <p className="card-text mt-4 text-dark">
                  NUPIPS does not provide regulatory, legal, or tax advice. Consult with appropriate professionals in your jurisdiction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Acknowledgement Section */}
        <div className="acknowledgment-box mb-5">
          <h3 className="acknowledgment-title">Acknowledgement Required</h3>
          <p className="text-white text-center mb-4">
            By accessing NUPIPS's educational content and programs, you acknowledge that you have read, understood, and agree to this disclaimer.
          </p>

          <label className="checkbox-label">
             <input class="form-check-input" type="checkbox"  checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)} value="" id="checkDefault" />
            <span>
              I confirm that I have read, understood, and agree to all terms in this legal disclaimer.
              I accept full responsibility for my educational journey and any subsequent trading or investment decisions.
            </span>
          </label>
          <div class="acknowledge-btn gap-2">
           <IoMdCheckmarkCircleOutline />
            <label class="mb-0 text-white" for="checkDefault">
              I Acknowledge and Accept
            </label>
          </div>
 
        </div>
      </div>
    </div>
  );
};

export default memo(Section7);