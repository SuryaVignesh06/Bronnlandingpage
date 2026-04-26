// App.jsx
const { useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "cream"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectA(() => {
    // Smooth scroll via Lenis
    if (typeof Lenis !== 'undefined' && typeof gsap !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      gsap.registerPlugin(ScrollTrigger);

      // Scroll-reveal
      document.querySelectorAll('.reveal:not(.in)').forEach(el => {
        const d = el.classList.contains('reveal-d1') ? 0.1 :
                  el.classList.contains('reveal-d2') ? 0.2 :
                  el.classList.contains('reveal-d3') ? 0.3 :
                  el.classList.contains('reveal-d4') ? 0.4 : 0;
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: d,
          ease: 'power3.out',
          onStart: () => el.classList.add('in'),
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
    <>
      <Nav />
      <Hero />
      <CapabilityWeb />
      <HowItWorks />
      <HeroShowcase />
      <DownloadBanner />
      <Features />
      <UseCases />
      <DownloadCTA />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
