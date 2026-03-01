import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { name: 'The Void Overcoat', sub: 'Midnight Weight Wool', price: '₹24,000', size: 'large' },
  { name: 'Eclipse Hoodie', sub: 'Loopback Cotton', price: '₹8,500' },
  { name: 'Ash Cargo', sub: 'Washed Twill', price: '₹9,200' },
  { name: 'Silent Turtleneck', sub: 'Merino Blend', price: '₹6,800' },
  { name: 'Raven Blazer', sub: 'Unstructured Canvas', price: '₹18,000' },
];

function ProductCard({ product, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
        delay: index * 0.1,
      }
    );
  }, [index]);

  return (
    <div ref={cardRef} className="product-card">
      <div className="product-card__image">
        <div className="product-card__img-placeholder">
          {/* Drop in: <img src={`/products/product-${index+1}.jpg`} alt={product.name} /> */}
          <span style={{ position: 'relative', zIndex: 1 }}>
            PRODUCT<br />IMAGE {index + 1}
          </span>
        </div>
        <div className="product-card__overlay">
          <div className="product-card__quick-add">Quick Add +</div>
        </div>
      </div>
      <div className="product-card__info">
        <div>
          <div className="product-card__name">{product.name}</div>
          <div className="product-card__sub">{product.sub}</div>
        </div>
        <div className="product-card__price">{product.price}</div>
      </div>
    </div>
  );
}

export default function Collection() {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { xPercent: -5, opacity: 0 },
      {
        xPercent: 0, opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section className="collection" id="collection">
      <div ref={headerRef} className="collection__header">
        <div>
          <div className="section-label">02 — Collection</div>
          <h2 className="section-title">SS25<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Drop I</em></h2>
        </div>
        <a href="#" className="collection__view-all">View All →</a>
      </div>

      <div className="collection__grid">
        {products.map((product, i) => (
          <ProductCard key={product.name} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
