"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Header from "../components/Header";

const founderStats = [
  ["9+", "Years Experience"],
  ["100s", "Profiles Guided"],
  ["1:1", "Personal Approach"],
];

const founderPills = [
  "Personalized Planning",
  "Visa & Documentation",
  "End-to-End Support",
  "Direct Involvement",
];

const testimonials = [
  "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-02-at-4.07.46-PM.jpeg",
  "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-02-at-4.07.49-PM-1.jpeg",
  "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-02-at-4.07.50-PM.jpeg",
  "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-02-at-4.07.47-PM-1.jpeg",
  "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-02-at-4.07.47-PM-2.jpeg",
  "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-02-at-4.07.47-PM.jpeg",
  "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-02-at-4.07.49-PM-2.jpeg",
  "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-02-at-4.07.49-PM-3.jpeg",
];

const differenceCards = [
  ["01", "End-to-End Support", "From planning your journey to getting your visa, we stay with you every step of the way."],
  ["02", "Personalized Guidance", "Every student is unique. We craft a plan that fits your goals, budget, and aspirations."],
  ["03", "Single Point of Contact", "No confusion, no back-and-forth. One dedicated expert handles everything for you."],
  ["04", "Transparent Process", "Honest advice, no hidden steps. We believe in complete clarity from day one."],
  ["05", "Support After You Arrive", "Our support does not stop at the airport. We are here even after you reach abroad."],
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}


export default function AboutUs() {
  const [statSlide, setStatSlide] = useState(0);
  const [pillSlide, setPillSlide] = useState(0);
  const [reviewPage, setReviewPage] = useState(0);
  const [diffSlide, setDiffSlide] = useState(0);

  useEffect(() => {
    const stats = window.setInterval(() => setStatSlide((value) => (value + 1) % founderStats.length), 2200);
    const pills = window.setInterval(() => setPillSlide((value) => (value + 1) % founderPills.length), 2200);
    const reviews = window.setInterval(() => setReviewPage((value) => (value + 1) % testimonials.length), 4200);
    const difference = window.setInterval(() => setDiffSlide((value) => (value + 1) % differenceCards.length), 2400);
    return () => {
      window.clearInterval(stats);
      window.clearInterval(pills);
      window.clearInterval(reviews);
      window.clearInterval(difference);
    };
  }, []);

  return (
    <main className="site-page about-page">
      <Header />

      <section className="founder-section">
        <div className="founder-bg-texture" />
        <div className="founder-container">
          <div className="founder-top-label"><span>The Face Behind DS Overseas</span></div>
          <h1 className="founder-headline">Meet the Founder <em>Behind</em> DS Overseas</h1>

          <div className="founder-layout">
            <div className="founder-photo-card">
              <div className="founder-badge">
                <span className="founder-badge-num">9+</span>
                <span className="founder-badge-label">Yrs Exp</span>
              </div>
              <div className="founder-photo-frame">
                <img
                  src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/04/IMG_9444.png"
                  alt="Dharmik Soni, Founder of DS Overseas"
                />
                <div className="founder-photo-nametag">
                  <h3>Dharmik Soni</h3>
                  <p>Founder & CEO - DS Overseas</p>
                </div>
              </div>
            </div>

            <div className="founder-content">
              <div className="founder-name-block">
                <h2 className="founder-name">Dharmik Soni</h2>
                <p className="founder-role">Founder & CEO - DS Overseas</p>
              </div>
              <div className="founder-quote">Students need the right guidance and clarity, not just an agent.</div>

              <div className="founder-stats">
                {founderStats.map(([num, label]) => (
                  <div className="founder-stat" key={label}>
                    <div className="founder-stat-num">{num}</div>
                    <div className="founder-stat-label">{label}</div>
                  </div>
                ))}
              </div>

              <MobileBelt
                className="founder-stats-mobile"
                current={statSlide}
                setCurrent={setStatSlide}
                total={founderStats.length}
              >
                {founderStats.map(([num, label]) => (
                  <div className="founder-stat" key={label}>
                    <div className="founder-stat-num">{num}</div>
                    <div className="founder-stat-label">{label}</div>
                  </div>
                ))}
              </MobileBelt>

              <div className="founder-body">
                <p>With over 9 years of experience in the study abroad industry, Dharmik Soni has guided students through one of the most important decisions of their lives, helping them choose the right path with confidence and clarity.</p>
                <p>Having worked with thousands of profiles, Dharmik understands that every journey is different. That is why DS Overseas focuses on personalized planning instead of a one-size-fits-all approach.</p>
                <p>Dharmik personally stays engaged in every case, ensuring each application is well-prepared, accurate, and aligned with each student&apos;s individual goals, from course selection to documentation and visa processes.</p>
              </div>

              <div className="founder-pills">
                {founderPills.map((pill) => (
                  <span className="founder-pill" key={pill}><span className="founder-pill-dot" />{pill}</span>
                ))}
              </div>

              <MobileBelt
                className="founder-pills-mobile"
                current={pillSlide}
                setCurrent={setPillSlide}
                total={founderPills.length}
              >
                {founderPills.map((pill) => (
                  <span className="founder-pill" key={pill}><span className="founder-pill-dot" />{pill}</span>
                ))}
              </MobileBelt>
            </div>
          </div>
        </div>
      </section>

      <section className="testi-section">
        <div className="testi-bg-dots" />
        <div className="about-blob about-blob-1" />
        <div className="about-blob about-blob-2" />

        <div className="about-section-header">
          <div className="about-eyebrow">Student Reviews</div>
          <h2>Trusted by Students, <span>Proven by Results</span></h2>
          <p>Real voices from real learners. Here is what our students have to say about their journey with us.</p>
        </div>

        <div className="review-slider">
          <div className="review-track" style={{ transform: `translateX(-${reviewPage * 33.333}%)` }}>
            {testimonials.map((image, index) => (
              <article className="testi-card" key={image}>
                <div className="card-top-bar" />
                <div className="card-img-wrap">
                  <img className="card-img" src={image} alt={`Student testimonial ${index + 1}`} />
                  <div className="card-badge">{index + 1}</div>
                </div>
              </article>
            ))}
          </div>
          <div className="about-slider-nav">
            <button type="button" onClick={() => setReviewPage((reviewPage - 1 + testimonials.length) % testimonials.length)}>Prev</button>
            <Dots total={testimonials.length} current={reviewPage} setCurrent={setReviewPage} />
            <button type="button" onClick={() => setReviewPage((reviewPage + 1) % testimonials.length)}>Next</button>
          </div>
        </div>

        <div className="stats-banner">
          {[
            ["10,000+", "Happy Students"],
            ["98%", "Success Rate"],
            ["5/5", "Avg Rating"],
            ["50+", "Courses Offered"],
          ].map(([num, label]) => (
            <div className="about-stat-item" key={label}>
              <span className="about-stat-num">{num}</span>
              <span className="about-stat-lbl">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mv-section">
        <div className="mv-container">
          <div className="mv-top-label"><span>Where We Are Going</span></div>
          <div className="mv-grid">
            <article className="mv-card">
              <div className="mv-card-bg-letter">M</div>
              <div className="mv-card-tag"><div className="mv-icon">M</div><span>Our Mission</span></div>
              <h2>Our Mission</h2>
              <div className="mv-divider" />
              <p>To help students make the right study abroad decisions through honest guidance, personalized planning, and end-to-end support.</p>
            </article>
            <article className="mv-card">
              <div className="mv-card-bg-letter">V</div>
              <div className="mv-card-tag"><div className="mv-icon">V</div><span>Our Vision</span></div>
              <h2>Our Vision</h2>
              <div className="mv-divider" />
              <p>To become a trusted name for students seeking clear, reliable, and long-term study abroad guidance.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="wsa-section">
        <div className="wsa-container">
          <div className="wsa-header">
            <h2>What Makes Us <span>Different</span></h2>
          </div>
          <div className="wsa-grid">
            {differenceCards.slice(0, 3).map(([num, title, desc]) => (
              <DifferenceCard desc={desc} num={num} title={title} key={num} />
            ))}
          </div>
          <div className="wsa-last-row">
            {differenceCards.slice(3).map(([num, title, desc]) => (
              <DifferenceCard desc={desc} num={num} title={title} key={num} />
            ))}
          </div>

          <MobileBelt
            className="wsa-mobile-slider"
            current={diffSlide}
            setCurrent={setDiffSlide}
            total={differenceCards.length}
          >
            {differenceCards.map(([num, title, desc]) => (
              <DifferenceCard desc={desc} num={num} title={title} key={num} />
            ))}
          </MobileBelt>
        </div>
      </section>

      <section className="cta-section">
        <div className="deco-ring deco-ring-1" />
        <div className="deco-ring deco-ring-2" />
        <div className="cta-inner">
          <h2>Get personalized guidance and take the first step towards your study abroad journey.</h2>
          <div className="cta-divider"><div /><span /><div /></div>
          <a className="cta-btn" href="/contact-us">Get Free Consultation <ArrowIcon /></a>
          <div className="trust-strip">
            {["100% Free & No Obligation", "Expert Advisors", "99% Visa Success Rate"].map((item) => (
              <span className="trust-item" key={item}><CheckIcon />{item}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function DifferenceCard({ desc, num, title }: { desc: string; num: string; title: string }) {
  return (
    <article className="wsa-card">
      <div className="wsa-number">{num}</div>
      <div className="wsa-icon">{num}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </article>
  );
}

function MobileBelt({
  children,
  className,
  current,
  setCurrent,
  total,
}: {
  children: React.ReactNode[];
  className: string;
  current: number;
  setCurrent: (value: number) => void;
  total: number;
}) {
  return (
    <div className={className}>
      <div className="about-mobile-viewport">
        <div className="about-mobile-belt" style={{ width: `${total * 100}%`, transform: `translateX(-${current * (100 / total)}%)` }}>
          {children.map((child, index) => (
            <div className="about-mobile-slide" key={index} style={{ width: `${100 / total}%` }}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <Dots total={total} current={current} setCurrent={setCurrent} />
    </div>
  );
}

function Dots({ current, setCurrent, total }: { current: number; setCurrent: (value: number) => void; total: number }) {
  return (
    <div className="about-dots">
      {Array.from({ length: total }).map((_, index) => (
        <button
          aria-label={`Slide ${index + 1}`}
          className={index === current ? "active" : ""}
          key={index}
          type="button"
          onClick={() => setCurrent(index)}
        />
      ))}
    </div>
  );
}

