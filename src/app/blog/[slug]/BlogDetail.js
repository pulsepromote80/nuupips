
"use client";
import { memo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FaCalendarAlt,
  FaUserAlt,
  FaClock,
  FaArrowLeft,
  FaArrowRight,
  FaChevronRight,
  FaComments,
  FaEye,
  FaThumbsUp,
  FaTag,
  FaShareAlt,
  FaPrint,
  FaEnvelope,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaRegBookmark,
  FaRegHeart,
} from "react-icons/fa";
import {
  RiMailLine,
  RiNewsLine,
  RiAlertLine,
  RiHeartFill,
  RiBookmarkFill,
} from "react-icons/ri";
import api from "@/app/lib/axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loading from "@/app/components/Loading";
import ErrorState from "@/app/components/ErrorState";
import {
  getCommentsByBlogId,
  fetchBlogById,
  addComment,
  fetchBlogs,
} from "@/app/services/blog.service";
import Head from "next/head";

const BlogDetail = () => {
  const { slug } = useParams();
  const [email, setEmail] = useState("");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showAll, setShowAll] = useState(false);
  
  const [comment, setComment] = useState({
    name: "",
    email: "",
    comment: "",
  });


  const { data: blogs, isLoading: blogsLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  

 
  const blog = blogs?.find(
    (b) => b.canonical?.toLowerCase() === slug?.toLocaleLowerCase()
  );
  const blogId = blog?.blogId;

  const {
    data: blogData,
    isLoading: blogLoading,
    isError: blogError,
    refetch: refetchBlog,
  } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => fetchBlogById(blogId),
    enabled: !!blogId,
  });


 
  
  // ✅ STEP 4: fetch comments
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: isCommentsError,
    error: commentsError,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["comments", blogId],
    queryFn: () => getCommentsByBlogId(blogId),
    enabled: !!blogId,
  });

  // ✅ add comment mutation
  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      setComment({
        name: "",
        email: "",
        comment: "",
      });
      refetchComments();
    },
  });

  const relatedPosts = blogs
    ?.filter((b) => b.blogId !== blogId)
    ?.slice(0, 6);

  // Category count for sidebar
  const categoryCount = (blogs || []).reduce((acc, post) => {
    const category = post?.categoryName;
    if (!category) return acc;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  
  const uniqueCategories = Object.keys(categoryCount);

  // Comment handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      blogId: blogId,
      ...comment,
    });
  };

  // Show more/less comments
  const visibleComments = showAll ? comments : comments?.slice(0, 3);

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

  // Share functionality
  const handleShare = (platform) => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      const title = blogData?.tittle || "";

      const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent("Check out this article: " + url)}`,
      };

      if (shareUrls[platform]) {
        window.open(shareUrls[platform], "_blank");
      }
    }
  };

  // Loading states
  if (blogsLoading || blogLoading) {
    return <Loading />;
  }


  console.log("TTT",blogId,blogError)

  // Error state
  if (!blogId || blogError) {
    return (
      <div className="fx-blog-detail-wrapper">
        <div className="fx-blog-container">
          <div className="fx-blog-error-state">
            <RiAlertLine size={48} />
            <h2>Post Not Found</h2>
            <p>
              The blog post you're looking for doesn't exist or has been
              removed.
            </p>
            <Link href="/blog" className="fx-blog-back-to-blog">
              <FaArrowLeft /> Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fx-blog-header">
        <div className="container">
          {/* Breadcrumb */}
          <div className="fx-blog-breadcrumb">
            <Link href="/">Home</Link>
            <FaChevronRight className="fx-blog-breadcrumb-icon" />
            <Link href="/pages/blog">Blog</Link>
            <FaChevronRight className="fx-blog-breadcrumb-icon" />
            <span>{blogData?.tittle}</span>
          </div>
          
          <div className="fx-blog-category">
            <span className="fx-blog-category-badge fx-blog-category-primary">
              <FaTag /> {blogData?.categoryName}
            </span>
            <span className="fx-blog-reading-time">
              <FaClock /> {blogData?.readTime || "5"} min read
            </span>
          </div>
          
          <h1 className="fx-blog-title">{blogData?.tittle}</h1>
          
          <div className="fx-blog-meta-info">
            <div className="fx-blog-author">
              <div className="fx-blog-author-avatar">
                <Image
                  src="/assets/img/blog/comment-author-1.jpg"
                  alt={blogData?.createdBy || "author"}
                  width={48}
                  height={48}
                />
              </div>
              <div className="fx-blog-author-details">
                <span className="fx-blog-author-name">{blogData?.createdBy}</span>
                <span className="fx-blog-author-title">
                  {blogData?.categoryName}
                </span>
              </div>
            </div>

            <div className="fx-blog-stats">
              <span>
                <FaCalendarAlt /> {blogData?.createdDate}
              </span>
              <span>
                <FaEye /> {blogData?.totalView || 0} views
              </span>
              <span>
                <FaComments /> {comments?.length || 0} comments
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="fx-blog-detail-wrapper">
        <div className="fx-blog-container">
          {/* Article Content */}
          <div className="fx-blog-content-wrapper">
            <div className="fx-blog-main">
              {/* Featured Image */}
              <div className="fx-blog-featured-image">
                <img
                  src={blogData?.image}
                  alt={blogData?.tittle}
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Social Share Sidebar */}
              <div className="fx-blog-share-sidebar">
                <span className="fx-blog-share-label">Share</span>
                <button
                  onClick={() => handleShare("facebook")}
                  className="fx-blog-share-btn fx-blog-share-facebook"
                >
                  <FaFacebookF />
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="fx-blog-share-btn fx-blog-share-twitter"
                >
                  <FaTwitter />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="fx-blog-share-btn fx-blog-share-linkedin"
                >
                  <FaLinkedinIn />
                </button>
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="fx-blog-share-btn fx-blog-share-whatsapp"
                >
                  <FaWhatsapp />
                </button>
                <button
                  onClick={() => handleShare("email")}
                  className="fx-blog-share-btn fx-blog-share-email"
                >
                  <FaEnvelope />
                </button>
              </div>

              {/* Article Body */}
              <div className="fx-blog-body">
                <div
                  className="prose max-w-full break-words overflow-hidden [&_*]:max-w-full [&_img]:h-auto [&_img]:max-w-full"
                  dangerouslySetInnerHTML={{
                    __html: blogData?.description?.replace(/&nbsp;/g, " "),
                  }}
                />

                {/* Comments Section */}
                <div className="fx-blog-comments">
                  <h3>Comments vvvvvvvv ({comments?.length || 0})</h3>

                  {/* Comment Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label className="block mb-2.5 text-sm font-medium text-heading">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={comment.name}
                          onChange={handleChange}
                          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base block w-full px-3 py-2.5"
                          placeholder="Your name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block mb-2.5 text-sm font-medium text-heading">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={comment.email}
                          onChange={handleChange}
                          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base block w-full px-3 py-2.5"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block mb-2.5 text-sm font-medium text-heading">
                        Comment *
                      </label>
                      <textarea
                        name="comment"
                        rows="4"
                        value={comment.comment}
                        onChange={handleChange}
                        className="bg-neutral-secondary-medium p-3 border border-default-medium text-heading text-sm rounded-base block w-full"
                        placeholder="Write your thoughts here..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="fx-blog-submit-comment"
                    >
                      {mutation.isPending ? "Posting..." : "Post Comment"}
                    </button>
                  </form>

                  {/* Comments List */}
                  <div className="fx-blog-comments-list">
                    {commentsLoading ? (
                      <Loading />
                    ) : isCommentsError ? (
                      <ErrorState
                        message={commentsError?.message || "Error loading comments"}
                        onRetry={refetchComments}
                      />
                    ) : (
                      visibleComments?.map((com, index) => (
                        <div key={index} className="fx-blog-single-comment">
                          <div className="fx-blog-comment-avatar">
                            <img
                              src="/assets/img/blog/comment-author-1.jpg"
                              alt={com?.name || "User"}
                              width={50}
                              height={50}
                            />
                          </div>
                          <div className="fx-blog-comment-content">
                            <div className="fx-blog-comment-header">
                              <span className="fx-blog-commenter-name">
                                {com?.name}
                              </span>
                              <span className="fx-blog-comment-date">
                                {com?.createdDate}
                              </span>
                            </div>
                            <p>{com?.comment}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Show More/Less Comments */}
                  {comments?.length > 3 && (
                    <div className="show-more-wrapper">
                      {!showAll ? (
                        <button className="expand-btn" onClick={handleShowMore}>
                          Show More Comments <FaArrowRight />
                        </button>
                      ) : (
                        <button className="expand-btn" onClick={handleShowLess}>
                          Show Less Comments <FaArrowRight />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="fx-blog-sidebar">
              {/* Related Posts */}
              {relatedPosts?.length > 0 && (
                <div
                  className="fx-blog-widget"
                  style={{ position: "sticky", top: "20px" }}
                >
                  <h3>Related Posts</h3>
                  <div className="fx-blog-related-posts">
                    {relatedPosts?.map((related) => (
                      <Link
                        href={`/pages/blog/${related?.canonical || related?.slug || related?.blogId}`}
                        key={related?.blogId}
                        className="fx-blog-related-item"
                      >
                        <div className="fx-blog-related-image">
                          <Image
                            src={related?.image}
                            alt={related?.tittle}
                            width={80}
                            height={80}
                          />
                        </div>
                        <div className="fx-blog-related-content">
                          <h4>{related?.tittle}</h4>
                          <span className="fx-blog-related-date">
                            <FaCalendarAlt /> {related?.createdDate}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="fx-blog-widget">
                <h3>Categories</h3>
                <div className="fx-blog-category-list">
                  {uniqueCategories.map((category) => (
                    <Link
                      key={category}
                      href={`/pages/blog?category=${encodeURIComponent(category)}`}
                      className="fx-blog-category-item"
                    >
                      {category}
                      <span>({categoryCount[category]})</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="fx-blog-widget fx-blog-newsletter">
                <h3>Newsletter</h3>
                <p>Get the latest market updates directly in your inbox</p>
                <div className="fx-blog-newsletter-form">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(BlogDetail);