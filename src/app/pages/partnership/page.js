"use client";

import { memo, useState } from "react";
import Image from 'next/image';
import { 
  FaBookOpen,
  FaChalkboardTeacher,
  FaCertificate,
  FaUsers,
  FaGraduationCap,
  FaHandshake,
  FaClipboardCheck,
  FaUserTie,
  FaFileAlt,
  FaCalendarAlt,
  FaCogs,
  FaLightbulb,
  FaEnvelope,
  FaCheck,
  FaChevronDown,
  FaUniversity,
  FaChartLine,
  FaUsersCog,
  FaLayerGroup,
  FaUserCheck,
  FaBullhorn,
  FaArrowRight
} from "react-icons/fa";
import { 
  RiBookOpenLine,
  RiShieldLine,
  RiCommunityLine,
  RiFileList3Line,
  RiMailLine,
  RiCheckboxCircleFill,
  RiArrowRightLine
} from "react-icons/ri";

const Section2 = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What types of institutions are eligible for the partnership?",
      answer: "We partner with accredited educational institutions including universities, colleges, vocational schools, and professional training centers. Both public and private institutions are welcome to apply."
    },
    {
      question: "Is there any cost associated with the partnership program?",
      answer: "The partnership program is designed to be accessible. While some premium features may have associated costs, the basic partnership including curriculum materials and consultation is available at no cost for qualified institutions."
    },
    {
      question: "How long does the partnership approval process take?",
      answer: "The approval process typically takes 2-4 weeks from application submission. This includes review of your institution's credentials, consultation calls, and program customization discussions."
    },
    {
      question: "Can we customize the curriculum for our specific needs?",
      answer: "Yes, absolutely! One of the key benefits of our partnership is the ability to customize the curriculum to match your institution's specific requirements, student demographics, and educational objectives."
    },
    {
      question: "What support is provided for faculty training?",
      answer: "We provide comprehensive faculty training including workshops, teaching materials, ongoing mentorship, and access to our educator community. Training can be conducted online or in-person at your institution."
    },
    {
      question: "Are the certifications recognized internationally?",
      answer: "Yes, our certification programs are recognized globally and can add significant value to your students' credentials, enhancing their career prospects in financial markets."
    }
  ];

  return (
    <div className="academy-partnership-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="row">
              <div className="col-md-6">
                <h1 className="hero-title1 text-dark">Academy Partnership Program</h1>
                <p className="hero-description text-gray">
                  Partner with NUPIPS to bring world-class financial markets education to your institution.
                  Co-branded programs, certified curricula, and comprehensive support.  Co-branded programs, certified curricula, and comprehensive support.
                </p>
                <a className="apply-button" href="/pages/contact">
                  Apply for Partnership   <FaHandshake className="me-2" />
                </a>
              </div>
              <div className="col-md-6">
                <div className="hero-visual mt-3">
                 
                      <Image
                        src="/assets/img/partnership-img.png"
                        alt="Partnership"
                        className="partneship-banner-img"
                        width={600}
                        height={300}
                      />
                    </div> 
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Partnership Benefits */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title acording-m">Partnership Benefits</h2>
            <p className="section-subtitle">
              Comprehensive support for integrating financial education into your curriculum
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">
                <FaUniversity style={{color: "#2563EB", fontSize: "2rem"}} />
              </div>
              <h3 className="benefit-title">Co-Branded Educational Programs</h3>
              <p className="benefit-description">
                Develop custom financial education curricula tailored to your institution's needs and student demographics.
              </p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <FaChartLine style={{color: "#2563EB", fontSize: "2rem"}} />
              </div>
              <h3 className="benefit-title">Curriculum Integration Support</h3>
              <p className="benefit-description">
                Comprehensive materials, lesson plans, and teaching resources for seamless integration into existing programs.
              </p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <FaCertificate style={{color: "#2563EB", fontSize: "2rem"}} />
              </div>
              <h3 className="benefit-title">Certified Education Programs</h3>
              <p className="benefit-description">
                Offer recognized certification programs to your students upon completion of structured learning modules.
              </p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <FaUsersCog style={{color: "#2563EB", fontSize: "2rem"}} />
              </div>
              <h3 className="benefit-title">Faculty Training & Development</h3>
              <p className="benefit-description">
                Professional development sessions for your educators on financial markets education best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="included-section">
        <div className="container">
          <div className="included-wrapper"> 
                <Image
                  src="/assets/img/Included-img.png"
                  alt="Partnership"
                  width={800}
                  height={600}
                /> 
            <div className="included-list">
              <h3 className="section-title-left">What's Included</h3>

              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-check">
                    <RiCheckboxCircleFill style={{color: "#10B981", fontSize: "1.25rem"}} />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">Structured Curriculum</h4>
                    <p className="feature-description">
                      Complete course materials covering Forex, stock markets, risk management, and trading psychology
                    </p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-check">
                    <RiCheckboxCircleFill style={{color: "#10B981", fontSize: "1.25rem"}} />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">Teaching Resources</h4>
                    <p className="feature-description">
                      Lesson plans, presentation slides, case studies, and assessment materials
                    </p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-check">
                    <RiCheckboxCircleFill style={{color: "#10B981", fontSize: "1.25rem"}} />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">Certification Programs</h4>
                    <p className="feature-description">
                      Recognized certificates for students completing structured learning modules
                    </p>
                  </div>
                </div>
  
 
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="eligibility-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Eligibility Criteria</h2>
            <p className="section-subtitle">
              We partner with accredited institutions committed to quality education
            </p>
          </div>

          <div className="eligibility-cards">
            <div className="eligibility-card">
              <h3 className="eligibility-card-title">Institutional Requirements</h3>
              <ul className="criteria-list">
                <li>
                  <div className="bullet-icon">
                    <FaCheck style={{color: "#10B981"}} />
                  </div>
                  <span>Accredited educational institution</span>
                </li>
                <li>
                  <div className="bullet-icon">
                    <FaCheck style={{color: "#10B981"}} />
                  </div>
                  <span>Minimum 50 students enrolled</span>
                </li>
                <li>
                  <div className="bullet-icon">
                    <FaCheck style={{color: "#10B981"}} />
                  </div>
                  <span>Dedicated faculty for program delivery</span>
                </li>
                <li>
                  <div className="bullet-icon">
                    <FaCheck style={{color: "#10B981"}} />
                  </div>
                  <span>Compliance with local education regulations</span>
                </li>
              </ul>
            </div>

            <div className="eligibility-card">
              <h3 className="eligibility-card-title">Program Alignment</h3>
              <ul className="criteria-list">
                <li>
                  <div className="bullet-icon">
                    <FaCheck style={{color: "#10B981"}} />
                  </div>
                  <span>Focus on education, not trading services</span>
                </li>
                <li>
                  <div className="bullet-icon">
                    <FaCheck style={{color: "#10B981"}} />
                  </div>
                  <span>Commitment to ethical teaching practices</span>
                </li>
                <li>
                  <div className="bullet-icon">
                    <FaCheck style={{color: "#10B981"}} />
                  </div>
                  <span>Age restriction enforcement (18+)</span>
                </li>
                <li>
                  <div className="bullet-icon">
                    <FaCheck style={{color: "#10B981"}} />
                  </div>
                  <span>Clear disclaimer and compliance messaging</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Application Process</h2>
            <p className="section-subtitle">
              Simple, streamlined partnership application
            </p>
          </div>

          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content"> 
                <h4 className="step-title">Submit Application</h4>
                <p className="step-description">
                  Complete the partnership inquiry form with institutional details and program requirements.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content"> 
                <h4 className="step-title">Initial Consultation</h4>
                <p className="step-description">
                  Meet with our partnership team to discuss your needs, goals, and curriculum integration.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content"> 
                <h4 className="step-title">Program Customization</h4>
                <p className="step-description">
                  Work together to customize curriculum, materials, and certification programs for your institution.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content"> 
                <h4 className="step-title">Launch & Support</h4>
                <p className="step-description">
                  Faculty training, materials delivery, and ongoing support as you launch the program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Find answers to common questions about our partnership program
            </p>
          </div>

          <div className="faq-container">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                  <div className="faq-icon">
                    <FaChevronDown style={{color: "#2563EB", transform: activeFaq === index ? 'rotate(180deg)' : 'rotate(0deg)'}} />
                  </div>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-footer">
            <p className="faq-contact-text">
              Still have questions? Contact our partnership team at{" "}
              <a href="mailto:partnerships@nupips.com" className="faq-contact-link">
               partnerships@nupips.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title text-white">Ready to Transform Financial Education at Your Institution?</h2>
            <p className="cta-description">
              Join hundreds of institutions worldwide who are already partnering with NUPIPS
              to provide cutting-edge financial markets education.
            </p>
            <a href="/pages/partnership" className="cta-button">
              Start Your Partnership Application Today <FaArrowRight className="ms-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Section2);