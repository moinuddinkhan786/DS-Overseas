"use client";

import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ds-footer">
      <div className="ds-footer-container">
        {/* Main footer content */}
        <div className="ds-footer-grid">
          {/* Company Info */}
          <div className="ds-footer-column">
            <div className="ds-footer-logo">
              <img
                src="/DS%20Overseas%20-%20Logo%202_00.png"
                alt="DS Overseas Education Consultants"
                className="ds-footer-logo-img"
              />
            </div>
            <p className="ds-footer-description">
              Your trusted partner for international education and visa services.
              We help students achieve their dreams of studying abroad with expert guidance and support.
            </p>
            <div className="ds-footer-socials">
              <a href="https://www.facebook.com/profile.php?id=61586558824192" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="ds-footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M14 7h2.2V3.6C15.8 3.5 14.7 3.4 13.5 3.4c-2.6 0-4.4 1.6-4.4 4.5V10H6.2v3.4h2.9V22h3.5v-8.6h2.8l.5-3.4h-3.3V8.3c0-1 .3-1.3 1.2-1.3z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/dsoverseasconsultants?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="ds-footer-social-link">
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                  <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/ds-overseas-education-consultants/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="ds-footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M4.8 3.5a2 2 0 110 4 2 2 0 010-4zM3.2 9h3.2v11.5H3.2V9zm5.4 0h3.1v1.6h.05c.43-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.9v6.7h-3.2v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v6H8.6V9z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="ds-footer-column">
            <h3 className="ds-footer-title">Quick Links</h3>
            <ul className="ds-footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="ds-footer-column">
            <h3 className="ds-footer-title">Our Services</h3>
            <ul className="ds-footer-links">
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
          </div>

          {/* Study Destinations */}
          <div className="ds-footer-column">
            <h3 className="ds-footer-title">Study Destinations</h3>
            <ul className="ds-footer-links">
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
          </div>

          {/* Contact Info */}
          <div className="ds-footer-column">
            <h3 className="ds-footer-title">Contact Us</h3>
            <ul className="ds-footer-contact">
              <li>
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>106/107, Atlantis, Above jasmin Mobile, Nr. Genda circle, Vadodara - 390023</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>+91 7046755605</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>ceo@dsoverseasdu.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ds-footer-bottom">
          <div className="ds-footer-bottom-content">
            <p className="ds-footer-copyright">
              &copy; {currentYear} DS Overseas Education Consultants. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
