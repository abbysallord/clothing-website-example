import { useEffect, useRef } from 'react';

export default function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const innerRingRef = useRef(null);

  const posRef = useRef({ x: -200, y: -200 });
  const smoothRef = useRef({ x: -200, y: -200 });
  const dotSmoothRef = useRef({ x: -200, y: -200 });
  const rotRef = useRef(0);
  const rafRef = useRef(null);
  const stateRef = useRef('default');
  const labelTextRef = useRef('');
  const visibleRef = useRef(false);

  const lerp = (a, b, t) => a + (b - a) * t;

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const labelEl = labelRef.current;
    const innerRing = innerRingRef.current;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      visibleRef.current = true;
    };

    const onDown = () => { stateRef.current = 'click'; };
    const onUp = () => { stateRef.current = stateRef.current === 'click' ? 'default' : stateRef.current; };
    const onLeave = () => { visibleRef.current = false; };
    const onEnter = () => { visibleRef.current = true; };

    const onMouseOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor], input');
      if (el) {
        stateRef.current = 'hover';
        const txt = el.dataset.cursor || el.getAttribute('aria-label') || el.textContent?.trim().slice(0, 14) || '';
        labelTextRef.current = txt.toUpperCase();
        if (labelEl) labelEl.textContent = labelTextRef.current;
      }
    };

    const onMouseOut = (e) => {
      const el = e.target.closest('a, button, [data-cursor], input');
      if (el) {
        const related = e.relatedTarget?.closest?.('a, button, [data-cursor], input');
        if (related === el) return;
        stateRef.current = 'default';
        labelTextRef.current = '';
        if (labelEl) labelEl.textContent = '';
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    const animate = () => {
      const isHover = stateRef.current === 'hover';
      const isClick = stateRef.current === 'click';

      // Ring — graceful lag
      smoothRef.current.x = lerp(smoothRef.current.x, posRef.current.x, isHover ? 0.06 : 0.1);
      smoothRef.current.y = lerp(smoothRef.current.y, posRef.current.y, isHover ? 0.06 : 0.1);

      // Dot — snappy
      dotSmoothRef.current.x = lerp(dotSmoothRef.current.x, posRef.current.x, 0.4);
      dotSmoothRef.current.y = lerp(dotSmoothRef.current.y, posRef.current.y, 0.4);

      const { x, y } = smoothRef.current;
      const { x: dx, y: dy } = dotSmoothRef.current;

      // Outer ring
      if (ring) {
        ring.style.left = x + 'px';
        ring.style.top = y + 'px';
        const scale = isClick ? 0.7 : isHover ? 1.5 : 1;
        ring.style.transform = `translate(-50%, -50%) scale(${scale})`;
        ring.style.opacity = visibleRef.current ? '1' : '0';
        ring.style.borderColor = isHover
          ? 'rgba(201, 169, 110, 0.6)'
          : 'rgba(201, 169, 110, 0.25)';
        ring.style.boxShadow = isHover
          ? '0 0 20px rgba(201,169,110,0.15), inset 0 0 20px rgba(201,169,110,0.05)'
          : 'none';
      }

      // Center dot — diamond shape
      if (dot) {
        dot.style.left = dx + 'px';
        dot.style.top = dy + 'px';
        const dScale = isClick ? 0.5 : isHover ? 1.8 : 1;
        dot.style.transform = `translate(-50%, -50%) rotate(45deg) scale(${dScale})`;
        dot.style.background = isHover ? '#c9a96e' : '#f0ebe0';
        dot.style.boxShadow = isHover
          ? '0 0 8px rgba(201,169,110,0.8), 0 0 20px rgba(201,169,110,0.3)'
          : '0 0 4px rgba(240,235,224,0.3)';
      }

      // Inner decorative ring — slow elegant rotation
      rotRef.current += isHover ? 0.3 : 0.08;
      if (innerRing) {
        innerRing.style.left = x + 'px';
        innerRing.style.top = y + 'px';
        const irScale = isClick ? 0.5 : isHover ? 1.6 : 1;
        innerRing.style.transform = `translate(-50%, -50%) rotate(${rotRef.current}deg) scale(${irScale})`;
        innerRing.style.opacity = visibleRef.current ? (isHover ? '1' : '0.6') : '0';
      }

      // Label
      if (labelEl) {
        labelEl.style.left = (x + 28) + 'px';
        labelEl.style.top = (y - 8) + 'px';
        labelEl.style.opacity = (isHover && labelTextRef.current) ? '1' : '0';
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
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Center diamond dot */}
      <div ref={dotRef} style={{
        position: 'fixed',
        width: '5px',
        height: '5px',
        background: '#f0ebe0',
        pointerEvents: 'none',
        zIndex: 999999,
        transition: 'transform 0.18s cubic-bezier(0.16,1,0.3,1), background 0.3s, box-shadow 0.3s',
        willChange: 'transform, left, top',
        left: '-200px',
        top: '-200px',
      }} />

      {/* Outer ring — clean thin circle */}
      <div ref={ringRef} style={{
        position: 'fixed',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1px solid rgba(201, 169, 110, 0.25)',
        pointerEvents: 'none',
        zIndex: 99998,
        transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s, border-color 0.4s, box-shadow 0.4s',
        opacity: 0,
        willChange: 'transform, left, top',
        left: '-200px',
        top: '-200px',
      }} />

      {/* Inner decorative ring — 4 cardinal gems */}
      <div ref={innerRingRef} style={{
        position: 'fixed',
        width: '44px',
        height: '44px',
        pointerEvents: 'none',
        zIndex: 99997,
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s',
        opacity: 0,
        willChange: 'transform, left, top',
        left: '-200px',
        top: '-200px',
      }}>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Four diamond accents at cardinal points */}
          <rect x="21" y="2" width="2.5" height="2.5" transform="rotate(45 22 3.25)" fill="rgba(201,169,110,0.7)" />
          <rect x="21" y="38.5" width="2.5" height="2.5" transform="rotate(45 22 39.75)" fill="rgba(201,169,110,0.7)" />
          <rect x="2.25" y="20.75" width="2.5" height="2.5" transform="rotate(45 3.5 22)" fill="rgba(201,169,110,0.7)" />
          <rect x="39.75" y="20.75" width="2.5" height="2.5" transform="rotate(45 41 22)" fill="rgba(201,169,110,0.7)" />
          {/* Subtle arc accents between diamonds */}
          <path d="M 8 8 A 20 20 0 0 1 36 8" stroke="rgba(201,169,110,0.12)" strokeWidth="0.5" fill="none" />
          <path d="M 36 36 A 20 20 0 0 1 8 36" stroke="rgba(201,169,110,0.12)" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Contextual label */}
      <div ref={labelRef} style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 999997,
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: '0.5rem',
        fontWeight: '700',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#c9a96e',
        opacity: 0,
        whiteSpace: 'nowrap',
        transform: 'translateY(-50%)',
        transition: 'opacity 0.25s ease',
        left: '-200px',
        top: '-200px',
      }} />
    </>
  );
}
