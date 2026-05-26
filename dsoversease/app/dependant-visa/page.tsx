"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import "./styles.css";
import Header from "../components/Header";


export default function DependantVisaPage() {
  return (
    <main className="dependant-visa-page">
      <Header />

      {/* Section 1: Hero Banner */}
      <section className="dso-visa-section">
        <picture className="banner hero-banner">
          <source
            srcSet="/banners/dependent visa m.png"
            media="(max-width: 768px)"
          />
          <img
            src="/banners/dependent visa d.png"
            alt="Dependant Visa Banner"
          />
        </picture>
      </section>

      {/* Section 2: Dependant Visa Destinations */}
      <DependantVisaDestinations />

      {/* Section 3: What We Help You With */}
      <WhatWeHelpWith />

      {/* Section 4: Second Banner */}
      <section className="dso-visa-section">
        <img
          className="dso-visa-banner-desktop"
          src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/dependent-visa-dekstop.png"
          alt="Dependant Visa Support Banner"
        />
        <img
          className="dso-visa-banner-mobile"
          src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/dependent-visa-mobile.png"
          alt="Dependant Visa Support Banner"
        />
      </section>

      {/* Section 5: CTA Section */}
      <CTASection />
    </main>
  );
}

// Section 2 Component: Dependant Visa Destinations
function DependantVisaDestinations() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL = 5;

  const destinations = [
    { flag: "🇨🇦", name: "Canada" },
    { flag: "🇬🇧", name: "United Kingdom" },
    { flag: "🇺🇸", name: "USA" },
    { flag: "🇦🇺", name: "Australia" },
    { flag: "🇳🇿", name: "New Zealand" },
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
    <section className="dso-visitor-section">
      <div className="dso-top-bar"></div>
      <div className="dso-blob dso-blob-1"></div>
      <div className="dso-blob dso-blob-2"></div>

      <div className="dso-container">
        <div className="dso-label">
          <span className="dso-label-dot"></span>
          Dependant Visa Services
        </div>

        <h2 className="dso-headline">
          Complete <span className="dso-blue">Dependant Visa</span> Support
        </h2>

        <p className="dso-sub">
          We don&apos;t just process your application. We help you build a strong, well-planned Dependant Visa journey from start to approval.
        </p>

        <div className="dest-header">
          <span className="dest-pin">📍</span>
          <span className="dest-title">Dependant Visa Destinations</span>
        </div>

        {/* Desktop Cards */}
        <div className="dso-dest-cards">
          {destinations.map((dest, index) => (
            <div className={`dso-dest-card ${index === 2 ? "active" : ""}`} key={index}>
              <span className="dest-flag">{dest.flag}</span>
              <span className="dest-name">{dest.name}</span>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="dso-dest-mobile-slider" id="destMobSlider">
          <div className="dso-mob-viewport">
            <div
              className="dso-dest-belt"
              id="destBelt"
              style={{ transform: `translateX(-${currentSlide * 20}%)` }}
            >
              {destinations.map((dest, index) => (
                <div className="dso-dest-slide" key={index}>
                  <div className="dso-dest-card">
                    <span className="dest-flag">{dest.flag}</span>
                    <span className="dest-name">{dest.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="dso-slider-nav">
            <button
              className="dso-arrow-btn"
              id="destPrev"
              aria-label="Previous"
              disabled={currentSlide === 0}
              onClick={handlePrev}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="dso-dots-row" id="destDots">
              {Array.from({ length: TOTAL }).map((_, idx) => (
                <button
                  key={idx}
                  className={`dso-dot ${idx === currentSlide ? "active" : ""}`}
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => goTo(idx)}
                />
              ))}
            </div>
            <button
              className="dso-arrow-btn"
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
          <div className="dso-counter">
            <span id="destCur">{currentSlide + 1}</span> / 5
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 3 Component: What We Help You With
function WhatWeHelpWith() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL = 6;

  const helpItems = [
    "Visa eligibility assessment based on your profile",
    "Complete documentation guidance Related Your Relationship Prove",
    "Strong application preparation",
    "Financial and travel document support",
    "Visa application filing & tracking",
    "Interview guidance",
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
        <div className="points-block">
          <div className="points-header">
            <span className="points-pin">📍</span>
            <span className="points-block-title">What We Help You With</span>
          </div>

          {/* Desktop Grid */}
          <div className="points-grid">
            {helpItems.map((item, index) => (
              <div className="point-item" key={index}>
                <div className="point-bullet-wrap">
                  <div className="point-bullet"></div>
                </div>
                <span className="point-text">{item}</span>
              </div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="dso-points-mobile-slider" id="pointsMobSlider">
            <div className="dso-mob-viewport">
              <div
                className="dso-points-belt"
                id="pointsBelt"
                style={{ transform: `translateX(-${currentSlide * (100 / TOTAL)}%)` }}
              >
                {helpItems.map((item, index) => (
                  <div className="dso-points-slide" key={index}>
                    <div className="point-item">
                      <div className="point-bullet-wrap">
                        <div className="point-bullet"></div>
                      </div>
                      <span className="point-text">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="dso-slider-nav">
              <button
                className="dso-arrow-btn"
                id="pointsPrev"
                aria-label="Previous"
                disabled={currentSlide === 0}
                onClick={handlePrev}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <div className="dso-dots-row" id="pointsDots">
                {Array.from({ length: TOTAL }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`dso-dot ${idx === currentSlide ? "active" : ""}`}
                    aria-label={`Slide ${idx + 1}`}
                    onClick={() => goTo(idx)}
                  />
                ))}
              </div>
              <button
                className="dso-arrow-btn"
                id="pointsNext"
                aria-label="Next"
                disabled={currentSlide === TOTAL - 1}
                onClick={handleNext}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
            <div className="dso-counter">
              <span id="pointsCur">{currentSlide + 1}</span> / 6
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 5 Component: CTA Section
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
          <a href="/contact-us" className="cta-btn">
            Book Free Consultation
            <span className="cta-arrow">&#8594;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
