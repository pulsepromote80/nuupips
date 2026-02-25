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
// Blog posts data (same as your BlogSection)
const blogPosts = [
  // Row 1 - 6 Posts
  {
    id: 1,
    title: "US Dollar Strengthens Ahead of Fed Decision",
    description:
      "Analysis of how the upcoming Federal Reserve interest rate decision could impact major currency pairs.",
    category: "Market Analysis",
    author: "Rajesh Kumar",
    authorBio:
      "Senior Market Analyst with 12+ years of experience in forex and commodity markets. Previously worked at leading investment banks.",
    authorAvatar: "/assets/img/blog/comment-author-2.jpg",
    date: "Feb 12, 2026",
    readTime: "8 min read",
    views: 1245,
    likes: 89,
    comments: 34,
    image: "/assets/img/blog/blog-d-1.jpg",
    categoryColor: "primary",
    content: `
      <h2>Federal Reserve's Upcoming Decision: What to Expect</h2>
      <p>The US Dollar has shown remarkable strength in recent trading sessions as markets eagerly await the Federal Reserve's interest rate decision. With inflation data showing mixed signals, traders are positioning themselves for various scenarios.</p>
      
      <h3>Key Factors Influencing the Dollar</h3>
      <p>Several factors are contributing to the dollar's strength:</p>
      <ul>
        <li><strong>Economic Data:</strong> Recent employment figures exceeded expectations, showing resilience in the labor market.</li>
        <li><strong>Inflation Outlook:</strong> Core PCE inflation remains above the Fed's 2% target, suggesting continued hawkish stance.</li>
        <li><strong>Global Uncertainty:</strong> Geopolitical tensions have increased safe-haven demand for the greenback.</li>
      </ul>

      <h3>Technical Analysis Outlook</h3>
      <p>From a technical perspective, the Dollar Index (DXY) has broken above key resistance at 104.50, with the next target at 106.00. The RSI indicates strong momentum without being overbought, suggesting potential for further gains.</p>

      <blockquote>
        "The market is pricing in approximately 60% probability of a 25bps rate hike. However, the focus will be on the forward guidance and dot plot projections."
      </blockquote>

      <h3>Impact on Major Currency Pairs</h3>
      <p><strong>EUR/USD:</strong> The pair has retreated to 1.0850 support level. A break below could open doors toward 1.0750.</p>
      <p><strong>GBP/USD:</strong> Cable remains vulnerable near 1.2650, with BoE's policy divergence playing a key role.</p>
      <p><strong>USD/JPY:</strong> The pair is testing 150.00 psychological level, with intervention risks increasing.</p>

      <h3>Trading Strategies to Consider</h3>
      <p>For traders looking to position themselves:</p>
      <ol>
        <li><strong>Hawkish Scenario:</strong> If Fed signals more hikes, consider USD longs against vulnerable currencies like EUR and GBP.</li>
        <li><strong>Dovish Scenario:</strong> Any hint of rate cuts could trigger USD selling, presenting opportunities in gold and commodity currencies.</li>
        <li><strong>Neutral Scenario:</strong> Range trading strategies with defined support/resistance levels may be most effective.</li>
      </ol>
    `,
    tags: [
      "Federal Reserve",
      "US Dollar",
      "Interest Rates",
      "Forex",
      "Market Analysis",
    ],
    relatedPosts: [2, 3, 5],
  },
  {
    id: 2,
    title: "EUR/USD Technical Outlook: Key Levels to Watch",
    description:
      "Detailed technical analysis of EUR/USD with support and resistance levels for this week.",
    category: "Technical Analysis",
    author: "Priya Sharma",
    authorBio:
      "CFA charterholder and technical analysis expert. Regular contributor to leading financial publications.",
    authorAvatar: "/assets/img/blog/comment-author-2.jpg",
    date: "Feb 11, 2026",
    readTime: "6 min read",
    views: 987,
    likes: 67,
    comments: 23,
    image: "/assets/img/blog/blog-d-2.jpg",
    categoryColor: "success",
    content: `
      <h2>EUR/USD Technical Analysis: Weekly Outlook</h2>
      <p>The EUR/USD pair continues to trade within a well-defined range as traders assess the interest rate differential between the ECB and Fed.</p>
      
      <h3>Key Support and Resistance Levels</h3>
      <p><strong>Resistance Levels:</strong> R1 at 1.0950, R2 at 1.1000, R3 at 1.1080</p>
      <p><strong>Support Levels:</strong> S1 at 1.0850, S2 at 1.0800, S3 at 1.0720</p>
      
      <h3>Technical Indicators Analysis</h3>
      <ul>
        <li><strong>Moving Averages:</strong> The 50-day MA at 1.0880 is providing dynamic support</li>
        <li><strong>RSI:</strong> Currently at 55, indicating neutral momentum</li>
        <li><strong>MACD:</strong> Showing bullish crossover on the daily chart</li>
        <li><strong>Bollinger Bands:</strong> Price trading near the middle band with expanding volatility</li>
      </ul>
    `,
    relatedPosts: [1, 3, 4],
  },
  {
    id: 3,
    title: "Fed Signals Potential Rate Cuts in Q2 2026",
    description:
      "Following news on Federal Reserve's latest statements about possible rate cuts and market impact.",
    category: "Forex News",
    author: "Amit Patel",
    authorBio:
      "Former Reuters journalist specializing in central bank policies and global macroeconomics.",
    authorAvatar: "/assets/img/blog/comment-author-2.jpg",
    date: "Feb 10, 2026",
    readTime: "4 min read",
    views: 2341,
    likes: 156,
    comments: 67,
    image: "/assets/img/blog/blog-d-3.jpg",
    categoryColor: "info",
    content: `
      <h2>Federal Reserve Signals Potential Rate Cuts in Q2 2026</h2>
      <p>In a surprising development, Federal Reserve officials have hinted at the possibility of rate cuts in the second quarter of 2026, citing improving inflation data and potential economic slowdown risks.</p>
      
      <h3>Market Reaction</h3>
      <p>Financial markets reacted swiftly to the news:</p>
      <ul>
        <li>US Dollar weakened across the board</li>
        <li>Gold prices jumped 1.5%</li>
        <li>US Treasury yields dropped 10 basis points</li>
        <li>Stock futures turned positive</li>
      </ul>
    `,

    relatedPosts: [1, 5, 6],
  },
  {
    id: 4,
    title: "Gold Prices: Can XAU/USD Break Above $2,000?",
    description:
      "Technical and fundamental analysis of gold prices with key levels to watch for breakout.",
    category: "Commodities",
    author: "Anita Desai",
    authorBio:
      "Precious metals specialist with expertise in gold and silver markets. Former commodity trader.",
    authorAvatar: "/assets/img/blog/comment-author-2.jpg",
    date: "Feb 9, 2026",
    readTime: "7 min read",
    views: 1123,
    likes: 78,
    comments: 29,
    image: "/assets/img/blog/blog-d-4.jpg",
    categoryColor: "warning",
    content: `
      <h2>Gold Prices Eyeing $2,000 Breakout</h2>
      <p>Gold prices are approaching the critical $2,000 level as a combination of factors support the precious metal.</p>
      
      <h3>Key Drivers</h3>
      <ul>
        <li>Weakening US Dollar</li>
        <li>Central bank buying</li>
        <li>Geopolitical tensions</li>
        <li>Inflation hedge demand</li>
      </ul>
    `,
    tags: ["Gold", "XAU/USD", "Commodities", "Precious Metals"],
    relatedPosts: [1, 2, 10],
  },
  {
    id: 5,
    title: "BOJ Maintains Ultra-Loose Policy: Yen Weakens",
    description:
      "Bank of Japan keeps negative interest rates, leading to continued Yen weakness.",
    category: "Forex News",
    author: "Takeshi Tanaka",
    authorBio:
      "Tokyo-based financial analyst covering Japanese markets and BOJ policy.",
    authorAvatar: "/assets/img/blog/comment-author-2.jpg",
    date: "Feb 8, 2026",
    readTime: "4 min read",
    views: 1876,
    likes: 112,
    comments: 53,
    image: "/assets/img/blog/blog-img-1-1.jpg",
    categoryColor: "danger",
    content: `
      <h2>BOJ Maintains Ultra-Loose Policy as Expected</h2>
      <p>The Bank of Japan maintained its negative interest rate policy and yield curve control program, causing the Yen to weaken further against major currencies.</p>
      
      <h3>USD/JPY Reacts</h3>
      <p>USD/JPY surged past 150.00, approaching levels that previously prompted intervention threats from Japanese authorities.</p>
    `,
    tags: ["BOJ", "Japanese Yen", "USD/JPY", "Monetary Policy"],
    relatedPosts: [3, 6, 11],
  },
  {
    id: 6,
    title: "UK Economy Shows Resilience: GBP Strengthens",
    description:
      "Better-than-expected UK GDP data leads to broad-based Sterling strength.",
    category: "Market Analysis",
    author: "Sarah Williams",
    authorBio:
      "UK economic specialist with focus on Brexit impact and BoE policy analysis.",
    authorAvatar: "/assets/img/blog/comment-author-2.jpg",
    date: "Feb 7, 2026",
    readTime: "3 min read",
    views: 1432,
    likes: 87,
    comments: 36,
    image: "/assets/img/blog/blog-img-1-1.jpg",
    categoryColor: "purple",
    content: `
      <h2>UK Economy Shows Unexpected Resilience</h2>
      <p>The UK economy grew 0.3% in Q4, surpassing expectations of 0.1% contraction, leading to broad-based Sterling strength across the board.</p>
      
      <h3>BoE Implications</h3>
      <p>The strong GDP data reduces pressure on the Bank of England to cut rates aggressively, supporting the Pound.</p>
    `,
    tags: ["UK Economy", "GBP", "BoE", "GDP"],
    relatedPosts: [1, 2, 5],
  },
  {
    id: 7,
    title: "ECB's Lagarde: Inflation Progress Continues",
    description:
      "Latest comments from ECB President on inflation and future monetary policy direction.",
    category: "Forex News",
    author: "Neha Gupta",
    authorBio:
      "EU correspondent covering European Central Bank and Eurozone economies.",
    authorAvatar: "/assets/img/blog/comment-author-2.jpg",
    date: "Feb 6, 2026",
    readTime: "3 min read",
    views: 1543,
    likes: 98,
    comments: 42,
    image: "/assets/img/blog/blog-img-1-2.jpg",
    categoryColor: "info",
    content: `
      <h2>Lagarde: Inflation Progress Continues, but Vigilance Needed</h2>
      <p>ECB President Christine Lagarde stated that while inflation progress continues, the central bank must remain vigilant against potential risks.</p>
    `,
    tags: ["ECB", "Lagarde", "Euro", "Inflation"],
    relatedPosts: [2, 3, 8],
  },
  {
    id: 8,
    title: "AUD/USD: RBA Rate Decision Impact Analysis",
    description:
      "How RBA's latest rate decision affects AUD/USD and what traders should watch.",
    category: "Market Analysis",
    author: "Vikram Singh",
    authorBio:
      "Asia-Pacific markets specialist with focus on Australian and New Zealand economies.",
    authorAvatar: "/assets/img/blog/comment-author-2.jpg",
    date: "Feb 5, 2026",
    readTime: "5 min read",
    views: 645,
    likes: 43,
    comments: 16,
    image: "/assets/img/blog/blog-img-1-3.jpg",
    categoryColor: "primary",
    content: `
      <h2>RBA Holds Rates Steady: AUD/USD Analysis</h2>
      <p>The Reserve Bank of Australia kept rates unchanged at 4.35%, as expected, but maintained a hawkish bias in their statement.</p>
    `,
    tags: ["AUD/USD", "RBA", "Australian Dollar", "Interest Rates"],
    relatedPosts: [1, 4, 10],
  },
  {
    id: 9,
    title: "China's Stimulus Measures Boost Risk Appetite",
    description:
      "New economic stimulus from China improves sentiment, benefiting AUD and NZD.",
    category: "Economic Events",
    author: "Li Wei",
    authorBio:
      "China markets expert with 15 years experience covering Asian economies.",
    authorAvatar: "/assets/img/blog/comment-author-2.jpg",
    date: "Feb 4, 2026",
    readTime: "3 min read",
    views: 1098,
    likes: 67,
    comments: 28,
    image: "/assets/img/blog/blog-img-1-4.jpg",
    categoryColor: "success",
    content: `
      <h2>China Announces Major Stimulus Package</h2>
      <p>China announced a comprehensive stimulus package aimed at boosting economic growth, improving risk sentiment across Asian markets.</p>
    `,
    tags: ["China", "Stimulus", "AUD", "NZD", "Risk Appetite"],
    relatedPosts: [4, 8, 10],
  },
  {
    id: 10,
    title: "Oil Prices Surge: Impact on USD/CAD",
    description:
      "Rising oil prices due to Middle East tensions strengthen Canadian Dollar.",
    category: "Commodities",
    author: "Michael Chen",
    authorBio: "Energy markets specialist and commodity trading advisor.",
    authorAvatar: "/assets/img/blog/comment-author-2.jpg",
    date: "Feb 3, 2026",
    readTime: "4 min read",
    views: 1654,
    likes: 103,
    comments: 47,
    image: "/assets/img/blog/blog-img-1-5.jpg",
    categoryColor: "warning",
    content: `
      <h2>Oil Surges on Middle East Tensions</h2>
      <p>Oil prices jumped 3% following increased tensions in the Middle East, benefiting the Canadian Dollar due to Canada's oil exports.</p>
    `,
    tags: ["Oil", "USD/CAD", "Canadian Dollar", "Commodities"],
    relatedPosts: [4, 5, 8],
  },
  {
    id: 11,
    title: "USD/JPY: Intervention Risks and Technical Setup",
    description:
      "Analysis of potential Japanese intervention and technical levels for USD/JPY.",
    category: "Technical Analysis",
    author: "Rajesh Kumar",
    authorBio:
      "Senior Market Analyst with 12+ years of experience in forex and commodity markets.",
    authorAvatar: "/assets/img/blog/comment-author-2.jpg",
    date: "Feb 2, 2026",
    readTime: "6 min read",
    views: 892,
    likes: 56,
    comments: 21,
    image: "/assets/img/blog/blog-img-1-6.jpg",
    categoryColor: "danger",
    slug: "usd-jpy-intervention",
    content: `
      <h2>USD/JPY: Approaching Intervention Territory</h2>
      <p>USD/JPY is approaching 152.00, levels that previously prompted verbal intervention from Japanese officials.</p>
    `,
    tags: ["USD/JPY", "Intervention", "Technical Analysis", "BOJ"],
    relatedPosts: [3, 5, 6],
  },
  {
    id: 12,
    title: "Stock Market Outlook: Q2 2026 Preview",
    description:
      "What to expect from global stock markets in the second quarter of 2026.",
    category: "Stock Market",
    author: "Priya Sharma",
    authorBio:
      "CFA charterholder and technical analysis expert. Regular contributor to leading financial publications.",
    authorAvatar: "/assets/img/blog/comment-author-2.jpg",
    date: "Feb 1, 2026",
    readTime: "7 min read",
    views: 1567,
    likes: 134,
    comments: 58,
    image: "/assets/img/blog/blog-img-1-7.jpg",
    categoryColor: "purple",
    content: `
      <h2>Q2 2026 Stock Market Preview</h2>
      <p>As we enter the second quarter of 2026, several factors will influence global stock markets including earnings, Fed policy, and economic data.</p>
    `,
    tags: ["Stock Market", "Equities", "Q2 Outlook", "Investing"],
    relatedPosts: [1, 3, 6],
  },
];

const BlogDetail = () => {
  const params = useParams();
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
      blogId: id,
      ...comment,
    });
  };
  //   const id = Number(params?.id);
  const id = params?.id;
  const post = blogPosts.find((p) => p.id === id);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["blogById", id],
    queryFn: () => fetchBlogById(id),
    enabled: !!id,
  });
  // All Blogs
  const {
    data: blogs,
    isLoading: blogsLoading,
    isError: blogsError,
    error: blogsErrorData,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: isCommentsError,
    error: commentsError,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["commetsByBlogId", id],
    queryFn: () => getCommentsByBlogId(id),
    enabled: !!id,
  });
  const relatedPosts = blogs?.slice(0, 4);
  useEffect(() => {
    if (post) {
      setLikeCount(post.likes);
    }
  }, [post]);
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

  // Fixed handleShare function with proper checking
  const handleShare = (platform) => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      const title = post?.title || "";

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

  const categoryCount = (blogs || []).reduce((acc, post) => {
    const category = post?.categoryName;
    if (!category) return acc;

    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  const uniqueCategories = Object.keys(categoryCount);
  if (isLoading) {
    <Loading />;
  }
  if (isError) {
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
            <span>{data?.categoryName}</span>
          </div>
          <div className="fx-blog-category">
            <span className={`fx-blog-category-badge fx-blog-category-primary`}>
              <FaTag /> {data?.categoryName}
            </span>
            <span className="fx-blog-reading-time">
              <FaClock /> {data?.readTime} min read
            </span>
          </div>
          <h1 className="fx-blog-title">{data?.tittle}</h1>
          <div className="fx-blog-meta-info">
            <div className="fx-blog-author">
              <div className="fx-blog-author-avatar">
                <Image
                  src={
                    post?.authorAvatar ||
                    "/assets/img/blog/comment-author-1.jpg"
                  }
                  alt="author"
                  width={48}
                  height={48}
                />
              </div>
              <div className="fx-blog-author-details">
                <span className="fx-blog-author-name">{data?.createdBy}</span>
                <span className="fx-blog-author-title">
                  {data?.categoryName}
                </span>
              </div>
            </div>

            <div className="fx-blog-stats">
              <span>
                <FaCalendarAlt /> {data?.createdDate}
              </span>
              <span>
                <FaEye /> {data?.totalView} views
              </span>
              <span>
                <FaComments /> {comments?.length} comments
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="fx-blog-detail-wrapper">
        <div className="fx-blog-container">
          {/* Article Header */}

          {/* Article Content */}
          <div className="fx-blog-content-wrapper">
            <div className="fx-blog-main">
              {/* Featured Image */}
              <div className="fx-blog-featured-image">
                <img
                  src={data?.image}
                  alt="blog" 
                  style={{ objectFit: "cover" }}
                  priority
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
                {/* <div className="blog-content" dangerouslySetInnerHTML={{ __html: data?.description }} /> */}
                <div
                  className="prose max-w-full break-words overflow-hidden [&_*]:max-w-full [&_img]:h-auto [&_img]:max-w-full"
                  dangerouslySetInnerHTML={{
                    __html: data?.description?.replace(/&nbsp;/g, " "),
                  }}
                />
                {/* Author Bio */}
                <div className="fx-blog-author-bio">
                  <div className="fx-blog-author-bio-avatar">
                    <Image
                      src={
                        post?.authorAvatar ||
                        "/assets/img/blog/comment-author-1.jpg"
                      }
                      alt="author"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="fx-blog-author-bio-content">
                    <h4>About {data?.createdBy}</h4>
                    <p>{post?.authorBio}</p>
                    <div className="fx-blog-author-social">
                      <Link href="#" className="fx-blog-author-social-link">
                        <FaTwitter />
                      </Link>
                      <Link href="#" className="fx-blog-author-social-link">
                        <FaLinkedinIn />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="fx-blog-comments">
                  <h3>Comments ({post?.comments})</h3>

                  {/* Comment Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label className="block mb-2.5 text-sm font-medium text-heading">
                          First name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={comment.name}
                          onChange={handleChange}
                          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base block w-full px-3 py-2.5"
                          placeholder="John"
                          required
                        />
                      </div>

                      <div>
                        <label className="block mb-2.5 text-sm font-medium text-heading">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={comment.email}
                          onChange={handleChange}
                          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base block w-full px-3 py-2.5"
                          placeholder="john.doe@company.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block mb-2.5 text-sm font-medium text-heading">
                        Your message
                      </label>
                      <textarea
                        name="comment"
                        rows="4"
                        value={comment.comment}
                        onChange={handleChange}
                        className="bg-neutral-secondary-medium p-3 border border-default-medium text-heading text-sm rounded-base block w-full "
                        placeholder="Write your thoughts here..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="fx-blog-submit-comment"
                    >
                      {mutation.isPending ? "Submitting..." : "Submit"}
                    </button>
                  </form>

                  {/* Sample Comments */}
                  <div className="fx-blog-comments-list">
                    {commentsLoading ? (
                      <Loading />
                    ) : isCommentsError ? (
                      <ErrorState
                        message={commentsError.message}
                        onRetry={refetchComments}
                      />
                    ) : (
                      visibleComments?.map((com, index) => (
                        <div key={index} className="fx-blog-single-comment">
                          <div className="fx-blog-comment-avatar">
                            <img
                              src="/assets/img/blog/comment-author-1.jpg"
                              alt="User"
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
                  <div className="show-more-wrapper">
                    {comments?.length > 3 &&
                      (!showAll ? (
                        <button className="expand-btn" onClick={handleShowMore}>
                          Show More Posts <FaArrowRight />
                        </button>
                      ) : (
                        <button className="expand-btn" onClick={handleShowLess}>
                          Show Less Posts <FaArrowRight />
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="fx-blog-sidebar">
              {/* Related Posts */}
              {relatedPosts?.length > 0 && (
                <div
                  className="fx-blog-widget"
                  style={{ position: "sticky", top: "0" }}
                >
                  <h3>Related Posts</h3>
                  <div className="fx-blog-related-posts">
                    {relatedPosts?.map((related, index) => (
                      <Link
                        href={`/pages/blog/${related?.blogId}`}
                        key={index}
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
                  {/* {relatedPosts?.map((related, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="fx-blog-category-item"
                    >
                      {related?.categoryName}
                      <span>({categoryCount[related?.categoryName]})</span>
                    </Link>
                  ))} */}
                  {uniqueCategories.map((category) => (
                    <Link
                      key={category}
                      href="#"
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
