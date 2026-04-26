// Diagram.jsx — abstract strategy node/flow diagram for product preview
const { useEffect, useRef, useState } = React;

function StrategyDiagram() {
  const [hovered, setHovered] = useState(null);

  const nodes = [
    { id: 'data',     x: 80,  y: 220, label: 'DATA INGEST',    sub: '14 sources',   kind: 'input' },
    { id: 'signal',   x: 260, y: 120, label: 'MARKET SIGNALS', sub: 'real-time',    kind: 'input' },
    { id: 'finance',  x: 260, y: 320, label: 'FINANCIALS',     sub: 'Q3 close',     kind: 'input' },
    { id: 'core',     x: 480, y: 220, label: 'BRONN CORE',     sub: 'reasoning',    kind: 'core' },
    { id: 'scenario', x: 700, y: 120, label: 'SCENARIOS',      sub: '4 generated',  kind: 'output' },
    { id: 'risk',     x: 700, y: 320, label: 'RISK MAP',       sub: 'low · 0.18',   kind: 'output' },
    { id: 'decision', x: 900, y: 220, label: 'DECISION',       sub: 'recommended',  kind: 'final' },
  ];

  const links = [
    ['data', 'core'], ['signal', 'core'], ['finance', 'core'],
    ['core', 'scenario'], ['core', 'risk'],
    ['scenario', 'decision'], ['risk', 'decision'],
  ];

  const N = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <div style={{
      position: 'relative',
      background: 'var(--cream-soft)',
      border: '1px solid var(--line)',
      borderRadius: 18,
      overflow: 'hidden',
    }}>
      {/* Top chrome bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 22px', borderBottom: '1px solid var(--line-soft)',
        background: 'rgba(245, 239, 230, 0.6)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#d4c9b3' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#d4c9b3' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#d4c9b3' }}></span>
          <span className="mono" style={{ marginLeft: 14, fontSize: 11, color: 'var(--muted)' }}>
            bronn — strategy graph · acme corp · q4 planning
          </span>
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', display: 'flex', gap: 16 }}>
          <span>● live</span>
          <span>v 2.4</span>
        </div>
      </div>

      {/* Diagram canvas */}
      <div style={{ position: 'relative', height: 460, padding: '20px 30px' }}>
        <svg viewBox="0 0 1000 460" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="rgba(22,23,15,0.08)" />
            </pattern>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--forest)" />
            </marker>
          </defs>
          <rect width="1000" height="460" fill="url(#grid)" />

          {/* Connection lines */}
          {links.map(([a, b], i) => {
            const A = N[a], B = N[b];
            const isCore = a === 'core' || b === 'core';
            return (
              <g key={i}>
                <path
                  d={`M ${A.x} ${A.y} C ${(A.x+B.x)/2} ${A.y}, ${(A.x+B.x)/2} ${B.y}, ${B.x} ${B.y}`}
                  stroke="var(--forest)"
                  strokeWidth={isCore ? 1.5 : 1}
                  strokeOpacity={hovered ? (hovered === a || hovered === b ? 0.9 : 0.15) : 0.45}
                  fill="none"
                  strokeDasharray="3 4"
                  style={{ animation: `dashFlow ${4 + i * 0.3}s linear infinite` }}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((n, i) => {
            const isCore = n.kind === 'core';
            const isFinal = n.kind === 'final';
            const isHover = hovered === n.id;
            const dim = hovered && hovered !== n.id;
            const w = isCore ? 150 : 130;
            const h = isCore ? 64 : 52;
            return (
              <g
                key={n.id}
                transform={`translate(${n.x - w/2}, ${n.y - h/2})`}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  cursor: 'pointer',
                  opacity: dim ? 0.35 : 1,
                  transition: 'opacity 0.3s',
                  animation: `nodeFloat ${5 + i * 0.4}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                <rect
                  width={w} height={h} rx={10}
                  fill={isFinal ? 'var(--forest)' : isCore ? 'var(--ink)' : 'var(--cream)'}
                  stroke={isFinal || isCore ? 'transparent' : 'var(--forest)'}
                  strokeWidth={1}
                  style={{
                    filter: isHover ? 'drop-shadow(0 6px 14px rgba(45,56,41,0.18))' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.04))',
                    transition: 'filter 0.25s',
                  }}
                />
                <text
                  x={w/2} y={isCore ? 26 : 22}
                  textAnchor="middle"
                  fontFamily="Bebas Neue, sans-serif"
                  fontSize={isCore ? 17 : 13}
                  letterSpacing="0.04em"
                  fill={isFinal || isCore ? 'var(--cream)' : 'var(--ink)'}
                >
                  {n.label}
                </text>
                <text
                  x={w/2} y={isCore ? 46 : 38}
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize={9.5}
                  fill={isFinal || isCore ? 'rgba(245,239,230,0.6)' : 'var(--muted)'}
                >
                  {n.sub}
                </text>
                {isCore && (
                  <circle cx={w - 12} cy={12} r={3} fill="#7fb069">
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating annotation */}
        <div style={{
          position: 'absolute', right: 30, bottom: 24,
          background: 'var(--ink)', color: 'var(--cream)',
          padding: '12px 16px', borderRadius: 10, maxWidth: 240,
          fontSize: 12, lineHeight: 1.5,
          boxShadow: '0 10px 30px rgba(22,23,15,0.18)',
        }}>
          <div className="mono" style={{ fontSize: 10, opacity: 0.55, marginBottom: 4, letterSpacing: '0.08em' }}>BRONN · ANALYSIS</div>
          <div>Recommend phased rollout. Cap downside at 8.4% — release Scenario B in Q1, hold C as contingency.</div>
        </div>

        {/* Live timestamps */}
        <div className="mono" style={{
          position: 'absolute', left: 30, bottom: 24,
          fontSize: 10, color: 'var(--muted)', display: 'flex', gap: 16,
        }}>
          <span>↻ updated 14s ago</span>
          <span>conf 0.91</span>
        </div>
      </div>
    </div>
  );
}

window.StrategyDiagram = StrategyDiagram;
