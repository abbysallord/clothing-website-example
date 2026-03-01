import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const links = ['Collection', 'Story', 'Craft', 'About'];

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 2.5 }
    );
  }, []);

  return (
    <nav ref={navRef} className="nav">
      <a href="#" className="nav__logo">VØID</a>
      <ul className="nav__links">
        {links.map(link => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`}>{link}</a>
          </li>
        ))}
      </ul>
      <a href="#collection" className="nav__cta">Shop Now</a>
    </nav>
  );
}
