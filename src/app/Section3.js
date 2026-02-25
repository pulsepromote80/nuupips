import { memo } from "react";

const Section3 = () => {
  return ( 
    <div className="community-learn-section"> 
          <section className="hero-edu-section py-5">
        <div className="container">
          <div className="row justify-content-left">
            <div className="col-12 col-lg-12">
              <h1 className="hero-edu-title display-4 fw-bold mb-4">
               Learn Together, Grow Together
              </h1>
              <p className="hero-edu-subtitle lead mb-0">
                  Join a global community of learners exploring financial markets through collaborative education, peer discussions, and shared knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Community Features */}
      <section className="community-features-block">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12">
              <h2 className="features-section-title">Community Features</h2>
              <p className="features-section-desc">
                Engage with fellow learners and educators through multiple channels
              </p>
            </div>
          </div>

          <div className="row">
            {/* Discussion Groups */}
            <div className="col-12 mb-4">
              <div className="feature-detail-card">
                <h3 className="feature-item-title">Discussion Groups</h3>
                <p className="feature-item-text">
                  Join peer-led study groups focused on specific topics like foreign exchange, technical analysis, or risk management.
                </p>
              </div>
            </div>

            {/* Live Educational Sessions */}
            <div className="col-12 mb-4">
              <div className="feature-detail-card">
                <h3 className="feature-item-title">Live Educational Sessions</h3>
                <p className="feature-item-text">
                  Participate in scheduled learning sessions with our expert educators covering market analysis and trading concepts.
                </p>
              </div>
            </div>

            {/* Market Analysis Case Studies */}
            <div className="col-12 mb-4">
              <div className="feature-detail-card">
                <h3 className="feature-item-title">Market Analysis Case Studies</h3>
                <p className="feature-item-text">
                  Review real-world market scenarios and learn analytical frameworks through simulated case studies.
                </p>
              </div>
            </div>

            {/* Weekly Market Updates */}
            <div className="col-12 mb-4">
              <div className="feature-detail-card">
                <h3 className="feature-item-title">Weekly Market Updates</h3>
                <p className="feature-item-text">
                  Educational content on current market conditions, economic events, and their impact on financial markets.
                </p>
              </div>
            </div>

            {/* Peer Learning Programs */}
            <div className="col-12">
              <div className="feature-detail-card">
                <h3 className="feature-item-title">Peer Learning Programs</h3>
                <p className="feature-item-text">
                  Connect with fellow learners across similar skill levels to collaborate and share insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Community Learning */}
      <section className="structured-community-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="structured-main-title">Structured Community Learning</h2>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12 col-md-6">
              <div className="learning-step-card mb-3">
                <div className="step-header">
                  <span className="step-badge">1</span>
                  <h3 className="step-title">Join Study Groups</h3>
                </div>
                <p className="step-description">
                  Connect with peers on your skill level focusing on specific topics like technical analysis or risk management.
                </p>
              </div>

              <div className="learning-step-card mb-3">
                <div className="step-header">
                  <span className="step-badge">2</span>
                  <h3 className="step-title">Attend Live Sessions</h3>
                </div>
                <p className="step-description">
                  Participate in scheduled educational webinars with expert instructors sharing market trends and strategies.
                </p>
              </div>

              <div className="learning-step-card mb-3">
                <div className="step-header">
                  <span className="step-badge">3</span>
                  <h3 className="step-title">Share & Learn</h3>
                </div>
                <p className="step-description">
                  Discuss market data, share analyses, and learn from diverse perspectives in a supportive environment.
                </p>
              </div>

              <div className="learning-step-card">
                <div className="step-header">
                  <span className="step-badge">4</span>
                  <h3 className="step-title">Track Your Progress</h3>
                </div>
                <p className="step-description">
                  Build your knowledge systematically with structured learning paths and tailored feedback.
                </p>
              </div>
            </div>

            {/* Community Stats Table */}
            <div className="col-12 col-md-6">
              <div className="community-stats-wrapper">
                <h3 className="stats-table-title">Our Growing Community</h3>
                <div className="table-responsive">
                  <table className="community-stats-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Active Learners</th>
                        <th>Daily Discussions</th>
                        <th>Weekly Sessions</th>
                        <th>Expert Educators</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>15,000+</strong></td>
                        <td>500+</td>
                        <td>200+</td>
                        <td>50+</td>
                        <td>50+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Recent Discussions */}
      <section className="recent-discussions-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="discussions-section-title">Recent Discussions</h2>
            </div>
          </div>

          <div className="row mt-4">
            {recentDiscussions.map((discussion, index) => (
              <div key={index} className="col-12 mb-3">
                <div className="discussion-item-card">
                  <div className="discussion-header">
                    <h4 className="discussion-author-name">{discussion.author}</h4>
                    <span className="discussion-meta">
                      {discussion.category}: 📊 {discussion.messages} messages
                    </span>
                  </div>
                  <p className="discussion-topic-text">{discussion.topic}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="upcoming-events-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="events-section-title">Upcoming Events</h2>
            </div>
          </div>

          <div className="row mt-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="col-12 mb-3">
                <div className="event-item-card">
                  <div className="event-header">
                    <h4 className="event-name">{event.title}</h4>
                    <span className="event-days">{event.days} days</span>
                  </div>
                  <div className="event-details">
                    <div className="event-schedule">
                      <span className="event-icon">📅</span>
                      <span className="event-time">{event.schedule}</span>
                    </div>
                    {event.subtitle && (
                      <div className="event-subtitle">
                        <span className="event-icon">📄</span>
                        <span className="event-subject">{event.subtitle}</span>
                      </div>
                    )}
                    <div className="event-duration">
                      <span className="event-icon">⏰</span>
                      <span className="event-hours">{event.duration} hours</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Community Guidelines */}
      <section className="guidelines-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="guidelines-main-title">Community Guidelines</h2>
              <p className="guidelines-subtitle">
                Maintaining a professional, educational environment
              </p>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="guidelines-list">
                {communityGuidelines.map((guideline, index) => (
                  <div key={index} className="guideline-item">
                    <div className="guideline-point">
                      <strong>{guideline.title}:</strong> {guideline.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="community-join-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="join-section-title">Ready to Join Our Learning Community?</h2>
              <p className="join-section-text">
                Connect with learners worldwide and accelerate your financial education
              </p>
            </div>
          </div>
        </div>
      </section>
    </div> 
  );
};

// Data arrays
const recentDiscussions = [
  {
    author: "Sarah Chen",
    topic: "Understanding Support and Resistance Levels",
    category: "Technical Analysis",
    messages: "20"
  },
  {
    author: "Michael Rodriguez",
    topic: "Risk Management Strategies for Beginners",
    category: "Risk Management",
    messages: "10"
  },
  {
    author: "Priya Sharma",
    topic: "Analyzing Economic Indicators Impact",
    category: "Fundamental Analysis",
    messages: "10"
  },
  {
    author: "James Wilson",
    topic: "Trading Psychology: Overcoming Fear",
    category: "Psychological Analysis",
    messages: "10"
  },
  {
    author: "John Johnson",
    topic: "Stock Market Sector Rotation Explained",
    category: "Stock Market",
    messages: "10"
  }
];

const upcomingEvents = [
  {
    title: "Forrester Market Structure Masterclass",
    days: "15",
    schedule: "D. Dealer's Open",
    duration: "24",
    subtitle: ""
  },
  {
    title: "Stock Market Technical Analysis Workshop",
    days: "18",
    schedule: "YTD PM - S&P PMI EST",
    duration: "18",
    subtitle: "Equity Theories"
  },
  {
    title: "Trading Psychology & Discipline",
    days: "22",
    schedule: "D. Dealers' Willness",
    duration: "12",
    subtitle: ""
  },
  {
    title: "Risk Management Fundamentals",
    days: "25",
    schedule: "G6 PM - S&P PMI EST",
    duration: "26",
    subtitle: "Michael Anderson"
  }
];

const communityGuidelines = [
  {
    title: "Education First",
    description: "All discussions must be educational in nature. No financial advice or specific investment recommendations."
  },
  {
    title: "Respectful Dialogue",
    description: "Treat all members with respect. Constructive feedback and diverse perspectives are encouraged."
  },
  {
    title: "No Gamification",
    description: "Do not use leaderboards or other game-like features. Focus on learning and personal development."
  },
  {
    title: "Quality Content",
    description: "Share well-researched analysis, credible sources, and thoughtful questions."
  },
  {
    title: "Age Verification",
    description: "All community members must be 18 years or older."
  }
];

export default memo(Section3);