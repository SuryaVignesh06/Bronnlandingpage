// Showcase.jsx — Perfect typing → zoom-out → snap-into-mockup animation
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

const QUESTIONS = [
  'Should we raise prices on the team plan in Q2?',
  'Cut burn 20% — what should I trim first?',
  'Is now the right time to enter LATAM?',
];

function HeroShowcase() {
  const [phase, setPhase] = useStateS('idle'); // idle → typing → submitting → zooming → mockup
  const [text, setText] = useStateS('');
  const [qIdx, setQIdx] = useStateS(0);
  const [cycle, setCycle] = useStateS(0);
  const ref = useRefS(null);
  const [inView, setInView] = useStateS(false);

  useEffectS(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffectS(() => {
    if (!inView) return;
    let timers = [];
    const T = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };

    setText('');
    setPhase('typing');
    const q = QUESTIONS[qIdx % QUESTIONS.length];
    let i = 0;

    const type = () => {
      if (i <= q.length) {
        setText(q.slice(0, i));
        i++;
        T(type, 36 + Math.random() * 20);
      } else {
        T(() => setPhase('submitting'), 700);
        T(() => setPhase('zooming'), 1300);
        T(() => setPhase('mockup'), 1950);
        T(() => {
          setPhase('idle');
          setText('');
          T(() => {
            setQIdx(p => p + 1);
            setCycle(c => c + 1);
          }, 200);
        }, 9500);
      }
    };
    T(type, 400);

    return () => timers.forEach(clearTimeout);
  }, [cycle, inView]);

  const isMockup = phase === 'mockup';
  const isZooming = phase === 'zooming';
  const isSubmitting = phase === 'submitting';

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', minHeight: 560, overflow: 'hidden' }}>

      {/* — SEARCH BAR LAYER — */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: isMockup ? 0 : 1,
        // The magic transition: from normal scale(1), to a slightly lifted submit state, 
        // to a zoomed out state where it shrinks and moves down to precisely match the mockup's input box position.
        transform: isZooming 
          ? 'scale(0.85) translateY(240px)' 
          : isSubmitting ? 'scale(1.02) translateY(-10px)' : 'scale(1) translateY(0px)',
        transition: isZooming
          ? 'opacity 0.6s ease 0.2s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          : 'opacity 0.35s ease, transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isMockup ? 'none' : 'auto',
        zIndex: 3,
        willChange: 'transform, opacity',
      }}>
        <div style={{ width: '100%', maxWidth: 680, padding: '0 32px' }}>
          <div className="mono" style={{ fontSize: 10.5, color: 'var(--amber)', letterSpacing: '0.18em', marginBottom: 16, textAlign: 'center', opacity: isSubmitting ? 0 : 1, transition: 'opacity 0.3s' }}>
            ASK GRIFFIN ANYTHING
          </div>
          
          {/* Search bar */}
          <div style={{
            background: 'var(--bg-2)',
            border: `1px solid ${isSubmitting ? 'rgba(212,149,106,0.3)' : 'var(--line)'}`, // uses new amber accent
            borderRadius: 16,
            padding: '18px 20px',
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: isSubmitting
              ? '0 0 0 4px rgba(212,149,106,0.08), 0 32px 80px rgba(0,0,0,0.6)'
              : '0 16px 50px rgba(0,0,0,0.45)',
            transition: 'border-color 0.4s, box-shadow 0.4s',
          }}>
            {isSubmitting ? (
              <div style={{ display: 'flex', gap: 3, alignItems: 'center', padding: '0 2px' }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{
                    width: 5, height: 5, borderRadius: '50%', background: 'var(--amber)',
                    animation: `pulseDot 1.2s ease-in-out ${i * 0.2}s infinite`
                  }}></span>
                ))}
              </div>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" stroke="var(--amber)" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            )}

            <div style={{ flex: 1, fontSize: 16, color: 'var(--text)', minHeight: 24, letterSpacing: '-0.01em' }}>
              {text}
              {!isSubmitting && <span style={{ display: 'inline-block', width: 2, height: 17, background: 'var(--amber)', verticalAlign: 'middle', marginLeft: 2, animation: 'blink 1s steps(1) infinite' }}></span>}
            </div>

            <div style={{
              padding: '8px 16px', borderRadius: 100,
              background: isSubmitting ? 'var(--amber)' : 'var(--bg-3)',
              color: isSubmitting ? '#000' : 'var(--muted)',
              fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.3s', fontFamily: 'Inter',
              whiteSpace: 'nowrap',
            }}>
              {isSubmitting ? 'Thinking…' : 'Ask'} <span style={{ opacity: 0.6 }}>{isSubmitting ? '' : '↵'}</span>
            </div>
          </div>

          {/* Tag chips */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14, opacity: isSubmitting ? 0 : 0.7, transition: 'opacity 0.3s', flexWrap: 'wrap' }}>
            {['pricing strategy', 'burn rate', 'market expansion', 'fundraising'].map((c, i) => (
              <span key={i} className="mono" style={{ fontSize: 10, padding: '5px 12px', border: '1px solid var(--line)', borderRadius: 100, color: 'var(--muted)', letterSpacing: '0.04em' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* — MOCKUP LAYER — zooms in from far away */}
      <div style={{
        opacity: isMockup ? 1 : 0,
        transform: isMockup ? 'scale(1)' : 'scale(0.86)',
        transition: isMockup
          ? 'opacity 0.55s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
          : 'none',
        pointerEvents: isMockup ? 'auto' : 'none',
        position: 'relative', zIndex: 1,
        willChange: 'transform, opacity',
        maxWidth: 960, margin: '0 auto', width: '100%'
      }}>
        <GriffinDesk question={QUESTIONS[qIdx % QUESTIONS.length]} animateKey={cycle} />
      </div>
    </div>
  );
}

function GriffinDesk({ question, animateKey }) {
  return (
    <div key={animateKey} style={{
      background: 'var(--bg-card)',
      borderRadius: 16, overflow: 'hidden',
      border: '1px solid var(--line)',
      boxShadow: '0 40px 100px -20px rgba(26,24,18,0.22), 0 16px 40px rgba(26,24,18,0.1)',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Window chrome */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }}></span>
        </div>
        <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>griffin — strategy desk · acme corp</span>
        <span className="mono" style={{ fontSize: 10.5, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', animation: 'pulseDot 2s infinite' }}></span>
          synced
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '176px 1fr 220px', minHeight: 480 }}>
        {/* Sidebar */}
        <div style={{ borderRight: '1px solid var(--line)', padding: '18px 14px', background: 'var(--bg-3)' }}>
          <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.14em', marginBottom: 10 }}>WORKSPACE</div>
          {['Strategy desk', 'Q4 planning', 'Pricing model', 'Hiring plan', 'Scenario archive'].map((t, i) => (
            <div key={i} style={{
              fontSize: 11.5, padding: '6px 9px', borderRadius: 6,
              background: i === 0 ? 'var(--bg-card)' : 'transparent',
              color: i === 0 ? 'var(--text)' : 'var(--text-2)',
              display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2,
              cursor: 'default',
              boxShadow: i === 0 ? '0 1px 3px rgba(26,24,18,0.05)' : 'none',
            }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: i === 0 ? 'var(--green)' : 'var(--line-med)', flexShrink: 0 }}></span>
              {t}
            </div>
          ))}
          
          <div style={{ margin: '20px 0 10px', height: 1, background: 'var(--line)' }}></div>
          <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.14em', marginBottom: 10 }}>SOURCES · 6</div>
          {['Snowflake', 'HubSpot', 'Stripe', 'Notion', 'Linear', 'QuickBooks'].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'var(--text-2)', padding: '3.5px 0' }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, opacity: 0.9 }}></span>
              {s}
            </div>
          ))}
        </div>

        {/* Main chat */}
        <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* User bubble */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', animation: 'fadeUp 0.4s ease 0.1s both' }}>
            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--text)', padding: '10px 15px', borderRadius: '14px 14px 4px 14px', fontSize: 13, maxWidth: '88%', lineHeight: 1.5 }}>
              {question}
            </div>
          </div>
          
          {/* Bronn reply */}
          <div style={{ display: 'flex', gap: 10, animation: 'fadeUp 0.5s ease 0.5s both' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-3)', border: '1px solid var(--line)', flexShrink: 0, display: 'grid', placeItems: 'center' }}>
              <span className="head" style={{ color: 'var(--text)', fontSize: 10 }}>G</span>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', padding: '13px 15px', borderRadius: '14px 14px 14px 4px', fontSize: 13, lineHeight: 1.6, color: 'var(--text-2)', flex: 1, boxShadow: '0 4px 12px rgba(26,24,18,0.03)' }}>
              <div style={{ marginBottom: 12 }}>
                Yes — raise by <strong style={{ color: 'var(--text)' }}>12%</strong>, effective May 1. Expected lift <strong style={{ color: 'var(--green)' }}>+$84K MRR</strong>, churn risk low <span style={{ color: 'var(--muted)' }}>(0.18)</span>.
              </div>
              {/* Animated chart */}
              <div style={{ height: 90, padding: '10px 0 6px', borderTop: '1px solid var(--line)', position: 'relative' }}>
                <svg viewBox="0 0 300 72" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="gr1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--green)" stopOpacity="0.15"/>
                      <stop offset="100%" stopColor="var(--green)" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  {[18, 36, 54].map(y => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="var(--line-med)" strokeDasharray="2 4"/>)}
                  <path d="M 0 52 C 50 50, 100 47, 150 44 S 240 38, 300 34" fill="none" stroke="var(--line-med)" strokeWidth="1.2" strokeDasharray="3 4"/>
                  <path d="M 0 52 C 50 46, 100 36, 155 22 S 250 6, 300 3"
                    fill="none" stroke="var(--green)" strokeWidth="2"
                    strokeDasharray="700" strokeDashoffset="700"
                    style={{ animation: 'lineDraw 1.6s cubic-bezier(0.2,0.7,0.2,1) 1s forwards' }}/>
                  <path d="M 0 52 C 50 46, 100 36, 155 22 S 250 6, 300 3 L 300 72 L 0 72 Z"
                    fill="url(#gr1)" opacity="0"
                    style={{ animation: 'fadeUp 0.8s ease 1.8s forwards' }}/>
                  <circle cx="300" cy="3" r="3.5" fill="var(--green)" opacity="0" style={{ animation: 'fadeUp 0.4s ease 2.2s forwards' }}/>
                </svg>
              </div>
              <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--muted)', marginTop: 4 }}>
                <span>JAN</span><span>· baseline</span><span>· projected</span><span>DEC</span>
              </div>
            </div>
          </div>

          {/* Follow-up chips */}
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', paddingLeft: 34, animation: 'fadeUp 0.4s ease 2.4s both' }}>
            {['↗ show downside', '↗ who churns?', '↗ draft email'].map((s, i) => (
              <span key={i} className="mono" style={{ fontSize: 10, padding: '5px 10px', borderRadius: 100, border: '1px solid var(--line)', color: 'var(--text-2)', background: 'var(--bg-2)' }}>{s}</span>
            ))}
          </div>

          {/* Animated Input */}
          <div style={{ 
            marginTop: 'auto', paddingTop: 14, 
            animation: 'fadeUp 0.4s ease 2.8s both' 
          }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--amber)',
              boxShadow: '0 0 0 3px rgba(201,124,71,0.1), 0 2px 10px rgba(26,24,18,0.05)',
              borderRadius: 12,
              padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 13, color: 'var(--text)', flex: 1 }}>Ask a follow-up…</span>
              <span style={{ width: 1.5, height: 14, background: 'var(--amber)', animation: 'blink 1.1s steps(1) infinite' }}></span>
              <div style={{
                padding: '4px 10px', borderRadius: 100,
                background: 'var(--bg-3)', color: 'var(--muted)',
                fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4,
              }}>
                Ask <span style={{ opacity: 0.6 }}>↵</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel: Scenarios */}
        <div style={{ borderLeft: '1px solid var(--line)', padding: '18px 14px', background: 'var(--bg-3)' }}>
          <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.14em', marginBottom: 12 }}>SCENARIOS · 3</div>
          {[
            { tag: 'A · hold', growth: '+6%', mrr: '$12k', risk: 'LOW', dim: true },
            { tag: 'B · raise 12%', growth: '+18%', mrr: '$84k', risk: 'LOW', dim: false },
            { tag: 'C · usage tier', growth: '+24%', mrr: '$106k', risk: 'MED', dim: true },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '11px 12px', borderRadius: 9, marginBottom: 7,
              background: !s.dim ? 'var(--green-soft)' : 'var(--bg-card)',
              border: !s.dim ? '1px solid rgba(74,140,58,0.3)' : '1px solid var(--line)',
              opacity: s.dim ? 0.6 : 1,
              animation: `fadeUp 0.4s ease ${0.6 + i * 0.15}s both`,
              position: 'relative',
              boxShadow: !s.dim ? '0 4px 12px rgba(74,140,58,0.06)' : 'none',
            }}>
              {!s.dim && <span className="mono" style={{ position: 'absolute', top: 8, right: 10, fontSize: 8, color: 'var(--green)', letterSpacing: '0.06em' }}>PICKED ✓</span>}
              <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.06em', marginBottom: 5 }}>{s.tag.toUpperCase()}</div>
              <div className="head" style={{ fontSize: 28, color: !s.dim ? 'var(--green)' : 'var(--text-2)', lineHeight: 1.1 }}>{s.growth}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>+{s.mrr} MRR</span>
                <span className="mono" style={{ fontSize: 9, color: !s.dim ? 'var(--green)' : 'var(--muted)', padding: '1px 5px', border: '1px solid currentColor', borderRadius: 3, opacity: 0.8 }}>{s.risk}</span>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 12, padding: '11px 12px', background: 'var(--ink)', color: 'var(--cream)', borderRadius: 9, fontSize: 11, lineHeight: 1.5, animation: 'fadeUp 0.5s ease 1.5s both', boxShadow: '0 8px 16px rgba(26,24,18,0.1)' }}>
            <div className="mono" style={{ fontSize: 8.5, opacity: 0.6, letterSpacing: '0.1em', marginBottom: 5 }}>RECOMMENDATION</div>
            Ship Scenario B in May. Hold C as contingency.
          </div>

          <div style={{ marginTop: 14 }}>
            <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.14em', marginBottom: 8 }}>CITATIONS · 14</div>
            {['stripe_q1.csv', 'hubspot_accts.json', 'board_deck_feb.pdf'].map((f, i) => (
              <div key={i} style={{ fontSize: 10, color: 'var(--text-2)', padding: '4px 0', borderBottom: '1px solid var(--line)', display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ color: 'var(--muted)' }}>↳</span> {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.HeroShowcase = HeroShowcase;
