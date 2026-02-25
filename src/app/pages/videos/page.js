"use client";
import { memo, useState } from "react";
import Image from "next/image";
import {
  FaPlayCircle,
  FaFilter,
  FaClock,
  FaStar,
  FaBell,
  FaArrowRight,
  FaLongArrowAltRight,
  FaChevronRight,
  FaRegClock,
  FaVideo,
  FaTimes
} from "react-icons/fa";
import {
  RiMailLine
} from "react-icons/ri";

const Section5 = () => {
  const [activeCategory, setActiveCategory] = useState("All Videos");
  const [email, setEmail] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const categories = [
    "All Videos",
    "Videos Tutorial",
    "Forex Education",
    "Stock Market",
    "Technical Analysis",
    "Risk Management",
    "Psychology"
  ];

  // Har category me 6 videos ke saath complete tutorial list
  const videoData = [
    // Videos Tutorial - 5 Videos

    {
      id: 1,
      title: "Welcome 2026 | New Opportunities",
      description: "Welcome 2026 | New Opportunities, Positive Changes & Growth Ahead | GTCFX",
      category: "EDUCATIONAL INTRODUCTION",
      duration: "0:30",
      timeAgo: "2 days ago",
      rating: 4.9,
      reviews: 120,
      imgSrc: "/assets/img/videos/account0.jpg",
      bgClass: "edu-bg-primary-soft",
      videoUrl: "/assets/Nupips-Intro-Video.mp4"
    },
    {
      id: 2,
      title: "GTCFX - Account Setup in Phone | Complete Sign Up, Login, KYC, Deposit & Withdrawal Guide - Hindi",
      description: "GTCFX - Account Setup in Phone | Complete Sign Up, Login, KYC, Deposit & Withdrawal Guide - Hindi",
      category: "Videos Tutorial",
      duration: "4:15",
      timeAgo: "3 days ago",
      rating: 4.8,
      reviews: 95,
      imgSrc: "/assets/img/videos/account1.jpg",
      bgClass: "edu-bg-primary-soft",
      videoUrl: "https://www.youtube.com/embed/Qi860G11cwM"
    },
    {
      id: 3,
      title: "GTCFX - Account Setup in Phone | Complete Sign Up, Secure Login, KYC, Deposit & Withdrawal Guide",
      description: "GTCFX - Account Setup in Phone | Complete Sign Up, Secure Login, KYC, Deposit & Withdrawal Guide",
      category: "Videos Tutorial",
      duration: "3:45",
      timeAgo: "4 days ago",
      rating: 4.7,
      reviews: 78,
      imgSrc: "/assets/img/videos/account2.jpg",
      bgClass: "edu-bg-primary-soft",
      videoUrl: "https://www.youtube.com/embed/Sut3kborBLk"
    },
    {
      id: 4,
      title: "GTCFX - Account Setup in Hindi | Step-by-Step Sign Up, Secure Login, KYC, Deposit & Withdrawal Guide",
      description: "GTCFX - Account Setup in Hindi | Step-by-Step Sign Up, Secure Login, KYC, Deposit & Withdrawal Guide",
      category: "Videos Tutorial",
      duration: "5:20",
      timeAgo: "5 days ago",
      rating: 4.9,
      reviews: 112,
      imgSrc: "/assets/img/videos/account3.jpg",
      bgClass: "edu-bg-primary-soft",
      videoUrl: "https://www.youtube.com/embed/ye0ANqXJ8zQ"
    },
    {
      id: 5,
      title: "GTCFX - Account Setup in English | Complete Sign Up, Secure Login, KYC, Deposit & Withdrawal Guide",
      description: "GTCFX - Account Setup in English | Complete Sign Up, Secure Login, KYC, Deposit & Withdrawal Guide",
      category: "Videos Tutorial",
      duration: "5:20",
      timeAgo: "5 days ago",
      rating: 4.9,
      reviews: 112,
      imgSrc: "/assets/img/videos/account4.jpg",
      bgClass: "edu-bg-primary-soft",
      videoUrl: "https://www.youtube.com/embed/tZRRSw5tJVg"
    },

    // Forex Education - 6 Videos
    {
      id: 7,
      title: "What is Forex?",
      description: "Learn the fundamentals of currency trading and how the Forex market operates globally.",
      category: "Forex Education",
      duration: "15:24",
      timeAgo: "1 week ago",
      rating: 4.8,
      reviews: 89,
      imgSrc: "/assets/img/videos/Forex-Education.png",
      bgClass: "edu-bg-info-soft",
      videoUrl: "https://www.youtube.com/embed/GtUN1rLrG_U"
    },
    {
      id: 8,
      title: "Major Currency Pairs Explained",
      description: "Understanding EUR/USD, GBP/USD, USD/JPY and other major currency pairs.",
      category: "Forex Education",
      duration: "18:30",
      timeAgo: "1 week ago",
      rating: 4.9,
      reviews: 134,
      imgSrc: "/assets/img/videos/Forex-Education.png",
      bgClass: "edu-bg-info-soft",
      videoUrl: "https://www.youtube.com/embed/GtUN1rLrG_U"
    },
    {
      id: 9,
      title: "Forex Market Sessions",
      description: "Learn about London, New York, Tokyo sessions and the best times to trade.",
      category: "Forex Education",
      duration: "20:15",
      timeAgo: "2 weeks ago",
      rating: 4.7,
      reviews: 156,
      imgSrc: "/assets/img/videos/Forex-Education.png",
      bgClass: "edu-bg-info-soft",
      videoUrl: "https://www.youtube.com/embed/GtUN1rLrG_U"
    },


    // Stock Market - 6 Videos
    {
      id: 13,
      title: "What is Stock Market?",
      description: "Basic concepts of equity markets, how stocks are traded, and market participants.",
      category: "Stock Market",
      duration: "22:10",
      timeAgo: "3 days ago",
      rating: 4.9,
      reviews: 156,
      imgSrc: "/assets/img/videos/Stock-Market.png",
      bgClass: "edu-bg-success-soft",
      videoUrl: "https://www.youtube.com/embed/coTlg-HQkkQ"
    },
    {
      id: 14,
      title: "How to Buy Stocks",
      description: "Step-by-step guide to purchasing your first stock through different order types.",
      category: "Stock Market",
      duration: "18:45",
      timeAgo: "4 days ago",
      rating: 4.7,
      reviews: 143,
      imgSrc: "/assets/img/videos/Stock-Market.png",
      bgClass: "edu-bg-success-soft",
      videoUrl: "https://www.youtube.com/embed/coTlg-HQkkQ"
    },
    {
      id: 15,
      title: "Stock Exchanges Explained",
      description: "NYSE, NASDAQ, London Stock Exchange - how they work and their differences.",
      category: "Stock Market",
      duration: "20:30",
      timeAgo: "5 days ago",
      rating: 4.8,
      reviews: 112,
      imgSrc: "/assets/img/videos/Stock-Market.png",
      bgClass: "edu-bg-success-soft",
      videoUrl: "https://www.youtube.com/embed/coTlg-HQkkQ"
    },


    // Technical Analysis - 6 Videos
    {
      id: 19,
      title: "What is Technical Analysis?",
      description: "Core principles of chart reading, trends, support/resistance, and technical indicators.",
      category: "Technical Analysis",
      duration: "18:45",
      timeAgo: "5 days ago",
      rating: 4.7,
      reviews: 67,
      imgSrc: "/assets/img/videos/Technical-Analysis.png",
      bgClass: "edu-bg-danger-soft",
      videoUrl: "https://www.youtube.com/embed/HLrGCeGPJ2Y"
    },
    {
      id: 20,
      title: "Candlestick Patterns",
      description: "Complete guide to bullish and bearish candlestick formations.",
      category: "Technical Analysis",
      duration: "24:30",
      timeAgo: "6 days ago",
      rating: 4.9,
      reviews: 189,
      imgSrc: "/assets/img/videos/Technical-Analysis.png",
      bgClass: "edu-bg-danger-soft",
      videoUrl: "https://www.youtube.com/embed/HLrGCeGPJ2Y"
    },
    {
      id: 21,
      title: "Support and Resistance",
      description: "How to identify key price levels and use them in your trading strategy.",
      category: "Technical Analysis",
      duration: "20:15",
      timeAgo: "1 week ago",
      rating: 4.8,
      reviews: 156,
      imgSrc: "/assets/img/videos/Technical-Analysis.png",
      bgClass: "edu-bg-danger-soft",
      videoUrl: "https://www.youtube.com/embed/HLrGCeGPJ2Y"
    },


    // Risk Management - 6 Videos
    {
      id: 25,
      title: "What is Risk Management?",
      description: "Essential skills for position sizing, stop losses, and protecting your trading capital.",
      category: "Risk Management",
      duration: "20:30",
      timeAgo: "1 week ago",
      rating: 4.8,
      reviews: 92,
      imgSrc: "/assets/img/videos/Risk-Management.png",
      bgClass: "edu-bg-warning-soft",
      videoUrl: "https://www.youtube.com/embed/Cw3HRaxRZL8"
    },
    {
      id: 26,
      title: "Position Sizing",
      description: "Calculate optimal trade size based on account equity and risk tolerance.",
      category: "Risk Management",
      duration: "18:45",
      timeAgo: "1 week ago",
      rating: 4.7,
      reviews: 145,
      imgSrc: "/assets/img/videos/Risk-Management.png",
      bgClass: "edu-bg-warning-soft",
      videoUrl: "https://www.youtube.com/embed/Cw3HRaxRZL8"
    },
    {
      id: 27,
      title: "Stop Loss Strategies",
      description: "Different types of stop losses and where to place them effectively.",
      category: "Risk Management",
      duration: "22:15",
      timeAgo: "2 weeks ago",
      rating: 4.9,
      reviews: 167,
      imgSrc: "/assets/img/videos/Risk-Management.png",
      bgClass: "edu-bg-warning-soft",
      videoUrl: "https://www.youtube.com/embed/Cw3HRaxRZL8"
    },


    // Psychology - 6 Videos
    {
      id: 31,
      title: "What is Trading Psychology?",
      description: "Master emotional control, discipline, and mental resilience for successful trading.",
      category: "Psychology",
      duration: "25:15",
      timeAgo: "4 days ago",
      rating: 4.9,
      reviews: 134,
      imgSrc: "/assets/img/videos/Psychology.png",
      bgClass: "edu-bg-purple-soft",
      videoUrl: "https://www.youtube.com/embed/9W2Uhr7wRcQ"
    },
    {
      id: 32,
      title: "Overcoming Fear and Greed",
      description: "Techniques to manage emotions and stick to your trading plan.",
      category: "Psychology",
      duration: "23:30",
      timeAgo: "5 days ago",
      rating: 4.8,
      reviews: 156,
      imgSrc: "/assets/img/videos/Psychology.png",
      bgClass: "edu-bg-purple-soft",
      videoUrl: "https://www.youtube.com/embed/9W2Uhr7wRcQ"
    },
    {
      id: 33,
      title: "Building Trading Discipline",
      description: "Develop habits and routines that lead to consistent execution.",
      category: "Psychology",
      duration: "21:45",
      timeAgo: "6 days ago",
      rating: 4.7,
      reviews: 143,
      imgSrc: "/assets/img/videos/Psychology.png",
      bgClass: "edu-bg-purple-soft",
      videoUrl: "https://www.youtube.com/embed/9W2Uhr7wRcQ"
    },

  ];

  const filteredVideos = activeCategory === "All Videos"
    ? videoData
    : videoData.filter(video => video.category === activeCategory);

  const openVideoPopup = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = "hidden";
  };

  const closeVideoPopup = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "unset";
  };

  return (
    <div className="edu-video-library">
      {/* Video Popup Modal */}
      {selectedVideo && (
        <div className="edu-video-popup-overlay" onClick={closeVideoPopup}>
          <div className="edu-video-popup-container" onClick={(e) => e.stopPropagation()}>
            <button className="edu-popup-close-btn" onClick={closeVideoPopup}>
              <FaTimes />
            </button>

            <div className="edu-popup-content">
              <div className="edu-popup-video-wrapper">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="edu-popup-video"
                ></iframe>
              </div>

              <div className="edu-popup-details">
                <div className="edu-popup-header">
                  <span className={`edu-category-badge edu-badge-${selectedVideo.bgClass.split('-')[2]}`}>
                    {selectedVideo.category}
                  </span>
                  <span className="edu-popup-duration">
                    <FaRegClock /> {selectedVideo.duration}
                  </span>
                </div>

                <h2 className="edu-popup-title">{selectedVideo.title}</h2>
                <p className="edu-popup-description">{selectedVideo.description}</p>

                <div className="edu-popup-rating">
                  <div className="edu-stars">
                    <FaStar className="edu-star-filled" />
                    <FaStar className="edu-star-filled" />
                    <FaStar className="edu-star-filled" />
                    <FaStar className="edu-star-filled" />
                    <FaStar className="edu-star-filled" />
                  </div>
                  <span className="edu-rating-value">{selectedVideo.rating}</span>
                  <span className="edu-reviews-count">({selectedVideo.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*===========================================
          HERO SECTION - Educational Video Library
      ===========================================*/}
      <section className="edu-hero-wrapper">
        <div className="edu-container">
          <div className="edu-hero-content">
            <div className="edu-hero-badge">
              <FaVideo className="edu-hero-badge-icon" />
              <span>Educational Video Library</span>
            </div>

            <h1 className="edu-hero-title">
              Comprehensive Financial <span className="edu-text-gradient">Markets Education</span>
            </h1>

            <p className="edu-hero-description">
              Comprehensive video tutorials covering financial markets, technical analysis,
              risk management, and trading psychology. Learn at your own pace.
            </p>
          </div>
        </div>
      </section>
      <section className="edu-path-wrapper">
        <div className="container ">
          <div className="row">
            <div className="edu-featured-card">
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}>
                <video
                  muted
                  loop
                  playsInline
                  controls
                  poster="/assets/Nupips-Intro-Video.jpg"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  onError={(e) => {
                    console.log('Video error:', e);
                  }}
                >
                  <source src="/assets/Nupips-Intro-Video.mp4" type="video/mp4" />
                </video>

                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '80px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                  pointerEvents: 'none',
                }} />
              </div>
              <div className="edu-featured-content">
                <span className="edu-featured-badge">Featured Introduction</span>
                <h3 className="edu-featured-title">
                  NUPIPS Explained in 30 Seconds | Forex & Stock Market Trading Education Platform
                </h3>
                <p className="edu-featured-text">
                  Welcome to NUPIPS, a structured and responsible platform dedicated to financial market education.
                </p>
                <a
                  href="#"
                  className="edu-featured-link"
                  onClick={(e) => {
                    e.preventDefault();

                    // Create popup element
                    const popup = document.createElement('div');
                    popup.setAttribute('id', 'video-popup');
                    popup.innerHTML = `
                <div style="position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.9); display:flex; align-items:center; justify-content:center; z-index:1000; padding:20px;" id="popup-overlay">
                  <div style="position:relative; width:100%; max-width:900px; background:#0f172a; border-radius:16px; overflow:hidden;" onclick="event.stopPropagation()">
                    <button style="position:absolute; top:16px; right:16px; width:40px; height:40px; border-radius:50%; background:rgba(255,255,255,0.1); border:none; color:white; font-size:24px; cursor:pointer; z-index:10; display:flex; align-items:center; justify-content:center;" id="close-popup-btn">×</button>
                    <div style="position:relative; width:100%; aspect-ratio:16/9;">
                      <video controls autoplay muted loop playsinline poster="/assets/Nupips-Intro-Video.jpg" style="width:100%; height:100%; object-fit:cover;">
                        <source src="/assets/Nupips-Intro-Video.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <div style="padding:24px; background:#0f172a;">
                      <span style="display:inline-block; padding:6px 12px; background:rgba(59,130,246,0.2); color:#3b82f6; border-radius:20px; font-size:14px; margin-bottom:12px;">Featured Introduction</span>
                      <h3 style="font-size:24px; font-weight:700; color:white; margin-bottom:12px;">NUPIPS Explained in 30 Seconds | Forex & Stock Market Trading Education Platform</h3>
                      <p style="font-size:16px; color:#94a3b8; margin-bottom:20px;">Welcome to NUPIPS, a structured and responsible platform dedicated to financial market education.</p>
                      <div style="font-size:16px; color:#3b82f6; display:flex; align-items:center; gap:8px;">Learn today. Improve your understanding. Make informed decisions. →</div>
                    </div>
                  </div>
                </div>
              `;

                    document.body.appendChild(popup);
                    document.body.style.overflow = 'hidden';

                    // Close popup function
                    const closePopup = () => {
                      const popupElement = document.getElementById('video-popup');
                      if (popupElement) {
                        popupElement.remove();
                        document.body.style.overflow = 'unset';
                      }
                    };

                    // Add click event to close button
                    setTimeout(() => {
                      const closeBtn = document.getElementById('close-popup-btn');
                      const overlay = document.getElementById('popup-overlay');

                      if (closeBtn) {
                        closeBtn.onclick = (e) => {
                          e.stopPropagation();
                          closePopup();
                        };
                      }

                      if (overlay) {
                        overlay.onclick = (e) => {
                          if (e.target.id === 'popup-overlay') {
                            closePopup();
                          }
                        };
                      }
                    }, 100);
                  }}
                >
                  Learn today. Improve your understanding. Make informed decisions.
                  <FaLongArrowAltRight className="edu-featured-link-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===========================================
          CATEGORY SECTION - Browse by Category
      ===========================================*/}
      <section className="edu-category-wrapper">
        <div className="edu-container">
          <div className="edu-category-header">
            <h2 className="edu-section-title">Browse by Category</h2>
            <button className="edu-filter-btn">
              <FaFilter className="edu-filter-icon" />
              Filter
            </button>
          </div>

          <div className="edu-category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`edu-tab-btn ${activeCategory === category ? 'edu-tab-active' : 'edu-tab-inactive'}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="edu-video-grid">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="edu-video-card"
                onClick={() => openVideoPopup(video)}
                style={{ cursor: "pointer" }}
              >
                <div className={`edu-video-thumbnail ${video.bgClass}`}>
                  <div className="edu-thumbnail-image">
                    <Image
                      src={video.imgSrc}
                      alt={video.title}
                      width={400}
                      height={225}
                      className="edu-thumbnail-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('edu-thumbnail-fallback');
                      }}
                    />
                  </div>

                  <div className="edu-play-overlay">
                    <FaPlayCircle className="edu-play-icon" />
                  </div>

                  <div className="edu-duration-badge">
                    <FaRegClock className="edu-duration-icon" />
                    {video.duration}
                  </div>
                </div>

                <div className="edu-video-body">
                  <div className="edu-video-meta">
                    <span className={`edu-category-badge edu-badge-${video.bgClass.split('-')[2]}`}>
                      {video.category}
                    </span>
                    <span className="edu-time-ago">
                      <FaClock className="edu-time-icon" />
                      {video.timeAgo}
                    </span>
                  </div>

                  <h3 className="edu-video-title">{video.title}</h3>
                  <p className="edu-video-description">{video.description}</p>

                  <div className="edu-video-footer">
                    <div className="edu-rating">
                      <div className="edu-stars">
                        <FaStar className="edu-star-filled" />
                        <FaStar className="edu-star-filled" />
                        <FaStar className="edu-star-filled" />
                        <FaStar className="edu-star-filled" />
                        <FaStar className="edu-star-filled" />
                      </div>
                      <span className="edu-rating-value">{video.rating}</span>
                      <span className="edu-reviews-count">({video.reviews} reviews)</span>
                    </div>
                    <span className="edu-watch-link">
                      Watch Now
                      <FaChevronRight className="edu-watch-icon" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*===========================================
          LEARNING PATH SECTION - Suggested Learning Path
      ===========================================*/}
      <section className="edu-path-wrapper">
        <div className="edu-container">
          <div className="edu-path-card">
            <div className="edu-path-header">
              <h2 className="edu-path-title text-white">Suggested Learning Path</h2>
              <p className="edu-path-subtitle">
                Follow this structured sequence for comprehensive understanding:
              </p>
            </div>

            <div className="edu-path-steps">
              <div className="edu-path-step">
                <div className="edu-step-number">1</div>
                <div className="edu-step-content">
                  <h4 className="edu-step-title">Understand GTCFX approach and philosophy</h4>
                </div>
              </div>

              <div className="edu-path-step">
                <div className="edu-step-number">2</div>
                <div className="edu-step-content">
                  <h4 className="edu-step-title">Learn Forex fundamentals and market structure</h4>
                </div>
              </div>

              <div className="edu-path-step">
                <div className="edu-step-number">3</div>
                <div className="edu-step-content">
                  <h4 className="edu-step-title">Master technical analysis and chart reading</h4>
                </div>
              </div>

              <div className="edu-path-step">
                <div className="edu-step-number">4</div>
                <div className="edu-step-content">
                  <h4 className="edu-step-title">Essential risk management skills</h4>
                </div>
              </div>

              <div className="edu-path-step">
                <div className="edu-step-number">5</div>
                <div className="edu-step-content">
                  <h4 className="edu-step-title">Develop trading psychology and discipline</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===========================================
          NEWSLETTER SECTION - New Content Every Week
      ===========================================*/}
      <section className="edu-newsletter-wrapper">
        <div className="edu-container">
          <div className="edu-newsletter-card">
            <div className="edu-newsletter-icon-wrapper">
              <FaBell className="edu-newsletter-icon" />
            </div>

            <h2 className="edu-newsletter-title">New Content Every Week</h2>

            <p className="edu-newsletter-text">
              Subscribe to receive notifications about new educational videos,
              market updates, and learning resources.
            </p>

            <div className="edu-newsletter-form">
              <div className="edu-input-group">
                <span className="edu-input-icon">
                  <RiMailLine />
                </span>
                <input
                  type="email"
                  className="edu-email-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="edu-subscribe-btn">
                  Subscribe
                  <FaArrowRight className="edu-subscribe-icon" />
                </button>
              </div>
              <p className="edu-privacy-text">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*===========================================
          STATS SECTION - Video Library Statistics
      ===========================================*/}
      <section className="edu-stats-wrapper">
        <div className="edu-container">
          <div className="edu-stats-grid">
            <div className="edu-stat-item">
              <div className="edu-stat-number">200+</div>
              <div className="edu-stat-label">VIDEO TUTORIALS</div>
            </div>

            <div className="edu-stat-item">
              <div className="edu-stat-number">50+</div>
              <div className="edu-stat-label">EXPERT EDUCATORS</div>
            </div>

            <div className="edu-stat-item">
              <div className="edu-stat-number">15K+</div>
              <div className="edu-stat-label">ACTIVE LEARNERS</div>
            </div>

            <div className="edu-stat-item">
              <div className="edu-stat-number">4.9★</div>
              <div className="edu-stat-label">AVERAGE RATING</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Section5);