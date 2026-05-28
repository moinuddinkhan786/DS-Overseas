"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from "react";
import Header from "./components/Header";

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

const reels = [
  {
    name: "Hiren Makwana",
    country: "UK",
    countryCode: "🇬🇧",
    video: "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/Hiren-Makwana-03.mp4",
  },
  {
    name: "Success Story #2",
    country: "Australia",
    countryCode: "🇦🇺",
    video: "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/1256470f0c5543659ad1f8fcf0f850bc.mp4",
  },
  {
    name: "Success Story #1",
    country: "Canada",
    countryCode: "🇨🇦",
    video: "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/485da6d2d7214f26835b74fa9191a40a.mp4",
    specialPosition: true, // Flag for special video positioning
  },
  {
    name: "Milan Patel",
    country: "USA",
    countryCode: "🇺🇸",
    video: "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/Milan-Patel-.mp4",
  },
  {
    name: "Chetan",
    country: "Canada",
    countryCode: "🇨🇦",
    video: "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/Chetan.mp4",
  },
  {
    name: "Prerakbhai Patel",
    country: "Australia",
    countryCode: "🇦🇺",
    video: "https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/Prerakbhai-Patel.mp4",
  },
];

const essentials = [
  ["Currency Exchange", "Secure international money transfers at competitive rates.", "/currency-exchange"],
  ["Flight Booking", "Affordable student flight options with flexible dates and baggage benefits.", "/flight-booking"],
  ["Travel Insurance", "Comprehensive coverage for medical, travel, and emergency needs abroad.", "/travel-insurance"],
  ["Pre-Departure Guidance", "Step-by-step briefing on travel, documents, culture, and settling abroad confidently.", "/pre-departure-guidance"],
  ["Accommodation Assistance", "Support in finding safe, budget-friendly student housing near your university.", "/accommodation"],
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
  // With 5 visible cards, center is at index 2. Start slideIndex at reels.length so center shows first reel
  const [slideIndex, setSlideIndex] = useState(reels.length);
  const [isSliding, setIsSliding] = useState(false);
  const [isJumping, setIsJumping] = useState(false); // For instant position reset without animation
  const [playingStates, setPlayingStates] = useState<boolean[]>(reels.map((_, i) => i === 0));
  const [mutedStates, setMutedStates] = useState<boolean[]>(reels.map(() => true));
  const [visibleCards, setVisibleCards] = useState(5); // Responsive number of visible cards
  const [isPaused, setIsPaused] = useState(false); // Pause auto-slide on hover
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formLoading, setFormLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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

  // Update visible cards count based on viewport width (matches CSS breakpoints)
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width <= 380) {
        setVisibleCards(1);
      } else if (width <= 580) {
        setVisibleCards(2);
      } else if (width <= 850) {
        setVisibleCards(3);
      } else if (width <= 1100) {
        setVisibleCards(4);
      } else {
        setVisibleCards(5);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);


  // Calculate slide position based on slideIndex
  const getSlideTransform = () => {
    // Each card width depends on visible cards count
    const cardWidthPercent = 100 / visibleCards;
    const offset = slideIndex * cardWidthPercent;
    return `translateX(-${offset}%)`;
  };

  // Handle navigation with infinite loop
  const handlePrev = () => {
    if (isSliding) return;
    setIsSliding(true);
    setSlideIndex(prev => prev - 1);
    setTimeout(() => setIsSliding(false), 500);
  };

  const handleNext = () => {
    if (isSliding) return;
    setIsSliding(true);
    setSlideIndex(prev => prev + 1);
    setTimeout(() => setIsSliding(false), 500);
  };

  // Reset slideIndex to middle section when reaching boundaries (for seamless infinite loop)
  useEffect(() => {
    // If we've gone too far right (past the middle section)
    if (slideIndex >= reels.length * 2) {
      const timeout = setTimeout(() => {
        // Jump back to middle section without animation
        setIsJumping(true);
        setSlideIndex(slideIndex - reels.length);
        // Re-enable transition after the jump
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsJumping(false);
          });
        });
      }, 520); // After animation completes
      return () => clearTimeout(timeout);
    }
    // If we've gone too far left (before the middle section)
    if (slideIndex < reels.length) {
      const timeout = setTimeout(() => {
        // Jump forward to middle section without animation
        setIsJumping(true);
        setSlideIndex(slideIndex + reels.length);
        // Re-enable transition after the jump
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsJumping(false);
          });
        });
      }, 520); // After animation completes
      return () => clearTimeout(timeout);
    }
  }, [slideIndex]);

  // Calculate center index directly based on visible cards
  // For 5 cards center is at position 2, for 3 cards at position 1, for 2 cards at position 0 (leftmost)
  const centerOffset = Math.floor(visibleCards / 2);
  const centerReelIndex = ((slideIndex + centerOffset) % reels.length + reels.length) % reels.length;

  // Auto-slide functionality (every 4 seconds)
  useEffect(() => {
    if (isPaused) return;

    const autoSlideTimer = setInterval(() => {
      if (!isSliding) {
        setIsSliding(true);
        setSlideIndex(prev => prev + 1);
        setTimeout(() => setIsSliding(false), 500);
      }
    }, 4000);

    return () => clearInterval(autoSlideTimer);
  }, [isSliding, isPaused]);

  // Auto-play ONLY the center video, pause and mute all others
  useEffect(() => {
    const playCenter = async () => {
      for (let index = 0; index < videoRefs.current.length; index++) {
        const video = videoRefs.current[index];
        if (video) {
          if (index === centerReelIndex) {
            video.muted = true;
            // Force load the video
            video.load();

            try {
              // Wait for video to be ready
              if (video.readyState < 2) {
                await new Promise((resolve) => {
                  video.addEventListener('loadeddata', resolve, { once: true });
                  // Timeout fallback
                  setTimeout(resolve, 2000);
                });
              }

              // Try to play
              await video.play();
              setPlayingStates(prev => {
                const newStates = [...prev];
                newStates[index] = true;
                return newStates;
              });
            } catch {
              // If autoplay fails, user will need to click play button
            }
          } else {
            video.pause();
            video.muted = true;
            video.currentTime = 0;
          }
        }
      }

      setMutedStates(prev => prev.map(() => true));
    };

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      playCenter();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [centerReelIndex]);

  // Update progress bars
  useEffect(() => {
    const updateProgress = () => {
      videoRefs.current.forEach((video, index) => {
        if (video && video.duration) {
          const progressEl = document.getElementById(`progress-${index}`);
          if (progressEl) {
            const percent = (video.currentTime / video.duration) * 100;
            progressEl.style.width = `${percent}%`;
          }
        }
      });
    };

    const interval = setInterval(updateProgress, 100);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = (index: number) => {
    // Only allow play/pause on center video
    if (index !== centerReelIndex) return;

    const video = videoRefs.current[index];
    if (video) {
      if (playingStates[index]) {
        video.pause();
        setPlayingStates(prev => {
          const newStates = [...prev];
          newStates[index] = false;
          return newStates;
        });
      } else {
        // Ensure video is loaded before playing
        if (video.readyState < 2) {
          video.load();
        }
        video.play()
          .then(() => {
            setPlayingStates(prev => {
              const newStates = [...prev];
              newStates[index] = true;
              return newStates;
            });
          })
          .catch(() => {
            // Try one more time after a short delay
            setTimeout(() => {
              video.play().catch(() => {});
            }, 100);
          });
      }
    }
  };

  const toggleMute = (index: number) => {
    // Only allow mute toggle on center video
    if (index !== centerReelIndex) return;

    const video = videoRefs.current[index];
    if (video) {
      const willUnmute = mutedStates[index];

      if (willUnmute) {
        // Mute all other videos first
        videoRefs.current.forEach((v, i) => {
          if (v && i !== index) {
            v.muted = true;
          }
        });
        video.muted = false;
        setMutedStates(prev => {
          const newStates = prev.map(() => true);
          newStates[index] = false;
          return newStates;
        });
      } else {
        video.muted = true;
        setMutedStates(prev => {
          const newStates = [...prev];
          newStates[index] = true;
          return newStates;
        });
      }
    }
  };

  // Slide to make a specific reel the center
  const slideToReel = (reelIndex: number) => {
    if (isSliding) return;
    const diff = reelIndex - centerReelIndex;
    if (diff === 0) return;

    setIsSliding(true);
    setSlideIndex(prev => prev + diff);
    setTimeout(() => setIsSliding(false), 500);
  };

  // Create extended reels array for infinite scroll (clone cards at start and end)
  const extendedReels = [...reels, ...reels, ...reels];

  return (
    <main className="site-page">
      <Header />

      <section className="hero-banner-section">
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
          <button className="full" type="submit" disabled={formLoading}>
            {formLoading ? "Submitting..." : "Submit"}
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
            ["25,000+", "Students Placed", "Successfully guided students to their dream universities"],
            ["500+", "University Partners", "Direct and indirect partnerships with top-ranked institutions"],
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
        <h2>Why 15,000+ Students Trust Us</h2>
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
                <span className="flag-code">{destination.code}</span>
                <div>
                  <h3>{destination.country}</h3>
                  <span>{destination.growth}</span>
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

      <section className="reels">
        <div className="section-header dark">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10h14V4h-3.5zM2 5h12v8H2V5z"/>
            </svg>
            Real Stories · Real Results
          </span>
          <h2>DS Overseas <span className="accent">Students</span> Success Stories</h2>
          <p>Our favorite milestone isn&apos;t a number — it&apos;s seeing a student finally stand where they once only dreamed of being.</p>
        </div>
        <div
          className="reels-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className="reel-nav-btn reel-nav-prev"
            type="button"
            onClick={handlePrev}
            aria-label="Previous video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div className="reels-track-outer">
            <div
              className={`reels-track ${isJumping ? "no-transition" : ""}`}
              ref={trackRef}
              style={{ transform: getSlideTransform() }}
            >
              {extendedReels.map((reel, index) => {
                const originalIndex = index % reels.length;
                const isCenter = originalIndex === centerReelIndex;
                return (
                  <article
                    className={`reel-card ${playingStates[originalIndex] ? "is-playing" : ""} ${isCenter ? "is-center" : ""}`}
                    key={`${reel.video}-${index}`}
                    onClick={() => {
                      // Calculate how many slides to move to bring this card to center
                      const currentCenterPosition = slideIndex + centerOffset;
                      const diff = index - currentCenterPosition;
                      if (diff !== 0 && !isSliding) {
                        setIsSliding(true);
                        setSlideIndex(prev => prev + diff);
                        setTimeout(() => setIsSliding(false), 500);
                      }
                    }}
                  >
                    <video
                      ref={(el) => {
                        // Store ref for the middle set of extended reels (the ones that are actually visible initially)
                        if (index >= reels.length && index < reels.length * 2) {
                          videoRefs.current[originalIndex] = el;
                        }
                      }}
                      src={reel.video}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      style={{
                        WebkitTransform: 'translateZ(0)',
                        objectFit: 'cover',
                        objectPosition: reel.specialPosition ? 'center 20%' : 'center center'
                      }}
                      onLoadedData={(e: React.SyntheticEvent<HTMLVideoElement>) => {
                        const video = e.currentTarget;
                        if (originalIndex === centerReelIndex) {
                          video.muted = true;
                          video.play().catch(() => {
                            // Silent fail - user can click play button
                          });
                        }
                      }}
                    />
                    <div className="reel-overlay" />

                    {/* Mute button - top right */}
                    <button
                      className="reel-mute-btn"
                      type="button"
                      onClick={(e) => { e.stopPropagation(); toggleMute(originalIndex); }}
                      aria-label={mutedStates[originalIndex] ? "Unmute" : "Mute"}
                    >
                      {mutedStates[originalIndex] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.86 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.86l3.523-3.784a1 1 0 011-.14zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.86 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.86l3.523-3.784a1 1 0 011-.14zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"/>
                        </svg>
                      )}
                    </button>

                    {/* Play/Pause button - center */}
                    <button
                      className="reel-play-btn"
                      type="button"
                      onClick={(e) => { e.stopPropagation(); togglePlay(originalIndex); }}
                      aria-label={playingStates[originalIndex] ? "Pause" : "Play"}
                    >
                      {playingStates[originalIndex] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </button>

                    {/* Country badge and label - bottom */}
                    <div className="reel-info">
                      <span className="reel-country-badge">
                        {reel.countryCode || "🌍"} {reel.country.toUpperCase()}
                      </span>
                      <strong className="reel-name">{reel.name}</strong>
                      <small className="reel-subtitle">DS Overseas Student</small>
                    </div>

                    {/* Progress bar */}
                    <div className="reel-progress">
                      <div className="reel-progress-fill" id={`progress-${originalIndex}`} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <button
            className="reel-nav-btn reel-nav-next"
            type="button"
            onClick={handleNext}
            aria-label="Next video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        <div className="reel-dots">
          {reels.map((reel, index) => (
            <button
              aria-label={`Show ${reel.name}`}
              className={index === centerReelIndex ? "active" : ""}
              key={reel.name}
              type="button"
              onClick={() => slideToReel(index)}
            />
          ))}
        </div>
      </section>

      <SliderSection
        className="essentials"
        title="Student Essential Services"
        current={essSlide}
        setCurrent={setEssSlide}
        total={essentials.length}
      >
        {essentials.map(([title, desc, url]) => (
          <article className="essential-card" key={title}>
            <div className="icon-box"><ServiceIcon /></div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <a href={url}>Learn More <ArrowIcon /></a>
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
