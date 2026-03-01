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
  const menuRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (!menuRef.current) return;
    const linkEls = menuRef.current.querySelectorAll('.mobile-menu__link');

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(menuRef.current,
        { clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' },
        { clipPath: 'circle(150% at calc(100% - 2.5rem) 2rem)', duration: 0.7, ease: 'power4.out' }
      );
      gsap.fromTo(linkEls,
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power4.out', delay: 0.2 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)',
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }, [menuOpen]);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(href, { offset: -80, duration: 1.8 });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }, menuOpen ? 500 : 0);
  };

  return (
    <>
      <nav ref={navRef} className={`nav${scrolled ? ' nav--scrolled' : ''}${menuOpen ? ' nav--menu-open' : ''}`}>
        <a href="#hero" className="nav__logo" onClick={(e) => handleSmoothScroll(e, '#hero')}>VØID</a>
        <ul className="nav__links">
          {links.map(link => (
            <li key={link.label}>
              <a href={link.href} onClick={(e) => handleSmoothScroll(e, link.href)}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a href="#collection" className="nav__cta nav__cta--desktop" onClick={(e) => handleSmoothScroll(e, '#collection')}>Shop Now</a>

        <button
          className={`nav__burger${menuOpen ? ' nav__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="nav__burger-line" />
          <span className="nav__burger-line" />
        </button>
      </nav>

      {/* Fullscreen mobile menu */}
      <div ref={menuRef} className="mobile-menu" style={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}>
        <div className="mobile-menu__inner">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-menu__link"
              onClick={(e) => handleSmoothScroll(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#collection"
            className="mobile-menu__link mobile-menu__link--cta"
            onClick={(e) => handleSmoothScroll(e, '#collection')}
          >
            Shop Now
          </a>
        </div>
        <div className="mobile-menu__footer">
          VØID — Wear The Silence
        </div>
      </div>
    </>
  );
}
