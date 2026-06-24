"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Header from "./components/Header";
import ReelsSection from "./components/ReelsSection";

const services = [
  {
    title: "Student Visa Services",
    desc: "Complete Study Abroad Assistance - From Dream to Departure",
    url: "/student-visa",
    popular: true,
    steps: [
      "Strategy & Admission Planning",
      "Financial Structuring",
      "Visa Filing & Approval Guidance",
    ],
  },
  {
    title: "Visitor Visa",
    desc: "Meet Your Loved Ones Abroad - Without Stress or Confusion",
    url: "/visitor-visa",
    steps: [
      "Case Assessment & Travel Planning",
      "Strong Documentation Setup",
      "Application Filing & Decision Support",
    ],
  },
  {
    title: "Dependant Visa",
    desc: "Stay Together. Work Legally. Build Your Future Abroad.",
    url: "/dependant-visa",
    steps: [
      "Eligibility & Visa Strategy",
      "Relationship & Financial Documentation",
      "Visa Filing & Settlement Guidance",
    ],
  },
  {
    title: "Onshore Services",
    desc: "Professional Support Even After You Land in Canada",
    url: "/canada-onshore",
    steps: [
      "Case Review & Planning",
      "Application Preparation",
      "Online Filing & Approval Support",
    ],
  },
];

const trustCards = [
  {
    title: "High Visa Success Ratio",
    desc: "Industry-leading visa approval rate backed by strategic documentation and expert review.",
    image:
      "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/5.png",
  },
  {
    title: "Onshore + Off Shore Expertise",
    desc: "Support that does not stop after you land abroad.",
    image:
      "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/7.png",
  },
  {
    title: "Complete End-To-End Support",
    desc: "From admission to visa to flight tickets, everything handled under one roof.",
    image:
      "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/6.png",
  },
  {
    title: "Transparent Process",
    desc: "Clear timelines. Honest guidance. No false promises.",
    image:
      "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/8.png",
  },
  {
    title: "Personalized Profile Strategy",
    desc: "No copy-paste files. Every profile is built uniquely.",
    image:
      "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/9.png",
  },
  {
    title: "Start Your Journey for Free",
    desc: "Get expert advice at no cost. Book a one-on-one session with our experts.",
    image:
      "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/Untitled-62-x-62-px-1.png",
  },
];

const destinations = [
  {
    country: "Canada",
    code: "🇨🇦",
    flagCode: "ca",
    growth: "+25% growth",
    tagline: "Study. Work. Settle.",
    desc: "Globally respected education with strong post-study work pathways.",
    universities: "100+",
    cost: "INR 15-20L/yr",
    work: "3 Years",
    tags: ["Express Entry System", "High Quality of Life", "Multicultural Society"],
    url: "/canada",
    popular: true,
  },
  {
    country: "Australia",
    code: "🇦🇺",
    flagCode: "au",
    growth: "+18% growth",
    tagline: "High ROI. High Lifestyle.",
    desc: "Globally ranked universities with excellent work rights.",
    universities: "25+",
    cost: "INR 20-25L/yr",
    work: "2-3 Years",
    tags: ["World-class Research", "Beautiful Climate", "Strong Economy"],
    url: "/australia",
    popular: true,
  },
  {
    country: "United Kingdom",
    code: "🇬🇧",
    flagCode: "gb",
    growth: "+12% growth",
    tagline: "1-Year Master's. Global Exposure.",
    desc: "Fast-track degrees with excellent career prospects.",
    universities: "70+",
    cost: "INR 20-30L/yr",
    work: "18 Months",
    tags: ["Rich History", "Global Recognition", "Research Opportunities"],
    url: "/united-kingdom",
  },
  {
    country: "USA",
    code: "🇺🇸",
    flagCode: "us",
    growth: "+15% growth",
    tagline: "World's Largest Education Hub.",
    desc: "Unmatched academic flexibility and global career scope.",
    universities: "150+",
    cost: "INR 20-30L/yr",
    work: "3 Years",
    tags: ["Top Ranked Colleges", "OPT Work Program", "Tech & Innovation Hub"],
    url: "/usa",
  },
  {
    country: "New Zealand",
    code: "🇳🇿",
    flagCode: "nz",
    growth: "+10% growth",
    tagline: "Peaceful Country. Powerful Degrees.",
    desc: "Industry-focused education in a safe, welcoming environment.",
    universities: "15+",
    cost: "INR 25-40L/yr",
    work: "3 Years",
    tags: ["Safe Environment", "Work While Studying", "PR Pathways"],
    url: "/new-zealand",
  },
];

const essentials = [
  ["Currency Exchange", "Secure international money transfers at competitive rates.", "/currency-exchange"],
  ["Flight Booking", "Affordable student flight options with flexible dates and baggage benefits.", "/flight-booking"],
  ["Travel Insurance", "Comprehensive coverage for medical, travel, and emergency needs abroad.", "/travel-insurance"],
  ["Pre-Departure Guidance", "Step-by-step briefing on travel, documents, culture, and settling abroad confidently.", "/pre-departure-guidance"],
  ["Accommodation Assistance", "Support in finding safe, budget-friendly student housing near your university.", "/accommodation"],
  ["Visa Filing Support", "Expert assistance with documentation, application review, and visa submission for a smoother approval process.", "/visa-filing-support"],
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ServiceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

export default function Home() {
  const [serviceSlide, setServiceSlide] = useState(0);
  const [trustSlide, setTrustSlide] = useState(0);
  const [destSlide, setDestSlide] = useState(0);
  const [essSlide, setEssSlide] = useState(0);

  // Form state
  const [formLoading, setFormLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      destination: formData.get("destination"),
      formType: "journey",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormMessage({ type: "success", text: result.message });
        form.reset();
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
    <main className="site-page">
      <Header />

      <section className="hero-banner-section">
        <a href="/contact-us" className="hero-cta-button">
          Book Free Counselling
        </a>
        <img
          src="/banners/Artboard 1 copy.png"
          alt="Turning study dreams into global realities - DS Overseas"
          className="hero-banner-desktop"
        />
        <img
          src="/banners/Artboard 1 copy 2.png"
          alt="Turning study dreams into global realities - DS Overseas"
          className="hero-banner-mobile"
        />
      </section>

      <section className="journey section">
        <div>
          <h1>Start Your Journey Today</h1>
          <p>
            Ready to study at your dream university? Fill out the form below to
            unlock professional visa support and admission guidance tailored to
            your profile.
          </p>
        </div>
        <form className="journey-form" onSubmit={handleFormSubmit}>
          <input name="first-name" placeholder="First Name" required disabled={formLoading} />
          <input name="last-name" placeholder="Last Name" required disabled={formLoading} />
          <input className="full" name="email" placeholder="Email" type="email" required disabled={formLoading} />
          <input className="full" name="phone" placeholder="Phone No" type="tel" required disabled={formLoading} />
          <select className="full" name="destination" defaultValue="" required disabled={formLoading}>
            <option value="" disabled>Select Preferred Study Destination</option>
            <option value="Canada">Canada</option>
            <option value="USA">USA</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="New Zealand">New Zealand</option>
          </select>
          <button className="full" type="submit" disabled={formLoading}>
            {formLoading ? "Submitting..." : "Get Free Counselling"}
          </button>
          {formMessage && (
            <div className={`full form-message ${formMessage.type}`}>
              {formMessage.text}
            </div>
          )}
        </form>
      </section>

      <section className="stats section-blue">
        <h2>Expert guidance for your international journey</h2>
        <div className="stat-grid">
          {[
            ["10,000+", "Students Placed", "Successfully guided students to their dream universities"],
            ["300+", "University Partners", "Direct and indirect partnerships with top-ranked institutions"],
            ["99%", "Visa Success Rate", "Industry-leading visa approval success"],
            ["10+", "Countries", "Global network of educational opportunities"],
          ].map(([value, title, desc]) => (
            <article className="stat-card" key={title}>
              <strong>{value}</strong>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <SliderSection
        className="services"
        title="Our Expert Services"
        subtitle="Comprehensive abroad education and immigration support tailored to help you achieve your global goals."
        current={serviceSlide}
        setCurrent={setServiceSlide}
        total={services.length}
      >
        {services.map((service) => (
          <article className="info-card service-card" key={service.title}>
            {service.popular && <span className="badge">Most Popular</span>}
            <div className="icon-box"><ServiceIcon /></div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <ul>
              {service.steps.map((step) => (
                <li key={step}><CheckIcon />{step}</li>
              ))}
            </ul>
            <a className="primary-btn" href={service.url}>Know More <ArrowIcon /></a>
          </article>
        ))}
      </SliderSection>

      <section className="trust-copy">
        <h2>Why 10,000+ Students Trust Us</h2>
        <p>We do not just process applications. We build successful futures.</p>
        <p>Clear strategy. Honest guidance. Real results.</p>
      </section>

      <SliderSection
        className="trust"
        current={trustSlide}
        setCurrent={setTrustSlide}
        total={trustCards.length}
      >
        {trustCards.map((card) => (
          <article className="trust-card" key={card.title}>
            <img src={card.image} alt="" />
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </article>
        ))}
      </SliderSection>

      <picture className="banner secondary-banner">
        <source
          srcSet="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-14-at-10.13.41-AM.jpeg"
          media="(max-width: 768px)"
        />
        <img
          src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-13-at-12.39.51-PM.jpeg"
          alt="Study abroad banner"
        />
      </picture>

      <SliderSection
        className="destinations"
        title="Top Study Destinations"
        subtitle="Explore the world's best countries for higher education and find the right fit for your career and lifestyle."
        current={destSlide}
        setCurrent={setDestSlide}
        total={destinations.length}
      >
        {destinations.map((destination) => (
          <article className="destination-card" key={destination.country}>
            <div className={`destination-ribbon ${destination.popular ? "show" : ""}`}>
              Most Popular
            </div>
            <div className="destination-body">
              <div className="country-row">
                <span className={`flag-code fi fi-${destination.flagCode}`}></span>
                <div>
                  <h3>{destination.country}</h3>
                </div>
              </div>
              <h4>{destination.tagline}</h4>
              <p>{destination.desc}</p>
              <div className="destination-stats">
                <span><b>{destination.universities}</b>Universities</span>
                <span><b>{destination.cost}</b>Avg. Cost</span>
                <span><b>{destination.work}</b>Work Rights</span>
              </div>
              <div className="tag-list">
                {destination.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <a className="primary-btn" href={destination.url}>Explore {destination.country} <ArrowIcon /></a>
            </div>
          </article>
        ))}
      </SliderSection>

      <ReelsSection />

      <SliderSection
        className="essentials"
        title="Student Essential Services"
        current={essSlide}
        setCurrent={setEssSlide}
        total={essentials.length}
      >
        {essentials.map(([title, desc]) => (
          <article className="essential-card" key={title}>
            <div className="icon-box"><ServiceIcon /></div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </SliderSection>
    </main>
  );
}

function SliderSection({
  children,
  className,
  current,
  setCurrent,
  subtitle,
  title,
  total,
}: {
  children: React.ReactNode;
  className: string;
  current: number;
  setCurrent: (value: number) => void;
  subtitle?: string;
  title?: string;
  total: number;
}) {
  return (
    <section className={`section slider-section ${className}`}>
      {title && (
        <div className="section-header">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
      <div className="desktop-grid">{children}</div>
      <div className="mobile-slider">
        <div
          className="slider-belt"
          style={{ transform: `translateX(-${current * (100 / total)}%)`, width: `${total * 100}%` }}
        >
          {Array.isArray(children)
            ? children.map((child, index) => (
                <div className="slide" key={index} style={{ width: `${100 / total}%` }}>
                  {child}
                </div>
              ))
            : children}
        </div>
        <div className="slider-nav">
          <button
            aria-label="Previous"
            disabled={current === 0}
            type="button"
            onClick={() => setCurrent(Math.max(0, current - 1))}
          >
            ‹
          </button>
          <div className="dots">
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
          <button
            aria-label="Next"
            disabled={current === total - 1}
            type="button"
            onClick={() => setCurrent(Math.min(total - 1, current + 1))}
          >
            ›
          </button>
        </div>
        <div className="counter"><span>{current + 1}</span> / {total}</div>
      </div>
    </section>
  );
}
