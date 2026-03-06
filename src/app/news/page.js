"use client";

import ErrorState from "@/app/components/ErrorState";
import Loading from "@/app/components/Loading";
import { fetchNews } from "@/app/services/news.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NewsAnalysis = () => {
  const router = useRouter();
  const {
    data: news,
    isLoading: loadingNews,
    error: newsError,
    refetch: newsRefetch,
  } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });
  const topFirstNews = news?.[0];
  const topTwoNews = news?.slice(1, 3);
  const afterTwoData = news?.slice(3);
  const [showAll, setShowAll] = useState(false);

  const visibleData = showAll ? afterTwoData : afterTwoData?.slice(3, 6);
  if (loadingNews) return <Loading />;
  if (newsError)
    return <ErrorState message={newsError?.message} onRetry={newsRefetch} />;

  return (
    <section className="bg-slate-50 min-h-screen p-8 font-sans">
      <div className="max-w-7xl mx-auto mb-4">
        <h2 className="text-3xl font-bold text-[#0a1f44] mb-8 border-l-4 border-blue-600 pl-5">
          News & Analysis
        </h2>
        {/* Featured Article */}
        <div className="relative w-full md:h-80 lg:h-80 rounded-xl overflow-hidden mb-6 shadow-lg group cursor-pointer">
          <img
            src={topFirstNews?.image}
            alt="Silver bars"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
            <h3 className="text-white text-2xl font-bold mb-4">
              {topFirstNews?.tittle}
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=david" alt="author" />
              </div>
              <div className="text-xs text-white">
                <p className="font-bold">By: {topFirstNews?.name}</p>
                <p className="opacity-80">Date: {topFirstNews?.createdDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topTwoNews?.map((article, index) => (
            <div
              key={index}
              onClick={() => router.push(`/news/${article?.newsId}`)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article?.image}
                  alt={article?.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-lg font-bold text-[#0a1f44] mb-4 leading-tight line-clamp-2">
                  {article?.tittle}
                </h4>

                <div className="mt-auto">
                  <p className="text-[11px] text-gray-600 mb-1">
                    By:{" "}
                    <span className="text-blue-600 font-medium cursor-pointer">
                      {article?.name}
                    </span>
                  </p>
                  <p className="text-[11px] text-gray-600 mb-4">
                    Date: <span>{article?.createdDate}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 ">
            {visibleData?.map((news, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-4"
              >
                <h3 className="text-xl font-bold text-[#0a1f44]  pb-2 border-b border-gray-100">
                  Latest Analysis
                </h3>
                <hr />
                {/* Detailed Article with Image */}
                <div className="flex flex-col md:flex-row gap-6 mb-2 mt-2 pb-8 border-b border-gray-100">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-[#0055b8] hover:underline cursor-pointer mb-2 leading-tight line-clamp-2">
                      {news?.tittle}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2 mt-3 ">
                      By:{" "}
                      <span className="text-blue-600 font-medium">
                        {news?.name}
                      </span>
                      <br />
                      Date: <span>{news?.createdDate}</span>
                    </p>
                     <p onClick={() => router.push(`/news/${news?.newsId}`)} className="educator-role bg-primary text-white border-0 mt-2 cursor-pointer">View Detail</p>
                  </div>
                  <div className="md:w-1/3">
                    <img
                      src={news?.image}
                      alt="Chart"
                      className="rounded-lg object-cover h-32 w-full"
                    />
                  </div>
                </div>

                {/* <div
                    onClick={() => router.push(`/pages/news/${news?.newsId}`)}
                    className="pt-4 text-[#0055b8] text-sm font-bold text-center cursor-pointer"
                  >
                    View more forex news{" "}
                    <span className="ml-1 text-[10px]">▶</span>
                  </div> */}
              </div>
            ))}
            <div className="flex justify-center items-center">
              {afterTwoData?.length > 3 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-warning hover:bg-warning
                 text-white text-sm font-semibold 
                 px-4 py-2 rounded-full 
                 shadow transition duration-300"
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-6">
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

              <button
                onClick={() => router.push("/pages/experts")}
                className="w-full py-2 px-4 border-2 border-[#0a1f44] text-[#0a1f44] font-bold rounded-full hover:bg-[#0a1f44] hover:text-white transition-colors"
              >
                MEET OUR RESEARCH TEAM
              </button>
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
                  onClick={() => router.push("/user-authentication/register")}
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
