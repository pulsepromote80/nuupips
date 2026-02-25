import { memo } from "react";
import { 
  FaBookOpen,
  FaChartLine, 
  FaGraduationCap,
  FaFileAlt, 
  FaClipboardCheck,
  FaShieldAlt,
  FaBrain,
  FaLongArrowAltRight ,
  FaCheckDouble
} from "react-icons/fa";
import { 
  RiBookOpenLine,
  RiShieldLine,
  RiMindMap, 
  RiMoneyDollarCircleLine,
  RiGlobalLine,
  RiLineChartLine,
  RiPieChartLine, 
  RiArrowUpLine
} from "react-icons/ri";
import { 
  PiGraph,
  PiCurrencyCircleDollar, 
  PiChartLineUp,
  PiBuildings, 
} from "react-icons/pi";

const Section1 = () => {
  return (
    <div className="fin-edu-container">
      {/* Hero Section */}
      <section className="hero-edu-section py-5">
        <div className="container">
          <div className="row justify-content-left">
            <div className="col-12 col-lg-12">
              <h1 className="hero-edu-title display-4 fw-bold mb-4">
                Financial Markets Education
              </h1>
              <p className="hero-edu-subtitle lead mb-0">
                Comprehensive, structured programs in Forex and Stock Market education.
                Learn technical analysis, risk management, and trading psychology from
                industry experts.
              </p>
              <div className="fin-edu-warning-badge1">
                <div className='d-flex align-items-center'>
           <FaBookOpen className="me-2 big-screen-hide" />
       Educational Purposes Only - No Financial Advice
           </div>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Feature Cards */}
      <section className="features-edu-section py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="feature-edu-card h-100 p-4">
                <div className="feature-edu-icon blue-edu-icon mb-3">
                  <RiArrowUpLine /> 
                </div>
                <h3 className="feature-edu-title h5 fw-bold mb-2">
                  Market Structure
                </h3>
                <p className="feature-edu-desc small mb-0">
                  Understand how the global foreign exchange market operates, major participants, and market sessions
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="feature-edu-card h-100 p-4">
                <div className="feature-edu-icon green-edu-icon mb-3">
                  <RiBookOpenLine /> 
                </div>
                <h3 className="feature-edu-title h5 fw-bold mb-2">
                  Technical Analysis
                </h3>
                <p className="feature-edu-desc small mb-0">
                  Master chart patterns, indicators, and price action strategies for market analysis
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="feature-edu-card h-100 p-4">
                <div className="feature-edu-icon purple-edu-icon mb-3">
                   <FaShieldAlt /> 
                </div>
                <h3 className="feature-edu-title h5 fw-bold mb-2">
                  Risk Management
                </h3>
                <p className="feature-edu-desc small mb-0">
                  Essential strategies to protect your capital and manage trading risks effectively
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="feature-edu-card h-100 p-4">
                <div className="feature-edu-icon amber-edu-icon mb-3">
                  <FaBrain /> 
                </div>
                <h3 className="feature-edu-title h5 fw-bold mb-2">
                  Trading Psychology
                </h3>
                <p className="feature-edu-desc small mb-0">
                  Develop the mental discipline and emotional control required for consistent trading
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forex Education Section */}
      <section className="section-edu-container py-5">
        <div className="container">
          <div className="section-edu-header text-center mb-5">
            <h2 className="section-edu-title blue-edu-title display-5 fw-bold">
              Forex Education
            </h2>
            <p className="section-edu-desc lead mb-0">
              Detailed modules covering every aspect of currency trading from
              basics to advanced strategies.
            </p>
          </div>
          <div className="row g-4">
            {forexModules.map((module, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="education-edu-card blue-edu-card h-100 p-4">
                  <div className="card-edu-icon blue-edu-card-icon mb-3"> 
                    {module.icon}
                  </div>
                  <h3 className="card-edu-title h5 fw-bold mb-3">{module.title}</h3>
                  <ul className="card-edu-list list-unstyled mb-0">
                    {module.points.map((point, i) => (
                      <li key={i} className="card-edu-list-item mb-2">
                        <span className="list-edu-bullet blue-edu-bullet me-2">▪</span> {point}
                      </li>
                    ))}
                  </ul>
                  <a class="text-blue-600 font-semibold hover:text-blue-700 transition-colors" href="/pages/videos" data-discover="true">Start Learning →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stock Market Education Section */}
      <section className="section-edu-container py-5">
        <div className="container">
          <div className="section-edu-header text-center mb-5">
            <h2 className="section-edu-title green-edu-title display-5 fw-bold mb-3">
              Stock Market Education
            </h2>
            <p className="section-edu-desc lead mb-0">
              Build expertise in equity markets and investment analysis.
            </p>
          </div>
          <div className="row g-4">
            {stockModules.map((module, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="education-edu-card green-edu-card h-100 p-4">
                  <div className="card-edu-icon green-edu-card-icon mb-3">
             
                    {module.icon}
                  </div>
                  <h3 className="card-edu-title h5 fw-bold mb-3">{module.title}</h3>
                  <ul className="card-edu-list list-unstyled mb-0">
                    {module.points.map((point, i) => (
                      <li key={i} className="card-edu-list-item mb-2">
                        <span className="list-edu-bullet green-edu-bullet me-2">▪</span> {point}
                      </li>
                    ))}
                  </ul>
                  <a class="text-bullet-600 font-semibold hover:text-bullet-700 transition-colors" href="/pages/videos" data-discover="true">Start Learning →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Approach Section */}
      <section className="section-edu-container py-5">
        <div className="container">
          <div className="section-edu-header text-center mb-5">
            <h2 className="section-edu-title display-5 fw-bold mb-3">
              Our Educational Approach
            </h2>
            <p className="section-edu-desc lead mb-0">
              Structured, systematic learning designed for long-term skill development.
            </p>
          </div>
          <div className="row g-4">
            {approachSteps.map((step, index) => (
              <div key={index} className="col-12 col-md-4">
                <div className="approach-edu-card h-100 p-4 text-center">
                  <div className="step-edu-number display-1 fw-bold mb-3">{step.number}</div>
                   
                  <h3 className="approach-edu-title h4 fw-bold mb-3"> {step.icon} {step.title}</h3>
                  <p className="approach-edu-desc mb-0">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Journey Section */}
      <section className="journey-edu-section py-5">
        <div className="container">
          <div className="journey-edu-header text-center mb-5">
            <h2 className="journey-edu-title display-5 fw-bold mb-0 text-white">
              Your Learning Journey
            </h2>
          </div>
          <div className="row g-4">
            {journeySteps.map((step, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-3">
                <div className="journey-edu-card h-100 p-4">
                  <div className="journey-edu-step display-6 fw-bold mb-2">{step.step}</div>
                   
                  <h3 className="journey-edu-step-title h5 fw-bold mb-2 text-white">{step.title} {step.icon}</h3>
                  <p className="journey-edu-step-desc mb-0">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-edu-section py-5">
        <div className="container">
          <div className="cta-edu-content text-center">
            <h2 className="cta-edu-title display-5 fw-bold mb-4">
              Ready to Start Learning?
            </h2>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <a href="/pages/contact" className="cta-edu-btn cta-edu-btn-primary btn btn-lg px-4 py-3 justify-center">
                <FaGraduationCap className="me-2" /> Enroll Now
              </a>
              <a href="/pages/contact" className="cta-edu-btn cta-edu-btn-secondary btn btn-lg px-4 py-3 justify-center">
                <FaFileAlt className="me-2" /> View Curriculum
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Data arrays with icons
const forexModules = [
  {
    title: "Market Structure",
    points: ["Major participants", "Trading sessions", "Liquidity concepts", "Market makers vs FCN"],
    icon: <RiGlobalLine fill="blue" style={{fontSize: '1.5rem'}} />
  },
  {
    title: "Currency Pairs",
    points: ["Major pairs", "Cross pairs", "Exotic pairs", "Correlation analysis"],
    icon: <PiCurrencyCircleDollar fill="blue" style={{fontSize: '1.5rem'}} />
  },
  {
    title: "Technical Analysis",
    points: ["Chart patterns", "Indicators", "Price action", "Support & resistance"],
    icon: <FaChartLine fill="blue" style={{fontSize: '1.5rem'}} />
  },
  {
    title: "Risk Management",
    points: ["Position sizing", "Stop loss strategies", "Risk-reward ratios", "Portfolio management"],
    icon: <RiShieldLine fill="blue" style={{fontSize: '1.5rem'}} />
  },
  {
    title: "Trading Psychology",
    points: ["Emotional control", "Discipline", "Trading mindset", "Behavioral patterns"],
    icon: <RiMindMap fill="blue" style={{fontSize: '1.5rem'}} />
  },
  {
    title: "Market Analysis",
    points: ["Economic indicators", "News trading", "Fundamental analysis", "Market sentiment"],
    icon: <PiGraph fill="blue" style={{fontSize: '1.5rem'}} />
  }
];

const stockModules = [
  {
    title: "Equity Basics",
    points: ["Stock types", "Market mechanics", "Order types", "Trading hours"],
    icon: <RiMoneyDollarCircleLine fill="#065f46" style={{fontSize: '1.5rem'}} />
  },
  {
    title: "Fundamental Analysis",
    points: ["Financial ratios", "Balance sheets", "Income statements", "Cash flow analysis"],
    icon: <PiBuildings fill="#065f46" style={{fontSize: '1.5rem'}} />
  },
  {
    title: "Chart Reading",
    points: ["Candlestick patterns", "Trend analysis", "Volume indicators", "Moving averages"],
    icon: <RiLineChartLine fill="#065f46" style={{fontSize: '1.5rem'}} />
  },
  {
    title: "Portfolio Concepts",
    points: ["Diversification", "Asset allocation", "Rebalancing", "Portfolio theory"],
    icon: <RiPieChartLine fill="#065f46" style={{fontSize: '1.5rem'}} />
  },
  {
    title: "Market Cycles",
    points: ["Bull markets", "Bear markets", "Economic indicators", "Sector rotation"],
    icon: <PiChartLineUp fill="#065f46" style={{fontSize: '1.5rem'}} />
  },
  {
    title: "Investment Research",
    points: ["Company analysis", "Industry research", "Competitive analysis", "Risk assessment"],
    icon: <FaClipboardCheck fill="#065f46" style={{fontSize: '1.5rem'}} />
  }
];

const approachSteps = [
  {
    number: "01",
    title: "Foundation Building",
    description: "Start with core concepts, market mechanics, and fundamental principles before advancing to complex strategies" 
  },
  {
    number: "02",
    title: "Practical Application",
    description: "Learn through real-world case studies, chart analysis exercises, and systematic frameworks" 
  },
  {
    number: "03",
    title: "Continuous Learning",
    description: "Ongoing education with market updates, advanced concepts, and community-driven knowledge sharing" 
  }
];

const journeySteps = [
  {
    step: "01",
    title: "Foundation",
    description: "Basic concepts and terminology",
    icon: <FaLongArrowAltRight />
  },
  {
    step: "02",
    title: "Analysis",
    description: "Technical and fundamental skills",
    icon: <FaLongArrowAltRight />
  },
  {
    step: "03",
    title: "Strategy",
    description: "Develop trading approaches",
    icon:<FaLongArrowAltRight />
  },
  {
    step: "04",
    title: "Psychology",
    description: "Master emotional discipline",
    icon:<FaCheckDouble />
  }
];

export default memo(Section1);