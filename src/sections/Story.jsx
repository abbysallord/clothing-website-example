import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    chapter: 'Chapter I — Origin',
    title: 'Born in\nthe Dark',
    body: 'Every garment begins as a conversation with absence. We design in the dark — not out of limitation, but out of reverence for what lives in shadow.',
    accent: '--1',
  },
  {
    chapter: 'Chapter II — Material',
    title: 'Touch the\nSilence',
    body: 'We source only from mills that understand restraint. Fabrics so refined they speak in whispers. Weight that grounds you. Texture that breathes.',
    accent: '--2',
  },
  {
    chapter: 'Chapter III — Construction',
    title: 'Cut with\nConviction',
    body: 'Each pattern is drawn by hand. Each seam is a commitment. Nothing is accidental. Nothing is excess. We remove until only truth remains.',
    accent: '--3',
  },
  {
    chapter: 'Chapter IV — You',
    title: 'The Final\nLayer',
    body: 'The garment is unfinished without you. You are not wearing VØID. You are completing it. The story ends — and begins — on your shoulders.',
    accent: '--4',
  },
];

export default function Story() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activePanel, setActivePanel] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: () => -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${track.scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * panels.length),
            panels.length - 1
          );
          setActivePanel(idx);
        }
      }
    });

    // Animate text in each panel
    const panelEls = track.querySelectorAll('.story-panel');
    panelEls.forEach((panel, i) => {
      const title = panel.querySelector('.story-panel__title');
      const body = panel.querySelector('.story-panel__body');

      const offset = i * window.innerWidth;

      gsap.fromTo(title,
        { yPercent: 30, opacity: 0 },
        {
          yPercent: 0, opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: `top+=${offset * 0.5} top`,
            end: `top+=${offset * 0.5 + window.innerWidth * 0.3} top`,
            scrub: 1,
          }
        }
      );

      gsap.fromTo(body,
        { yPercent: 20, opacity: 0 },
        {
          yPercent: 0, opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: `top+=${offset * 0.5 + 100} top`,
            end: `top+=${offset * 0.5 + window.innerWidth * 0.4} top`,
            scrub: 1,
          }
        }
      );
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="story-section" id="story-panels" style={{ height: '100vh' }}>
      <div ref={trackRef} className="h-scroll-track">
        {panels.map((panel, i) => (
          <div key={i} className={`story-panel story-panel${panel.accent}`}>
            <div className="story-panel__bg" />
            <div className="story-panel__content">
              <div className="story-panel__chapter">{panel.chapter}</div>
              <h2 className="story-panel__title">
                {panel.title.split('\n').map((line, j) => (
                  <span key={j}>
                    {j > 0 ? <em>{line}</em> : line}<br />
                  </span>
                ))}
              </h2>
              <p className="story-panel__body">{panel.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="story-progress">
        {panels.map((_, i) => (
          <div key={i} className={`story-progress__dot ${i === activePanel ? 'active' : ''}`} />
        ))}
      </div>
    </section>
  );
}
