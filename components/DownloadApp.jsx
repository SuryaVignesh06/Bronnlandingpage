// DownloadApp.jsx
const { useEffect: useEffectD } = React;

function DownloadApp() {
  useEffectD(() => {
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
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true
          },
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
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
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 0 40px' }}>
        <div style={{ width: '100%' }}>
          <DownloadCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<DownloadApp />);




