"use client";

import React from "react";
import {
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  FacebookIcon,
  X,
} from "lucide-react";
import { FaFacebook, FaLinkedin, FaMailBulk } from "react-icons/fa";
export default function MarketOutlookPage() {
  const events = [
    {
      id: 1,
      date: "00:30, Monday, Mar 02",
      country: "🇨🇳",
      title: "S&P Global Manufacturing PMI (Feb)",
      actual: "54.3",
      previous: "52.5",
    },
    {
      id: 2,
      date: "01:01, Monday, Mar 02",
      country: "🇮🇪",
      title: "AIB Manufacturing PMI (Feb)",
      actual: "53.1",
      previous: "52.2",
    },
    {
      id: 3,
      date: "04:00, Monday, Mar 02",
      country: "🇩🇪",
      title: "Inflation (YoY) (Feb)",
      actual: "4.76%",
      previous: "3.55%",
    },
    {
      id: 4,
      date: "04:00, Monday, Mar 02",
      country: "🇩🇪",
      title: "Core Inflation (YoY) (Feb)",
      actual: "2.63%",
      previous: "2.45%",
    },
  ];
  return (
    <div className="bg-white min-vh-100">
      {/* Dark Header */}
      <header className="market-header py-5">
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-2">
            <span className="text-white-50 small text-white">
              🏠 / News & Analysis
            </span>
          </nav>

          <h1 className="article-title fw-bold mb-3 text-white">
            ASX 200 Market Outlook: 9200 Caps Gains Amid Geopolitical Risk
          </h1>

          <p className="lead opacity-75">
            ASX 200 stalls at 9,200 resistance as energy leads and Middle East
            tensions keep traders cautious into options expiry.
          </p>
        </div>
      </header>

      {/* Meta Info Bar */}
      <div className="border-bottom py-3 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 d-flex align-items-center">
              <img
                src="https://micms.stonex.com/sites/default/files/Matt%20Simpson%20400%20X%20350.png"
                className="rounded-circle author-avatar me-2"
                alt="Matt Simpson"
              />
              <div className="small">
                <span className="text-muted">By : </span>
                <a
                  href="#"
                  className="text-primary-custom text-decoration-none fw-bold"
                >
                  Matt Simpson
                </a>
                ,<span className="ms-1">Market Analyst</span>
                <span className="ms-3 text-muted">03/03/2026</span>
              </div>
            </div>
            <div className="col-md-6 text-md-end text-muted small flex items-center justify-end">
              <span className="me-2">Share this:</span>
              <span className="px-2">
                <Mail size={20} color="blue" />
              </span>
              <span className="px-2">
                <FaFacebook size={20} color="blue" />
              </span>
              <span className="px-2">
                <X size={20} color="blue" />
              </span>
              <span className="px-2">
                <FaLinkedin size={20} color="blue" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="container mb-5">
        <div className="market-bg-dark hero-ticker-box">
          {/* Image ko full cover karne ke liye class apply ki gayi hai */}
          <img
            src="https://img.freepik.com/premium-photo/marketing-digital-technology-business-concept-uds_31965-600982.jpg?semt=ais_hybrid&w=740&q=80"
            alt="hero"
            className="hero-img"
          />

          {/* Agar aapko image ke upar text layer chahiye toh iska use karein, varna ise hata dein */}
          <div className="ticker-overlay d-flex align-items-center justify-content-center">
            {/* Yahan aap ticker text add kar sakte hain agar zaroorat ho */}
          </div>
        </div>
      </div>

      {/* Content & Sidebar Grid */}
      <main className="container pb-5">
        <div className="row">
          {/* Article Content Area */}
          <div className="col-lg-8 pe-lg-5">
            <section className="article-body">
              <p className="mb-4 lh-lg fs-5 text-gray-800">
                The ASX 200 extended its rally to a fourth straight session, but
                momentum is stalling at 9,200 — a key options and technical
                resistance level. A hanging man candle at record highs suggests
                buyers are losing conviction just as geopolitical tensions
                reintroduce headline risk.
              </p>
              <p className="mb-4 text-gray-800 lh-lg fs-5">
                Energy and materials are offering support, tracking strength in
                crude oil and commodity prices. However, with options expiry
                approaching and offshore markets driving sentiment, the index
                faces a pivotal test near current levels.
              </p>

              <div className="my-5 ps-3">
                <p className="fw-bold small mb-2 text-uppercase text-muted">
                  View related analysis:
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-primary-custom text-decoration-none related-analysis-link"
                    >
                      • Australian Dollar Outlook: AUD/USD Bullish Bets Face
                      Geopolitical Test
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-primary-custom text-decoration-none related-analysis-link"
                    >
                      • ASX 200 Market Outlook: WOW Rallies, CBA Stalls as 9,200
                      Caps Gains
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-primary-custom text-decoration-none related-analysis-link"
                    >
                      • Australian Dollar Outlook: AUD/USD Bullish Bets Face
                      Geopolitical Test
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-primary-custom text-decoration-none related-analysis-link"
                    >
                      • ASX 200 Market Outlook: WOW Rallies, CBA Stalls as 9,200
                      Caps Gains
                    </a>
                  </li>
                </ul>
              </div>

              <h2 className="fw-bold mb-4">
                ASX 200 Holds Below 9,200 as Geopolitical Risks Build
              </h2>
            </section>
            <section>
              <div className="market-bg-dark hero-ticker-box">
                {/* Image ko full cover karne ke liye class apply ki gayi hai */}
                <img
                  src="https://img.freepik.com/premium-photo/marketing-digital-technology-business-concept-uds_31965-600982.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="hero"
                  className="hero-img"
                />

                {/* Agar aapko image ke upar text layer chahiye toh iska use karein, varna ise hata dein */}
                <div className="ticker-overlay d-flex align-items-center justify-content-center">
                  {/* Yahan aap ticker text add kar sakte hain agar zaroorat ho */}
                </div>
              </div>
              <h2 className="text-3xl pt-8 text-gray-800">
                ASX 200 Correlations Signal Strong Ties to Materials and Global
                Equities
              </h2>
              <p className="mb-2 mt-2 fs-8 text-gray-800">
                The ASX 200 extended its rally to a fourth straight session, but
                momentum is stalling at 9,200 — a key options and technical
                resistance level. A hanging man candle at record highs suggests
                buyers are losing conviction just as geopolitical tensions
                reintroduce headline risk.
              </p>
              <p className="mb-2 mt-2 fs-8 text-gray-800">
                Energy and materials are offering support, tracking strength in
                crude oil and commodity prices. However, with options expiry
                approaching and offshore markets driving sentiment, the index
                faces a pivotal test near current levels.
              </p>
            </section>
          </div>

          {/* Sidebar News */}
          <aside className="col-lg-4">
            <div className="card sidebar-card shadow-sm border-0 mb-4">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-bold">Latest market news</h5>
              </div>
              <div className="list-group list-group-flush">
                <div className="list-group-item py-3">
                  <a
                    href="#"
                    className="text-primary-custom text-decoration-none d-block fw-bold small mb-1"
                  >
                    The AUD Energy Illusion: Why AUD/JPY and EUR/AUD Look
                    Vulnerable
                  </a>
                  <span className="news-timestamp">
                    March 03, 2026 11:03 AM
                  </span>
                </div>
                <div className="list-group-item py-3">
                  <a
                    href="#"
                    className="text-primary-custom text-decoration-none d-block fw-bold small mb-1"
                  >
                    Gold Holds Firm as Options Markets Stir on Crude Oil Spike
                  </a>
                  <span className="news-timestamp">
                    March 03, 2026 08:06 AM
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-[#12225c] rounded-2xl p-8 md:p-12 text-white max-w-md shadow-2xl mb-4">
              {/* Heading: Large bold text with tight line height */}
              <h2 className="text-xl text-white md:text-2xl font-bold leading-tight ">
                Open an account in minutes
              </h2>

              {/* Description: Semi-transparent white text for better hierarchy */}
              <p className="text-lg text-white/90 leading-relaxed mb-10">
                Experience award-winning platforms with fast and secure
                execution.
              </p>

              {/* Button: Pill shape, bold text, and hover transition */}
              <div className="flex justify-start">
                <a
                  href="#"
                  className="bg-white  font-bold py-3 text-gray-800 px-8 rounded-full uppercase text-sm tracking-wider transition-all duration-300 hover:bg-gray-200 active:scale-95"
                >
                  Open an Account
                </a>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 w-full max-w-md">
              <h3 className="text-2xl font-bold text-[#0a1f44] border-b pb-3 mb-4">
                Economic Calendar
              </h3>

              {/* 24h Section */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">24h, Saturday, Feb 28</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇰🇷</span>
                    <p className="text-[#0a1f44] font-medium">
                      March 1st Movement
                    </p>
                  </div>
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Loop Start */}
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">{event.date}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg">{event.country}</span>
                          <p className="text-[#0a1f44] font-medium">
                            {event.title}
                          </p>
                        </div>
                      </div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                    </div>

                    <div className="flex justify-between text-sm mt-2">
                      <p>
                        <span className="text-gray-500">Actual</span>{" "}
                        <span className="font-semibold">{event.actual}</span>
                      </p>
                      <p>
                        <span className="text-gray-500">Previous</span>{" "}
                        <span className="font-semibold">{event.previous}</span>
                      </p>
                    </div>

                    {/* Divider except last */}
                    {index !== events.length - 1 && <hr className="mt-4" />}
                  </div>
                ))}
              </div>
              {/* Loop End */}

              <div className="mt-6 text-center">
                <button className="px-6 py-2 border-2 border-[#0a1f44] text-[#0a1f44] font-semibold rounded-full hover:bg-[#0a1f44] hover:text-white transition">
                  ECONOMIC CALENDAR
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
