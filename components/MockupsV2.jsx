// MockupsV2.jsx — Top-tier product mockups for the three How It Works bento cards
const { useState: useStateM2, useEffect: useEffectM2, useRef: useRefM2 } = React;

// ───── Shared App Window Chrome ─────
function AppWindow({ children, title = 'Griffin', light = false }) {
  const bg = light ? '#f7f5f2' : '#111110';
  const border = light ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.07)';
  const titleColor = light ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.25)';

  return (
    <div style={{
      background: bg, borderRadius: 14, overflow: 'hidden',
      border, width: '100%',
      boxShadow: light
        ? '0 24px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.06)'
        : '0 24px 60px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)',
    }}>
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '11px 16px',
        borderBottom: light ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.05)',
        background: light ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.015)',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }}></span>
        </div>
        <span className="mono" style={{ fontSize: 10.5, color: titleColor }}>{title}</span>
        <div style={{ width: 50 }}></div>
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// CARD 1 — OPEN GRIFFIN: macOS Desktop + App Open Animation
// ─────────────────────────────────────────────────────────────────
function MockupNavBar() {
  const [phase, setPhase] = useStateM2('desktop'); // desktop → hovering → clicked → opened
  const containerRef = useRefM2(null);

  useEffectM2(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        setTimeout(() => setPhase('hovering'), 800);
        setTimeout(() => setPhase('clicked'), 2000);
        setTimeout(() => setPhase('opened'), 2200);
      }
    }, { threshold: 0.4 });
    if (containerRef.current) io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  const isOpened = phase === 'opened';
  const cursorStyle = {
    position: 'absolute', zIndex: 10,
    width: 24, height: 24,
    backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 3.5L16.5 15.5L11.5 16L15 21.5L12.5 23L9 17.5L5.5 21.5V3.5Z" fill="white" stroke="black" stroke-width="1.5"/></svg>')`,
    backgroundSize: 'contain',
    transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
    transform: phase === 'desktop' ? 'translate(280px, 320px)' : 
               phase === 'clicked' ? 'translate(200px, 335px) scale(0.85)' : 
               phase === 'opened' ? 'translate(200px, 335px) scale(1)' :
               'translate(200px, 335px)', // hovering
    opacity: phase === 'opened' ? 0 : 1,
  };

  return (
    <div ref={containerRef} style={{ 
      width: '100%', height: 420, borderRadius: 16, overflow: 'hidden', 
      border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
      position: 'relative',
      background: 'linear-gradient(to bottom, #16181b, #2a2e33)', // Subtle dark desktop wallpaper
    }}>
      {/* Top Menu Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '4px 16px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: 'rgba(255,255,255,0.85)',
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5
      }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 14 }}>⌘</span>
          {isOpened ? <span style={{ fontWeight: 600, color: '#fff' }}>Griffin</span> : <span style={{ fontWeight: 600, color: '#fff' }}>Finder</span>}
          {['File', 'Edit', 'View', 'Window', 'Help'].map(m => (
            <span key={m} style={{ opacity: 0.5, fontSize: 12 }}>{m}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center', fontSize: 12, opacity: 0.6 }}>
          <span>Mon 9:41 AM</span>
        </div>
      </div>

      {/* The Bronn App Window */}
      <div style={{
        position: 'absolute', top: 40, left: '50%', width: '85%', marginLeft: '-42.5%',
        height: 320, borderRadius: 12, background: '#0c0b09',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        transformOrigin: 'bottom center',
        transform: isOpened ? 'scale(1) translateY(0)' : 'scale(0.1) translateY(1000px)',
        opacity: isOpened ? 1 : 0,
        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: 4
      }}>
        {/* App Titlebar */}
        <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }}></span>
        </div>
        
        {/* App Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px 40px' }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%', background: 'var(--bg-3)',
            border: '1px solid var(--line)', marginBottom: 18, display: 'grid', placeItems: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}>
            <span className="head" style={{ color: 'var(--text)', fontSize: 20, fontWeight: 500 }}>G</span>
          </div>
          <div style={{ fontFamily: 'Oswald', fontSize: 28, fontWeight: 400, color: '#f5efe6', marginBottom: 6 }}>Good morning, Alex.</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 26 }}>Here's your strategic brief for the week.</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Review Q4 burn', 'Pricing scenarios', 'Hiring plan'].map((t, i) => (
              <div key={i} className="mono" style={{
                fontSize: 10.5, padding: '7px 12px', borderRadius: 100,
                border: '1px solid var(--line)', background: 'var(--bg-2)', color: 'var(--text-2)',
              }}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Cursor */}
      <div style={cursorStyle}></div>

      {/* macOS Dock */}
      <div style={{
        position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        padding: '6px 8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px) saturate(150%)',
        border: '1px solid rgba(255,255,255,0.2)', borderRadius: 18,
        display: 'flex', gap: 10, alignItems: 'center', zIndex: 3,
        boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(255,255,255,0.1) inset'
      }}>
        <DockIcon app="Finder" active={false} phase={phase} />
        <DockIcon app="Safari" active={false} phase={phase} />
        <DockIcon app="Messages" active={false} phase={phase} />
        <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.2)', margin: '0 2px' }}></div>
        <DockIcon app="Griffin" active={isOpened} phase={phase} />
        <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.2)', margin: '0 2px' }}></div>
        <DockIcon app="Mail" active={false} phase={phase} />
        <DockIcon app="Trash" active={false} phase={phase} />
      </div>
    </div>
  );
}

function DockIcon({ app, active, phase }) {
  const isGriffin = app === 'Griffin';
  const hovering = isGriffin && (phase === 'hovering' || phase === 'clicked');
  
  const getIcon = () => {
    switch(app) {
      case 'Finder': return <svg viewBox="0 0 32 32" fill="none"><path d="M26 4H6a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V6a2 2 0 00-2-2z" fill="#7FC8FF"/><path d="M16 4v24M4 16c6 0 9 2 12 2s6-6 12-6" stroke="#004C99" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="11" r="1.5" fill="#004C99"/><circle cx="22" cy="11" r="1.5" fill="#004C99"/><path d="M14 20c0 2 1 3 2 3s2-1 2-3" stroke="#004C99" strokeWidth="1.5" strokeLinecap="round"/></svg>;
      case 'Safari': return <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" fill="#007AFF"/><path d="M19 13l-6 6 2-7 4 1z" fill="#fff"/><path d="M13 19l6-6-2 7-4-1z" fill="#FF3B30"/><circle cx="16" cy="16" r="1" fill="#fff"/></svg>;
      case 'Messages': return <svg viewBox="0 0 32 32" fill="none"><path d="M28 15.5c0 6.35-5.37 11.5-12 11.5-1.3 0-2.55-.2-3.7-.58L5 28.5l2.12-5.95C5.17 20.65 4 18.2 4 15.5 4 9.15 9.37 4 16 4s12 5.15 12 11.5z" fill="#34C759"/></svg>;
      case 'Mail': return <svg viewBox="0 0 32 32" fill="none"><rect x="4" y="7" width="24" height="18" rx="4" fill="#007AFF"/><path d="M4 9l12 8 12-8" stroke="#fff" strokeWidth="2"/></svg>;
      case 'Trash': return <svg viewBox="0 0 32 32" fill="none"><rect x="8" y="8" width="16" height="18" rx="2" fill="rgba(255,255,255,0.3)"/><path d="M6 8h20M12 5h8" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/></svg>;
      case 'Griffin': return <span className="head" style={{ color: '#fff', fontSize: 20 }}>G</span>;
      default: return null;
    }
  };

  return (
    <div style={{
      width: 42, height: 42, borderRadius: 10,
      background: isGriffin ? '#1a1a18' : 'transparent',
      border: isGriffin ? '1px solid rgba(255,255,255,0.1)' : 'none',
      display: 'grid', placeItems: 'center', position: 'relative',
      transform: hovering ? 'scale(1.18) translateY(-8px)' : 'scale(1)',
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      boxShadow: isGriffin && hovering ? '0 12px 24px rgba(0,0,0,0.4)' : 'none'
    }}>
      <div style={{ width: 30, height: 30, display: 'grid', placeItems: 'center' }}>
        {getIcon()}
      </div>
      {active && <span style={{ position: 'absolute', bottom: -6, width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }}></span>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// CARD 2 — ASK ANYTHING: Chat with animated typing reply
// ─────────────────────────────────────────────────────────────────
function MockupChat() {
  const [phase, setPhase] = useStateM2('search'); // search → typing → clicking → dashboard
  const [typedQuery, setTypedQuery] = useStateM2('');
  const QUERY = "Is now the right time to enter LATAM?";
  const containerRef = useRefM2(null);

  useEffectM2(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        setTimeout(() => setPhase('typing'), 800);
      }
    }, { threshold: 0.5 });
    if (containerRef.current) io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  useEffectM2(() => {
    if (phase !== 'typing') return;
    let i = 0;
    const iv = setInterval(() => {
      setTypedQuery(QUERY.slice(0, i + 1));
      i++;
      if (i >= QUERY.length) {
        clearInterval(iv);
        setTimeout(() => setPhase('clicking'), 600);
        setTimeout(() => setPhase('dashboard'), 1400);
      }
    }, 40);
    return () => clearInterval(iv);
  }, [phase]);

  const isSearch = phase === 'search' || phase === 'typing' || phase === 'clicking';
  const isDashboard = phase === 'dashboard';

  return (
    <div ref={containerRef} style={{ width: '100%', height: 480, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-2)', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--line-soft)' }}>
      
      {/* ─── PHASE 1 & 2: Search Bar UI ─── */}
      <div style={{
        width: '100%', maxWidth: 640, transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
        opacity: isSearch ? 1 : 0,
        transform: isSearch ? 'scale(1)' : 'scale(1.1) translateY(-20px)',
        display: isSearch ? 'block' : 'none',
        textAlign: 'center'
      }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: 20, textTransform: 'uppercase' }}>Ask Griffin Anything</div>
        <div style={{
          background: '#fff', padding: '10px 12px 10px 24px', borderRadius: 100,
          boxShadow: '0 20px 50px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)',
          display: 'flex', alignItems: 'center', gap: 14, position: 'relative'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <div style={{ flex: 1, fontSize: 18, color: 'var(--text)', textAlign: 'left' }}>
            {typedQuery}
            {phase === 'typing' && <span style={{ display: 'inline-block', width: 2, height: 20, background: 'var(--accent)', verticalAlign: 'middle', marginLeft: 2, animation: 'blink 1s infinite' }}></span>}
          </div>
          <div style={{
            background: 'var(--bg-3)', padding: '8px 18px', borderRadius: 100,
            display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-2)',
            border: '1px solid var(--line-soft)',
            transform: phase === 'clicking' ? 'scale(0.96)' : 'scale(1)',
            transition: 'transform 0.1s'
          }}>
            Ask <span style={{ opacity: 0.5 }}>↵</span>
          </div>

          {/* Virtual Cursor */}
          {phase === 'clicking' && (
            <div style={{
              position: 'absolute', right: 40, top: 40, width: 24, height: 24, zIndex: 10,
              backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 3.5L16.5 15.5L11.5 16L15 21.5L12.5 23L9 17.5L5.5 21.5V3.5Z" fill="black" stroke="white" stroke-width="1.5"/></svg>')`,
              backgroundSize: 'contain',
              animation: 'clickTarget 0.8s forwards'
            }}></div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24, opacity: 0.4 }}>
          {['pricing strategy', 'burn rate', 'market expansion'].map(t => (
            <span key={t} style={{ fontSize: 12, padding: '6px 14px', borderRadius: 100, border: '1px solid var(--line)', background: '#fff' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ─── PHASE 3: Claude-inspired Dashboard UI ─── */}
      <div style={{
        position: 'absolute', inset: '12px', background: '#101010', borderRadius: 14,
        boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        display: isDashboard ? 'flex' : 'none',
        opacity: isDashboard ? 1 : 0,
        transform: isDashboard ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden', color: '#f5efe6'
      }}>
        {/* Dashboard Sidebar */}
        <div style={{ width: 200, borderRight: '1px solid rgba(255,255,255,0.06)', background: '#0a0a0a', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#fff', color: '#000', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 700 }}>G</div>
            <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.02em' }}>Griffin</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div className="mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', marginBottom: 12 }}>ANALYSIS</div>
            {['Strategic Brief', 'LATAM Entry', 'Scenario Map', 'Hiring Model'].map((m, i) => (
              <div key={m} style={{ 
                fontSize: 12, padding: '10px 12px', borderRadius: 8,
                color: i === 1 ? '#fff' : 'rgba(255,255,255,0.4)', 
                background: i === 1 ? 'rgba(255,255,255,0.05)' : 'transparent',
                fontWeight: i === 1 ? 500 : 400, display: 'flex', alignItems: 'center', gap: 10,
                cursor: 'default'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity={i === 1 ? 1 : 0.4}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                {m}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 20 }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '12px' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>COMPUTE POWER</div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: 'var(--green)' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#101010' }}>
          {/* Header */}
          <div style={{ padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Query:</span>
              <span style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{QUERY}</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Share</div>
              <div style={{ padding: '6px 12px', borderRadius: 6, background: '#fff', color: '#000', fontSize: 11, fontWeight: 600 }}>Export</div>
            </div>
          </div>

          <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
            {/* Claude-style centered content */}
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 20, height: 2, background: 'var(--green)' }}></div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--green)', letterSpacing: '0.15em' }}>VERDICT</div>
              </div>
              
              <h2 style={{ fontSize: 28, fontWeight: 400, color: '#fff', marginBottom: 16, fontFamily: 'Oswald' }}>Strategic Expansion Recommended</h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 32 }}>
                Based on Q1-Q2 cross-border elasticity models, entering the LATAM market in Q3 presents a <strong style={{ color: '#fff' }}>high-confidence growth opportunity</strong>. Capital efficiency remains optimal with a projected 2.4x return on initial deployment.
              </p>

              {/* Data Visualization Card */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '24px', marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>PROJECTION · ARR LIFT</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--green)' }}>+24% EST.</div>
                </div>
                <div style={{ height: 140, width: '100%' }}>
                  <svg viewBox="0 0 400 140" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <path d="M 0 120 C 80 115, 160 100, 240 80 S 360 40, 400 20" fill="none" stroke="var(--green)" strokeWidth="3" />
                    <path d="M 0 120 C 80 115, 160 100, 240 80 S 360 40, 400 20 L 400 140 L 0 140 Z" fill="rgba(74,140,58,0.05)" />
                    <circle cx="400" cy="20" r="4" fill="var(--green)" />
                  </svg>
                </div>
              </div>

              {/* Citations/References */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { title: 'Market Saturation Report', size: '2.4MB' },
                  { title: 'Elasticity Data Q1', size: '1.1MB' }
                ].map(doc => (
                  <div key={doc.title} style={{ padding: '14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{doc.title}</span>
                    <span className="mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>{doc.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes clickTarget {
          0% { transform: translate(100px, 100px); opacity: 0; }
          40% { transform: translate(0, 0); opacity: 1; }
          60% { transform: translate(0, 0) scale(0.85); opacity: 1; }
          100% { transform: translate(0, 0) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────
// CARD 3 — SEE THE GROWTH: Animated Multi-Scenario SVG Chart
// ─────────────────────────────────────────────────────────────────
function MockupGraph() {
  const [drawn, setDrawn] = useStateM2(false);
  const [showBadge, setShowBadge] = useStateM2(false);
  const graphRef = useRefM2(null);

  useEffectM2(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        setTimeout(() => setDrawn(true), 400);
        setTimeout(() => setShowBadge(true), 2800);
      }
    }, { threshold: 0.5 });
    if (graphRef.current) io.observe(graphRef.current);
    return () => io.disconnect();
  }, []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <AppWindow title="Griffin — Scenario Engine" light={false}>
      <div ref={graphRef} style={{ padding: '24px', minHeight: 360, background: '#101010' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div className="mono" style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.14em', marginBottom: 5 }}>12-MONTH MRR PROJECTION</div>
            <div style={{ fontFamily: 'Oswald', fontSize: 22, fontWeight: 400, color: '#f5efe6' }}>Scenario Compare</div>
          </div>
          <div style={{
            opacity: showBadge ? 1 : 0,
            transition: 'opacity 0.6s ease',
            background: 'rgba(184,212,168,0.08)', border: '1px solid rgba(184,212,168,0.2)',
            padding: '6px 12px', borderRadius: 6,
          }}>
            <div className="mono" style={{ fontSize: 9, color: 'var(--green)', letterSpacing: '0.08em' }}>RECOMMENDED</div>
            <div style={{ fontFamily: 'Oswald', fontSize: 18, color: 'var(--green)', fontWeight: 400 }}>Scenario B</div>
          </div>
        </div>

        {/* Chart */}
        <div style={{ height: 180, position: 'relative', marginBottom: 10 }}>
          <svg viewBox="0 0 460 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--green)" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="var(--green)" stopOpacity="0"/>
              </linearGradient>
            </defs>

            {/* Grid */}
            {[36, 72, 108, 144].map(y => (
              <line key={y} x1="0" x2="460" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 5"/>
            ))}
            {months.map((_, i) => (
              <line key={i} x1={i * 38 + 19} x2={i * 38 + 19} y1="0" y2="180" stroke="rgba(255,255,255,0.03)"/>
            ))}

            {/* Hold — dim dashed */}
            <path d="M 0 145 C 80 140, 160 136, 240 128 S 360 120, 460 114"
              fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 5"
              style={{ strokeDasharray: '600', strokeDashoffset: drawn ? 0 : 600, transition: 'stroke-dashoffset 2s ease-out' }}/>

            {/* Usage Tier */}
            <path d="M 0 145 C 80 132, 160 118, 240 98 S 360 72, 460 58"
              fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8"
              style={{ strokeDasharray: '700', strokeDashoffset: drawn ? 0 : 700, transition: 'stroke-dashoffset 2.2s ease-out 0.1s' }}/>

            {/* RAISE 12% — Hero line */}
            <path d="M 0 145 C 80 120, 160 90, 240 56 S 360 18, 460 6"
              fill="none" stroke="var(--green)" strokeWidth="2.5"
              style={{ strokeDasharray: '800', strokeDashoffset: drawn ? 0 : 800, transition: 'stroke-dashoffset 2.5s cubic-bezier(0.2,0.7,0.2,1) 0.2s' }}/>
            <path d="M 0 145 C 80 120, 160 90, 240 56 S 360 18, 460 6 L 460 180 L 0 180 Z"
              fill="url(#gGreen)"
              style={{ opacity: drawn ? 1 : 0, transition: 'opacity 1.2s ease 2s' }}/>
            <circle cx="460" cy="6" r="5" fill="var(--green)"
              style={{ opacity: drawn ? 1 : 0, transition: 'opacity 0.4s ease 2.5s' }}/>
          </svg>

          {/* End labels */}
          <div style={{ position: 'absolute', right: 0, top: 0, display: 'flex', flexDirection: 'column', gap: 36, textAlign: 'right' }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--green)', opacity: drawn ? 1 : 0, transition: 'opacity 0.4s 2.6s' }}>+$84K ↑</div>
          </div>
        </div>

        {/* Month labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 22 }}>
          {months.map((m, i) => (
            <span key={i} className="mono" style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.18)' }}>{m.toUpperCase()}</span>
          ))}
        </div>

        {/* Legend + Scenario summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {[
            { label: 'A · Hold', color: 'rgba(255,255,255,0.12)', growth: '+6%', risk: 'Low', dim: true },
            { label: 'B · Raise 12%', color: 'var(--green)', growth: '+18%', risk: 'Low', dim: false },
            { label: 'C · Usage Tier', color: 'rgba(255,255,255,0.2)', growth: '+24%', risk: 'Med', dim: true },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '10px 12px', borderRadius: 8,
              background: !s.dim ? 'rgba(184,212,168,0.06)' : 'rgba(255,255,255,0.02)',
              border: !s.dim ? '1px solid rgba(184,212,168,0.2)' : '1px solid rgba(255,255,255,0.05)',
              opacity: s.dim ? 0.55 : 1,
              transition: 'opacity 0.3s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ width: 14, height: 2, background: s.color, display: 'inline-block', borderRadius: 2, flexShrink: 0 }}></span>
                <span className="mono" style={{ fontSize: 9, color: !s.dim ? 'var(--green)' : 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>{s.label}</span>
              </div>
              <div style={{ fontFamily: 'Oswald', fontSize: 26, color: !s.dim ? 'var(--green)' : 'rgba(255,255,255,0.4)', lineHeight: 1 }}>{s.growth}</div>
              <div className="mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', marginTop: 5 }}>risk · {s.risk}</div>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}

window.MockupNavBar = MockupNavBar;
window.MockupChat = MockupChat;
window.MockupGraph = MockupGraph;
