// PricingApp.jsx
const { useEffect: useEffectPr } = React;

function PricingApp() {
  useEffectPr(() => {
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

      // Nav scroll state
      const nav = document.getElementById('main-nav');
      if (nav) {
        ScrollTrigger.create({
          start: 80,
          onEnter: () => nav.classList.add('nav-scrolled'),
          onLeaveBack: () => nav.classList.remove('nav-scrolled'),
        });
      }

      return () => {
        lenis.destroy();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />
      <main style={{ flex: 1, paddingTop: 64 }}>
        <Pricing />
        <div className="container" style={{ paddingBottom: 100 }}>
          <div className="reveal" style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', padding: '40px 48px', borderRadius: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <h3 className="serif" style={{ fontSize: 24, marginBottom: 8 }}>Have more than 25 users?</h3>
              <p style={{ color: 'var(--text-2)' }}>Get custom onboarding, volume discounts, and enterprise SLAs.</p>
            </div>
            <a href="contact.html" className="btn btn-primary" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>Contact Sales</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PricingApp />);




