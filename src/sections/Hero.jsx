import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const eyebrowRef = useRef(null);
  const actionsRef = useRef(null);
  const scrollRef = useRef(null);
  const visualRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const splitTitle = new SplitType(title, { types: 'chars' });

    const tl = gsap.timeline({ delay: 2.2 });

    tl.fromTo(eyebrowRef.current,
      { xPercent: -20, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 1, ease: 'power4.out' }
    );

    tl.fromTo(splitTitle.chars,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0, opacity: 1,
        duration: 1.2, ease: 'power4.out',
        stagger: 0.03,
      }, '-=0.6'
    );

    tl.fromTo(subRef.current,
      { yPercent: 30, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.7'
    );

    tl.fromTo(actionsRef.current,
      { yPercent: 20, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      '-=0.4'
    );

    tl.fromTo(visualRef.current,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.6, ease: 'power4.inOut' },
      '-=2.0'
    );

    // Parallax using GSAP ScrollTrigger (GPU-accelerated)
    const parallaxTrigger = gsap.to(parallaxRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    return () => {
      splitTitle.revert();
      tl.kill();
      parallaxTrigger.scrollTrigger?.kill();
      parallaxTrigger.kill();
    };
  }, []);

  const scrollTo = (e, target) => {
    e.preventDefault();
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.8 });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="hero" id="hero">
      <div className="hero__bg" />

      <div ref={visualRef} className="hero__visual">
        <div ref={parallaxRef} className="hero__image-placeholder">
          <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80" alt="VØID Collection" fetchpriority="high" />
        </div>
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <div ref={eyebrowRef} className="hero__eyebrow">
          SS25 Collection
        </div>

        <h1 ref={titleRef} className="hero__title">
          Wear<br />The <em>Void</em>
        </h1>

        <p ref={subRef} className="hero__sub">
          Clothing is not fashion — it's armor.<br />
          Silence woven into every thread.
        </p>

        <div ref={actionsRef} className="hero__actions">
          <a href="#collection" className="btn-primary" onClick={(e) => scrollTo(e, '#collection')}>
            <span>Explore Collection</span>
            <span>→</span>
          </a>
          <a href="#story" className="btn-ghost" onClick={(e) => scrollTo(e, '#story')}>
            Our Story <span className="arrow">→</span>
          </a>
        </div>
      </div>

      <div ref={scrollRef} className="hero__scroll">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </div>
    </section>
  );
}
