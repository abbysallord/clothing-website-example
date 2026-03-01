export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer__brand-col">
          <div className="footer__brand">VØID</div>
          <div className="footer__tagline">Wear The Silence</div>
        </div>

        <div>
          <div className="footer__col-title">Shop</div>
          <ul className="footer__links">
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Collection SS25</a></li>
            <li><a href="#">Sale</a></li>
            <li><a href="#">Lookbook</a></li>
          </ul>
        </div>

        <div>
          <div className="footer__col-title">Brand</div>
          <ul className="footer__links">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Craft</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        <div>
          <div className="footer__col-title">Connect</div>
          <ul className="footer__links">
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Pinterest</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Stockists</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">© 2025 VØID. All garments reserved.</span>
        <span className="footer__copy">Privacy · Terms · Shipping</span>
      </div>
    </footer>
  );
}
