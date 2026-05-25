"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import "./styles.css";
import Header from "../components/Header";


export default function ContactUsPage() {
  return (
    <main className="contact-page">
      {/* Hero Section with Header */}
      <section className="hero-section">
        <Header />
        {/* Background Image */}
        <img
          className="hero-bg-desktop"
          src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/ns.png"
          alt="Contact Us Banner"
        />
        <img
          className="hero-bg-mobile"
          src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/ns-1.png"
          alt="Contact Us Banner"
        />
      </section>

      {/* Section 2: Reach Out Section */}
      <ReachSection />

      {/* Section 3: Contact Form Header */}
      <ContactFormHeader />

      {/* Section 4: Contact Image */}
      <ContactImageSection />

      {/* Section 5: CTA Section */}
      <CTASection />
    </main>
  );
}

// Section 2: Reach Out Section
function ReachSection() {
  return (
    <section className="reach-section">
      <div className="reach-blob reach-blob-top"></div>
      <div className="reach-blob reach-blob-btm"></div>

      <div className="reach-inner">
        <div className="reach-badge">
          <span className="reach-badge-dot"></span>
          We&apos;re Here to Help
        </div>
        <h2 className="reach-headline">
          Not Sure Where to Start? Let&apos;s <span>Talk.</span>
        </h2>
        <p className="reach-subtext">
          Reach out to our expert team — visit us in person, give us a call, or drop us an email. We&apos;re ready to guide you.
        </p>

        <div className="reach-grid">
          {/* Visit Card */}
          <div className="reach-card rc-visit">
            <div className="rc-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <span className="rc-tag">In Person</span>
            <div className="rc-title">Visit Our Office</div>
            <p className="rc-desc">
              Come meet our advisors face-to-face and get personalised guidance for your entire study abroad journey.
            </p>

            <a
              className="rc-addr-pill"
              href="https://www.google.com/maps/search/106+107+Atlantis+Above+Jasmin+Mobile+Near+Genda+Circle+Vadodara+390023"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rc-addr-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className="rc-addr-text">
                <span className="rc-addr-label">Our Address</span>
                <span className="rc-addr-line">
                  106/107, Atlantis, Above Jasmin Mobile,<br />Nr. Genda Circle, Vadodara — 390023
                </span>
              </div>
            </a>

            <div className="rc-divider"></div>
            <a
              className="rc-link"
              href="https://www.google.com/maps/search/106+107+Atlantis+Above+Jasmin+Mobile+Near+Genda+Circle+Vadodara+390023"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Call Card */}
          <a href="tel:+917046755605" className="reach-card rc-call">
            <div className="rc-icon">
              <svg viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16v.92z" />
              </svg>
            </div>
            <span className="rc-tag">Phone</span>
            <div className="rc-title">Call Us Now</div>
            <p className="rc-desc">
              Talk directly to an expert and get instant clarity on your visa and study abroad queries.
            </p>
            <div className="rc-pill">
              <svg viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16v.92z" />
              </svg>
              +91 70467 55605
            </div>
            <div className="rc-divider"></div>
            <span className="rc-link">
              Call Now
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          {/* Email Card */}
          <a href="mailto:info@dsoverseas.com" className="reach-card rc-mail">
            <div className="rc-icon">
              <svg viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
            </div>
            <span className="rc-tag">Email</span>
            <div className="rc-title">Email Us</div>
            <p className="rc-desc">
              Have questions? We&apos;re just an email away. Our team will respond with a helpful, detailed reply.
            </p>
            <div className="rc-pill">
              <svg viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
              info@dsoverseas.com
            </div>
            <div className="rc-divider"></div>
            <span className="rc-link">
              Send Email
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>

        <div className="reach-footer">
          <div className="reach-fline reach-fline-l"></div>
          <span className="reach-ftext">Response within 24 hours · Mon — Sat · 10 AM — 7 PM</span>
          <div className="reach-fline reach-fline-r"></div>
        </div>
      </div>
    </section>
  );
}

// Section 3: Contact Form Header
function ContactFormHeader() {
  return (
    <section className="content-section">
      <div className="bg-grid"></div>
      <div className="content-inner">
        <div className="form-eyebrow">Contact Us</div>
        <h2 className="form-heading">Start Your Study Abroad Journey Today</h2>
        <p className="form-subtext">
          Fill in your details and get personalized guidance for your study abroad plans.
        </p>
      </div>
    </section>
  );
}

// Section 4: Contact Form and Image Section
function ContactImageSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          formType: "contact",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setFormMessage({ type: "success", text: result.message });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          destination: '',
          message: ''
        });
      } else {
        setFormMessage({ type: "error", text: result.error });
      }
    } catch {
      setFormMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="contact-image-section">
      <div className="contact-grid">
        {/* Left Side - Image */}
        <div className="contact-image-col">
          <div className="image-frame">
            <div className="map-bg"></div>
            <div className="grid-lines"></div>

            {/* Airplane SVG */}
            <div className="plane-wrap">
              <svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
                <g fill="white" opacity="0.95">
                  <ellipse cx="100" cy="40" rx="85" ry="15" />
                  <path d="M185 35 Q205 40 185 45 Z" />
                  <path d="M18 40 Q8 12 30 28 L40 38Z" />
                  <path d="M18 40 Q8 68 30 52 L40 42Z" />
                  <path d="M118 38 Q138 4 164 14 L154 40Z" />
                  <path d="M118 42 Q138 76 164 66 L154 40Z" />
                  <path d="M50 38 Q54 22 68 30 L66 40Z" />
                  <path d="M50 42 Q54 58 68 50 L66 40Z" />
                  <ellipse cx="146" cy="21" rx="11" ry="4.5" fill="#ccd8ff" />
                  <ellipse cx="146" cy="59" rx="11" ry="4.5" fill="#ccd8ff" />
                  <circle cx="158" cy="40" r="2.8" fill="#a0b4ff" />
                  <circle cx="146" cy="40" r="2.8" fill="#a0b4ff" />
                  <circle cx="134" cy="40" r="2.8" fill="#a0b4ff" />
                  <circle cx="122" cy="40" r="2.8" fill="#a0b4ff" />
                </g>
              </svg>
            </div>

            {/* Student Image */}
            <img
              className="student-img"
              src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/form-mobile.jpg.jpeg"
              alt="Study Abroad Student"
            />

            <div className="arc"></div>
          </div>

          {/* Floating Badge */}
          <div className="badge-floating">
            <div className="b-icon">
              <svg viewBox="0 0 24 24">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div>
              <div className="b-label">Students Guided</div>
              <div className="b-value">10,000+ Abroad</div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="kd-contact-box">
          <form className="kd-cta-2-form" onSubmit={handleSubmit}>
            <div className="kd-cta-2-form-row">
              <input
                type="text"
                name="firstName"
                className="kd-cta-2-form-input"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={formLoading}
              />
              <input
                type="text"
                name="lastName"
                className="kd-cta-2-form-input"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={formLoading}
              />
            </div>

            <input
              type="email"
              name="email"
              className="kd-cta-2-form-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={formLoading}
            />

            <input
              type="tel"
              name="phone"
              className="kd-cta-2-form-input"
              placeholder="Phone No"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={formLoading}
            />

            <select
              name="destination"
              className="kd-cta-2-form-input"
              value={formData.destination}
              onChange={handleChange}
              required
              disabled={formLoading}
            >
              <option value="" disabled>Select Preferred Study Destination</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Germany">Germany</option>
              <option value="Ireland">Ireland</option>
              <option value="France">France</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Singapore">Singapore</option>
              <option value="Dubai">Dubai</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Other">Other</option>
            </select>

            <textarea
              name="message"
              className="kd-cta-2-form-input kd-cta-2-form-textarea"
              placeholder="Leave a Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              disabled={formLoading}
            />

            <button type="submit" className="kd-cta-2-form-btn" disabled={formLoading}>
              {formLoading ? "Submitting..." : "Submit"}
            </button>

            {formMessage && (
              <div className={`form-message ${formMessage.type}`}>
                {formMessage.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

// Section 5: CTA Section
function CTASection() {
  return (
    <section className="cta-section">
      {/* Decorative Rings */}
      <div className="deco-ring deco-ring-1"></div>
      <div className="deco-ring deco-ring-2"></div>
      <div className="deco-ring deco-ring-3"></div>

      {/* Floating Dots */}
      <div className="deco-dot deco-dot-1"></div>
      <div className="deco-dot deco-dot-2"></div>
      <div className="deco-dot deco-dot-3"></div>
      <div className="deco-dot deco-dot-4"></div>
      <div className="deco-dot deco-dot-5"></div>

      {/* Content */}
      <div className="cta-inner">
        {/* Top Pill Badge */}
        <div className="cta-pill">
          <span className="pill-dot"></span>
          Free Counselling
        </div>

        {/* Headline */}
        <h2 className="cta-headline">
          Book Your <span className="hl">Free Consultation</span> Today
        </h2>

        {/* Subtext */}
        <p className="cta-sub">
          Get personalized guidance and take the first step towards your study abroad journey.
        </p>

        {/* Ornament Divider */}
        <div className="cta-divider">
          <div className="div-line"></div>
          <div className="div-gem"></div>
          <div className="div-line"></div>
        </div>

        {/* Main CTA Button */}
        <a href="#" className="cta-btn">
          Get Free Consultation
          <span className="btn-arrow">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </a>

        {/* Trust Strip */}
        <div className="trust-strip">
          <div className="trust-item">
            <div className="trust-tick">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5l2.5 2.5L8 3"
                  stroke="#fff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            100% Free &amp; No Obligation
          </div>

          <div className="trust-sep"></div>

          <div className="trust-item">
            <div className="trust-tick">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5l2.5 2.5L8 3"
                  stroke="#fff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            Expert Advisors
          </div>

          <div className="trust-sep"></div>

          <div className="trust-item">
            <div className="trust-tick">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5l2.5 2.5L8 3"
                  stroke="#fff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            99% Visa Success Rate
          </div>
        </div>
      </div>
    </section>
  );
}
