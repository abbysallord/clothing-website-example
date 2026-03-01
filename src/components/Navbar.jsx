import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const links = [
  { label: 'Collection', href: '#collection' },
  { label: 'Story', href: '#story' },
  { label: 'Craft', href: '#craft' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 2.5 }
    );

    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(href, { offset: -80, duration: 1.8 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav ref={navRef} className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <a href="#hero" className="nav__logo" onClick={(e) => handleSmoothScroll(e, '#hero')}>VØID</a>
      <ul className="nav__links">
        {links.map(link => (
          <li key={link.label}>
            <a href={link.href} onClick={(e) => handleSmoothScroll(e, link.href)}>{link.label}</a>
          </li>
        ))}
      </ul>
      <a href="#collection" className="nav__cta" onClick={(e) => handleSmoothScroll(e, '#collection')}>Shop Now</a>
    </nav>
  );
}
