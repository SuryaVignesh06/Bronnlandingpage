// LiveDemo.jsx — interactive Griffin sandbox
const { useState: useStateD } = React;

const SAMPLE_PROMPTS = [
  'Should we expand into LATAM next quarter?',
  'Cut burn 20% — what should I trim first?',
  'Pricing: usage-based or seat-based for Q2?',
  'Hire VP Marketing now or in 6 months?',
];

function LiveDemo() {
  const [prompt, setPrompt] = useStateD('');
  const [response, setResponse] = useStateD(null);
  const [loading, setLoading] = useStateD(false);
  const [error, setError] = useStateD(null);

  async function ask(text) {
    const q = (text || prompt).trim();
    if (!q || loading) return;
    setLoading(true); setError(null); setResponse(null);
    try {
      const sys = `You are Griffin, an AI business strategist. Answer the user's strategic question in this exact JSON format and nothing else:
{"recommendation": "one short sentence — the call to make", "reasoning": ["3-4 short tight phrases"], "risks": ["2 short risk phrases"], "confidence": 0.78}
Be specific, opinionated, concise. No fluff.`;
      const result = await window.claude.complete({
        messages: [{ role: 'user', content: sys + '\n\nQuestion: ' + q }],
      });
      const m = result.match(/\{[\s\S]*\}/);
      if (m) setResponse(JSON.parse(m[0]));
      else setResponse({ recommendation: result, reasoning: [], risks: [], confidence: 0.6 });
    } catch (e) {
      setError('Griffin is offline in this preview. Try a sample prompt.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="demo" style={{ padding: '100px 0' }}>
      <div className="container">
        <div className="scale-reveal" style={{
          background: 'var(--lilac)', borderRadius: 32, padding: '50px 50px',
          border: '1px solid var(--line-soft)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, alignItems: 'end', marginBottom: 36 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 18, color: '#5a4d57' }}>— 05 / Try it</div>
              <h2 className="serif" style={{ fontSize: 'clamp(48px, 6vw, 80px)', color: 'var(--ink)', letterSpacing: '-0.015em' }}>
                Ask Griffin<br/>
                <em style={{ fontStyle: 'italic', color: '#5a4d57' }}>a question.</em>
              </h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 460 }}>
              Live, in-browser. Pose a real strategic question — Griffin returns a recommendation, its reasoning, and the risks. A slim sandbox; the desktop app does much more.
            </p>
          </div>

          <div style={{ background: 'var(--cream-3)', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--line-soft)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid var(--line-soft)', background: 'rgba(255,255,255,0.5)' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#e6b8a8' }}></span>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#e6d5a8' }}></span>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#b8d0a4' }}></span>
              </div>
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>griffin — interactive sandbox</span>
              <span className="mono" style={{ fontSize: 11, color: '#7a8b6a' }}>● connected</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', minHeight: 380 }}>
              <div style={{ padding: '28px 28px', borderRight: '1px solid var(--line-soft)', display: 'flex', flexDirection: 'column' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 12 }}>YOUR QUESTION</div>
                <textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) ask(); }}
                  placeholder="Should we raise prices in Q2?"
                  style={{
                    width: '100%', minHeight: 90, resize: 'none',
                    border: 'none', outline: 'none', background: 'transparent',
                    fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 22, lineHeight: 1.3, color: 'var(--ink)', marginBottom: 18,
                  }}
                />
                <div style={{ marginBottom: 16 }}>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 10 }}>OR TRY A SAMPLE</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {SAMPLE_PROMPTS.map((p, i) => (
                      <button key={i}
                        onClick={() => { setPrompt(p); ask(p); }}
                        style={{
                          textAlign: 'left', padding: '9px 13px', background: 'transparent',
                          border: '1px solid var(--line)', borderRadius: 8, cursor: 'pointer',
                          fontFamily: 'Poppins', fontSize: 12.5, color: 'var(--ink-2)',
                          transition: 'background 0.2s, border-color 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(45,56,41,0.04)'; e.currentTarget.style.borderColor = 'var(--forest)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--line)'; }}
                      >
                        <span style={{ color: 'var(--muted)', marginRight: 8 }}>→</span>{p}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => ask()} disabled={loading || !prompt.trim()} className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 'auto', opacity: loading || !prompt.trim() ? 0.5 : 1 }}>
                  {loading ? 'Thinking…' : 'Ask Griffin'} <span className="arrow">→</span>
                </button>
              </div>
              <div style={{ padding: '28px 28px', background: 'var(--cream)', minHeight: 380 }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 14 }}>GRIFFIN'S ANSWER</div>
                {!response && !loading && !error && (
                  <div style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginTop: 16 }}>
                    Pose a question on the left, or pick a sample. Griffin returns a recommendation, the reasoning, and the risks worth tracking.
                  </div>
                )}
                {loading && <ThinkingState />}
                {error && <div style={{ color: 'var(--muted)', fontSize: 14 }}>{error}</div>}
                {response && <Answer response={response} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThinkingState() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 16 }}>
      {['Reading the question', 'Pulling context', 'Modeling scenarios', 'Drafting recommendation'].map((s, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 13, color: 'var(--ink-2)', fontFamily: 'JetBrains Mono', opacity: 0,
          animation: `fadeUp 0.5s ease forwards`, animationDelay: `${i * 0.4}s`,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--forest)', animation: 'pulseDot 1s ease infinite', animationDelay: `${i * 0.2}s` }}></span>
          {s}…
        </div>
      ))}
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

function Answer({ response }) {
  const conf = Math.round((response.confidence || 0.7) * 100);
  return (
    <div style={{ animation: 'fadeUp 0.6s ease' }}>
      <div className="serif" style={{ fontSize: 26, color: 'var(--ink)', lineHeight: 1.2, marginBottom: 22, letterSpacing: '-0.005em' }}>
        {response.recommendation}
      </div>
      {response.reasoning?.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 10 }}>REASONING</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {response.reasoning.map((r, i) => (
              <li key={i} style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)', display: 'flex', gap: 10 }}>
                <span className="mono" style={{ color: 'var(--forest)', flexShrink: 0 }}>{String(i+1).padStart(2,'0')}</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {response.risks?.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 10 }}>RISKS TO TRACK</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {response.risks.map((r, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--ink-2)', padding: '8px 12px', background: 'rgba(166,75,31,0.08)', borderLeft: '2px solid var(--rust)', borderRadius: 4 }}>{r}</div>
            ))}
          </div>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--line-soft)' }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em' }}>CONFIDENCE</div>
        <div style={{ flex: 1, height: 4, background: 'var(--line)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${conf}%`, background: 'var(--forest)', transition: 'width 0.6s ease' }}></div>
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-2)' }}>{conf}%</div>
      </div>
    </div>
  );
}

window.LiveDemo = LiveDemo;




