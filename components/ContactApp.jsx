// ContactApp.jsx
const { useEffect: useEffectC } = React;

function ContactApp() {
  useEffectC(() => {
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '160px 0 80px' }}>
        <div className="container" style={{ maxWidth: 600, width: '100%' }}>
          <div className="reveal in" style={{ background: 'var(--bg-card)', padding: '40px 48px', borderRadius: 24, border: '1px solid var(--line)', boxShadow: '0 20px 60px -10px rgba(26,24,18,0.08)' }}>
            <h1 className="serif" style={{ fontSize: 36, color: 'var(--text)', marginBottom: 8 }}>Contact Sales</h1>
            <p style={{ color: 'var(--text-2)', fontSize: 15, marginBottom: 32 }}>Let's discuss how Bronn can accelerate your strategy.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label className="mono" style={{ display: 'block', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em', marginBottom: 8 }}>WORK EMAIL</label>
                <input type="email" placeholder="you@company.com" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 14, outline: 'none', color: 'var(--text)' }} />
              </div>
              <div>
                <label className="mono" style={{ display: 'block', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em', marginBottom: 8 }}>COMPANY SIZE</label>
                <select style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 14, outline: 'none', color: 'var(--text)', appearance: 'none' }}>
                  <option>1-50 employees</option>
                  <option>51-200 employees</option>
                  <option>201-1000 employees</option>
                  <option>1000+ employees</option>
                </select>
              </div>
              <div>
                <label className="mono" style={{ display: 'block', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em', marginBottom: 8 }}>HOW CAN WE HELP?</label>
                <textarea rows="4" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 14, outline: 'none', color: 'var(--text)', resize: 'vertical' }}></textarea>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 10, padding: '14px' }}>Submit Request</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ContactApp />);
