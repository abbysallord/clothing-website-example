import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const lineRef = useRef(null);
  const counterRef = useRef(null);
  const brandRef = useRef(null);
  const count = useRef({ val: 0 });

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          delay: 0.3,
          onComplete,
        });
      }
    });

    tl.to(lineRef.current, {
      width: '100%',
      duration: 1.8,
      ease: 'power2.inOut',
    });

    tl.to(count.current, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(count.current.val)}%`;
        }
      },
    }, '<');

    tl.to(brandRef.current, {
      yPercent: -10,
      opacity: 0.5,
      duration: 0.6,
      ease: 'power2.in',
    }, '>-0.2');

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader">
      <div ref={brandRef} className="loader__brand">VØID</div>
      <div ref={lineRef} className="loader__line" />
      <div ref={counterRef} className="loader__counter">0%</div>
    </div>
  );
}
