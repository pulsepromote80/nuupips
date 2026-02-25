import { memo } from "react";
import Image from "next/image";
import { 
  FaArrowUp,
  FaBookOpen,
  FaShieldAlt,
  FaBrain,
  FaComments,
  FaCalendarAlt,
  FaUserGraduate,
  FaUsers,
  FaHandshake,
  FaExclamationTriangle,
  FaStar,
  FaBirthdayCake,
  FaGraduationCap,
  FaChartLine,
  FaFileAlt,
  FaChalkboardTeacher,
  FaCertificate
} from "react-icons/fa";
import { 
  RiBookOpenLine,
  RiShieldLine,
  RiCommunityLine,
  RiMessageLine,
  RiCalendarEventLine,
  RiUserLine,
  RiCheckboxCircleFill
} from "react-icons/ri";

const Section3 = () => {
  return (
    <div className="fin-edu-container">
      {/* Hero Section */}
      <section className="hero-edu-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12">
              <h1 className="hero-edu-title display-4 fw-bold mb-4">
                Learn Together, Grow Together
              </h1>
              <p className="hero-edu-subtitle lead mb-0">
                Comprehensive, structured programs in Forex and Stock Market education.
                Learn technical analysis, risk management, and trading psychology from
                industry experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="banner-img">
        <Image
          src="/assets/img/community-banner.jpg"
          alt="Partnership" className="banner-img"
          width={1000}
          height={300}
        />
      </div>

      <section className="features-edu-section py-5">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title mb-0">Partnership Benefits</h2>
            <p className="section-subtitle">Comprehensive support for integrating financial education into your curriculum</p>
          </div>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="feature-edu-card h-100 p-4">
                <div className="feature-edu-icon blue-edu-icon mb-3">
                  <FaArrowUp />
                </div>
                <h3 className="feature-edu-title h5 fw-bold mb-2">Market Structure</h3>
                <p className="feature-edu-desc small mb-0">Understand how the global foreign exchange market operates, major participants,
                  and market sessions</p></div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="feature-edu-card h-100 p-4">
                <div className="feature-edu-icon green-edu-icon mb-3">
                  <RiBookOpenLine />
                </div>
                <h3 className="feature-edu-title h5 fw-bold mb-2">Technical Analysis</h3>
                <p className="feature-edu-desc small mb-0">
                  Master chart patterns, indicators, and
                  price action strategies for market analysis
                </p>
              </div></div><div className="col-12 col-md-6 col-lg-3">
              <div className="feature-edu-card h-100 p-4">
                <div className="feature-edu-icon purple-edu-icon mb-3">
                  <FaShieldAlt />
                </div>
                <h3 className="feature-edu-title h5 fw-bold mb-2">Risk Management</h3>
                <p className="feature-edu-desc small mb-0">Essential strategies to protect
                  your capital and manage trading risks effectively</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="feature-edu-card h-100 p-4">
                <div className="feature-edu-icon amber-edu-icon mb-3">
                  <FaBrain />
                </div><h3 className="feature-edu-title h5 fw-bold mb-2">Trading Psychology</h3>
                <p className="feature-edu-desc small mb-0">Develop the mental discipline and emotional control required for consistent trading</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="included-section">
        <div className="container">
          <div className="included-wrapper"> 
                  <Image
          src="/assets/img/Educational-Resources-img.jpg"
          alt="Partnership" className="banner-img m-0"
          width={600}
          height={600}
        />  
            <div className="included-list">
              <h3 className="section-title-left">What's Included</h3><div className="features-list">
                <div className="feature-item">
                  <div className="feature-check">
                    <RiCheckboxCircleFill style={{color: "#10B981", fontSize: "20px"}} />
                  </div><div className="feature-content"><h4 className="feature-title">Structured Curriculum</h4>
                    <p className="feature-description">Complete course materials covering Forex, stock markets, risk management, and trading psychology</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-check">
                    <RiCheckboxCircleFill style={{color: "#10B981", fontSize: "20px"}} />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">Teaching Resources</h4>
                    <p className="feature-description">Lesson plans, presentation slides, case studies, and assessment materials</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-check">
                    <RiCheckboxCircleFill style={{color: "#10B981", fontSize: "20px"}} />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">Certification Programs</h4>
                    <p className="feature-description">Recognized certificates for students completing structured learning modules</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-check">
                    <RiCheckboxCircleFill style={{color: "#10B981", fontSize: "20px"}} />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">Ongoing Support</h4>
                    <p className="feature-description">Regular updates, new content, and dedicated partnership support team</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-check">
                    <RiCheckboxCircleFill style={{color: "#10B981", fontSize: "20px"}} />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">Faculty Training</h4>
                    <p className="feature-description">Professional development workshops for your educators on financial markets education</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-check">
                    <RiCheckboxCircleFill style={{color: "#10B981", fontSize: "20px"}} />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">Co-Branded Materials</h4>
                    <p className="feature-description">
                      Customized content featuring both NUPIPS and your institution's branding</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="community-bg-section">
        <div className="row">
          <div className="container">

            <h2 className="community-main-title1 mb-4 text-white">Our Growing Community</h2>

            <div className="stats-grid">
              <div className="stat-card mb-3">
                <h3 className="stat-number1">15,000+</h3>
                <p className="stat-label1">Active Learners</p>
              </div>

              <div className="stat-card mb-3">
                <h3 className="stat-number1">500+</h3>
                <p className="stat-label1">Daily Discussions</p>
              </div>

              <div className="stat-card mb-3">
                <h3 className="stat-number1">200+</h3>
                <p className="stat-label1">Weekly Sessions</p>
              </div>

              <div className="stat-card mb-3">
                <h3 className="stat-number1">50+</h3>
                <p className="stat-label1">Expert Educators</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Recent-Discussions">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4 mb-lg-0">
              <h3 className="community-subtitle1 mb-3">Recent Discussions</h3>
              <div className="discussions-container shado-none">
                <div className="discussion-item discussion-item-card mb-3 p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="discussion-content">
                      <div className="day-card circal-div bg-primary">
                        <h6>SC</h6>
                      </div>
                      <div>
                        <h5 className="discussion-author mb-1">Sarah Chen <div>7 hr year</div></h5>
                        <p className="discussion-topic mb-1">Understanding Support and Resistance Levels</p>
                      <div className="msg-flexing-div">
                          <span className="discussion-category">Technical Analysis </span>
                          <span><RiMessageLine className="me-1" />24 Messages</span>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="discussion-item discussion-item-card mb-3 p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="discussion-content">
                      <div className="day-card circal-div bg-primary">
                        <h6>SC</h6>
                      </div>
                      <div>
                        <h5 className="discussion-author mb-1">Michael Rodriguez <div>7 hr year</div></h5>
                        <p className="discussion-topic mb-1">Risk Management Strategies for Beginners</p>
                        <div className="msg-flexing-div">
                          <span className="discussion-category">Risk Management</span>
                          <span><RiMessageLine className="me-1" />24 Messages</span>
                      </div> 
                      </div>
                    </div>
                  </div>
                </div>

                <div className="discussion-item discussion-item-card mb-3 p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="discussion-content">
                      <div className="day-card circal-div bg-primary">
                        <h6>SC</h6>
                      </div>
                      <div>
                        <h5 className="discussion-author mb-1">Priya Sharma <div>7 hr year</div></h5>
                        <p className="discussion-topic mb-1">Analyzing Economic Indicators Impact</p>
                        <div className="msg-flexing-div">
                          <span className="discussion-category">Fundamental Analysis</span>
                          <span><RiMessageLine className="me-1" />24 Messages</span>
                      </div> 
                        <span className="discussion-category"></span>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="discussion-item discussion-item-card mb-3 p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="discussion-content">
                      <div className="day-card circal-div bg-primary">
                        <h6>SC</h6>
                      </div>
                      <div>
                        <h5 className="discussion-author mb-1">James Wilson <div>7 hr year</div></h5>
                        <p className="discussion-topic mb-1">Trading Psychology: Overcoming Fear</p>
                        <span className="discussion-category">Psychology</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="discussion-item discussion-item-card mb-3 p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="discussion-content">
                      <div className="day-card circal-div bg-primary">
                        <h6>SC</h6>
                      </div>
                      <div>
                        <h5 className="discussion-author mb-1">Aisha Mohammed <div>7 hr year</div></h5>
                        <p className="discussion-topic mb-1">Stock Market Sector Rotation Explained</p>
                        <span className="discussion-category">Stock Market</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Upcoming-Events">
        <div className="container">
          <h3 className="community-subtitle1 mb-3">Upcoming Events</h3>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="event-item mb-3 p-3 card border-bottom ">
                <div className="day-flesing-day">
                  <div className="day-card bg-primary">
                    <h6>15</h6>
                    <p>MAR</p>
                  </div>
                  <div>
                    <h5 className="event-title mb-2">Forex Market Structure Masterclass</h5>
                    <p className="event-time mb-1">6:00 PM - 8:00 PM EST</p>
                    <p className="event-instructor mb-2">Dr. Robert Chen</p>
                    <div className="event-registered">234 registered</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="event-item mb-3 p-3 card border-bottom ">
                <div className="day-flesing-day">
                  <div className="day-card bg-primary">
                    <h6>18</h6>
                    <p>MAR</p>
                  </div>
                  <div>
                    <h5 className="event-title mb-2">Stock Market Technical Analysis Workshop</h5>
                    <p className="event-time mb-1">7:00 PM - 9:00 PM EST</p>
                    <p className="event-instructor mb-2">Emily Thompson</p>
                    <div className="event-registered">189 registered</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="event-item mb-3 p-3 card border-bottom ">
                <div className="day-flesing-day">
                  <div className="day-card bg-primary">
                    <h6>22</h6>
                    <p>MAR</p>
                  </div>
                  <div>
                    <h5 className="event-title mb-2">Trading Psychology & Discipline</h5>
                    <p className="event-time mb-1">5:00 PM - 7:00 PM EST</p>
                    <p className="event-instructor mb-2">Dr. Sarah Williams</p>
                    <div className="event-registered">312 registered</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="event-item mb-3 p-3 card border-bottom ">
                <div className="day-flesing-day">
                  <div className="day-card bg-primary">
                    <h6>25</h6>
                    <p>MAR</p>
                  </div>
                  <div>
                    <h5 className="event-title mb-2">Risk Management Fundamentals</h5>
                    <p className="event-time mb-1">6:30 PM - 8:30 PM EST</p>
                    <p className="event-instructor mb-2">Michael Anderson</p>
                    <div className="event-registered">267 registered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Community-Guidelines">
        <div className="container">
          <h3 className="community-subtitle mb-3">Community Guidelines</h3>
          <p className="guidelines-subtitle mb-4 text-center">Maintaining a professional, educational environment</p>
          <div className="row justify-content-center">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <div className="guidelines-container">
                <div className="guideline-item d-flex mb-3">
                  <div className="guideline-icon me-3">
                    <RiBookOpenLine style={{fontSize: "1.5rem"}} />
                  </div>
                  <div>
                    <h5 className="guideline-title mb-1">Education-First:</h5>
                    <p className="guideline-text">All discussions must be educational in nature. No financial advice or specific investment recommendations.</p>
                  </div>
                </div>

                <div className="guideline-item d-flex mb-3">
                  <div className="guideline-icon me-3">
                    <FaHandshake style={{fontSize: "1.5rem"}} />
                  </div>
                  <div>
                    <h5 className="guideline-title mb-1">Respectful Dialogue:</h5>
                    <p className="guideline-text">Treat all members with respect. Constructive feedback and diverse perspectives are encouraged.</p>
                  </div>
                </div>

                <div className="guideline-item d-flex mb-3">
                  <div className="guideline-icon me-3">
                    <FaExclamationTriangle style={{fontSize: "1.5rem"}} />
                  </div>
                  <div>
                    <h5 className="guideline-title mb-1">No Guarantees:</h5>
                    <p className="guideline-text">Do not make claims about guaranteed returns, success rates, or trading performance.</p>
                  </div>
                </div>

                <div className="guideline-item d-flex mb-3">
                  <div className="guideline-icon me-3">
                    <FaStar style={{fontSize: "1.5rem"}} />
                  </div>
                  <div>
                    <h5 className="guideline-title mb-1">Quality Content:</h5>
                    <p className="guideline-text">Share well-researched analysis, credible sources, and thoughtful questions.</p>
                  </div>
                </div>

                <div className="guideline-item d-flex">
                  <div className="guideline-icon me-3">
                    <FaBirthdayCake style={{fontSize: "1.5rem"}} />
                  </div>
                  <div>
                    <h5 className="guideline-title mb-1">Age Requirement:</h5>
                    <p className="guideline-text">All community members must be 18 years or older.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="community-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h3 className="cta-title mb-3 text-white">Ready to Join Our Learning Community?</h3>
              <p className="cta-text mb-4">Connect with learners worldwide and accelerate your financial education</p>
              <a href="/pages/contact" className="btn btn-join-community py-3">
                <FaUserGraduate className="me-2" /> Get Started Today
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Section3);