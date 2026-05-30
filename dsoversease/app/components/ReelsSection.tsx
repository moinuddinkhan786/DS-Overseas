"use client";

import { useEffect, useRef } from "react";

export default function ReelsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trackOuter = sectionRef.current.querySelector('.ds-reels-track-outer') as HTMLElement;
    const track = sectionRef.current.querySelector('#reelsTrack') as HTMLElement;
    const btnPrev = sectionRef.current.querySelector('#reelsPrev') as HTMLButtonElement;
    const btnNext = sectionRef.current.querySelector('#reelsNext') as HTMLButtonElement;
    const dotsWrap = sectionRef.current.querySelector('#reelsDots') as HTMLElement;

    if (!track || !btnPrev || !btnNext || !dotsWrap || !trackOuter) return;

    /* ── 1. Clone cards before + after for seamless infinite loop ── */
    const origCards = Array.from(track.querySelectorAll('.ds-reel-card')) as HTMLElement[];
    const ORIG_COUNT = origCards.length;

    // Clone all original cards and append clones at end + prepend at start
    origCards.forEach(c => track.appendChild(c.cloneNode(true)));
    origCards.slice().reverse().forEach(c => track.insertBefore(c.cloneNode(true), track.firstChild));

    // All cards now (clones + originals + clones)
    const allCards = Array.from(track.querySelectorAll('.ds-reel-card')) as HTMLElement[];
    const TOTAL = allCards.length; // ORIG_COUNT * 3

    /* ── 2. Current index starts at ORIG_COUNT (first real card) ── */
    let curIdx = ORIG_COUNT;
    let isSliding = false;
    let autoTimer: NodeJS.Timeout | null = null;

    /* ── 3. Helpers ── */
    function getVisibleCount() {
      const w = trackOuter.offsetWidth;
      if (w >= 1100) return 5;
      if (w >= 820) return 4;
      if (w >= 560) return 3;
      if (w >= 380) return 2;
      return 1;
    }

    function getCardWidth() {
      return allCards[0] ? allCards[0].offsetWidth + 16 : 0;
    }

    /* ── 4. Snap track to curIdx with NO animation ── */
    function snapTo(idx: number) {
      track.style.transition = 'none';
      track.style.transform = `translateX(-${idx * getCardWidth()}px)`;
      curIdx = idx;
      // Force reflow then re-enable transition
      track.getBoundingClientRect();
      track.style.transition = '';
    }

    /* ── 5. Slide with animation ── */
    function slideTo(idx: number) {
      if (isSliding) return;
      isSliding = true;

      track.style.transform = `translateX(-${idx * getCardWidth()}px)`;
      curIdx = idx;

      updateDots();

      // After transition ends, check if we need to silently jump to real clone
      setTimeout(() => {
        // If we slid past the end clones → jump silently back to real start
        if (curIdx >= ORIG_COUNT * 2) {
          snapTo(curIdx - ORIG_COUNT);
        }
        // If we slid before the start clones → jump silently to real end
        else if (curIdx < ORIG_COUNT) {
          snapTo(curIdx + ORIG_COUNT);
        }
        updateCenterPlayback();
        isSliding = false;
      }, 520);
    }

    /* ── 6. Which ORIGINAL index (0-based) is showing in center ── */
    function getCenterOrigIdx() {
      const half = Math.floor(getVisibleCount() / 2);
      const rawIdx = curIdx + half; // index in allCards
      return ((rawIdx % ORIG_COUNT) + ORIG_COUNT) % ORIG_COUNT; // wrap to 0..ORIG_COUNT-1
    }

    /* ── 7. Play center video (muted), pause all others ── */
    function updateCenterPlayback() {
      const centerOrig = getCenterOrigIdx();

      allCards.forEach((card, i) => {
        // Each card's "original index" — clones before = i, real = i-ORIG_COUNT, clones after = i-ORIG_COUNT*2
        const origIdx = ((i % ORIG_COUNT) + ORIG_COUNT) % ORIG_COUNT;
        const isCenter = origIdx === centerOrig;

        const video = card.querySelector('video') as HTMLVideoElement;
        const iconPlay = card.querySelector('.icon-play') as HTMLElement;
        const iconPause = card.querySelector('.icon-pause') as HTMLElement;
        const iconSound = card.querySelector('.icon-sound') as HTMLElement;
        const iconMuteI = card.querySelector('.icon-mute') as HTMLElement;

        if (isCenter) {
          video.muted = true;
          iconSound.style.display = 'none';
          iconMuteI.style.display = '';
          video.play().catch(() => {});
          card.classList.add('is-playing');
          iconPlay.style.display = 'none';
          iconPause.style.display = '';
        } else {
          video.pause();
          video.muted = true;
          iconSound.style.display = 'none';
          iconMuteI.style.display = '';
          card.classList.remove('is-playing');
          iconPlay.style.display = '';
          iconPause.style.display = 'none';
        }
      });
    }

    /* ── 8. Dots (based on original count) ── */
    function buildDots() {
      dotsWrap.innerHTML = '';
      for (let i = 0; i < ORIG_COUNT; i++) {
        const d = document.createElement('button');
        d.className = 'dot';
        d.addEventListener('click', () => {
          resetAutoSlide();
          const target = ORIG_COUNT + i; // jump to real card in middle section
          slideTo(target);
        });
        dotsWrap.appendChild(d);
      }
      updateDots();
    }

    function updateDots() {
      const c = getCenterOrigIdx();
      dotsWrap.querySelectorAll('.dot').forEach((d, i) =>
        d.classList.toggle('active', i === c));
    }

    /* ── 9. Auto-slide ── */
    function startAutoSlide() {
      stopAutoSlide();
      autoTimer = setInterval(() => slideTo(curIdx + 1), 4000);
    }
    function stopAutoSlide() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }
    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    /* ── 10. Arrow buttons — always slide, never stop ── */
    btnPrev.addEventListener('click', () => {
      resetAutoSlide();
      slideTo(curIdx - 1);
    });
    btnNext.addEventListener('click', () => {
      resetAutoSlide();
      slideTo(curIdx + 1);
    });

    btnPrev.disabled = false;
    btnNext.disabled = false;

    /* ── 11. Pause on hover ── */
    trackOuter.addEventListener('mouseenter', stopAutoSlide);
    trackOuter.addEventListener('mouseleave', startAutoSlide);

    /* ── 12. Resize ── */
    const handleResize = () => {
      snapTo(ORIG_COUNT);
      buildDots();
      updateCenterPlayback();
    };
    window.addEventListener('resize', handleResize);

    /* ── 13. Per-card interactions (all cards including clones) ── */
    function muteAllExcept(exceptCard: HTMLElement) {
      allCards.forEach(c => {
        if (c === exceptCard) return;
        const v = c.querySelector('video') as HTMLVideoElement;
        if (v && !v.muted) {
          v.muted = true;
          (c.querySelector('.icon-sound') as HTMLElement).style.display = 'none';
          (c.querySelector('.icon-mute') as HTMLElement).style.display = '';
        }
      });
    }

    allCards.forEach(card => {
      const video = card.querySelector('video') as HTMLVideoElement;
      const btnPlay = card.querySelector('.btn-play') as HTMLElement;
      const btnMuteEl = card.querySelector('.btn-mute') as HTMLElement;
      const progress = card.querySelector('.progress-bar-fill') as HTMLElement;
      const iconPlay = btnPlay.querySelector('.icon-play') as HTMLElement;
      const iconPause = btnPlay.querySelector('.icon-pause') as HTMLElement;
      const iconSound = btnMuteEl.querySelector('.icon-sound') as HTMLElement;
      const iconMuteI = btnMuteEl.querySelector('.icon-mute') as HTMLElement;

      video.muted = true;
      card.classList.remove('is-playing');
      iconPlay.style.display = '';
      iconPause.style.display = 'none';
      iconSound.style.display = 'none';
      iconMuteI.style.display = '';

      btnPlay.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
          video.play();
          card.classList.add('is-playing');
          iconPlay.style.display = 'none';
          iconPause.style.display = '';
        } else {
          video.pause();
          card.classList.remove('is-playing');
          iconPlay.style.display = '';
          iconPause.style.display = 'none';
        }
      });

      card.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).closest('.btn-mute') || (e.target as HTMLElement).closest('.btn-play')) return;
        btnPlay.click();
      });

      btnMuteEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.muted) {
          muteAllExcept(card);
          video.muted = false;
          iconSound.style.display = '';
          iconMuteI.style.display = 'none';
        } else {
          video.muted = true;
          iconSound.style.display = 'none';
          iconMuteI.style.display = '';
        }
      });

      video.addEventListener('timeupdate', () => {
        if (video.duration)
          progress.style.width = (video.currentTime / video.duration * 100) + '%';
      });
    });

    /* ── 14. Init ── */
    snapTo(ORIG_COUNT); // start at first real card
    buildDots();
    setTimeout(() => {
      updateCenterPlayback();
      startAutoSlide();
    }, 150);

    // Cleanup
    return () => {
      stopAutoSlide();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        :root {
          --accent:   #f5a623;
          --accent-lt:#ffc04d;
          --card-bg:  #0d1b40;
          --white:    #ffffff;
          --gray-400: #9aa3b8;
          --radius:   20px;
        }

        /* ══════════════════════════════════════
           SECTION  –  full-width breakout
        ══════════════════════════════════════ */
        .ds-reels-section {
          background: linear-gradient(160deg, #04122e 0%, #0b2660 50%, #04122e 100%);
          padding: 80px 0 90px;
          font-family: 'Poppins', sans-serif;
          overflow: hidden;
          position: relative;
          width: 100vw;
          margin-left:  calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
        }

        /* Ambient glow */
        .ds-reels-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 15% 30%, rgba(245,166,35,.08) 0%, transparent 50%),
            radial-gradient(circle at 85% 70%, rgba(21,87,192,.18)  0%, transparent 50%);
          pointer-events: none;
        }

        /* ── Header ── */
        .ds-reels-header {
          text-align: center;
          margin-bottom: 52px;
          position: relative;
          padding: 0 24px;
        }
        .ds-reels-header .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(245,166,35,.12);
          border: 1px solid rgba(245,166,35,.35);
          color: var(--accent);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 50px;
          margin-bottom: 18px;
        }
        .ds-reels-header h2 {
          font-size: clamp(18px, 2.8vw, 38px);
          font-weight: 800;
          color: var(--white);
          line-height: 1.15;
          margin-bottom: 14px;
          white-space: nowrap;
        }
        .ds-reels-header h2 span { color: white; }
        .ds-reels-header p {
          font-family: 'Inter', sans-serif;
          color: white;
          font-size: 16px;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── Carousel wrap: padding gives room for arrows ── */
        .ds-reels-carousel-wrap {
          width: 100%;
          padding: 0 56px;
          position: relative;
        }

        /* ── Track outer: clips overflow ── */
        .ds-reels-track-outer {
          overflow: hidden;
          width: 100%;
        }

        /* ── Sliding track ── */
        .ds-reels-track {
          display: flex;
          gap: 16px;
          transition: transform .5s cubic-bezier(.4,0,.2,1);
          will-change: transform;
        }

        /* ── Card ── */
        .ds-reel-card {
          flex: 0 0 calc((100% - 64px) / 5); /* 4 gaps × 16px */
          position: relative;
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--card-bg);
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(0,0,0,.45);
          transition: transform .3s ease, box-shadow .3s ease;
          aspect-ratio: 9 / 16;
        }
        .ds-reel-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 50px rgba(0,0,0,.6);
          z-index: 5;
        }
        .ds-reel-card video {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }

        /* Success Story #1 girl video — now card 3, center 20% from top */
        .ds-reel-card:nth-child(3) video {
          object-fit: cover;
          object-position: center 20%;
        }

        /* Bottom gradient */
        .card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top,
            rgba(4,18,46,.92) 0%,
            rgba(4,18,46,.3)  40%,
            transparent       70%);
          pointer-events: none;
        }

        /* ── Mute button ── */
        .btn-mute {
          position: absolute;
          top: 12px; right: 12px;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,.15);
          backdrop-filter: blur(6px);
          border: 1.5px solid rgba(255,255,255,.25);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background .2s, transform .2s;
        }
        .btn-mute:hover { background: rgba(245,166,35,.6); transform: scale(1.12); }
        .btn-mute svg { width: 16px; height: 16px; }

        /* ── Play/Pause button ── */
        .btn-play {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%) scale(1);
          width: 52px; height: 52px;
          border-radius: 50%;
          background: rgba(255,255,255,.18);
          backdrop-filter: blur(8px);
          border: 2px solid rgba(255,255,255,.4);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: opacity .25s, transform .25s, background .2s;
        }
        .btn-play:hover { background: rgba(245,166,35,.7); border-color: var(--accent); }
        .btn-play svg { width: 22px; height: 22px; }

        .ds-reel-card.is-playing .btn-play {
          opacity: 0;
          transform: translate(-50%,-50%) scale(.7);
          pointer-events: none;
        }
        .ds-reel-card.is-playing:hover .btn-play {
          opacity: 1;
          transform: translate(-50%,-50%) scale(1);
          pointer-events: all;
        }

        /* ── Progress bar ── */
        .progress-bar {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px;
          background: rgba(255,255,255,.2);
          z-index: 10;
        }
        .progress-bar-fill {
          height: 100%; width: 0%;
          background: linear-gradient(90deg, var(--accent), var(--accent-lt));
          transition: width .1s linear;
        }

        /* ── Badge ── */
        .card-badge {
          position: absolute; bottom: 14px; left: 14px; z-index: 10;
        }
        .card-badge .tag {
          display: inline-block;
          background: var(--accent); color: #0a0f1e;
          font-size: 10px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 10px; border-radius: 4px; margin-bottom: 5px;
        }
        .card-badge .student-name {
          display: block; color: #fff;
          font-size: 13px; font-weight: 600; line-height: 1.3;
          text-shadow: 0 1px 4px rgba(0,0,0,.5);
        }
        .card-badge .country {
          display: block; color: rgba(255,255,255,.7);
          font-size: 11px; font-weight: 500; margin-top: 2px;
        }

        /* ── Arrows ── */
        .ds-reels-arrow {
          position: absolute; top: 50%;
          transform: translateY(-50%);
          width: 46px; height: 46px;
          border-radius: 50%;
          background: rgba(255,255,255,.1);
          backdrop-filter: blur(8px);
          border: 1.5px solid rgba(255,255,255,.2);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          z-index: 20;
          transition: background .2s, transform .2s;
        }
        .ds-reels-arrow:hover {
          background: var(--accent); border-color: var(--accent);
          transform: translateY(-50%) scale(1.1); color: #0a0f1e;
        }
        .ds-reels-arrow svg { width: 20px; height: 20px; }
        .ds-reels-arrow.prev { left: 6px; }
        .ds-reels-arrow.next { right: 6px; }
        .ds-reels-arrow:disabled { opacity: .3; cursor: default; pointer-events: none; }
        /* Arrows always active for infinite loop */
        #reelsPrev, #reelsNext { opacity: 1 !important; pointer-events: all !important; }

        /* ── Dots ── */
        .ds-reels-dots {
          display: flex; justify-content: center;
          gap: 8px; margin-top: 32px;
        }
        .ds-reels-dots .dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,.25);
          border: none; padding: 0; cursor: pointer;
          transition: background .25s, width .25s;
        }
        .ds-reels-dots .dot.active {
          background: var(--accent); width: 24px; border-radius: 4px;
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) { .ds-reel-card { flex: 0 0 calc((100% - 48px) / 4); } }
        @media (max-width: 820px)  { .ds-reel-card { flex: 0 0 calc((100% - 32px) / 3); } }
        @media (max-width: 580px)  {
          .ds-reels-carousel-wrap { padding: 0 44px; }
          .ds-reel-card { flex: 0 0 calc((100% - 16px) / 2); }
        }
        @media (max-width: 380px)  { .ds-reel-card { flex: 0 0 82%; } }
      `}</style>

      <section className="ds-reels-section" id="student-reels" ref={sectionRef}>
        <div className="ds-reels-header">
          <div className="eyebrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10h14V4h-3.5zM2 5h12v8H2V5z"/>
            </svg>
            Real Stories · Real Results
          </div>
          <h2>DS Overseas <span>Students</span> Success Stories</h2>
          <p>Our favorite milestone isn&apos;t a number — it&apos;s seeing a student finally stand where they once only dreamed of being.</p>
        </div>

        <div className="ds-reels-carousel-wrap">
          <button className="ds-reels-arrow prev" id="reelsPrev" aria-label="Previous">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <div className="ds-reels-track-outer">
            <div className="ds-reels-track" id="reelsTrack">

              {/* Card 1 — Hiren Makwana (swapped from position 3) */}
              <div className="ds-reel-card">
                <video src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/Hiren-Makwana-03.mp4" loop muted playsInline preload="metadata"></video>
                <div className="card-overlay"></div>
                <button className="btn-mute" aria-label="Toggle mute">
                  <svg className="icon-sound" style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.86 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.86l3.523-3.784a1 1 0 011-.14zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"/>
                  </svg>
                  <svg className="icon-mute" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.86 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.86l3.523-3.784a1 1 0 011-.14zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
                <button className="btn-play" aria-label="Play / Pause">
                  <svg className="icon-play" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                  </svg>
                  <svg className="icon-pause" style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </button>
                <div className="card-badge">
                  <span className="tag">🇬🇧 UK</span>
                  <span className="student-name">Hiren Makwana</span>
                  <span className="country">DS Overseas Student</span>
                </div>
                <div className="progress-bar"><div className="progress-bar-fill"></div></div>
              </div>

              {/* Card 2 */}
              <div className="ds-reel-card">
                <video src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/1256470f0c5543659ad1f8fcf0f850bc.mp4" loop muted playsInline preload="metadata"></video>
                <div className="card-overlay"></div>
                <button className="btn-mute" aria-label="Toggle mute">
                  <svg className="icon-sound" style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.86 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.86l3.523-3.784a1 1 0 011-.14zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"/>
                  </svg>
                  <svg className="icon-mute" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.86 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.86l3.523-3.784a1 1 0 011-.14zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
                <button className="btn-play" aria-label="Play / Pause">
                  <svg className="icon-play" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                  </svg>
                  <svg className="icon-pause" style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </button>
                <div className="card-badge">
                  <span className="tag">🇦🇺 Australia</span>
                  <span className="student-name">Success Story #2</span>
                  <span className="country">DS Overseas Student</span>
                </div>
                <div className="progress-bar"><div className="progress-bar-fill"></div></div>
              </div>

              {/* Card 3 — Success Story #1 (swapped from position 1) */}
              <div className="ds-reel-card">
                <video src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/485da6d2d7214f26835b74fa9191a40a.mp4" loop muted playsInline preload="metadata"></video>
                <div className="card-overlay"></div>
                <button className="btn-mute" aria-label="Toggle mute">
                  <svg className="icon-sound" style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.86 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.86l3.523-3.784a1 1 0 011-.14zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"/>
                  </svg>
                  <svg className="icon-mute" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.86 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.86l3.523-3.784a1 1 0 011-.14zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
                <button className="btn-play" aria-label="Play / Pause">
                  <svg className="icon-play" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                  </svg>
                  <svg className="icon-pause" style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </button>
                <div className="card-badge">
                  <span className="tag">🇨🇦 Canada</span>
                  <span className="student-name">Success Story #1</span>
                  <span className="country">DS Overseas Student</span>
                </div>
                <div className="progress-bar"><div className="progress-bar-fill"></div></div>
              </div>

              {/* Card 4 */}
              <div className="ds-reel-card">
                <video src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/Milan-Patel-.mp4" loop muted playsInline preload="metadata"></video>
                <div className="card-overlay"></div>
                <button className="btn-mute" aria-label="Toggle mute">
                  <svg className="icon-sound" style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.86 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.86l3.523-3.784a1 1 0 011-.14zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"/>
                  </svg>
                  <svg className="icon-mute" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.86 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.86l3.523-3.784a1 1 0 011-.14zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
                <button className="btn-play" aria-label="Play / Pause">
                  <svg className="icon-play" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                  </svg>
                  <svg className="icon-pause" style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </button>
                <div className="card-badge">
                  <span className="tag">🇺🇸 USA</span>
                  <span className="student-name">Milan Patel</span>
                  <span className="country">DS Overseas Student</span>
                </div>
                <div className="progress-bar"><div className="progress-bar-fill"></div></div>
              </div>

              {/* Card 5 */}
              <div className="ds-reel-card">
                <video src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/Chetan.mp4" loop muted playsInline preload="metadata"></video>
                <div className="card-overlay"></div>
                <button className="btn-mute" aria-label="Toggle mute">
                  <svg className="icon-sound" style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.86 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.86l3.523-3.784a1 1 0 011-.14zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"/>
                  </svg>
                  <svg className="icon-mute" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.86 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.86l3.523-3.784a1 1 0 011-.14zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
                <button className="btn-play" aria-label="Play / Pause">
                  <svg className="icon-play" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                  </svg>
                  <svg className="icon-pause" style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </button>
                <div className="card-badge">
                  <span className="tag">🇨🇦 Canada</span>
                  <span className="student-name">Chetan</span>
                  <span className="country">DS Overseas Student</span>
                </div>
                <div className="progress-bar"><div className="progress-bar-fill"></div></div>
              </div>

              {/* Card 6 */}
              <div className="ds-reel-card">
                <video src="https://lavender-narwhal-554808.hostingersite.com/wp-content/uploads/2026/03/Prerakbhai-Patel.mp4" loop muted playsInline preload="metadata"></video>
                <div className="card-overlay"></div>
                <button className="btn-mute" aria-label="Toggle mute">
                  <svg className="icon-sound" style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.86 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.86l3.523-3.784a1 1 0 011-.14zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"/>
                  </svg>
                  <svg className="icon-mute" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.86 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.86l3.523-3.784a1 1 0 011-.14zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
                <button className="btn-play" aria-label="Play / Pause">
                  <svg className="icon-play" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                  </svg>
                  <svg className="icon-pause" style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </button>
                <div className="card-badge">
                  <span className="tag">🇦🇺 Australia</span>
                  <span className="student-name">Prerakbhai Patel</span>
                  <span className="country">DS Overseas Student</span>
                </div>
                <div className="progress-bar"><div className="progress-bar-fill"></div></div>
              </div>

            </div>
          </div>

          <button className="ds-reels-arrow next" id="reelsNext" aria-label="Next">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div className="ds-reels-dots" id="reelsDots"></div>

      </section>
    </>
  );
}
