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
        <div className="container" style={{ textAlign: 'center', maxWidth: 800 }}>
          <h1 className="serif reveal in" style={{ fontSize: 'clamp(40px, 6vw, 72px)', color: 'var(--text)', marginBottom: 24, lineHeight: 1.1 }}>
            The Bronn Platform
          </h1>
          <p className="reveal in reveal-d1" style={{ fontSize: 18, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 60 }}>
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
