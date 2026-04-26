// Mockups.jsx — realistic Bronn desktop app screens used inside feature cards
const { useState: useStateM, useEffect: useEffectM } = React;

// Shared chrome
function AppChrome({ children, title = 'Bronn — strategy desk', tint = 'var(--cream-3)' }) {
  return (
    <div style={{
      background: tint, borderRadius: 16, overflow: 'hidden',
      border: '1px solid var(--line)',
      boxShadow: '0 24px 60px -20px rgba(28,29,20,0.18), 0 8px 20px -8px rgba(28,29,20,0.08)',
      width: '100%',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', borderBottom: '1px solid var(--line-soft)',
        background: 'rgba(245,239,230,0.55)',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#e6b8a8' }}></span>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#e6d5a8' }}></span>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#b8d0a4' }}></span>
        </div>
        <span className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>{title}</span>
        <span className="mono" style={{ fontSize: 10, color: '#7a8b6a' }}>● live</span>
      </div>
      {children}
    </div>
  );
}

// 1) WELCOME — "Open Bronn"
function MockupWelcome() {
  return (
    <AppChrome title="bronn — welcome" tint="var(--cream-3)">
      <div style={{ padding: '38px 32px 36px', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
        {/* Logo orb */}
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #4a5840, var(--forest) 65%, #1f2a1d)',
          marginBottom: 22, position: 'relative',
          boxShadow: '0 12px 30px -8px rgba(45,56,41,0.4)',
          animation: 'float 4s ease-in-out infinite',
        }}>
          <span className="display" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--cream)', fontSize: 22 }}>B</span>
        </div>
        <div className="serif" style={{ fontSize: 32, marginBottom: 6 }}>good morning, alex.</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>let's look at the week ahead.</div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 380 }}>
          {['review Q4 burn', 'pricing scenarios', 'hiring plan check', 'board prep'].map((t, i) => (
            <div key={i} className="mono" style={{
              fontSize: 11, padding: '7px 13px', borderRadius: 100,
              border: '1px solid var(--line)', background: 'var(--cream)',
              color: 'var(--ink-2)',
            }}>{t}</div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>↻ synced 2 min ago</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>14 sources connected</span>
        </div>
      </div>
    </AppChrome>
  );
}

// 2) CONNECT — data sources
function MockupConnect() {
  const sources = [
    { n: 'Snowflake', s: 'connected', dot: '#7a8b6a' },
    { n: 'HubSpot', s: 'connected', dot: '#7a8b6a' },
    { n: 'Stripe', s: 'connected', dot: '#7a8b6a' },
    { n: 'Notion', s: 'syncing…', dot: '#c2902c' },
    { n: 'Linear', s: 'connected', dot: '#7a8b6a' },
    { n: 'QuickBooks', s: 'connected', dot: '#7a8b6a' },
  ];
  return (
    <AppChrome title="bronn — sources" tint="var(--cream-3)">
      <div style={{ padding: '20px 22px 24px', minHeight: 320 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <div className="serif" style={{ fontSize: 22 }}>connected sources</div>
          <span className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>6 of 14 active</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {sources.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px', background: 'var(--cream)',
              border: '1px solid var(--line-soft)', borderRadius: 10,
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--cream-2)', display: 'grid', placeItems: 'center' }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--ink-2)', opacity: 0.85 }}></span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{s.n}</div>
                <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)' }}>{s.s}</div>
              </div>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, animation: s.s.includes('sync') ? 'pulseDot 1.4s ease-in-out infinite' : 'none' }}></span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: '10px 12px', background: 'rgba(45,56,41,0.06)', borderRadius: 10, fontSize: 11.5, color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--forest)', color: 'var(--cream)', fontSize: 10, display: 'grid', placeItems: 'center', flexShrink: 0 }}>+</span>
          all data stays on your machine. nothing leaves without permission.
        </div>
      </div>
    </AppChrome>
  );
}

// 3) ADVISE — chat with Bronn (recommendation + chart)
function MockupAdvise() {
  return (
    <AppChrome title="bronn — advisor" tint="var(--cream-3)">
      <div style={{ padding: '18px 20px 20px', minHeight: 320 }}>
        {/* User msg */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <div style={{
            background: 'var(--ink)', color: 'var(--cream)',
            padding: '9px 14px', borderRadius: '14px 14px 4px 14px',
            fontSize: 12.5, maxWidth: '75%',
          }}>
            should we raise prices on the team plan in q2?
          </div>
        </div>
        {/* Bronn msg */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--forest)', flexShrink: 0, display: 'grid', placeItems: 'center' }}>
            <span className="display" style={{ color: 'var(--cream)', fontSize: 11 }}>B</span>
          </div>
          <div style={{
            background: 'var(--cream)', border: '1px solid var(--line-soft)',
            padding: '12px 14px', borderRadius: '14px 14px 14px 4px',
            fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-2)',
            flex: 1,
          }}>
            <div style={{ marginBottom: 8 }}>yes — by 12%, effective May 1. expected lift: <b style={{ color: 'var(--ink)' }}>+$84k MRR</b>, churn risk: low (0.18).</div>
            {/* Mini chart */}
            <div style={{ height: 60, display: 'flex', alignItems: 'flex-end', gap: 4, padding: '6px 0', borderTop: '1px solid var(--line-soft)', marginTop: 8 }}>
              {[18, 24, 22, 30, 28, 36, 42, 40, 52, 58, 62, 70].map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: `${h}%`,
                  background: i >= 8 ? 'var(--forest)' : 'var(--sage)',
                  borderRadius: 2,
                  transformOrigin: 'bottom',
                  animation: `barGrow 0.8s cubic-bezier(0.2,0.7,0.2,1) ${i * 0.04}s both`,
                }}></div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>JAN</span>
              <span className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>price ↑</span>
              <span className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>DEC</span>
            </div>
          </div>
        </div>
        {/* Suggested follow-ups */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          {['show downside scenario', 'who churns?', 'draft customer email'].map((s, i) => (
            <span key={i} className="mono" style={{
              fontSize: 10, padding: '5px 10px', borderRadius: 100,
              border: '1px solid var(--line)', color: 'var(--ink-2)',
            }}>↗ {s}</span>
          ))}
        </div>
      </div>
    </AppChrome>
  );
}

// 4) SCENARIOS — side by side
function MockupScenarios() {
  const scenarios = [
    { tag: 'A — hold', growth: '+6%', risk: 'low', dim: true, color: 'var(--cream-2)' },
    { tag: 'B — raise 12%', growth: '+18%', risk: 'low', dim: false, color: 'var(--sage-soft)' },
    { tag: 'C — usage tier', growth: '+24%', risk: 'med', dim: true, color: 'var(--cream-2)' },
  ];
  return (
    <AppChrome title="bronn — scenarios" tint="var(--cream-3)">
      <div style={{ padding: '18px 20px 20px', minHeight: 320 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <div className="serif" style={{ fontSize: 22 }}>scenario compare</div>
          <span className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>3 of 8 generated</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
          {scenarios.map((s, i) => (
            <div key={i} style={{
              background: s.color, borderRadius: 10, padding: 12,
              border: !s.dim ? '1.5px solid var(--forest)' : '1px solid var(--line-soft)',
              opacity: s.dim ? 0.65 : 1, position: 'relative',
            }}>
              {!s.dim && (
                <span className="mono" style={{ position: 'absolute', top: -8, right: 10, fontSize: 8.5, padding: '2px 6px', background: 'var(--forest)', color: 'var(--cream)', borderRadius: 100, letterSpacing: '0.08em' }}>PICKED</span>
              )}
              <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', marginBottom: 6, letterSpacing: '0.05em' }}>{s.tag.toUpperCase()}</div>
              <div className="serif" style={{ fontSize: 24, color: 'var(--ink)' }}>{s.growth}</div>
              <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', marginTop: 4 }}>risk · {s.risk}</div>
            </div>
          ))}
        </div>
        {/* Path comparison line */}
        <div style={{ background: 'var(--cream)', borderRadius: 10, padding: '12px 14px', border: '1px solid var(--line-soft)' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 6 }}>12-MONTH MRR PROJECTION</div>
          <svg viewBox="0 0 320 70" style={{ width: '100%', height: 70 }}>
            <defs>
              <linearGradient id="grA" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--forest)" stopOpacity="0.15"/><stop offset="100%" stopColor="var(--forest)" stopOpacity="0"/></linearGradient>
            </defs>
            {/* Hold path (light) */}
            <path d="M 0 50 C 60 48, 120 46, 180 42 S 280 36, 320 32" fill="none" stroke="var(--muted)" strokeWidth="1.2" strokeDasharray="3 3" />
            {/* Raise path (bold) */}
            <path d="M 0 50 C 60 46, 120 42, 180 30 S 280 14, 320 6" fill="none" stroke="var(--forest)" strokeWidth="2"
              strokeDasharray="600" strokeDashoffset="0"
              style={{ animation: 'lineDraw 2.4s ease-out' }} />
            <path d="M 0 50 C 60 46, 120 42, 180 30 S 280 14, 320 6 L 320 70 L 0 70 Z" fill="url(#grA)" opacity="0.6" />
            <circle cx="320" cy="6" r="3.5" fill="var(--forest)" />
          </svg>
        </div>
      </div>
    </AppChrome>
  );
}

// 5) BOARD MEMO export
function MockupMemo() {
  return (
    <AppChrome title="bronn — board memo" tint="var(--cream-3)">
      <div style={{ padding: '20px 24px 24px', minHeight: 320, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid var(--line-soft)' }}>
          <div>
            <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', letterSpacing: '0.1em' }}>MEMO · Q4 BOARD</div>
            <div className="serif" style={{ fontSize: 22, marginTop: 2 }}>pricing strategy, q2 fy26</div>
          </div>
          <span className="mono" style={{ fontSize: 10, padding: '4px 9px', background: 'var(--sage-soft)', borderRadius: 4, color: 'var(--forest)' }}>READY</span>
        </div>
        {/* Faux body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[88, 76, 92, 68, 84, 50, 80, 72].map((w, i) => (
            <div key={i} style={{ height: 6, width: `${w}%`, background: i === 4 ? 'var(--ink-2)' : 'var(--line)', borderRadius: 100, opacity: i === 4 ? 0.85 : 0.55 }}></div>
          ))}
        </div>
        {/* Citations */}
        <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--cream-2)', borderRadius: 8, display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--forest)', color: 'var(--cream)', display: 'grid', placeItems: 'center', fontSize: 11 }}>↳</span>
          <div style={{ flex: 1 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-2)' }}>14 citations · 6 sources · 0 hallucinations</div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', marginTop: 2 }}>each claim links to the row, file or feed it came from.</div>
          </div>
        </div>
        {/* Export buttons */}
        <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
          {['PDF', 'Notion', 'Slides', '↗ Send'].map((b, i) => (
            <span key={i} className="mono" style={{ fontSize: 10, padding: '6px 10px', border: '1px solid var(--line)', borderRadius: 6, color: 'var(--ink-2)' }}>{b}</span>
          ))}
        </div>
      </div>
    </AppChrome>
  );
}

window.MockupWelcome = MockupWelcome;
window.MockupConnect = MockupConnect;
window.MockupAdvise = MockupAdvise;
window.MockupScenarios = MockupScenarios;
window.MockupMemo = MockupMemo;
