"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./Header.css";

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 850);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenMenu(null);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    setOpenMenu(null);
  };

  const handleMouseEnter = (menu: string) => {
    if (!isMobile) setOpenMenu(menu);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setOpenMenu(null);
  };

  const toggleDropdown = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <header className="ds-header">
      <div className="ds-header-bar">
        {/* Top utility row */}
        <div className="ds-header-utility">
          <div className="ds-header-hours">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2" />
              <path d="M12 7v5l3.5 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Monday - Friday : 10:00AM - 7:00AM</span>
          </div>
          <div className="ds-header-socials">
            <a href="https://www.facebook.com/profile.php?id=61586558824192" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="#fff" width="16" height="16">
                <path d="M14 7h2.2V3.6C15.8 3.5 14.7 3.4 13.5 3.4c-2.6 0-4.4 1.6-4.4 4.5V10H6.2v3.4h2.9V22h3.5v-8.6h2.8l.5-3.4h-3.3V8.3c0-1 .3-1.3 1.2-1.3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/dsoverseasconsultants?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" stroke="#fff" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2" />
                <circle cx="17.2" cy="6.8" r="1.3" fill="#fff" />
              </svg>
            </a>
            <a href="#" aria-label="X">
              <svg viewBox="0 0 24 24" fill="#fff" width="16" height="16">
                <path d="M17.5 3h3l-6.6 7.5L21.7 21h-5.9l-4.3-5.6L6.5 21H3.4l7-8L2.6 3h6l3.9 5.2L17.5 3zm-1 16h1.7L8 4.8H6.2L16.5 19z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/ds-overseas-education-consultants/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="#fff" width="16" height="16">
                <path d="M4.8 3.5a2 2 0 110 4 2 2 0 010-4zM3.2 9h3.2v11.5H3.2V9zm5.4 0h3.1v1.6h.05c.43-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.9v6.7h-3.2v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v6H8.6V9z" />
              </svg>
            </a>
          </div>
        </div>

        {/* White navigation pill */}
        <nav className={`ds-header-navbar ${menuOpen ? "nav-open" : ""}`}>
          {/* Logo */}
          <Link href="/" className="ds-header-logo">
            <img
              src="/logo.png"
              alt="DS Overseas Education Consultants"
              className="ds-header-logo-img"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="ds-header-menu-desktop">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li
              className={`ds-header-has-dropdown ${openMenu === "services" ? "dropdown-open" : ""}`}
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <button type="button" onClick={() => toggleDropdown("services")}>
                Our Services
                <svg className="ds-header-caret" viewBox="0 0 24 24" fill="none" width="16" height="16">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul className="ds-header-dropdown">
                <li>
                  <Link href="/student-visa">Student Visa</Link>
                </li>
                <li>
                  <Link href="/visitor-visa">Visitor Visa</Link>
                </li>
                <li>
                  <Link href="/dependant-visa">Dependant Visa</Link>
                </li>
              </ul>
            </li>
            <li
              className={`ds-header-has-dropdown ${openMenu === "destinations" ? "dropdown-open" : ""}`}
              onMouseEnter={() => handleMouseEnter("destinations")}
              onMouseLeave={handleMouseLeave}
            >
              <button type="button" onClick={() => toggleDropdown("destinations")}>
                Destinations
                <svg className="ds-header-caret" viewBox="0 0 24 24" fill="none" width="16" height="16">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul className="ds-header-dropdown">
                <li>
                  <Link href="/canada">Canada</Link>
                </li>
                <li>
                  <Link href="/usa">USA</Link>
                </li>
                <li>
                  <Link href="/uk">UK</Link>
                </li>
                <li>
                  <Link href="/australia">Australia</Link>
                </li>
                <li>
                  <Link href="/new-zealand">New Zealand</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>

          {/* Right icons */}
          <div className="ds-header-actions">
            <button
              className="ds-header-burger"
              aria-label="Menu"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>

        {/* Overlay */}
        {menuOpen && <div className="ds-header-overlay" onClick={closeMenu} />}

        {/* Mobile Drawer Menu */}
        <div className={`ds-header-menu-mobile ${menuOpen ? "menu-open" : ""}`}>
          {/* Mobile drawer header with logo and close button */}
          <div className="ds-drawer-header">
            <Link href="/" className="ds-drawer-logo" onClick={handleLinkClick}>
              <img
                src="/logo.png"
                alt="DS Overseas Education Consultants"
              />
            </Link>
            <button
              className="ds-drawer-close"
              aria-label="Close menu"
              type="button"
              onClick={closeMenu}
            >
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Mobile drawer content */}
          <div className="ds-drawer-content">
            {/* Quick Links Section */}
            <div className="ds-drawer-section">
              <button
                className="ds-drawer-section-title"
                onClick={() => toggleDropdown("drawer-quick")}
                type="button"
              >
                Quick Links
                <svg
                  className={`ds-drawer-chevron ${openMenu === "drawer-quick" ? "open" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  width="16"
                  height="16"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul className={`ds-drawer-links ${openMenu === "drawer-quick" ? "open" : ""}`}>
                <li>
                  <Link href="/" onClick={handleLinkClick}>Home</Link>
                </li>
                <li>
                  <Link href="/about-us" onClick={handleLinkClick}>About Us</Link>
                </li>
                <li>
                  <Link href="/contact-us" onClick={handleLinkClick}>Contact Us</Link>
                </li>
              </ul>
            </div>

            {/* Our Services Section */}
            <div className="ds-drawer-section">
              <button
                className="ds-drawer-section-title"
                onClick={() => toggleDropdown("drawer-services")}
                type="button"
              >
                Our Services
                <svg
                  className={`ds-drawer-chevron ${openMenu === "drawer-services" ? "open" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  width="16"
                  height="16"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul className={`ds-drawer-links ${openMenu === "drawer-services" ? "open" : ""}`}>
                <li>
                  <Link href="/student-visa" onClick={handleLinkClick}>Student Visa</Link>
                </li>
                <li>
                  <Link href="/visitor-visa" onClick={handleLinkClick}>Visitor Visa</Link>
                </li>
                <li>
                  <Link href="/dependant-visa" onClick={handleLinkClick}>Dependant Visa</Link>
                </li>
              </ul>
            </div>

            {/* Study Destinations Section */}
            <div className="ds-drawer-section">
              <button
                className="ds-drawer-section-title"
                onClick={() => toggleDropdown("drawer-destinations")}
                type="button"
              >
                Study Destinations
                <svg
                  className={`ds-drawer-chevron ${openMenu === "drawer-destinations" ? "open" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  width="16"
                  height="16"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul className={`ds-drawer-links ${openMenu === "drawer-destinations" ? "open" : ""}`}>
                <li>
                  <Link href="/canada" onClick={handleLinkClick}>Canada</Link>
                </li>
                <li>
                  <Link href="/usa" onClick={handleLinkClick}>USA</Link>
                </li>
                <li>
                  <Link href="/uk" onClick={handleLinkClick}>UK</Link>
                </li>
                <li>
                  <Link href="/australia" onClick={handleLinkClick}>Australia</Link>
                </li>
                <li>
                  <Link href="/new-zealand" onClick={handleLinkClick}>New Zealand</Link>
                </li>
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="ds-drawer-section">
              <button
                className="ds-drawer-section-title"
                onClick={() => toggleDropdown("drawer-contact")}
                type="button"
              >
                Contact Us
                <svg
                  className={`ds-drawer-chevron ${openMenu === "drawer-contact" ? "open" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  width="16"
                  height="16"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul className={`ds-drawer-contact ${openMenu === "drawer-contact" ? "open" : ""}`}>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>106/107, Atlantis, Above jasmin Mobile, Nr. Genda circle, Vadodara - 390023</span>
                </li>
                <li>
                  <a href="tel:+917046755605">
                    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>+91 7046755605</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:ceo@dsoverseasdu.com">
                    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>ceo@dsoverseasdu.com</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="ds-drawer-socials">
              <a href="https://www.facebook.com/profile.php?id=61586558824192" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M14 7h2.2V3.6C15.8 3.5 14.7 3.4 13.5 3.4c-2.6 0-4.4 1.6-4.4 4.5V10H6.2v3.4h2.9V22h3.5v-8.6h2.8l.5-3.4h-3.3V8.3c0-1 .3-1.3 1.2-1.3z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/dsoverseasconsultants?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                  <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="X">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.5 3h3l-6.6 7.5L21.7 21h-5.9l-4.3-5.6L6.5 21H3.4l7-8L2.6 3h6l3.9 5.2L17.5 3zm-1 16h1.7L8 4.8H6.2L16.5 19z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/ds-overseas-education-consultants/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M4.8 3.5a2 2 0 110 4 2 2 0 010-4zM3.2 9h3.2v11.5H3.2V9zm5.4 0h3.1v1.6h.05c.43-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.9v6.7h-3.2v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v6H8.6V9z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
