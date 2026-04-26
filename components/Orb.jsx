// Orb.jsx — animated globe/orb with "BRONN" wordmark
const { useRef, useEffect: useEffectOrb } = React;

function BronnOrb({ size = 460 }) {
  const orbRef = useRef(null);

  useEffectOrb(() => {
    if (typeof gsap !== 'undefined' && orbRef.current) {
      gsap.to(orbRef.current, {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: orbRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 0.5
        }
      });
    }
  }, []);

  const labels = [
    { text: 'GROWTH', deg: -30, r: 235 },
    { text: 'SUCCEED', deg: 45, r: 220 },
    { text: 'SCALE', deg: 100, r: 245 },
    { text: 'RISK', deg: 160, r: 230 },
    { text: 'REASON', deg: 210, r: 220 },
    { text: 'STRATEGY', deg: 260, r: 240 },
    { text: 'MARKET', deg: 310, r: 225 },
    { text: 'DATA', deg: 15, r: 250 },
  ];

  return (
    <div ref={orbRef} style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      {/* Soft glow */}
      <div style={{
        position: 'absolute', inset: '-15%',
        background: 'radial-gradient(circle, rgba(245,239,230,0.10), transparent 60%)',
        filter: 'blur(30px)',
      }}></div>

      <svg viewBox="0 0 460 460" style={{ position: 'relative', width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="orbBody" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#3a3a36" />
            <stop offset="40%" stopColor="#1f1f1d" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>
          <radialGradient id="orbShine" cx="32%" cy="26%" r="38%">
            <stop offset="0%" stopColor="rgba(245,239,230,0.45)" />
            <stop offset="100%" stopColor="rgba(245,239,230,0)" />
          </radialGradient>
          <linearGradient id="orbRing" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(245,239,230,0)" />
            <stop offset="50%" stopColor="rgba(245,239,230,0.25)" />
            <stop offset="100%" stopColor="rgba(245,239,230,0)" />
          </linearGradient>
        </defs>

        {/* Outer orbital rings */}
        <g style={{ transformOrigin: '230px 230px' }}>
          <ellipse cx="230" cy="230" rx="218" ry="60" fill="none" stroke="var(--line)" strokeOpacity="0.4" />
          <circle cx="448" cy="230" r="3" fill="var(--text)" opacity="0.5" />
        </g>
        <g style={{ transformOrigin: '230px 230px' }}>
          <ellipse cx="230" cy="230" rx="200" ry="200" fill="none" stroke="var(--line)" strokeOpacity="0.3" strokeDasharray="2 6" />
        </g>

        {/* Strategic Labels */}
        {labels.map((l, i) => {
          const rad = (l.deg * Math.PI) / 180;
          const x = 230 + Math.cos(rad) * l.r;
          const y = 230 + Math.sin(rad) * l.r;
          return (
            <text key={i} x={x} y={y} textAnchor="middle" className="mono" style={{ fontSize: 9, fill: 'var(--muted)', opacity: 0.6, letterSpacing: '0.12em', userSelect: 'none' }}>
              {l.text}
            </text>
          );
        })}

        {/* Orb body */}
        <circle cx="230" cy="230" r="170" fill="url(#orbBody)" />
        <circle cx="230" cy="230" r="170" fill="url(#orbShine)" />

        {/* Latitude lines */}
        <g opacity="0.35">
          <ellipse cx="230" cy="230" rx="170" ry="40" fill="none" stroke="rgba(245,239,230,0.7)" strokeWidth="0.5" />
          <ellipse cx="230" cy="230" rx="170" ry="80" fill="none" stroke="rgba(245,239,230,0.5)" strokeWidth="0.5" />
          <ellipse cx="230" cy="230" rx="170" ry="120" fill="none" stroke="rgba(245,239,230,0.4)" strokeWidth="0.5" />
          <ellipse cx="230" cy="230" rx="170" ry="160" fill="none" stroke="rgba(245,239,230,0.3)" strokeWidth="0.5" />
        </g>
        {/* Longitude */}
        <g opacity="0.3">
          {[0, 30, 60, 90, 120, 150].map(deg => {
            const rad = (deg * Math.PI) / 180;
            const rx = Math.abs(Math.cos(rad) * 170);
            return <ellipse key={deg} cx="230" cy="230" rx={Math.max(rx, 1)} ry="170" fill="none" stroke="rgba(245,239,230,0.5)" strokeWidth="0.5" />;
          })}
        </g>

        {/* Orbit ring */}
        <circle cx="230" cy="230" r="170" fill="none" stroke="url(#orbRing)" strokeWidth="1" />

        {/* Floating data ticks orbiting - still orbiting but subtle */}
        <g style={{ transformOrigin: '230px 230px', animation: 'orbSpin 40s linear infinite' }}>
          <circle cx="400" cy="230" r="2" fill="var(--green)" />
        </g>
        <g style={{ transformOrigin: '230px 230px', animation: 'orbSpin 55s linear infinite reverse' }}>
          <circle cx="60" cy="230" r="2" fill="var(--warm)" />
        </g>

        {/* BRONN wordmark on orb */}
        <text
          x="230" y="245" textAnchor="middle"
          fontFamily="Oswald" fontWeight="500" fontSize="56"
          fill="var(--text)" letterSpacing="0.08em"
          style={{ filter: 'drop-shadow(0 2px 12px rgba(245,239,230,0.3))' }}
        >
          BRONN
        </text>
        <text x="230" y="268" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(245,239,230,0.5)" letterSpacing="0.3em">
          STRATEGY · CORE
        </text>
      </svg>
    </div>
  );
}

window.BronnOrb = BronnOrb;
