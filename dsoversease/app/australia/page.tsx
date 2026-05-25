"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";
import "./styles.css";
import Header from "../components/Header";


export default function AustraliaPage() {
  return (
    <main className="australia-page">
      <Header />

      {/* Section 1: Hero Banner */}
      <section className="dso-visa-section">
        <img
          className="dso-visa-banner-desktop"
          src="/banners/australia d.png"
          alt="Study in Australia Banner"
        />
        <img
          className="dso-visa-banner-mobile"
          src="/banners/australia m.png"
          alt="Study in Australia Banner"
        />
      </section>

      {/* Section 2: Top Courses in Australia */}
      <TopCourses />

      {/* Section 3: Cost of Living */}
      <CostOfLiving />

      {/* Section 4: Steps to Study in Australia */}
      <StepsToStudy />

      {/* Section 5: CTA Section */}
      <CTASection />
    </main>
  );
}

// Section 2: Top Courses in Australia
function TopCourses() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const courses = [
    { icon: "💼", name: "Business & Management", tag: "Top Picked" },
    { icon: "💻", name: "Data Science & IT", tag: "High Demand" },
    { icon: "⚙️", name: "Engineering", tag: "High Demand" },
    { icon: "🏥", name: "Healthcare & Nursing", tag: "Growing Field" },
    { icon: "🏨", name: "Hospitality & Tourism", tag: "Growing Field" },
    { icon: "🌿", name: "Environmental & Life Sciences", tag: "Top Picked" },
  ];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const cards = wrapper.querySelectorAll('.uni-card');
      const wLeft = wrapper.scrollLeft;
      const wWidth = wrapper.offsetWidth;
      let closest = 0;
      let minDist = Infinity;

      cards.forEach((card, i) => {
        const el = card as HTMLElement;
        const cardCenter = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(cardCenter - (wLeft + wWidth / 2));
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      setActiveIndex(closest);
    };

    wrapper.addEventListener('scroll', handleScroll);
    return () => wrapper.removeEventListener('scroll', handleScroll);
  }, []);

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
            Top Courses in Australia
          </div>
          <h2 className="uni-headline">
            Courses That Lead to <span className="uni-underline">Real Opportunities.</span>
          </h2>
        </div>

        <p className="uni-intro">
          Some of the most in-demand courses and programs in Australia:
        </p>

        {/* Grid / Slider */}
        <div className="uni-wrapper" ref={wrapperRef}>
          <div className="uni-grid">
            {courses.map((course, index) => (
              <div className="uni-card" key={index}>
                <span className="uni-card-icon">{course.icon}</span>
                <div className="uni-card-name">{course.name}</div>
                <div className="uni-card-tag">{course.tag}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Dots */}
        <div className="slider-dots">
          {courses.map((_, idx) => (
            <div
              key={idx}
              className={`slider-dot ${idx === activeIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Section 3: Cost of Living
function CostOfLiving() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL = 4;

  const costs = [
    { icon: "🏠", category: "Accommodation", price: "AUD 600 – 1,400" },
    { icon: "🍴", category: "Food & Groceries", price: "AUD 300 – 600" },
    { icon: "🚌", category: "Transport", price: "AUD 100 – 200" },
    { icon: "💼", category: "Miscellaneous", price: "AUD 200 – 400" },
  ];

  const goTo = (index: number) => {
    if (index < 0) index = TOTAL - 1;
    if (index >= TOTAL) index = 0;
    setCurrentSlide(index);

    const track = trackRef.current;
    if (!track) return;

    const slides = track.querySelectorAll('.col-slide');
    const slide = slides[index] as HTMLElement;
    if (!slide) return;

    const trackW = track.offsetWidth;
    const slideW = slide.offsetWidth;
    const scrollTarget = slide.offsetLeft - (trackW / 2) + (slideW / 2);
    track.scrollTo({ left: scrollTarget, behavior: 'smooth' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const center = track.scrollLeft + track.offsetWidth / 2;
      const slides = track.querySelectorAll('.col-slide');
      let closest = 0;
      let minDist = Infinity;

      slides.forEach((s, i) => {
        const el = s as HTMLElement;
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      if (closest !== currentSlide) {
        setCurrentSlide(closest);
      }
    };

    track.addEventListener('scroll', handleScroll);
    return () => track.removeEventListener('scroll', handleScroll);
  }, [currentSlide]);

  return (
    <section className="col-section">
      <div className="col-dots"></div>
      <div className="col-glow col-glow-1"></div>
      <div className="col-glow col-glow-2"></div>

      <div className="col-container">
        <div className="col-header">
          <div className="col-badges">
            <div className="col-badge-main">
              <span className="col-badge-dot"></span>
              Cost of Living in Australia
            </div>
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
        <div className="col-slider-wrapper">
          <div className="col-slider-track" ref={trackRef}>
            {costs.map((cost, index) => (
              <div className={`col-slide ${index === currentSlide ? "active" : ""}`} key={index}>
                <div className="col-card-icon-wrap">{cost.icon}</div>
                <div className="col-card-title">{cost.category}</div>
                <div className="col-card-divider"></div>
                <div className="col-card-amount">{cost.price}</div>
                <div className="col-card-period">Per Month</div>
              </div>
            ))}
          </div>

          <div className="col-slider-nav">
            <button
              className="col-nav-btn"
              aria-label="Previous"
              onClick={() => goTo(currentSlide - 1)}
            >
              ←
            </button>
            <div className="col-slider-dots">
              {Array.from({ length: TOTAL }).map((_, idx) => (
                <div
                  key={idx}
                  className={`col-dot ${idx === currentSlide ? "active" : ""}`}
                  onClick={() => goTo(idx)}
                />
              ))}
            </div>
            <button
              className="col-nav-btn"
              aria-label="Next"
              onClick={() => goTo(currentSlide + 1)}
            >
              →
            </button>
          </div>
        </div>

        {/* Key Insight */}
        <div className="col-insight">
          <div className="col-insight-inner">
            <span className="col-insight-bolt">⚡</span>
            <p className="col-insight-text">
              <strong>Part-time work</strong> helps students manage their daily expenses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 4: Steps to Study in Australia
function StepsToStudy() {
  const steps = [
    { num: "01", icon: "🎯", title: "Choose the Right Course", desc: "Select a program aligned with your goals" },
    { num: "02", icon: "📄", title: "Secure Your Admission", desc: "Apply and get your offer letter" },
    { num: "03", icon: "📝", title: "Build a Strong Profile", desc: "Prepare SOP, IELTS & documents" },
    { num: "04", icon: "🛂", title: "Apply for Your Visa", desc: "Complete your student visa process" },
    { num: "05", icon: "✈️", title: "Start Your Journey", desc: "Fly and begin your Australia experience" },
  ];

  return (
    <section className="steps-section">
      <div className="steps-top-bar"></div>
      <div className="steps-dot-pattern"></div>
      <div className="steps-glow steps-glow-1"></div>
      <div className="steps-glow steps-glow-2"></div>
      <div className="steps-watermark">🇦🇺</div>

      <div className="steps-container">
        <div className="steps-header">
          <div className="steps-label">
            <span className="steps-label-dot"></span>
            Steps to Study in Australia
          </div>

          <div className="steps-fire-badge">🧭 &nbsp; Your Roadmap to Australia</div>

          <h2 className="steps-headline">
            Your Path to Australia — <span className="steps-underline">Simplified.</span>
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
              With the <strong>right guidance</strong>, studying in Australia becomes achievable.
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
      <div className="cta-watermark">🇦🇺</div>

      <div className="cta-container">
        <div className="cta-badge">
          <span className="cta-badge-dot"></span>
          Australia
        </div>

        <h2 className="cta-headline">
          Ready to Study in <span className="cta-underline">Australia?</span> 🇦🇺
        </h2>

        <p className="cta-subtext">
          Get expert guidance tailored to your profile and move forward with a clear, well-planned path.
        </p>

        <div className="cta-btn-wrap">
          <a href="#" className="cta-btn">
            Start My Australia Journey
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
            No Commitment Required
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
