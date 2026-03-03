"use client";

import { useRouter } from "next/navigation";
import React from "react";

const NewsAnalysis = () => {
  const router = useRouter();
  const articles = [
    {
      id: 1,
      title: "Silver's Haven Mask Faces a Real Test",
      author: "David Scutt",
      date: "March 02, 2026 09:22 AM",
      image:
        "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?q=80&w=2070&auto=format&fit=crop", // Placeholder for Silver
      featured: true,
    },
    {
      id: 2,
      title: "FX Futures Positioning: US Dollar, EUR/USD, GBP/USD | COT report",
      author: "Matt Simpson",
      date: "March 02, 2026 08:07 AM",
      tags: ["APAC SESSION", "COT", "MARKET SENTIMENT", "DXY", "FOREX"],
      image:
        "https://akm-img-a-in.tosshub.com/indiatoday/images/category/News%20Today_clean_00184.jpg?VersionId=SNlWFgh3nFpMpwXNM5mfNB5yQRvIEGaD", // Placeholder for Forex Chart
    },
    {
      id: 3,
      title: "WTI Crude, Gold: Fade the Spike or Respect the Regime Shift?",
      author: "David Scutt",
      date: "March 02, 2026 05:13 AM",
      tags: [
        "CRUDE OIL",
        "WTI",
        "GOLD",
        "GEOPOLITICS",
        "XAU USD",
        "TECHNICAL ANALYSIS",
      ],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYRH7q2XKtAJs19z4Nu40hgM91PpTCuRnbXw&s", // Placeholder for Oil/Gold Chart
    },
  ];
  // Secondary articles (List wala design)
  const secondaryArticles = [
    {
      id: 1,
      title: "FX Futures Positioning: US Dollar, EUR/USD, GBP/USD | COT report",
      author: "Matt Simpson",
      date: "March 02, 2026 08:07 AM",
      tags: ["APAC SESSION", "COT", "DXY", "FOREX"],
      image:
        "https://akm-img-a-in.tosshub.com/indiatoday/images/category/News%20Today_clean_00184.jpg?VersionId=SNlWFgh3nFpMpwXNM5mfNB5yQRvIEGaD",
    },
    {
      id: 2,
      title: "EUR/USD weekly outlook: All about oil prices and Middle East",
      date: "March 01, 2026 05:13 AM",
    },
    {
      id: 3,
      title:
        "USD/JPY Weekly Outlook: Growth Warning Intensifies as Payrolls Loom",
      date: "February 28, 2026 10:23 AM",
    },
  ];
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
    <section className="bg-slate-50 min-h-screen p-8 font-sans">
      <div className="max-w-7xl mx-auto mb-4">
        <h2 className="text-3xl font-semibold text-[#0a1f44] mb-8">
          News & analysis
        </h2>

        {/* Featured Article */}
        <div className="relative w-full h-80 rounded-xl overflow-hidden mb-6 shadow-lg group cursor-pointer">
          <img
            src={articles[0].image}
            alt="Silver bars"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
            <h3 className="text-white text-2xl font-bold mb-4">
              {articles[0].title}
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=david" alt="author" />
              </div>
              <div className="text-xs text-white">
                <p className="font-bold">By: {articles[0].author}</p>
                <p className="opacity-80">{articles[0].date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.slice(1).map((article, index) => (
            <div
              key={index}
               onClick={()=> router.push("/pages/news/detail")}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-lg font-bold text-[#0a1f44] mb-4 leading-tight">
                  {article.title}
                </h4>

                <div className="mt-auto">
                  <p className="text-[11px] text-gray-500 mb-1">
                    By:{" "}
                    <span className="text-blue-600 font-medium cursor-pointer">
                      {article.author}
                    </span>
                  </p>
                  <p className="text-[11px] text-gray-400 mb-4">
                    {article.date}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-bold text-gray-500 border border-gray-300 px-2 py-0.5 rounded uppercase hover:bg-gray-50 cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Bottom: Grid Layout for Secondary News and Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Secondary News Section */}
          <div className="lg:col-span-2 ">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-4">
              <h3 className="text-xl font-bold text-[#0a1f44] mb-6 pb-2 border-b border-gray-100">
                Latest Analysis
              </h3>

              {/* Detailed Article with Image */}
              <div className="flex flex-col md:flex-row gap-6 mb-8 pb-8 border-b border-gray-100">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-[#0055b8] hover:underline cursor-pointer mb-2 leading-tight">
                    {secondaryArticles[0].title}
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    By:{" "}
                    <span className="text-blue-600 font-medium">
                      {secondaryArticles[0].author}
                    </span>
                    <br />
                    {secondaryArticles[0].date}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {secondaryArticles[0].tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold text-gray-600 border border-blue-900 px-2 py-1 rounded-sm uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/3">
                  <img
                    src={secondaryArticles[0].image}
                    alt="Chart"
                    className="rounded-lg object-cover h-32 w-full"
                  />
                </div>
              </div>

              {/* Simple List Articles */}
              <div className="space-y-6">
                {secondaryArticles.slice(1).map((article, index) => (
                  <>
                    <div
                      key={index}
                      className="cursor-pointer border-b border-gray-50 last:border-0"
                    >
                      <h4 className="text-[#0055b8] font-medium hover:underline cursor-pointer mb-1">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-400">{article.date}</p>
                    </div>
                    <hr />
                  </>
                ))}
              </div>

              <div  onClick={()=> router.push("/pages/news/detail")} className="pt-4 text-[#0055b8] text-sm font-bold text-center cursor-pointer">
                View more forex news <span className="ml-1 text-[10px]">▶</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-4">
              <h3 className="text-xl font-bold text-[#0a1f44] mb-6 pb-2 border-b border-gray-100">
                Forex news and analysis
              </h3>

              {/* Detailed Article with Image */}
              <div className="flex flex-col md:flex-row gap-6 mb-8 pb-8 border-b border-gray-100">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-[#0055b8] hover:underline cursor-pointer mb-2 leading-tight">
                    {secondaryArticles[0].title}
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    By:{" "}
                    <span className="text-blue-600 font-medium">
                      {secondaryArticles[0].author}
                    </span>
                    <br />
                    {secondaryArticles[0].date}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {secondaryArticles[0].tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold text-gray-600 border border-blue-900 px-2 py-1 rounded-sm uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/3">
                  <img
                    src={secondaryArticles[0].image}
                    alt="Chart"
                    className="rounded-lg object-cover h-32 w-full"
                  />
                </div>
              </div>

              {/* Simple List Articles */}
              <div className="space-y-6">
                {secondaryArticles.slice(1).map((article) => (
                  <>
                    <div
                      key={article.id}
                      className=" border-b border-gray-50 last:border-0"
                    >
                      <h4 className="text-[#0055b8] font-medium hover:underline cursor-pointer mb-1">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-400">{article.date}</p>
                    </div>
                    <hr />
                  </>
                ))}
              </div>

              <div className="pt-4 text-[#0055b8] text-sm font-bold text-center cursor-pointer">
                View more forex news <span className="ml-1 text-[10px]">▶</span>
              </div>
            </div>
          </div>

          {/* Right: Research Team & Calendar */}
          <div className="space-y-6">
            {/* Research Team Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <h3 className="text-xl font-bold text-[#0a1f44] text-left leading-tight mb-4">
                Get the information that drives markets
              </h3>

              <div className="mb-6 overflow-hidden">
                <img
                  src="https://truyenhinhnghean.vn/file/4028eaa46735a26101673a4df345003c/newscategory/2023-11-03_085345.jpg"
                  alt="Research Team"
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <p className="text-sm text-gray-600 mb-6 text-left">
                Get expert reaction to latest market news and seize potential
                opportunities.
              </p>

              <button className="w-full py-2 px-4 border-2 border-[#0a1f44] text-[#0a1f44] font-bold rounded-full hover:bg-[#0a1f44] hover:text-white transition-colors">
                MEET OUR RESEARCH TEAM
              </button>
            </div>

            {/* Economic Calendar Placeholder */}
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
            <div
              className="max-w-sm rounded-xl p-5 text-white
             shadow-md relative overflow-hidden
             bg-cover bg-center"
              style={{
                backgroundImage: `
      linear-gradient(rgba(31, 86, 168, 0.85), rgba(31, 134, 182, 0.85)),
      url('https://www.forex.com/en/-/media/project/gain-capital/brand/hero-images/hero-introductiontocharts.jpg?h=260&iar=0&w=564&extension=webp')
    `,
              }}
            >
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white leading-snug mb-3">
                  Risk-free trading with <br /> virtual funds
                </h2>

                <p className="text-sm mb-2">Try our award-winning platform.</p>

                <p className="text-sm mb-2">
                  Hone your skills and trading strategies.
                </p>

                <p className="text-sm mb-4">
                  Trade forex and thousands of other markets.
                </p>

                <button
                  className="bg-warning hover:bg-warning
                 text-white text-sm font-semibold 
                 px-4 py-2 rounded-full 
                 shadow transition duration-300"
                >
                  OPEN DEMO ACCOUNT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsAnalysis;
