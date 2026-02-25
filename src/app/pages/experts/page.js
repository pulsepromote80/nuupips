import { memo } from "react"; 
import { 
  FaChartLine,
  FaUniversity,
  FaShieldAlt,
  FaBrain,
  FaUserGraduate,
  FaAward,
  FaChartBar,
  FaBullseye,
  FaQuoteLeft,
  FaGraduationCap,
  FaMoneyBillWave,
  FaArrowRight,
  FaUsers,
  FaClock,
  FaFlask,
  FaBalanceScale,
  FaHandshake,
  FaComments,
  FaCheckCircle
} from "react-icons/fa";
import { 
  RiBookOpenLine,
  RiUserLine,
  RiMedalLine,
  RiShieldLine,
  RiLightbulbLine,
  RiCheckboxCircleFill,
  RiArrowRightLine
} from "react-icons/ri";
import { 
  PiCertificate,
  PiBuildings,
  PiChartLineUp,
  PiPlant,
  PiStrategy
} from "react-icons/pi";

const Section4 = () => {
  return (
    <section className="finance-education-section1">
            <section className="contactus-hero">
          <div className="contactus-container">
            <h1 className="contactus-main-title"> Meet Our Expert Educators</h1>
            <p className="contactus-hero-desc">
             Learn from verified professionals with decades of combined experience in financial markets, 
            technical analysis, risk management, and behavioral finance.
            </p>
          </div>
        </section>

      <div className="container"> 
        {/* Educator Cards Grid */}
        <div className="row g-4 mt-5">
          {/* Dr. Michael Chen */}
          <div className="col-lg-6">
            <div className="educator-card">
              <div className="row g-4">
                <div className="col-md-2 text-center">
                  <div className="profile-image-container">
                    <div className="profile-image bg-primary-gradient">
                      <FaChartLine className="profile-icon" />
                    </div>
                     
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="d-flex justify-content-between align-items-start flex-wrap ">
                    <div>
                      <h3 className="educator-name">Dr. Michael Chen</h3>
                      <p className="educator-role">Senior Forex Educator</p>
                    </div>
                    <span className="experience-badge">15+ Years</span>
                  </div>
                  
                  <div className="credentials text-dark mb-3">
                    <span className="credential-tag"><FaUserGraduate className="me-1" /> PhD</span>
                    <span className="credential-tag"><FaAward className="me-1" /> CFA</span>
                    <span className="credential-tag"><FaChartBar className="me-1" /> CMT</span>
                  </div>
                  
                  <div className="specialization-card mb-3">
                    <h6><FaBullseye className="text-primary me-2" /> Specialization</h6>
                    <p className="mb-0 text-dark">Currency Markets & Technical Analysis</p>
                  </div>
                  
                  <p className="educator-description">
                    <FaQuoteLeft className="text-primary me-2" />
                    Specialized in forex market structure, technical analysis methodologies, 
                    and risk management strategies for currency trading.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sarah Johnson */}
          <div className="col-lg-6">
            <div className="educator-card">
              <div className="row g-4">
                <div className="col-md-2 text-center">
                  <div className="profile-image-container">
                    <div className="profile-image bg-success-gradient">
                      <FaUniversity className="profile-icon" />
                    </div>
                    
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="d-flex justify-content-between align-items-start flex-wrap ">
                    <div>
                      <h3 className="educator-name">Sarah Johnson</h3>
                      <p className="educator-role">Stock Market Analyst</p>
                    </div>
                    <span className="experience-badge">12+ Years</span>
                  </div>
                  
                  <div className="credentials mb-3">
                    <span className="credential-tag"><FaGraduationCap className="me-1" /> MBA</span>
                    <span className="credential-tag"><FaAward className="me-1" /> CFA Level III</span>
                  </div>
                  
                  <div className="specialization-card mb-3">
                    <h6><FaBullseye className="text-primary me-2" /> Specialization</h6>
                    <p className="mb-0 text-dark">Equity Analysis & Fundamental Research</p>
                  </div>
                  
                  <p className="educator-description">
                    <FaQuoteLeft className="text-primary me-2" />
                    Expert in fundamental analysis, portfolio management concepts, 
                    and equity market cycles with focus on long-term value investing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* David Martinez */}
          <div className="col-lg-6">
            <div className="educator-card">
              <div className="row g-4">
                <div className="col-md-2 text-center">
                  <div className="profile-image-container">
                    <div className="profile-image bg-danger-gradient">
                      <FaShieldAlt className="profile-icon" />
                    </div>
                   
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="d-flex justify-content-between align-items-start flex-wrap ">
                    <div>
                      <h3 className="educator-name">David Martinez</h3>
                      <p className="educator-role">Risk Management Specialist</p>
                    </div>
                    <span className="experience-badge">10+ Years</span>
                  </div>
                  
                  <div className="credentials mb-3">
                    <span className="credential-tag"><FaUserGraduate className="me-1" /> MSc</span>
                    <span className="credential-tag"><FaShieldAlt className="me-1" /> FRM</span>
                  </div>
                  
                  <div className="specialization-card mb-3">
                    <h6><FaBullseye className="text-primary me-2" /> Specialization</h6>
                    <p className="mb-0 text-dark">Trading Psychology & Risk Control</p>
                  </div>
                  
                  <p className="educator-description">
                    <FaQuoteLeft className="text-primary me-2" />
                    Focuses on behavioral finance, trading psychology, position sizing, 
                    and systematic risk management approaches.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prof. Lisa Anderson */}
          <div className="col-lg-6">
            <div className="educator-card">
              <div className="row g-4">
                <div className="col-md-2 text-center">
                  <div className="profile-image-container">
                    <div className="profile-image bg-warning-gradient">
                      <FaBrain className="profile-icon" />
                    </div>
                     
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="d-flex justify-content-between align-items-start flex-wrap ">
                    <div>
                      <h3 className="educator-name">Prof. Lisa Anderson</h3>
                      <p className="educator-role">Behavioral Finance Expert</p>
                    </div>
                    <span className="experience-badge">18+ Years</span>
                  </div>
                  
                  <div className="credentials mb-3">
                    <span className="credential-tag"><FaUserGraduate className="me-1" /> PhD</span>
                    <span className="credential-tag"><FaBrain className="me-1" /> Behavioral Econ</span>
                  </div>
                  
                  <div className="specialization-card mb-3">
                    <h6><FaBullseye className="text-primary me-2" /> Specialization</h6>
                    <p className="mb-0 text-dark">Market Psychology & Decision Making</p>
                  </div>
                  
                  <p className="educator-description">
                    <FaQuoteLeft className="text-primary me-2" />
                    Research-focused educator specializing in cognitive biases, emotional control, 
                    and decision-making frameworks in financial markets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Areas of Expertise Section */}
      <div className="expertise-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title mt-0">
              Our <span className="text-highlight bg-dark">Areas of Expertise</span>
            </h2>
            <p className="section-subtitle">
              Our faculty covers all essential aspects of financial markets education.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="expertise-card">
                <div className="expertise-icon bg-primary-gradient">
                  <FaMoneyBillWave className="text-white" />
                </div>
                <h4 className="expertise-title">Currency Markets</h4>
                <p className="expertise-description">
                  Forex fundamentals, pair analysis, and market structure
                </p>
                <a href="/pages/videos" className="expertise-footer">
                  <RiArrowRightLine className="me-2" /> Learn More
                </a>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="expertise-card">
                <div className="expertise-icon bg-success-gradient">
                  <FaChartLine className="text-white" />
                </div>
                <h4 className="expertise-title">Equity Analysis</h4>
                <p className="expertise-description">
                  Stock market fundamentals and valuation methods
                </p>
                <a href="/pages/videos" className="expertise-footer">
                  <RiArrowRightLine className="me-2" /> Learn More
                </a>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="expertise-card">
                <div className="expertise-icon bg-danger-gradient">
                  <FaShieldAlt className="text-white" />
                </div>
                <h4 className="expertise-title">Risk Control</h4>
                <p className="expertise-description">
                  Position sizing, portfolio risk, and money management
                </p>
                <a href="/pages/videos" className="expertise-footer">
                  <RiArrowRightLine className="me-2" /> Learn More
                </a>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="expertise-card">
                <div className="expertise-icon bg-warning-gradient">
                  <FaBrain className="text-white" />
                </div>
                <h4 className="expertise-title">Psychology</h4>
                <p className="expertise-description">
                  Behavioral finance and emotional discipline
                </p>
                <a href="/pages/videos" className="expertise-footer">
                  <RiArrowRightLine className="me-2" /> Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Credentials Section */}
      <div className="container my-5 py-5">
        <div className="text-center mb-5">
          <h2 className="section-title">
            Professional <span className="text-highlight text-dark bg-dark">Credentials</span>
          </h2>
          <p className="section-subtitle">
            Our educators hold recognized industry certifications and advanced degrees.
          </p>
        </div>

        <div className="row g-4">
          {[
            { title: "CFA", description: "Chartered Financial Analyst", icon: FaAward, color: "primary" },
            { title: "CMT", description: "Chartered Market Technician", icon: FaChartBar, color: "success" },
            { title: "FRM", description: "Financial Risk Manager", icon: FaShieldAlt, color: "danger" },
            { title: "PhD", description: "Economics & Finance", icon: FaUserGraduate, color: "warning" },
            { title: "MBA", description: "Finance & Analytics", icon: FaGraduationCap, color: "info" },
            { title: "MSc", description: "Financial Engineering", icon: PiCertificate, color: "purple" }
          ].map((credential, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className={`credential-card credential-${credential.color}`}>
                <div className="credential-icon">
                  <credential.icon />
                </div>
                <h4 className="credential-title">{credential.title}</h4>
                <p className="credential-description">{credential.description}</p>
                <div className="credential-stats">
                  <span><FaUsers className="me-1" /> 95% Pass Rate</span>
                  <span><FaClock className="me-1" /> 2+ Years</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teaching Philosophy Section - Modified */}
      <div className="teaching-philosophy-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title text-white">
              Our <span className="text-highlight-white">Teaching Philosophy</span>
            </h2>
            <p className="section-subtitle text-white">
              Building a foundation of knowledge, ethics, and practical skills for sustainable success
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4">
              <div className="philosophy-card-large">
                <div className="philosophy-icon-large bg-primary-gradient">
                  <FaGraduationCap className="text-white" />
                </div>
                <h3 className="philosophy-title-large">Education Over Profits</h3>
                <p className="philosophy-description-large">
                  We focus exclusively on education and skill development, never on guaranteed returns 
                  or get-rich-quick promises. Our goal is to build informed, disciplined learners who 
                  understand both opportunities and risks in financial markets.
                </p>
                <div className="philosophy-highlights">
                  <div className="highlight-item">
                    <RiCheckboxCircleFill className="text-success me-2" />
                    <span>Focus on skill development</span>
                  </div>
                  <div className="highlight-item">
                    <RiCheckboxCircleFill className="text-success me-2" />
                    <span>No false promises of returns</span>
                  </div>
                  <div className="highlight-item">
                    <RiCheckboxCircleFill className="text-success me-2" />
                    <span>Risk-aware learning approach</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="philosophy-card-large">
                <div className="philosophy-icon-large bg-success-gradient">
                  <FaFlask className="text-white" />
                </div>
                <h3 className="philosophy-title-large">Research-Backed Methods</h3>
                <p className="philosophy-description-large">
                  Our teaching approaches are grounded in academic research, market history, 
                  and proven analytical frameworks. We emphasize systematic thinking over 
                  emotional reactions to build sustainable trading strategies.
                </p>
                <div className="philosophy-highlights">
                  <div className="highlight-item">
                    <RiCheckboxCircleFill className="text-success me-2" />
                    <span>Academic research based</span>
                  </div>
                  <div className="highlight-item">
                    <RiCheckboxCircleFill className="text-success me-2" />
                    <span>Market history analysis</span>
                  </div>
                  <div className="highlight-item">
                    <RiCheckboxCircleFill className="text-success me-2" />
                    <span>Systematic thinking focus</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="philosophy-card-large">
                <div className="philosophy-icon-large bg-danger-gradient">
                  <FaBalanceScale className="text-white" />
                </div>
                <h3 className="philosophy-title-large">Ethics & Compliance First</h3>
                <p className="philosophy-description-large">
                  Every course emphasizes regulatory compliance, ethical considerations, 
                  and responsible market participation. We maintain the highest standards 
                  of educational integrity and professional conduct.
                </p>
                <div className="philosophy-highlights">
                  <div className="highlight-item">
                    <RiCheckboxCircleFill className="text-success me-2" />
                    <span>Regulatory compliance focus</span>
                  </div>
                  <div className="highlight-item">
                    <RiCheckboxCircleFill className="text-success me-2" />
                    <span>Highest ethical standards</span>
                  </div>
                  <div className="highlight-item">
                    <RiCheckboxCircleFill className="text-success me-2" />
                    <span>Market integrity education</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="teaching-principles mt-5">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="principle-item">
                  <FaHandshake className="principle-icon" />
                  <div>
                    <h5>Practical Application Focus</h5>
                    <p>Real-world scenarios and case studies integrated into all courses</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="principle-item">
                  <FaUsers className="principle-icon" />
                  <div>
                    <h5>Lifetime Learning Support</h5>
                    <p>Continuous education updates and community access for all alumni</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="principle-item">
                  <FaChartLine className="principle-icon" />
                  <div>
                    <h5>Performance Tracking</h5>
                    <p>Regular assessments and progress tracking for measurable growth</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="principle-item">
                  <FaComments className="principle-icon" />
                  <div>
                    <h5>Interactive Learning</h5>
                    <p>Live sessions, Q&A forums, and peer discussions for active learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Section4);