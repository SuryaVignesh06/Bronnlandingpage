// CapabilityWeb.jsx — Interactive node-link capability diagram (Claude-style)
const { useState: useStateC, useEffect: useEffectC, useRef: useRefC } = React;

const CAPABILITIES = [
  { id: 'scenarios',  label: 'Scenario\nModeling',  x: 500, y: 90,  desc: 'Generate up to 8 strategic paths from a single prompt. Compare risk, growth, and math side-by-side.' },
  { id: 'burn',       label: 'Burn &\nRunway',       x: 750, y: 190, desc: 'Model your burn rate and runway against hiring plans, pricing changes, and growth targets.' },
  { id: 'pricing',    label: 'Pricing\nStrategy',    x: 800, y: 360, desc: 'Run elasticity analysis on your pricing. Know the exact revenue impact before you announce anything.' },
  { id: 'board',      label: 'Board\nPrep',          x: 640, y: 480, desc: 'Auto-generate board memos, slide-ready charts, and decision trails — sourced and defensible.' },
  { id: 'market',     label: 'Market\nExpansion',    x: 360, y: 480, desc: 'Evaluate market entry timing with confidence scores, risk maps, and phased rollout recommendations.' },
  { id: 'data',       label: 'Data\nSynthesis',      x: 200, y: 360, desc: 'Connect 14 data sources. Every recommendation links to the row, file, or feed it came from.' },
  { id: 'hiring',     label: 'Hiring\nPlan',         x: 250, y: 190, desc: 'Model headcount against burn, growth targets, and fundraising timelines in real time.' },
];

const CENTER = { x: 500, y: 290, label: 'GRIFFIN', sub: 'Strategy Core' };
const RADIUS_X = 300;
const RADIUS_Y = 200;

function CapabilityWeb() {
  const [active, setActive] = useStateC(null);
  const [inView, setInView] = useStateC(false);
  const ref = useRefC(null);

  useEffectC(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const activeNode = CAPABILITIES.find(c => c.id === active);

  return (
    <section id="product" style={{ padding: '100px 0', background: 'var(--bg)' }}>
      <div className="container">
        {/* Section header */}
        <div className="reveal" style={{ marginBottom: 70, maxWidth: 1100 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>WHAT GRIFFIN CAN DO</div>
          <h2 className="serif" style={{
            fontSize: 'clamp(32px, 4.5vw, 60px)',
            color: 'var(--text)',
            marginBottom: 20,
            lineHeight: 1.1,
          }}>
            Everything a strategy team needs, <em style={{ color: 'var(--muted)' }}>in one place.</em>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.65, maxWidth: 560 }}>
            Griffin connects your data, reasons over it, and returns defensible recommendations — not guesses.
          </p>
        </div>

        {/* Capability diagram */}
        <div ref={ref} style={{ position: 'relative' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 40,
            alignItems: 'center',
          }}>
            {/* Left: SVG web */}
            <div style={{ position: 'relative', width: '100%', paddingBottom: '60%' }}>
              <div style={{ position: 'absolute', inset: 0 }}>
                <svg
                  viewBox="0 0 1000 580"
                  style={{ width: '100%', height: '100%', overflow: 'visible' }}
                >
                  <defs>
                    <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#2d2b22"/>
                      <stop offset="100%" stopColor="#111110"/>
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="blur"/>
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>

                  {/* Background grid dots */}
                  <pattern id="capGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.8" fill="rgba(26,24,18,0.08)"/>
                  </pattern>
                  <rect width="1000" height="580" fill="url(#capGrid)" rx="16"/>

                  {/* Connection lines */}
                  {CAPABILITIES.map((cap, i) => {
                    const isActive = active === cap.id;
                    const dimmed = active && !isActive;
                    return (
                      <line
                        key={cap.id}
                        x1={CENTER.x} y1={CENTER.y}
                        x2={cap.x} y2={cap.y}
                        stroke={isActive ? 'var(--amber)' : 'var(--forest)'}
                        strokeWidth={isActive ? 2 : 1.2}
                        strokeOpacity={dimmed ? 0.08 : isActive ? 0.9 : 0.3}
                        strokeDasharray={isActive ? 'none' : '4 6'}
                        style={{
                          transition: 'all 0.4s ease',
                          animation: !isActive ? `dashFlow ${5 + i * 0.4}s linear infinite` : 'none',
                          strokeDashoffset: 0,
                        }}
                      />
                    );
                  })}

                  {/* Capability nodes */}
                  {CAPABILITIES.map((cap) => {
                    const isActive = active === cap.id;
                    const dimmed = active && !isActive;
                    const lines = cap.label.split('\n');
                    return (
                      <g
                        key={cap.id}
                        style={{
                          cursor: 'pointer',
                          opacity: dimmed ? 0.3 : 1,
                          transition: 'opacity 0.35s ease',
                        }}
                        onClick={() => setActive(active === cap.id ? null : cap.id)}
                        onMouseEnter={() => !active && setActive(cap.id)}
                        onMouseLeave={() => !active && setActive(null)}
                      >
                        <circle
                          cx={cap.x} cy={cap.y} r={isActive ? 54 : 48}
                          fill={isActive ? 'var(--ink)' : 'var(--bg-2)'}
                          stroke={isActive ? 'var(--amber)' : 'var(--line-med)'}
                          strokeWidth={isActive ? 2 : 1.2}
                          style={{ transition: 'all 0.35s ease' }}
                        />
                        {lines.map((line, li) => (
                          <text
                            key={li}
                            x={cap.x} y={cap.y + (li - (lines.length - 1) / 2) * 16}
                            textAnchor="middle" dominantBaseline="middle"
                            fontFamily="'Inter', sans-serif"
                            fontSize={13}
                            fontWeight={isActive ? 600 : 500}
                            fill={isActive ? 'var(--cream)' : 'var(--text-2)'}
                            style={{ transition: 'fill 0.3s', userSelect: 'none' }}
                          >
                            {line}
                          </text>
                        ))}
                      </g>
                    );
                  })}

                  {/* Center core node */}
                  <g>
                    <circle cx={CENTER.x} cy={CENTER.y} r={80} fill="url(#coreGrad)" />
                    <circle cx={CENTER.x} cy={CENTER.y} r={80} fill="none"
                      stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                    <text x={CENTER.x} y={CENTER.y - 10} textAnchor="middle"
                      fontFamily="'Oswald', sans-serif" fontSize={32} fontWeight={500}
                      fill="rgba(255,255,255,0.92)" letterSpacing="0.08em">
                      GRIFFIN
                    </text>
                    <text x={CENTER.x} y={CENTER.y + 18} textAnchor="middle"
                      fontFamily="'JetBrains Mono', monospace" fontSize={11}
                      fill="rgba(255,255,255,0.35)" letterSpacing="0.2em">
                      STRATEGY CORE
                    </text>
                    {/* Live dot */}
                    <circle cx={CENTER.x + 60} cy={CENTER.y - 60} r={5} fill="var(--green)">
                      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
                    </circle>
                  </g>
                </svg>
              </div>
            </div>

            {/* Right: Capability detail panel */}
            <div style={{ paddingLeft: 20 }}>
              {!activeNode ? (
                <div style={{ animation: 'fadeUp 0.4s ease both' }}>
                  <div className="eyebrow" style={{ marginBottom: 20 }}>7 CORE CAPABILITIES</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {CAPABILITIES.map((cap) => (
                      <button
                        key={cap.id}
                        onClick={() => setActive(cap.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 14,
                          padding: '14px 18px', borderRadius: 12,
                          background: 'var(--bg-2)', border: '1px solid var(--line)',
                          cursor: 'pointer', textAlign: 'left',
                          transition: 'all 0.2s ease',
                          fontFamily: 'Inter, sans-serif',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-3)'; e.currentTarget.style.borderColor = 'var(--line-med)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = ''; }}
                      >
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--amber)', flexShrink: 0 }}/>
                        <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--text)' }}>
                          {cap.label.replace('\n', ' ')}
                        </span>
                        <span style={{ marginLeft: 'auto', fontSize: 18, color: 'var(--muted)', opacity: 0.4 }}>→</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div key={activeNode.id} style={{ animation: 'scaleIn 0.35s ease both' }}>
                  <button
                    onClick={() => setActive(null)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 6,
                      color: 'var(--muted)', fontSize: 12, fontFamily: 'JetBrains Mono',
                      letterSpacing: '0.06em', padding: 0, marginBottom: 28,
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    ← ALL CAPABILITIES
                  </button>

                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '6px 12px', borderRadius: 100,
                    background: 'rgba(201,124,71,0.10)', border: '1px solid rgba(201,124,71,0.2)',
                    marginBottom: 20,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)' }}/>
                    <span className="eyebrow" style={{ color: 'var(--amber)' }}>{activeNode.label.replace('\n', ' ').toUpperCase()}</span>
                  </div>

                  <h3 className="serif" style={{
                    fontSize: 'clamp(34px, 5vw, 56px)',
                    color: 'var(--text)', marginBottom: 20, lineHeight: 1.1,
                  }}>
                    {activeNode.label.replace('\n', ' ')}
                  </h3>
                  <p style={{ fontSize: 20, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 40, maxWidth: '42ch' }}>
                    {activeNode.desc}
                  </p>
                  <a href="download.html" className="btn btn-primary">
                    Try it in Griffin <span className="arrow">→</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.CapabilityWeb = CapabilityWeb;
