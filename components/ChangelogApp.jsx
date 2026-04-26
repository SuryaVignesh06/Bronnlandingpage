// ChangelogApp.jsx
const { useEffect: useEffectCh } = React;

function ChangelogApp() {
  useEffectCh(() => {
    if (typeof Lenis !== 'undefined' && typeof gsap !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll('.reveal').forEach(el => {
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          onStart: () => el.classList.add('in')
        });
      });

      return () => {
        lenis.destroy();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }
  }, []);

  const logs = [
    { version: '2.4', date: 'April 2026', title: 'Scenario Engine & Team Workspaces', desc: 'Introduced the Scenario Engine allowing parallel modeling of burn rates and strategic decisions without affecting the baseline. Added robust team workspace support with role-based access control.' },
    { version: '2.3', date: 'February 2026', title: 'Snowflake & Hubspot Integrations', desc: 'Directly sync your enterprise data warehouse into Bronn. Real-time metrics stream straight into your strategic models.' },
    { version: '2.2', date: 'January 2026', title: 'Board-Ready Exports', desc: 'Export your strategy discussions directly into beautiful, annotated PDFs and presentation decks.' },
    { version: '2.0', date: 'November 2025', title: 'The Intelligence Update', desc: 'Completely overhauled the core AI strategy models. Bronn now understands multi-year runway projections natively.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />
      <main style={{ flex: 1, paddingTop: 160, paddingBottom: 120 }}>
        <div className="container-narrow">
          <div className="reveal in" style={{ marginBottom: 60 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>CHANGELOG</div>
            <h1 className="serif" style={{ fontSize: 'clamp(40px, 6vw, 64px)', marginBottom: 16, lineHeight: 1.1 }}>What's new in Bronn.</h1>
            <p style={{ fontSize: 18, color: 'var(--text-2)' }}>We push updates constantly to make your strategy smoother.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
            {logs.map((l, i) => (
              <div key={i} className="reveal in" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 40, alignItems: 'flex-start' }}>
                <div style={{ position: 'relative' }}>
                  <div className="mono" style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500, marginBottom: 4 }}>v {l.version}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{l.date}</div>
                  {i !== logs.length - 1 && <div style={{ position: 'absolute', top: 40, bottom: -60, left: 0, width: 1, background: 'var(--line-soft)' }} />}
                </div>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', padding: '32px', borderRadius: 20, boxShadow: '0 10px 40px -10px rgba(26,24,18,0.03)' }}>
                  <h3 className="serif" style={{ fontSize: 24, marginBottom: 12 }}>{l.title}</h3>
                  <p style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ChangelogApp />);
