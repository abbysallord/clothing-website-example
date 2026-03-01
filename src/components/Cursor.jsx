import { useEffect, useRef, useState } from 'react';

const TICKS = 24;

export default function Cursor() {
  const svgWrapRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const ringRef = useRef(null);
  const crosshairRef = useRef(null);

  const posRef = useRef({ x: -200, y: -200 });
  const smoothRef = useRef({ x: -200, y: -200 });
  const dotSmoothRef = useRef({ x: -200, y: -200 });
  const rotRef = useRef(0);
  const rafRef = useRef(null);
  const stateRef = useRef('default');

  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  const lerp = (a, b, t) => a + (b - a) * t;

  useEffect(() => {
    const svgWrap = svgWrapRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const crosshair = crosshairRef.current;
    const labelEl = labelRef.current;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onDown = () => { stateRef.current = 'click'; };
    const onUp = () => { stateRef.current = stateRef.current === 'click' ? 'default' : stateRef.current; };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const setupHover = () => {
      document.querySelectorAll('a, button, [data-cursor], input').forEach(el => {
        el.addEventListener('mouseenter', () => {
          stateRef.current = 'hover';
          const txt = el.dataset.cursor || el.getAttribute('aria-label') || el.textContent?.trim().slice(0, 14) || '';
          setLabel(txt.toUpperCase());
        });
        el.addEventListener('mouseleave', () => {
          stateRef.current = 'default';
          setLabel('');
        });
      });
    };

    setupHover();
    const observer = new MutationObserver(setupHover);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const animate = () => {
      const isHover = stateRef.current === 'hover';
      const isClick = stateRef.current === 'click';

      // Ring follows with lag
      smoothRef.current.x = lerp(smoothRef.current.x, posRef.current.x, isHover ? 0.055 : 0.1);
      smoothRef.current.y = lerp(smoothRef.current.y, posRef.current.y, isHover ? 0.055 : 0.1);

      // Dot follows snappier
      dotSmoothRef.current.x = lerp(dotSmoothRef.current.x, posRef.current.x, 0.35);
      dotSmoothRef.current.y = lerp(dotSmoothRef.current.y, posRef.current.y, 0.35);

      const { x, y } = smoothRef.current;
      const { x: dx, y: dy } = dotSmoothRef.current;

      // Position ring
      if (svgWrap) {
        svgWrap.style.left = x + 'px';
        svgWrap.style.top = y + 'px';
        const scale = isClick ? 0.65 : isHover ? 1.6 : 1;
        svgWrap.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }

      // Position dot
      if (dot) {
        dot.style.left = dx + 'px';
        dot.style.top = dy + 'px';
        const dScale = isClick ? 2.8 : isHover ? 2.2 : 1;
        dot.style.transform = `translate(-50%, -50%) scale(${dScale})`;
        dot.style.background = isHover ? '#c9a96e' : '#f0ebe0';
        dot.style.boxShadow = isHover ? '0 0 12px rgba(201,169,110,0.9), 0 0 30px rgba(201,169,110,0.4)' : 'none';
      }

      // Rotate tick ring
      rotRef.current += isHover ? 0.5 : 0.12;
      if (ring) ring.style.transform = `rotate(${rotRef.current}deg)`;

      // Crosshair scale
      if (crosshair) {
        const cScale = isClick ? 0.2 : isHover ? 2 : 1;
        const cOpacity = isClick ? 0.1 : isHover ? 0.12 : 0.55;
        crosshair.style.transform = `scale(${cScale})`;
        crosshair.style.opacity = cOpacity;
      }

      // Label
      if (labelEl) {
        labelEl.style.left = (x + 22) + 'px';
        labelEl.style.top = (y - 10) + 'px';
        labelEl.style.opacity = (isHover && label) ? '1' : '0';
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [visible, label]);

  const ticks = Array.from({ length: TICKS }, (_, i) => {
    const angle = (i / TICKS) * 360;
    const rad = (angle * Math.PI) / 180;
    const isMajor = i % 6 === 0;
    const r1 = 28, r2 = isMajor ? 22 : 25;
    return {
      x1: 32 + Math.cos(rad) * r1, y1: 32 + Math.sin(rad) * r1,
      x2: 32 + Math.cos(rad) * r2, y2: 32 + Math.sin(rad) * r2,
      isMajor,
    };
  });

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Central dot — snappy */}
      <div ref={dotRef} style={{
        position: 'fixed', width: '5px', height: '5px', borderRadius: '50%',
        background: '#f0ebe0', pointerEvents: 'none', zIndex: 999999,
        transition: 'transform 0.15s cubic-bezier(0.16,1,0.3,1), background 0.25s, box-shadow 0.25s',
        willChange: 'transform, left, top', left: '-200px', top: '-200px',
      }} />

      {/* SVG crosshair ring — lagged */}
      <div ref={svgWrapRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 99998,
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s',
        opacity: visible ? 1 : 0, willChange: 'transform, left, top',
        left: '-200px', top: '-200px',
      }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          {/* Static outer ring */}
          <circle cx="32" cy="32" r="29" stroke="rgba(201,169,110,0.15)" strokeWidth="0.5" />

          {/* Rotating tick ring */}
          <g ref={ringRef} style={{ transformOrigin: '32px 32px' }}>
            {ticks.map((t, i) => (
              <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
                stroke={t.isMajor ? 'rgba(201,169,110,0.85)' : 'rgba(201,169,110,0.28)'}
                strokeWidth={t.isMajor ? 1 : 0.5} />
            ))}
          </g>

          {/* Crosshair lines */}
          <g ref={crosshairRef} style={{
            transformOrigin: '32px 32px',
            transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s',
          }}>
            <line x1="32" y1="3" x2="32" y2="21" stroke="rgba(240,235,224,0.65)" strokeWidth="0.75" />
            <line x1="32" y1="43" x2="32" y2="61" stroke="rgba(240,235,224,0.65)" strokeWidth="0.75" />
            <line x1="3"  y1="32" x2="21" y2="32" stroke="rgba(240,235,224,0.65)" strokeWidth="0.75" />
            <line x1="43" y1="32" x2="61" y2="32" stroke="rgba(240,235,224,0.65)" strokeWidth="0.75" />
          </g>

          {/* Corner brackets */}
          <g opacity="0.45">
            <path d="M13 20 L13 13 L20 13" stroke="rgba(201,169,110,0.7)" strokeWidth="0.75" fill="none" />
            <path d="M44 13 L51 13 L51 20" stroke="rgba(201,169,110,0.7)" strokeWidth="0.75" fill="none" />
            <path d="M13 44 L13 51 L20 51" stroke="rgba(201,169,110,0.7)" strokeWidth="0.75" fill="none" />
            <path d="M51 44 L51 51 L44 51" stroke="rgba(201,169,110,0.7)" strokeWidth="0.75" fill="none" />
          </g>
        </svg>
      </div>

      {/* Contextual label */}
      <div ref={labelRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 999997,
        fontFamily: "'Space Mono', monospace", fontSize: '0.48rem',
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: '#c9a96e', opacity: 0, whiteSpace: 'nowrap',
        transform: 'translateY(-50%)',
        transition: 'opacity 0.2s ease',
        left: '-200px', top: '-200px',
      }}>
        {label}
      </div>
    </>
  );
}
