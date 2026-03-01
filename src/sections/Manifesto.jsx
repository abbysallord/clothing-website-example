import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const split = new SplitType(textRef.current, { types: 'words' });

    gsap.fromTo(split.words,
      { opacity: 0.08, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 1,
        }
      }
    );

    return () => split.revert();
  }, []);

  return (
    <section ref={sectionRef} className="manifesto" id="story">
      <div className="manifesto__number">01 — Manifesto</div>
      <p ref={textRef} className="manifesto__text">
        We don't create clothing. <em>We create space.</em>{' '}
        <span className="dim">The pause between words.</span>{' '}
        The silence before the storm.{' '}
        <em>Every garment is a declaration of absence</em>{' '}
        <span className="dim">— and absence, truly felt,</span>{' '}
        is the loudest thing in the room.
      </p>
      <div className="manifesto__aside">
        Est. MMXXIV · Silence Is Louder
      </div>
    </section>
  );
}
