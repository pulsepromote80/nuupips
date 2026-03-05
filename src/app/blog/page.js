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

  const featuredBlog = data?.[0]; // First blog as featured
  
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

  const handleBlogClick = (blogId, canonical, slug) => {
    // Priority: canonical -> slug -> blogId
    const urlPath = canonical || slug || blogId;
    router.push(`/blog/${urlPath}`);
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
          {/* Spotlight Card (Featured) */}
          {featuredBlog && (
            <div className="spotlight-card">
              <div className="row g-0">
                <div className="col-lg-5">
                  <div className="spotlight-image">
                    <img
                      src={featuredBlog?.image}
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
                        {featuredBlog?.categoryName}
                      </span>
                    </div>
                    <h2>{featuredBlog?.tittle}</h2>
                    <p
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: featuredBlog?.description?.replace(/&nbsp;/g, " "),
                      }}
                    />
                  
                    <div className="spotlight-meta">
                      <span className="meta-block">
                        <FaUserAlt /> {featuredBlog?.createdBy}
                      </span>
                      <span className="meta-block">
                        <FaCalendarAlt /> {featuredBlog?.createdDate}
                      </span>
                      <span className="meta-block">
                        <FaClock /> {featuredBlog?.readTime || "5"} min read
                      </span>
                    </div>
                    <Link
                      href={`/blog/${featuredBlog?.canonical || featuredBlog?.slug || featuredBlog?.blogId}`}
                      className="spotlight-link"
                    >
                      Read Full Analysis <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Header */}
          <div className="insight-header">
            <div>
              <h2>Latest Blog Posts</h2>
              <p>Expert analysis and market updates</p>
            </div>
            <div className="views-pill">
              <FaEye /> {totalViews || 0} total views
            </div>
          </div>

          {/* Blog Grid */}
          <div className="row g-4">
            {isLoading ? (
              <Loading />
            ) : isError ? (
              <ErrorState message={error.message} onRetry={refetch} />
            ) : (
              visiblePosts?.map((post) => {
                const urlPath = post.canonical || post.slug || post.blogId;
                
                return (
                  <div
                    key={post.blogId}
                    className="col-lg-4 col-md-6"
                    onClick={() => router.push(`/blog/${urlPath}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="article-card">
                      <div className="card-media">
                        <img
                          src={post.image}
                          alt={post.tittle}
                          width={400}
                          height={250}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />

                        <span
                          className={`topic-tag backdrop-blur-xl bg-white/50`}
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
                            <FaClock /> {post.readTime || "5"} min read
                          </span>
                        </div>
                        <h3>
                          <Link href={`/blog/${urlPath}`}>
                            {post.tittle}
                          </Link>
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
                            __html: post?.description?.replace(/&nbsp;/g, " "),
                          }}
                        />
                        <div className="card-footer">
                          <div className="post-stats">
                            <span className="stat-block">
                              <FaEye /> {post?.totalView || 0} views
                            </span>
                          </div>
                          <Link href={`/blog/${urlPath}`} className="read-link">
                            Read More <FaChevronRight />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Show More / Show Less Button */}
          {data?.length > 6 && (
            <div className="show-more-wrapper">
              {!showAll ? (
                <>
                  <button className="expand-btn" onClick={handleShowMore}>
                    Show More Posts <FaArrowRight />
                  </button>
                  <p className="post-count">
                    Showing 6 of {data.length} posts
                  </p>
                </>
              ) : (
                <>
                  <button className="expand-btn" onClick={handleShowLess}>
                    Show Less Posts <FaArrowRight />
                  </button>
                  <p className="post-count">
                    Showing all {data.length} posts
                  </p>
                </>
              )}
            </div>
          )}

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