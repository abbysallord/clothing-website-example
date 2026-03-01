import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const split = new SplitType(titleRef.current, { types: 'chars' });

    gsap.fromTo(split.chars,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0, opacity: 1,
        stagger: 0.025,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      }
    );

    return () => split.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const btn = e.target.querySelector('button');
    btn.textContent = 'You\'re in ✦';
    input.value = '';
  };

  return (
    <section ref={sectionRef} className="newsletter">
      <div className="newsletter__label">04 — Join The Silence</div>
      <h2 ref={titleRef} className="newsletter__title">
        Enter The<br /><em>Void</em>
      </h2>
      <p className="newsletter__sub">
        First access. Drop alerts. Nothing more.
      </p>
      <form className="newsletter__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="newsletter__input"
          placeholder="Your email address"
          required
        />
        <button type="submit" className="newsletter__submit">
          Join →
        </button>
      </form>
    </section>
  );
}
