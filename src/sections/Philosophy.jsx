import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Parallax image
    gsap.to(imgRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // Text reveal
    gsap.fromTo(textRef.current,
      { xPercent: -5, opacity: 0 },
      {
        xPercent: 0, opacity: 1,
        duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      }
    );

    // Stats count up
    const stats = sectionRef.current.querySelectorAll('.stat__number');
    const targets = [{ val: 0, end: 200 }, { val: 0, end: 3 }, { val: 0, end: 14 }, { val: 0, end: 98 }];

    stats.forEach((stat, i) => {
      const t = targets[i];
      if (!t) return;
      const suffix = stat.dataset.suffix || '';
      gsap.to(t, {
        val: t.end,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => { stat.textContent = Math.round(t.val) + suffix; },
        scrollTrigger: { trigger: statsRef.current, start: 'top 80%' }
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="philosophy" id="craft">
      <div className="philosophy__grid">
        <div ref={textRef} className="philosophy__text-block">
          <div className="section-label">03 — Philosophy</div>
          <h2 className="philosophy__big-text">
            Craft is not a process.<br />
            It's a <em>point of view.</em>
          </h2>
          <p className="philosophy__body">
            We don't make garments for the crowd. We make them for the person 
            who has learned to move through the world without needing to announce 
            themselves. Every construction detail exists with intention — 
            and with full understanding of what it costs to do it right.
          </p>
          <div ref={statsRef} className="philosophy__stats">
            <div className="stat">
              <div className="stat__number" data-suffix="+">0+</div>
              <div className="stat__label">Garments Per Season</div>
            </div>
            <div className="stat">
              <div className="stat__number" data-suffix=" Mills">0</div>
              <div className="stat__label">Partner Mills</div>
            </div>
            <div className="stat">
              <div className="stat__number" data-suffix=" Steps">0</div>
              <div className="stat__label">Production Stages</div>
            </div>
            <div className="stat">
              <div className="stat__number" data-suffix="%">0%</div>
              <div className="stat__label">Deadstock Fabric Use</div>
            </div>
          </div>
        </div>

        <div className="philosophy__visual">
          <div className="philosophy__img-frame">
            <div ref={imgRef} className="philosophy__img-inner">
              <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80" alt="VØID Craft — hands tailoring fabric" loading="lazy" />
            </div>
          </div>
          <div className="philosophy__frame-accent" />
        </div>
      </div>
    </section>
  );
}
