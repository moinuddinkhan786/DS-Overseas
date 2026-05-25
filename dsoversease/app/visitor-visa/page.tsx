"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import "./styles.css";
import Header from "../components/Header";


export default function VisitorVisaPage() {
  return (
    <main className="visitor-visa-page">
      <Header />

      {/* Section 1: Hero Banner */}
      <section className="dso-visa-section">
        <img
          className="dso-visa-banner-desktop"
          src="/banners/visitor visa d.png"
          alt="Visitor Visa"
        />
        <img
          className="dso-visa-banner-mobile"
          src="/banners/visitor visa m.png"
          alt="Visitor Visa"
        />
      </section>

      {/* Section 2: Visitor Visa Services with Destinations */}
      <VisitorVisaServices />

      {/* Section 3: What We Help You With */}
      <WhatWeHelpWith />

      {/* Section 4: Second Banner */}
      <section className="dso-visa-section">
        <img
          className="dso-visa-banner-desktop"
          src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/Visitor-visa-dekstop.png"
          alt="Visitor Visa Banner"
        />
        <img
          className="dso-visa-banner-mobile"
          src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/Visitor-visa-mobile.png"
          alt="Visitor Visa Banner"
        />
      </section>

      {/* Section 5: CTA Section */}
      <CTASection />
    </main>
  );
}

// Section 2: Visitor Visa Services with Destinations
function VisitorVisaServices() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL = 5;

  const destinations = [
    { flag: "\u{1F1E8}\u{1F1E6}", name: "Canada" },
    { flag: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom" },
    { flag: "\u{1F1FA}\u{1F1F8}", name: "USA" },
    { flag: "\u{1F1E6}\u{1F1FA}", name: "Australia" },
    { flag: "\u{1F1F3}\u{1F1FF}", name: "New Zealand" },
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
    <section className="dso-section">
      <div className="dso-top-bar"></div>
      <div className="dso-blob dso-blob-1"></div>
      <div className="dso-blob dso-blob-2"></div>

      <div className="dso-container">
        <div className="dso-label">
          <span className="dso-label-dot"></span>
          Visitor Visa Services
        </div>

        <h2 className="dso-headline">
          Complete <span className="dso-blue">Visitor Visa</span> Support
        </h2>

        <p className="dso-sub">
          We don&apos;t just process your application. We help you build a strong, well-planned Visitor Visa journey from start to approval.
        </p>

        {/* Destinations Block */}
        <div className="dest-block">
          <div className="dest-block-header">
            <span className="dest-pin">{"\u{1F4CD}"}</span>
            <span className="dest-block-title">Visitor Visa Destinations</span>
          </div>

          {/* Desktop Grid */}
          <div className="dest-grid">
            {destinations.map((dest, index) => (
              <div className="dest-card" key={index}>
                <div className="dest-flag">{dest.flag}</div>
                <div className="dest-name">{dest.name}</div>
              </div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="dest-mobile-slider" id="destMobileSlider">
            <div className="dest-slider-viewport">
              <div
                className="dest-slider-belt"
                id="destBelt"
                style={{ transform: `translateX(-${currentSlide * (100 / TOTAL)}%)` }}
              >
                {destinations.map((dest, index) => (
                  <div className="dest-slide" key={index}>
                    <div className="dest-card">
                      <div className="dest-flag">{dest.flag}</div>
                      <div className="dest-name">{dest.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dest-slider-nav">
              <button
                className="dest-arrow-btn"
                id="destPrev"
                aria-label="Previous"
                disabled={currentSlide === 0}
                onClick={handlePrev}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <div className="dest-dots" id="destDots">
                {Array.from({ length: TOTAL }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`dest-dot ${idx === currentSlide ? "active" : ""}`}
                    aria-label={`Slide ${idx + 1}`}
                    onClick={() => goTo(idx)}
                  />
                ))}
              </div>
              <button
                className="dest-arrow-btn"
                id="destNext"
                aria-label="Next"
                disabled={currentSlide === TOTAL - 1}
                onClick={handleNext}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            <div className="dest-counter">
              <span id="destCurrent">{currentSlide + 1}</span> / 5
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 3: What We Help You With
function WhatWeHelpWith() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL = 6;

  const helpItems = [
    { icon: "\u{1F50D}", text: "Visa eligibility assessment based on your profile" },
    { icon: "\u{1F4DD}", text: "Complete documentation guidance" },
    { icon: "\u{1F4C4}", text: "Strong application preparation" },
    { icon: "\u{1F4B0}", text: "Financial and travel document support" },
    { icon: "\u{1F4E1}", text: "Visa application filing & tracking" },
    { icon: "\u{1F3A4}", text: "Guidance for interview (if required)" },
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
    <section className="dso-section help-section">
      <div className="dso-top-bar"></div>
      <div className="dso-blob dso-blob-1"></div>
      <div className="dso-blob dso-blob-2"></div>

      <div className="dso-container">
        <div className="help-block">
          <div className="help-block-header">
            <span className="help-pin">{"\u{1F4CD}"}</span>
            <span className="help-block-title">What We Help You With</span>
          </div>

          {/* Desktop Grid */}
          <div className="help-grid">
            {helpItems.map((item, index) => (
              <div className="help-card" key={index}>
                <div className="help-icon-wrap">
                  <span className="help-icon">{item.icon}</span>
                </div>
                <span className="help-text">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="help-mobile-slider" id="helpMobileSlider">
            <div className="help-slider-viewport">
              <div
                className="help-slider-belt"
                id="helpBelt"
                style={{ transform: `translateX(-${currentSlide * (100 / TOTAL)}%)` }}
              >
                {helpItems.map((item, index) => (
                  <div className="help-slide" key={index}>
                    <div className="help-card">
                      <div className="help-icon-wrap">
                        <span className="help-icon">{item.icon}</span>
                      </div>
                      <span className="help-text">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="help-slider-nav">
              <button
                className="help-arrow-btn"
                id="helpPrev"
                aria-label="Previous"
                disabled={currentSlide === 0}
                onClick={handlePrev}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <div className="help-dots" id="helpDots">
                {Array.from({ length: TOTAL }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`help-dot ${idx === currentSlide ? "active" : ""}`}
                    aria-label={`Slide ${idx + 1}`}
                    onClick={() => goTo(idx)}
                  />
                ))}
              </div>
              <button
                className="help-arrow-btn"
                id="helpNext"
                aria-label="Next"
                disabled={currentSlide === TOTAL - 1}
                onClick={handleNext}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            <div className="help-counter">
              <span id="helpCurrent">{currentSlide + 1}</span> / 6
            </div>
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
      <div className="cta-topline"></div>
      <div className="cta-dots"></div>
      <div className="cta-blob cta-blob-1"></div>
      <div className="cta-blob cta-blob-2"></div>

      <div className="cta-inner">
        <h2 className="cta-headline">
          Plan Your Visit the <span className="cta-blue">Right Way</span>
        </h2>

        <p className="cta-subtext">
          Get the right guidance and avoid unnecessary delays or confusion.
        </p>

        <div className="cta-btn-wrap">
          <a href="#" className="cta-btn">
            Book Free Consultation
            <span className="cta-arrow">
              <svg viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
