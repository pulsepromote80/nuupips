import React from "react";
import { Mail, X } from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
export default function NewsDetail({ article, news }) {
  const topFourData = news.slice(0, 4);
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
            {article.tittle}
          </h1>

          {/* <p className="lead opacity-75">
            ASX 200 stalls at 9,200 resistance as energy leads and Middle East
            tensions keep traders cautious into options expiry.
          </p> */}
        </div>
      </header>

      {/* Meta Info Bar */}
      <div className="border-bottom py-3 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 d-flex align-items-center">
              <img
                src={article.image}
                className="rounded-circle author-avatar me-2"
                alt={article.tittle}
              />
              <div className="small">
                <span className="text-muted">By : </span>
                <a
                  href="#"
                  className="text-primary-custom text-decoration-none fw-bold"
                >
                  {article.name}
                </a>
                ,<span className="ms-1">Market Analyst</span>
                <span className="ms-3 text-muted">{article.createdDate}</span>
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
          <img src={article.image} alt={article.tittle} className="hero-img" />

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
                {article.description}
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
                {topFourData.map((news, index) => (
                  <div key={index} className="list-group-item py-3">
                    <Link
                      href={`/news/${news.newsId}`}
                      className="text-primary-custom text-decoration-none d-block fw-bold small mb-1"
                    >
                      {news.tittle}
                    </Link>
                    <span className="news-timestamp">
                      {news.createdDate}
                    </span>
                  </div>
                ))}

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
                <Link
                  href={`/user-authentication/register`}
                  className="bg-white  font-bold py-3 text-gray-800 px-8 rounded-full uppercase text-sm tracking-wider transition-all duration-300 hover:bg-gray-200 active:scale-95"
                >
                  Open an Account
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
