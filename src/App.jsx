import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Marquee from './sections/Marquee';
import Manifesto from './sections/Manifesto';
import Collection from './sections/Collection';
import Story from './sections/Story';
import Philosophy from './sections/Philosophy';
import Newsletter from './sections/Newsletter';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  const handleLoadComplete = () => {
    setLoaded(true);
    // Refresh ScrollTrigger after loader
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  };

  return (
    <>
      {/* Global noise overlay */}
      <div className="noise" aria-hidden="true" />

      {/* Custom cursor */}
      <Cursor />

      {/* Loading screen */}
      <Loader onComplete={handleLoadComplete} />

      {/* Main site */}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}>
        <Navbar />

        <main>
          <Hero />
          <Marquee />
          <Manifesto />
          <Collection />
          <Story />
          <Philosophy />
          <Newsletter />
        </main>

        <Footer />
      </div>
    </>
  );
}
