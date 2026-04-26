// TooltipText.jsx
const { useState, useRef, useEffect } = React;

function HoverCard({ heading, body, x, y, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed',
      left: x,
      top: y,
      transform: 'translate(-50%, 16px)',
      background: 'rgba(28,28,28,0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 12,
      padding: '16px',
      width: 280,
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      zIndex: 9999,
      pointerEvents: 'none',
      color: '#f5efe6',
      animation: 'tooltipFade 0.2s cubic-bezier(0.2,0.7,0.2,1) forwards',
    }}>
      <style>{`
        @keyframes tooltipFade {
          from { opacity: 0; transform: translate(-50%, 24px) scale(0.96); }
          to { opacity: 1; transform: translate(-50%, 16px) scale(1); }
        }
      `}</style>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#b8d4a8', marginBottom: 8, textTransform: 'uppercase' }}>
        {heading}
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.7)' }}>
        {body}
      </div>
    </div>
  );
}

function TooltipText({ text }) {
  const [hoveredToken, setHoveredToken] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e, token) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: rect.left + rect.width / 2, y: rect.bottom });
    setHoveredToken(token);
  };

  const handleMouseLeave = () => {
    setHoveredToken(null);
  };

  // Parse text for [[term|heading|body]]
  // Returns an array of strings and React elements
  const parseText = (str) => {
    const regex = /\[\[(.*?)\|(.*?)\|(.*?)\]\]/g;
    const elements = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        elements.push(str.substring(lastIndex, match.index));
      }
      const term = match[1];
      const heading = match[2];
      const body = match[3];

      elements.push(
        <span
          key={match.index}
          onMouseEnter={(e) => handleMouseEnter(e, { heading, body })}
          onMouseLeave={handleMouseLeave}
          style={{
            borderBottom: '1px dashed rgba(255,255,255,0.4)',
            cursor: 'help',
            color: 'var(--text)',
            transition: 'color 0.2s, border-color 0.2s'
          }}
          onMouseOver={(e) => { e.currentTarget.style.color = 'var(--green)'; e.currentTarget.style.borderBottom = '1px solid var(--green)'; }}
          onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderBottom = '1px dashed rgba(255,255,255,0.4)'; }}
        >
          {term}
        </span>
      );
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < str.length) {
      elements.push(str.substring(lastIndex));
    }
    return elements;
  };

  return (
    <>
      {parseText(text)}
      <HoverCard 
        visible={!!hoveredToken} 
        heading={hoveredToken?.heading} 
        body={hoveredToken?.body} 
        x={coords.x} 
        y={coords.y} 
      />
    </>
  );
}

window.TooltipText = TooltipText;
