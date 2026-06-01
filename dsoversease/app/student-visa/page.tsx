"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import "./styles.css";
import Header from "../components/Header";


export default function StudentVisaPage() {
  useEffect(() => {
    // Load flag-icons CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <main className="student-visa-page">
      <Header />

      {/* Section 1: Hero Banner */}
      <section className="dso-visa-section">
        <img
          src="/banners/student visa d.png"
          alt="Student Visa – From Admission to Approval"
          className="dso-visa-banner-desktop"
        />
        <img
          src="/banners/student visa m.png"
          alt="Student Visa – From Admission to Approval"
          className="dso-visa-banner-mobile"
        />
      </section>

      {/* Section 2: Complete Student Visa Support */}
      <StudentVisaServices />

      {/* Section 3: Visa Banner */}
      <section className="dso-visa-section">
        <img
          className="dso-visa-banner-desktop"
          src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/Artboard-3-1.png"
          alt="Banner"
        />
        <img
          className="dso-visa-banner-mobile"
          src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/Artboard-4.png"
          alt="Banner"
        />
      </section>

      {/* Section 4: Study Destinations */}
      <StudyDestinations />

      {/* Section 5: Why Students Trust DS Overseas */}
      <WhyChooseUs />

      {/* Section 6: Your Journey Step by Step */}
      <JourneySteps />

      {/* Section 7: CTA Section */}
      <CTASection />
    </main>
  );
}

// Section 2 Component: Student Visa Services
function StudentVisaServices() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL = 6;

  const goTo = (idx: number) => {
    setCurrentSlide(idx);
  };

  const handlePrev = () => {
    if (currentSlide > 0) goTo(currentSlide - 1);
  };

  const handleNext = () => {
    if (currentSlide < TOTAL - 1) goTo(currentSlide + 1);
  };

  const services = [
    {
      icon: "🎓",
      title: "Course & University Selection",
      desc: "Based on your academic profile, budget, and career goals – we match you to the right program.",
    },
    {
      icon: "📝",
      title: "Admission Application & Offer Letter Support",
      desc: "End-to-end help with applications and securing your university offer letter.",
    },
    {
      icon: "✍️",
      title: "SOP Preparation & Profile Building",
      desc: "A compelling Statement of Purpose crafted to highlight your strengths and make you stand out.",
    },
    {
      icon: "🎤",
      title: "IELTS Coaching & Interview Guidance",
      desc: "Targeted coaching to hit your required band score and ace visa interviews confidently.",
    },
    {
      icon: "💰",
      title: "Education Loan",
      desc: "Complete support for loan processing and building a strong, accurate visa file.",
    },
    {
      icon: "✈️",
      title: "Travel Support – Forex, Tickets & Insurance",
      desc: "We handle everything post-visa – currency exchange, flight bookings, and travel insurance.",
    },
  ];

  return (
    <section className="dso-section">
      <div className="dso-top-bar"></div>
      <div className="dso-blob dso-blob-1"></div>
      <div className="dso-blob dso-blob-2"></div>

      <div className="dso-container">
        <div className="dso-label">
          <span className="dso-label-dot"></span>
          Student Visa Services
        </div>

        <h2 className="dso-headline">
          Complete <span className="dso-blue">Student Visa</span> Support
        </h2>

        <p className="dso-sub">
          We don&apos;t just process your application. We help you build a strong, well-planned study abroad journey.
        </p>

        {/* Desktop Grid */}
        <div className="dso-cards">
          {services.map((service, index) => (
            <div className="dso-card" key={index}>
              <div className="dso-icon">{service.icon}</div>
              <div>
                <div className="dso-card-title">{service.title}</div>
                <div className="dso-card-desc">{service.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="dso-mobile-slider" id="dsoMobileSlider">
          <div className="dso-slider-viewport">
            <div
              className="dso-slider-belt"
              id="dsoSliderBelt"
              style={{ transform: `translateX(-${currentSlide * (100 / TOTAL)}%)` }}
            >
              {services.map((service, index) => (
                <div className="dso-slide" key={index}>
                  <div className="dso-card">
                    <div className="dso-icon">{service.icon}</div>
                    <div>
                      <div className="dso-card-title">{service.title}</div>
                      <div className="dso-card-desc">{service.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dso-slider-nav">
            <button
              className="dso-arrow-btn"
              id="dsoPrev"
              aria-label="Previous"
              disabled={currentSlide === 0}
              onClick={handlePrev}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="dso-dots" id="dsoDots">
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
              id="dsoNext"
              aria-label="Next"
              disabled={currentSlide === TOTAL - 1}
              onClick={handleNext}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="dso-counter">
            <span id="dsoCurrent">{currentSlide + 1}</span> / 6
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 4 Component: Study Destinations
function StudyDestinations() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL = 5;

  const destinations = [
    {
      flagCode: "ca",
      name: "Canada",
      tag: "Study. Work. Settle.\nWorld-class education with strong post-study pathways.",
    },
    {
      flagCode: "gb",
      name: "United Kingdom",
      tag: "1-Year Master's. Global Exposure.\nFast-track degrees with excellent career prospects.",
    },
    {
      flagCode: "nz",
      name: "New Zealand",
      tag: "Peaceful Country. Powerful Degrees.\nIndustry-focused education in a safe environment.",
    },
    {
      flagCode: "us",
      name: "USA",
      tag: "Dream Big. Study Bigger.\nTop-ranked universities with world-leading research opportunities.",
    },
    {
      flagCode: "au",
      name: "Australia",
      tag: "Live, Learn & Thrive.\nHigh-quality education with outstanding post-study work rights.",
    },
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
    <section className="dso-dest-section">
      <div className="dso-dest-topline"></div>
      <div className="dso-dest-dots-bg"></div>
      <div className="dso-dest-blob dso-dest-blob-1"></div>
      <div className="dso-dest-blob dso-dest-blob-2"></div>

      <div className="dso-dest-container">
        <div className="dso-dest-top">
          <div className="dso-dest-label">
            <span className="dso-dest-labeldot"></span>
            Study Destinations
          </div>
          <h2 className="dso-dest-headline">
            Study <span className="dso-dest-blue">Destinations</span> We Cover
          </h2>
          <p className="dso-dest-sub">We guide students for top study destinations including:</p>
        </div>

        {/* Desktop Grid */}
        <div className="dso-dest-grid">
          {destinations.map((dest, index) => (
            <div className="dso-dest-card" key={index}>
              <span className={`dso-dest-flag fi fi-${dest.flagCode}`}></span>
              <div className="dso-dest-name">{dest.name}</div>
              <div className="dso-dest-line"></div>
              <div className="dso-dest-tag">{dest.tag.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}</div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="dso-mobile-slider" id="dsoDestMobileSlider">
          <div className="dso-mob-viewport">
            <div
              className="dso-mob-belt"
              id="dsoDestBelt"
              style={{ transform: `translateX(-${currentSlide * (100 / TOTAL)}%)` }}
            >
              {destinations.map((dest, index) => (
                <div className="dso-mob-slide" key={index}>
                  <div className="dso-dest-card">
                    <span className={`dso-dest-flag fi fi-${dest.flagCode}`}></span>
                    <div className="dso-dest-name">{dest.name}</div>
                    <div className="dso-dest-line"></div>
                    <div className="dso-dest-tag">{dest.tag.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dso-mob-nav">
            <button
              className="dso-mob-arrow"
              id="dsoDestPrev"
              aria-label="Previous"
              disabled={currentSlide === 0}
              onClick={handlePrev}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="dso-mob-dots" id="dsoDestDots">
              {Array.from({ length: TOTAL }).map((_, idx) => (
                <button
                  key={idx}
                  className={`dso-mob-dot ${idx === currentSlide ? "active" : ""}`}
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => goTo(idx)}
                />
              ))}
            </div>
            <button
              className="dso-mob-arrow"
              id="dsoDestNext"
              aria-label="Next"
              disabled={currentSlide === TOTAL - 1}
              onClick={handleNext}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="dso-mob-counter">
            <span id="dsoDestCurrent">{currentSlide + 1}</span> / 5
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 5 Component: Why Choose Us
function WhyChooseUs() {
  const points = [
    {
      icon: "🏠",
      title: "End-to-End Guidance Under One Roof",
      desc: "From admission to visa to travel – everything handled by one trusted team.",
    },
    {
      icon: "🤝",
      title: "Personalized Support – No Confusion",
      desc: "A dedicated counsellor assigned to you, so nothing falls through the cracks.",
    },
    {
      icon: "💬",
      title: "Clear Process With Honest Advice",
      desc: "No false promises. Just transparent timelines and straightforward guidance.",
    },
    {
      icon: "🎯",
      title: "Focus on the Right Profile, Not Just Applications",
      desc: "We build and strengthen your profile – not just process paperwork.",
    },
  ];

  return (
    <section className="dso-trust-section">
      <div className="dso-trust-topline"></div>
      <div className="dso-trust-dots"></div>
      <div className="dso-trust-blob dso-trust-blob-1"></div>
      <div className="dso-trust-blob dso-trust-blob-2"></div>

      <div className="dso-trust-container">
        <div className="dso-trust-grid">
          <div className="dso-trust-left">
            <div className="dso-trust-label">
              <span className="dso-trust-labeldot"></span>
              Why Choose Us
            </div>

            <h2 className="dso-trust-headline">
              Why Students
              <br />
              Trust <span className="dso-trust-blue">DS Overseas</span>
            </h2>

            <div className="dso-trust-divider"></div>

            <div className="dso-trust-bluebox">
              <div className="dso-trust-bluebox-title">Ready to start your journey?</div>
              <div className="dso-trust-bluebox-sub">
                Book a free one-on-one consultation with our experts and get clarity on your next step.
              </div>
            </div>
          </div>

          <div className="dso-trust-right">
            {points.map((point, index) => (
              <div className="dso-trust-point" key={index}>
                <div className="dso-trust-icon">{point.icon}</div>
                <div className="dso-trust-point-text">
                  <div className="dso-trust-point-title">{point.title}</div>
                  <div className="dso-trust-point-desc">{point.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 6 Component: Journey Steps
function JourneySteps() {
  const steps = [
    { num: 1, icon: "📊", title: "Profile Evaluation" },
    { num: 2, icon: "🌍", title: "Course & Country Selection" },
    { num: 3, icon: "🎓", title: "Application & Admission" },
    { num: 4, icon: "📋", title: "Visa Filing" },
    { num: 5, icon: "✈️", title: "Pre-Departure Support" },
  ];

  return (
    <section className="dso-journey-section">
      <div className="dso-journey-topline"></div>
      <div className="dso-journey-dots"></div>
      <div className="dso-journey-blob dso-journey-blob-1"></div>
      <div className="dso-journey-blob dso-journey-blob-2"></div>

      <div className="dso-journey-container">
        <div className="dso-journey-top">
          <div className="dso-journey-label">
            <span className="dso-journey-labeldot"></span>
            Our Process
          </div>
          <h2 className="dso-journey-headline">
            Your Journey, <span className="dso-journey-blue">Step by Step</span>
          </h2>
        </div>

        <div className="dso-journey-steps">
          {steps.map((step) => (
            <div className="dso-journey-step" key={step.num}>
              <div className="dso-journey-num">{step.num}</div>
              <div className="dso-journey-icon">{step.icon}</div>
              <div className="dso-journey-step-text">
                <div className="dso-journey-step-title">{step.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section 7 Component: CTA
function CTASection() {
  return (
    <section className="dso-cta-section">
      <div className="dso-cta-dots"></div>
      <div className="dso-cta-circle dso-cta-circle-1"></div>
      <div className="dso-cta-circle dso-cta-circle-2"></div>
      <div className="dso-cta-circle dso-cta-circle-3"></div>

      <div className="dso-cta-container">
        <div className="dso-cta-label">
          <span className="dso-cta-labeldot"></span>
          Get Started Today
        </div>

        <h2 className="dso-cta-headline">Start Your Study Abroad Journey Today</h2>

        <div className="dso-cta-divider"></div>

        <p className="dso-cta-sub">Take the first step with the right guidance and a clear plan.</p>

        <a href="/contact-us" className="dso-cta-btn">
          Book Free Consultation
          <span className="dso-cta-btn-arrow">
            <svg viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>

        <div className="dso-cta-trust">
          <div className="dso-cta-trust-item">
            <div className="dso-cta-trust-check">✓</div>
            No Hidden Fees
          </div>
          <div className="dso-cta-trust-item">
            <div className="dso-cta-trust-check">✓</div>
            Expert 1-on-1 Guidance
          </div>
        </div>
      </div>
    </section>
  );
}
