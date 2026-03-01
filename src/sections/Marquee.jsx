import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const items = [
  'Noir Oversized', 'Silent Denim', 'Void Blazer', 'Ash Trench', 
  'Obsidian Knit', 'Coal Chore', 'Eclipse Parka', 'Raven Twill'
];

export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: `-${totalWidth}px`,
      duration: 25,
      ease: 'none',
      repeat: -1,
    });

    const onEnter = () => tween.pause();
    const onLeave = () => tween.play();

    track.addEventListener('mouseenter', onEnter);
    track.addEventListener('mouseleave', onLeave);

    return () => {
      tween.kill();
      track.removeEventListener('mouseenter', onEnter);
      track.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const allItems = [...items, ...items];

  return (
    <div className="marquee-section">
      <div ref={trackRef} className="marquee-track">
        {allItems.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            {i % 4 === 3 && <span className="marquee-dot"> ✦</span>}
            {' '}
          </span>
        ))}
      </div>
    </div>
  );
}
