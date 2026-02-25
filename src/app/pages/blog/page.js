"use client";
import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaUserAlt,
  FaClock,
  FaArrowRight,
  FaChevronRight,
  FaComments,
  FaEye,
  FaThumbsUp,
  FaTag,
} from "react-icons/fa";
import { RiMailLine, RiNewsLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import api from "@/app/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/components/Loading";
import ErrorState from "@/app/components/ErrorState";
import { fetchBlogs } from "@/app/services/blog.service";

const BlogSection = () => {
  const [email, setEmail] = useState("");
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });  
  const totalViews = data?.reduce((acc, curr) => {
    return acc + (curr.totalView || 0);
  }, 0);

  const zeroIndex = data?.slice(0, 1);
  const objOfBlog = zeroIndex?.[0];
  // Blog posts data - 12 posts (6 visible + 6 hidden)
  const blogPosts = [
    // Row 1 - 6 Posts
    {
      id: 1,
      title: "US Dollar Strengthens Ahead of Fed Decision",
      description:
        "Analysis of how the upcoming Federal Reserve interest rate decision could impact major currency pairs.",
      category: "Market Analysis",
      author: "Rajesh Kumar",
      date: "Feb 12, 2026",
      readTime: "8 min read",
      views: 1245,
      likes: 89,
      comments: 34,
      image: "/assets/img/blog/blog-d-1.jpg",
      categoryColor: "primary",
      slug: "../",
    },
    {
      id: 2,
      title: "EUR/USD Technical Outlook: Key Levels to Watch",
      description:
        "Detailed technical analysis of EUR/USD with support and resistance levels for this week.",
      category: "Technical Analysis",
      author: "Priya Sharma",
      date: "Feb 11, 2026",
      readTime: "6 min read",
      views: 987,
      likes: 67,
      comments: 23,
      image: "/assets/img/blog/blog-d-2.jpg",
      categoryColor: "success",
      slug: "eur-usd-technical-outlook",
    },
    {
      id: 3,
      title: "Fed Signals Potential Rate Cuts in Q2 2026",
      description:
        "Following news on Federal Reserve's latest statements about possible rate cuts and market impact.",
      category: "Forex News",
      author: "Amit Patel",
      date: "Feb 10, 2026",
      readTime: "4 min read",
      views: 2341,
      likes: 156,
      comments: 67,
      image: "/assets/img/blog/blog-d-3.jpg",
      categoryColor: "info",
      slug: "fed-rate-cuts-q2-2026",
    },
    {
      id: 4,
      title: "Gold Prices: Can XAU/USD Break Above $2,000?",
      description:
        "Technical and fundamental analysis of gold prices with key levels to watch for breakout.",
      category: "Commodities",
      author: "Anita Desai",
      date: "Feb 9, 2026",
      readTime: "7 min read",
      views: 1123,
      likes: 78,
      comments: 29,
      image: "/assets/img/blog/blog-d-4.jpg",
      categoryColor: "warning",
      slug: "gold-prices-break-2000",
    },
    {
      id: 5,
      title: "BOJ Maintains Ultra-Loose Policy: Yen Weakens",
      description:
        "Bank of Japan keeps negative interest rates, leading to continued Yen weakness.",
      category: "Forex News",
      author: "Takeshi Tanaka",
      date: "Feb 8, 2026",
      readTime: "4 min read",
      views: 1876,
      likes: 112,
      comments: 53,
      image: "/assets/img/blog/blog-img-1-1.jpg",
      categoryColor: "danger",
      slug: "boj-ultra-loose-policy",
    },
    {
      id: 6,
      title: "UK Economy Shows Resilience: GBP Strengthens",
      description:
        "Better-than-expected UK GDP data leads to broad-based Sterling strength.",
      category: "Market Analysis",
      author: "Sarah Williams",
      date: "Feb 7, 2026",
      readTime: "3 min read",
      views: 1432,
      likes: 87,
      comments: 36,
      image: "/assets/img/blog/blog-img-1-1.jpg",
      categoryColor: "purple",
      slug: "uk-economy-resilience",
    },
    // Row 2 - 6 More Posts (Hidden initially)
    {
      id: 7,
      title: "ECB's Lagarde: Inflation Progress Continues",
      description:
        "Latest comments from ECB President on inflation and future monetary policy direction.",
      category: "Forex News",
      author: "Neha Gupta",
      date: "Feb 6, 2026",
      readTime: "3 min read",
      views: 1543,
      likes: 98,
      comments: 42,
      image: "/assets/img/blog/blog-img-1-2.jpg",
      categoryColor: "info",
      slug: "ecb-lagarde-inflation",
    },
    {
      id: 8,
      title: "AUD/USD: RBA Rate Decision Impact Analysis",
      description:
        "How RBA's latest rate decision affects AUD/USD and what traders should watch.",
      category: "Market Analysis",
      author: "Vikram Singh",
      date: "Feb 5, 2026",
      readTime: "5 min read",
      views: 645,
      likes: 43,
      comments: 16,
      image: "/assets/img/blog/blog-img-1-3.jpg",
      categoryColor: "primary",
      slug: "aud-usd-rba-decision",
    },
    {
      id: 9,
      title: "China's Stimulus Measures Boost Risk Appetite",
      description:
        "New economic stimulus from China improves sentiment, benefiting AUD and NZD.",
      category: "Economic Events",
      author: "Li Wei",
      date: "Feb 4, 2026",
      readTime: "3 min read",
      views: 1098,
      likes: 67,
      comments: 28,
      image: "/assets/img/blog/blog-img-1-4.jpg",
      categoryColor: "success",
      slug: "china-stimulus-risk",
    },
    {
      id: 10,
      title: "Oil Prices Surge: Impact on USD/CAD",
      description:
        "Rising oil prices due to Middle East tensions strengthen Canadian Dollar.",
      category: "Commodities",
      author: "Michael Chen",
      date: "Feb 3, 2026",
      readTime: "4 min read",
      views: 1654,
      likes: 103,
      comments: 47,
      image: "/assets/img/blog/blog-img-1-5.jpg",
      categoryColor: "warning",
      slug: "oil-prices-impact-usd-cad",
    },
    {
      id: 11,
      title: "USD/JPY: Intervention Risks and Technical Setup",
      description:
        "Analysis of potential Japanese intervention and technical levels for USD/JPY.",
      category: "Technical Analysis",
      author: "Rajesh Kumar",
      date: "Feb 2, 2026",
      readTime: "6 min read",
      views: 892,
      likes: 56,
      comments: 21,
      image: "/assets/img/blog/blog-img-1-6.jpg",
      categoryColor: "danger",
      slug: "usd-jpy-intervention",
    },
    {
      id: 12,
      title: "Stock Market Outlook: Q2 2026 Preview",
      description:
        "What to expect from global stock markets in the second quarter of 2026.",
      category: "Stock Market",
      author: "Priya Sharma",
      date: "Feb 1, 2026",
      readTime: "7 min read",
      views: 1567,
      likes: 134,
      comments: 58,
      image: "/assets/img/blog/blog-img-1-7.jpg",
      categoryColor: "purple",
      slug: "stock-market-outlook-q2-2026",
    },
  ];

  // Yeh line fix ki - visiblePosts showAll ke according change hoga
  // const visiblePosts = showAll ? blogPosts : blogPosts.slice(0, 6);
  const visiblePosts = showAll ? data : data?.slice(0, 6);
  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="fx-blog-header">
        <div className="insight-hero">
          <div className="insight-badge">
            <RiNewsLine />
            <span>Market Insights & Analysis</span>
          </div>
          <h1>
            Latest <span>Market News</span> & Analysis
          </h1>
          <p>
            Stay updated with the latest financial market news, expert analysis,
            trading strategies, and economic insights from our team of
            professionals.
          </p>
        </div>
      </div>
      <div className="insight-wrapper">
        <div className="insight-container">
          {/* Hero Section */}

          {/* Spotlight Card (Featured) */}
          <div className="spotlight-card">
            <div className="row g-0">
              <div className="col-lg-5">
                <div className="spotlight-image">
                  <img
                    src={objOfBlog?.image}
                    alt="Featured"
                    width={600}
                    height={400}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="spotlight-content">
                  <div className="spotlight-tags">
                    <span className="spotlight-badge purple">Featured</span>
                    <span className="spotlight-badge blue">
                      {objOfBlog?.categoryName}
                    </span>
                  </div>
                  <h2>{objOfBlog?.tittle}</h2>
                  <p
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: objOfBlog?.description?.replace(/&nbsp;/g, " "),
                    }}
                  ></p>
                
                  <div className="spotlight-meta">
                    <span className="meta-block">
                      <FaUserAlt /> {objOfBlog?.createdBy}
                    </span>
                    <span className="meta-block">
                      <FaCalendarAlt /> {objOfBlog?.createdDate}
                    </span>
                    <span className="meta-block">
                      <FaClock /> {objOfBlog?.readTime} min read
                    </span>
                  </div>
                  <Link
                    href={`/pages/blog/${objOfBlog?.blogId}`}
                    className="spotlight-link"
                  >
                    Read Full Analysis <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Header */}

          <div className="insight-header">
            <div>
              <h2>Latest Blog Posts</h2>
              <p>Expert analysis and market updates</p>
            </div>
            <div className="views-pill">
              <FaEye /> {totalViews} total views
            </div>
          </div>

          {/* Blog Grid - Yeh dynamically update hoga */}
          <div className="row g-4">
            {isLoading ? (
              <Loading />
            ) : isError ? (
              <ErrorState message={error.message} onRetry={refetch} />
            ) : (
              visiblePosts.map((post, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-6"
                  onClick={() => router.push(`/pages/blog/${post.blogId}`)}
                >
                  <div className="article-card">
                    <div className="card-media">
                      <img
                        src={post.image}
                        alt="blogimg"
                        width={400}
                        height={250}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />

                      <span
                        className={`topic-tag backdrop-blur-xl bg-white/50 ${post.categoryColor}`}
                      >
                        <FaTag /> {post?.categoryName}
                      </span>
                    </div>
                    <div className="card-details">
                      <div className="article-meta">
                        <span>
                          <FaUserAlt /> {post.createdBy}
                        </span>
                        <span>
                          <FaCalendarAlt /> {post.createdDate}
                        </span>
                        <span>
                          <FaClock /> {post.readTime} min read
                        </span>
                      </div>
                      <h3>
                        <Link href={`/blog/${post.slug}`}>{post.tittle}</Link>
                      </h3>
                      <p
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                        }}
                        className="blog-description h-[48px]"
                        dangerouslySetInnerHTML={{
                          __html: post?.description?.replace(
                            /&nbsp;/g,
                            " ",
                          ),
                        }}
                      />
                      <div className="card-footer">
                        <div className="post-stats">
                          <span className="stat-block">
                            <FaEye /> {post?.totalView} views
                          </span>
                          {/* <span className="stat-block">
                            <FaThumbsUp /> {post.likes}
                          </span>
                          <span className="stat-block">
                            <FaComments /> {post.comments}
                          </span> */}
                        </div>
                        <Link href={`/blog/${post.slug}`} className="read-link">
                          Read More <FaChevronRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {/* {} */}
          </div>

          {/* Show More / Show Less Button - Yeh ab kaam karega */}
          <div className="show-more-wrapper">
            {!showAll ? (
              <>
                <button className="expand-btn" onClick={handleShowMore}>
                  Show More Posts <FaArrowRight />
                </button>
                <p className="post-count">
                  Showing 6 of {blogPosts.length} posts
                </p>
              </>
            ) : (
              <>
                <button className="expand-btn" onClick={handleShowLess}>
                  Show Less Posts <FaArrowRight />
                </button>
                <p className="post-count">
                  Showing all {blogPosts.length} posts
                </p>
              </>
            )}
          </div>

          {/* Newsletter Section */}
          <div className="subscribe-card">
            <div className="subscribe-icon">
              <RiMailLine />
            </div>
            <h3>Stay Updated with Market Insights</h3>
            <p>
              Get the latest market analysis, news, and trading strategies
              delivered to your inbox. No spam, unsubscribe anytime.
            </p>
            <div className="subscribe-form">
              <div className="input-group-custom">
                <span className="input-icon">
                  <RiMailLine />
                </span>
                <input
                  type="email"
                  className="subscribe-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="subscribe-btn">
                  Subscribe <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(BlogSection);
