// Hero.jsx — Centered product overview hero + redesigned nav
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

// ─── Nav ────────────────────────────────────────────────────────────────────
function Nav() {
  const [menuOpen, setMenuOpen] = useStateH(false);

  return (
    <nav id="main-nav" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'transparent',
      backdropFilter: 'none',
      transition: 'background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
    }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto', padding: '0 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo */}
        <a href="index.html" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--text)' }}>
          <span style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'var(--ink)',
            display: 'grid', placeItems: 'center',
          }}>
            <span className="head" style={{ color: 'var(--cream)', fontSize: 14, fontWeight: 600 }}>G</span>
          </span>
          <span className="head" style={{ fontSize: 20, fontWeight: 500, letterSpacing: '0.06em' }}>GRIFFIN</span>
        </a>

        {/* Center links */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="platform.html" style={{ textDecoration: 'none', color: 'var(--text-2)', fontSize: 13.5, fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e=>e.target.style.color='var(--text)'} onMouseLeave={e=>e.target.style.color='var(--text-2)'}>Platform</a>
          <a href="changelog.html" style={{ textDecoration: 'none', color: 'var(--text-2)', fontSize: 13.5, fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e=>e.target.style.color='var(--text)'} onMouseLeave={e=>e.target.style.color='var(--text-2)'}>Changelog</a>
          <a href="pricing.html" style={{ textDecoration: 'none', color: 'var(--text-2)', fontSize: 13.5, fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e=>e.target.style.color='var(--text)'} onMouseLeave={e=>e.target.style.color='var(--text-2)'}>Pricing</a>
        </div>

        {/* Right CTAs */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a href="contact.html" className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }}>Contact Sales</a>
          <a href="download.html" className="btn btn-primary" style={{ padding: '9px 18px', fontSize: 13 }}>
            Download <span className="arrow">→</span>
          </a>
        </div>

        {/* Mobile menu btn */}
        <button
          className="mobile-menu-btn"
          style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'pointer', padding: 8, color: 'var(--text)',
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  const words = ['STRATEGIST.', 'ANALYST.', 'ADVISOR.'];
  const [wordIdx, setWordIdx] = useStateH(0);
  const [charIdx, setCharIdx] = useStateH(0);
  const [reverse, setReverse] = useStateH(false);

  useEffectH(() => {
    const w = words[wordIdx];
    if (charIdx === w.length + 1 && !reverse) { setReverse(true); return; }
    if (charIdx === 0 && reverse) { setReverse(false); setWordIdx(i => (i + 1) % words.length); return; }
    const delay = reverse ? 60 : charIdx === w.length ? 2200 : 130 + Math.random() * 40;
    const t = setTimeout(() => setCharIdx(i => i + (reverse ? -1 : 1)), delay);
    return () => clearTimeout(t);
  }, [charIdx, wordIdx, reverse]);

  return (
    <section id="home" style={{ paddingTop: 120, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
      {/* Hero background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url("hero.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 1,
        pointerEvents: 'none',
      }} />
      {/* Bottom fade-out gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 60%, var(--bg) 100%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ textAlign: 'center' }}>
        {/* Headline */}
        <h1 className="reveal in reveal-d1" style={{
          fontSize: 'clamp(44px, 8vw, 100px)',
          fontFamily: 'Oswald, sans-serif',
          fontWeight: 600,
          letterSpacing: '0.02em',
          lineHeight: 1.0,
          textTransform: 'uppercase',
          color: 'var(--text)',
          marginBottom: 28,
          maxWidth: '14ch',
          margin: '0 auto 28px',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <span>Your AI Business</span>
          <span style={{ color: '#2d4a3e', fontStyle: 'normal', minHeight: '1.2em', display: 'block' }}>
            {words[wordIdx].substring(0, charIdx)}
            <span style={{
              display: 'inline-block', width: 4,
              height: 'clamp(34px, 6vw, 78px)',
              background: 'var(--text)',
              verticalAlign: 'middle', marginLeft: 6,
              animation: 'blink 1s steps(1) infinite',
            }} />
          </span>
        </h1>

        {/* Subheading */}
        <p className="reveal in reveal-d2" style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: 'var(--text-2)',
          lineHeight: 1.65,
          maxWidth: '52ch',
          margin: '0 auto 48px',
          fontWeight: 400,
        }}>
          Built for operators who want answers, not chat. Model scenarios, analyze burn, and generate board-ready strategy in minutes.
        </p>

        {/* Download CTAs */}
        <div className="reveal in reveal-d3" style={{
          display: 'flex', gap: 12, justifyContent: 'center',
          flexWrap: 'wrap', marginBottom: 20,
        }}>
          <a href="download.html" id="hero-download-mac" style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 24px', background: 'var(--ink)', color: 'var(--cream)',
            borderRadius: 100, textDecoration: 'none',
            transition: 'transform 0.22s, box-shadow 0.22s, background 0.22s',
            boxShadow: '0 4px 20px rgba(26,24,18,0.16)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(26,24,18,0.22)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(26,24,18,0.16)'; }}
          >
            <AppleIcon />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 10, opacity: 0.55, letterSpacing: '0.1em', fontFamily: 'JetBrains Mono', marginBottom: 1 }}>DOWNLOAD FOR</div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>Mac · Apple Silicon</div>
            </div>
            <span style={{ fontSize: 16, marginLeft: 4, opacity: 0.6 }}>↓</span>
          </a>

          <a href="download.html" id="hero-download-win" style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 24px', background: 'var(--bg-2)', color: 'var(--text)',
            borderRadius: 100, textDecoration: 'none',
            border: '1px solid var(--line-med)',
            transition: 'transform 0.22s, background 0.22s, box-shadow 0.22s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'var(--bg-3)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(26,24,18,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.boxShadow = ''; }}
          >
            <WindowsIcon />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 10, opacity: 0.45, letterSpacing: '0.1em', fontFamily: 'JetBrains Mono', marginBottom: 1 }}>DOWNLOAD FOR</div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>Windows · x64</div>
            </div>
            <span style={{ fontSize: 16, marginLeft: 4, opacity: 0.5 }}>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor">
      <path d="M21.6 17.1c0-3.4 2.8-5 2.9-5.1-1.6-2.3-4-2.6-4.9-2.7-2.1-.2-4.1 1.2-5.1 1.2-1.1 0-2.7-1.2-4.5-1.2-2.3.1-4.4 1.4-5.6 3.5-2.4 4.2-.6 10.4 1.7 13.7 1.1 1.6 2.5 3.5 4.3 3.4 1.7-.1 2.4-1.1 4.4-1.1 2.1 0 2.7 1.1 4.5 1.1 1.9 0 3.1-1.7 4.2-3.3 1.3-1.9 1.8-3.7 1.9-3.8-.1 0-3.7-1.4-3.8-5.7zM18.4 7c.9-1.2 1.6-2.8 1.4-4.5-1.4.1-3.1.9-4.1 2-.9 1-1.7 2.7-1.5 4.3 1.6.1 3.2-.7 4.2-1.8z"/>
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
      <path d="M3 5.4l11.5-1.6v11H3V5.4zM3 16.2h11.5v11L3 25.7v-9.5zM15.7 14.8V3.6L29 1.7v13.1H15.7zM15.7 16.2H29v13.1l-13.3-1.9V16.2z"/>
    </svg>
  );
}

window.Nav = Nav;
window.Hero = Hero;
window.AppleIcon = AppleIcon;
window.WindowsIcon = WindowsIcon;
