"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import "./styles.css";
import Header from "../components/Header";


export default function CanadaPage() {
  return (
    <main className="canada-page">
      <Header />

      {/* Section 1: Hero Banner */}
      <section className="dso-visa-section">
        <img
          src="/banners/canada d.png"
          alt="Study in Canada Banner"
          className="dso-visa-banner-desktop"
        />
        <img
          src="/banners/canada m.png"
          alt="Study in Canada Banner"
          className="dso-visa-banner-mobile"
        />
      </section>

      {/* Section 2: Top Universities in Canada */}
      <TopUniversities />

      {/* Section 3: Cost of Living */}
      <CostOfLiving />

      {/* Section 4: CTA Section */}
      <CTASection />
    </main>
  );
}

// Section 2: Top Universities in Canada
function TopUniversities() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL = 6;

  const universities = [
    { num: "01", icon: "🏛️", name: "University of Toronto", province: "Ontario" },
    { num: "02", icon: "🌲", name: "University of British Columbia", province: "British Columbia" },
    { num: "03", icon: "⚜️", name: "McGill University", province: "Québec" },
    { num: "04", icon: "🏔️", name: "University of Alberta", province: "Alberta" },
    { num: "05", icon: "💡", name: "University of Waterloo", province: "Ontario" },
    { num: "06", icon: "🎓", name: "York University", province: "Ontario" },
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
      <div className="uni-maple">🍁</div>

      <div className="uni-container">
        <div className="uni-header">
          <div className="uni-label">
            <span className="uni-label-dot"></span>
            Top Universities in Canada
          </div>
          <h2 className="uni-headline">
            Learn from the Best. Build a <span className="uni-underline">Global Future.</span>
          </h2>
        </div>

        <p className="uni-intro">
          Some of the most preferred universities and colleges in Canada:
        </p>

        {/* Desktop Grid */}
        <div className="uni-grid">
          {universities.map((uni) => (
            <div className="uni-card" key={uni.num}>
              <span className="uni-card-num">{uni.num}</span>
              <div className="uni-card-icon">{uni.icon}</div>
              <div className="uni-card-name">{uni.name}</div>
              <div className="uni-card-province">📍 {uni.province}</div>
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
              {universities.map((uni) => (
                <div className="uni-mob-slide" key={uni.num}>
                  <div className="uni-card">
                    <span className="uni-card-num">{uni.num}</span>
                    <div className="uni-card-icon">{uni.icon}</div>
                    <div className="uni-card-name">{uni.name}</div>
                    <div className="uni-card-province">📍 {uni.province}</div>
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

        {/* Footnote */}
        <div className="uni-footnote">
          <div className="uni-footnote-inner">
            <span className="uni-footnote-bolt">⚡</span>
            <p className="uni-footnote-text">
              Choose a university that matches <strong>your goals</strong> — not just rankings.
            </p>
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
    { icon: "🏠", category: "Accommodation", price: "CAD 500 – 1,200" },
    { icon: "🍴", category: "Food & Groceries", price: "CAD 250 – 400" },
    { icon: "🚌", category: "Transport", price: "CAD 80 – 150" },
    { icon: "💼", category: "Miscellaneous", price: "CAD 150 – 300" },
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
      <div className="col-top-bar"></div>
      <div className="col-blob col-blob-1"></div>
      <div className="col-blob col-blob-2"></div>

      <div className="col-container">
        <div className="col-fire">🔥 &nbsp; Plan Your Budget Smart</div>

        <h2 className="col-headline">
          Understand Your <span className="col-blue">Living Costs</span> Before You Go
        </h2>

        <p className="col-sub">Average monthly living expenses for students:</p>

        {/* Desktop Cards */}
        <div className="col-cards">
          {costs.map((cost, index) => (
            <div className="col-card" key={index}>
              <div className="col-icon-box">{cost.icon}</div>
              <div className="col-cat">{cost.category}</div>
              <div className="col-divider"></div>
              <div className="col-price">
                {cost.price}
                <span className="col-price-label">per month</span>
              </div>
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
                    <div className="col-icon-box">{cost.icon}</div>
                    <div className="col-cat">{cost.category}</div>
                    <div className="col-divider"></div>
                    <div className="col-price">
                      {cost.price}
                      <span className="col-price-label">per month</span>
                    </div>
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
      </div>
    </section>
  );
}

// Section 4: CTA Section
function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-top-bar"></div>
      <div className="cta-dots"></div>
      <div className="cta-glow cta-glow-1"></div>
      <div className="cta-glow cta-glow-2"></div>
      <div className="cta-ring cta-ring-1"></div>
      <div className="cta-ring cta-ring-2"></div>
      <div className="cta-ring cta-ring-3"></div>

      <div className="cta-container">
        <div className="cta-icon-wrap">🚀</div>

        <h2 className="cta-headline">
          Your Future Abroad Starts With <span className="cta-highlight">One Step</span>
        </h2>

        <p className="cta-sub">
          Don&apos;t let confusion or delays hold you back. Get the right guidance and move forward with a clear plan.
        </p>

        <div className="cta-btn-wrap">
          <a href="/contact-us" className="cta-btn">
            Book Free Consultation
            <span className="cta-arrow">→</span>
          </a>
        </div>

        <div className="cta-trust">
          <div className="cta-trust-item">
            <div className="cta-trust-check">✓</div>
            No Hidden Fees
          </div>
          <div className="cta-trust-item">
            <div className="cta-trust-check">✓</div>
            Expert 1-on-1 Guidance
          </div>
        </div>
      </div>
    </section>
  );
}
