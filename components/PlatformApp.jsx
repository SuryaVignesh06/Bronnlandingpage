// PlatformApp.jsx
const { useEffect: useEffectP } = React;

function PlatformApp() {
  useEffectP(() => {
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
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 160, paddingBottom: 80 }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 1100 }}>
          <h1 className="serif reveal in" style={{ fontSize: 'clamp(48px, 8vw, 90px)', color: 'var(--text)', marginBottom: 28, lineHeight: 1.05 }}>
            The Griffin Platform
          </h1>
          <p className="reveal in reveal-d1" style={{ fontSize: 20, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 72, maxWidth: '60ch', margin: '0 auto 72px' }}>
            A unified strategy engine designed for operators. Connect your data, run complex scenario modeling, and generate board-ready insights in minutes.
          </p>
          <div className="reveal in reveal-d2">
            <CapabilityWeb />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PlatformApp />);




