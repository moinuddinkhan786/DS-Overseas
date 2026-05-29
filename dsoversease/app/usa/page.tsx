"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import "./styles.css";
import Header from "../components/Header";


export default function USAPage() {
  return (
    <main className="usa-page">
      <Header />

      {/* Section 1: Hero Banner */}
      <section className="dso-visa-section">
        <img
          src="/banners/USA d.png"
          alt="Study in USA Banner"
          className="dso-visa-banner-desktop"
        />
        <img
          src="/banners/USA m.png"
          alt="Study in USA Banner"
          className="dso-visa-banner-mobile"
        />
      </section>

      {/* Section 2: Top Courses in USA */}
      <TopCourses />

      {/* Section 3: Cost of Living */}
      <CostOfLiving />

      {/* Section 4: Steps to Study in USA */}
      <StepsToStudy />

      {/* Section 5: CTA Section */}
      <CTASection />
    </main>
  );
}

// Section 2: Top Courses in USA
function TopCourses() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL = 6;

  const courses = [
    { num: "01", icon: "🤖", name: "Data Science & Artificial Intelligence", tag: "High Demand" },
    { num: "02", icon: "💼", name: "Business & Management (MBA)", tag: "Top Picked" },
    { num: "03", icon: "💻", name: "Computer Science / IT", tag: "High Demand" },
    { num: "04", icon: "⚙️", name: "Engineering", tag: "High Demand" },
    { num: "05", icon: "🏥", name: "Healthcare & Life Sciences", tag: "Growing Field" },
    { num: "06", icon: "💰", name: "Finance & Economics", tag: "Top Picked" },
  ];

  const goTo = (idx: number) => {
    setCurrentSlide(idx);
  };

  const handlePrev = () => {
    if (currentSlide > 0) goTo(currentSlide - 1);
  };

  const handleNext = () => {
    if (currentSlide < TOTAL - 1) goTo(currentSlide + 1);
  };

  return (
    <section className="uni-section">
      <div className="uni-top-bar"></div>
      <div className="uni-dot-pattern"></div>
      <div className="uni-glow uni-glow-1"></div>
      <div className="uni-glow uni-glow-2"></div>
      <div className="uni-watermark">🎓</div>

      <div className="uni-container">
        <div className="uni-header">
          <div className="uni-label">
            <span className="uni-label-dot"></span>
            Top Courses in USA
          </div>
          <h2 className="uni-headline">
            Courses That Define the <span className="uni-underline">Future.</span>
          </h2>
        </div>

        <p className="uni-intro">
          Some of the most in-demand courses and programs in the USA:
        </p>

        {/* Desktop Grid */}
        <div className="uni-grid">
          {courses.map((course) => (
            <div className="uni-card" key={course.num}>
              <span className="uni-card-num">{course.num}</span>
              <div className="uni-card-icon">{course.icon}</div>
              <div className="uni-card-name">{course.name}</div>
              <div className="uni-card-tag">⚡ {course.tag}</div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="uni-mobile-slider" id="uniMobSlider">
          <div className="uni-mob-viewport">
            <div
              className="uni-mob-belt"
              id="uniBelt"
              style={{ transform: `translateX(-${currentSlide * (100 / TOTAL)}%)` }}
            >
              {courses.map((course) => (
                <div className="uni-mob-slide" key={course.num}>
                  <div className="uni-card">
                    <span className="uni-card-num">{course.num}</span>
                    <div className="uni-card-icon">{course.icon}</div>
                    <div className="uni-card-name">{course.name}</div>
                    <div className="uni-card-tag">⚡ {course.tag}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="uni-mob-nav">
            <button
              className="uni-mob-arrow"
              id="uniPrev"
              aria-label="Previous"
              disabled={currentSlide === 0}
              onClick={handlePrev}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="uni-mob-dots" id="uniDots">
              {Array.from({ length: TOTAL }).map((_, idx) => (
                <button
                  key={idx}
                  className={`uni-mob-dot ${idx === currentSlide ? "active" : ""}`}
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => goTo(idx)}
                />
              ))}
            </div>
            <button
              className="uni-mob-arrow"
              id="uniNext"
              aria-label="Next"
              disabled={currentSlide === TOTAL - 1}
              onClick={handleNext}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="uni-mob-counter">
            <span id="uniCur">{currentSlide + 1}</span> / 6
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 3: Cost of Living
function CostOfLiving() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL = 4;

  const costs = [
    { icon: "🏠", category: "Accommodation", price: "USD 700 – 1,500" },
    { icon: "🍴", category: "Food & Groceries", price: "USD 250 – 500" },
    { icon: "🚌", category: "Transport", price: "USD 70 – 150" },
    { icon: "💼", category: "Miscellaneous", price: "USD 200 – 400" },
  ];

  const goTo = (idx: number) => {
    setCurrentSlide(idx);
  };

  const handlePrev = () => {
    if (currentSlide > 0) goTo(currentSlide - 1);
  };

  const handleNext = () => {
    if (currentSlide < TOTAL - 1) goTo(currentSlide + 1);
  };

  return (
    <section className="col-section">
      <div className="col-dots"></div>
      <div className="col-glow col-glow-1"></div>
      <div className="col-glow col-glow-2"></div>

      <div className="col-container">
        <div className="col-header">
          <div className="col-badges">
            <div className="col-badge-fire">🔥 &nbsp; Plan Your Budget Smart</div>
          </div>

          <h2 className="col-headline">
            Understand Your <span>Living Costs</span><br />Before You Go
          </h2>

          <p className="col-intro">Average monthly living expenses for students:</p>
        </div>

        {/* Desktop Cards */}
        <div className="col-grid">
          {costs.map((cost, index) => (
            <div className="col-card" key={index}>
              <div className="col-card-icon-wrap">{cost.icon}</div>
              <div className="col-card-title">{cost.category}</div>
              <div className="col-card-divider"></div>
              <div className="col-card-amount">{cost.price}</div>
              <div className="col-card-period">Per Month</div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="col-mobile-slider" id="colMobSlider">
          <div className="col-mob-viewport">
            <div
              className="col-mob-belt"
              id="colBelt"
              style={{ transform: `translateX(-${currentSlide * 25}%)` }}
            >
              {costs.map((cost, index) => (
                <div className="col-mob-slide" key={index}>
                  <div className="col-card">
                    <div className="col-card-icon-wrap">{cost.icon}</div>
                    <div className="col-card-title">{cost.category}</div>
                    <div className="col-card-divider"></div>
                    <div className="col-card-amount">{cost.price}</div>
                    <div className="col-card-period">Per Month</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-mob-nav">
            <button
              className="col-mob-arrow"
              id="colPrev"
              aria-label="Previous"
              disabled={currentSlide === 0}
              onClick={handlePrev}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="col-mob-dots" id="colDots">
              {Array.from({ length: TOTAL }).map((_, idx) => (
                <button
                  key={idx}
                  className={`col-mob-dot ${idx === currentSlide ? "active" : ""}`}
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => goTo(idx)}
                />
              ))}
            </div>
            <button
              className="col-mob-arrow"
              id="colNext"
              aria-label="Next"
              disabled={currentSlide === TOTAL - 1}
              onClick={handleNext}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="col-mob-counter">
            <span id="colCur">{currentSlide + 1}</span> / 4
          </div>
        </div>

        {/* Key Insight */}
        <div className="col-insight">
          <div className="col-insight-inner">
            <span className="col-insight-bolt">⚡</span>
            <p className="col-insight-text">
              <strong>Part-time work</strong> and on-campus jobs help manage daily expenses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 4: Steps to Study in USA
function StepsToStudy() {
  const steps = [
    { num: "01", icon: "🎯", title: "Choose the Right Course", desc: "Select a program aligned with your career goals" },
    { num: "02", icon: "📄", title: "Secure Your Admission", desc: "Apply and receive your offer letter" },
    { num: "03", icon: "📋", title: "Obtain Your I-20 Form", desc: "Receive your Certificate of Eligibility for Nonimmigrant Student Status (Form I-20) from your university — required to apply for an F-1 student visa" },
    { num: "04", icon: "📝", title: "Build a Strong Profile", desc: "Prepare SOP, IELTS/Financial & documents" },
    { num: "05", icon: "🛂", title: "Apply for Your Visa", desc: "Complete your student visa process" },
    { num: "06", icon: "✈️", title: "Start Your Journey", desc: "Fly and begin your USA experience" },
  ];

  return (
    <section className="steps-section">
      <div className="steps-top-bar"></div>
      <div className="steps-dot-pattern"></div>
      <div className="steps-glow steps-glow-1"></div>
      <div className="steps-glow steps-glow-2"></div>
      <div className="steps-watermark">🇺🇸</div>

      <div className="steps-container">
        <div className="steps-header">
          <div className="steps-label">
            <span className="steps-label-dot"></span>
            To Study in USA
          </div>

          <h2 className="steps-headline">
            Your Path to the USA — <span className="steps-underline">Simplified.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="steps-timeline">
          {steps.map((step) => (
            <div className="step-row" key={step.num}>
              <div className="step-circle">
                <span className="step-num">{step.num}</span>
              </div>
              <div className="step-card">
                <div className="step-icon">{step.icon}</div>
                <div className="step-text">
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.desc}</div>
                </div>
                <div className="step-tag">Step {parseInt(step.num)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Line */}
        <div className="steps-footnote">
          <div className="steps-footnote-inner">
            <span className="steps-footnote-bolt">⚡</span>
            <p className="steps-footnote-text">
              With the <strong>right guidance</strong>, studying in the USA becomes achievable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 5: CTA Section
function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-top-bar"></div>
      <div className="cta-dots"></div>
      <div className="cta-glow cta-glow-1"></div>
      <div className="cta-glow cta-glow-2"></div>
      <div className="cta-glow cta-glow-3"></div>
      <div className="cta-ring cta-ring-1"></div>
      <div className="cta-ring cta-ring-2"></div>
      <div className="cta-ring cta-ring-3"></div>
      <div className="cta-watermark">🇺🇸</div>

      <div className="cta-container">
        <div className="cta-badge">
          <span className="cta-badge-dot"></span>
          USA
        </div>

        <h2 className="cta-headline">
          Ready to Study in the <span className="cta-underline">USA?</span> 🇺🇸
        </h2>

        <p className="cta-subtext">
          Get expert guidance tailored to your profile and move forward with a clear, well-planned path.
        </p>

        <div className="cta-btn-wrap">
          <a href="/contact-us" className="cta-btn">
            Start My USA Journey
            <span className="cta-btn-arrow">→</span>
          </a>
        </div>

        <div className="cta-trust">
          <div className="cta-trust-pill">
            <div className="cta-trust-check">✓</div>
            No Hidden Fees
          </div>
          <div className="cta-trust-pill">
            <div className="cta-trust-check">✓</div>
            Expert 1-on-1 Guidance
          </div>
        </div>
      </div>
    </section>
  );
}
