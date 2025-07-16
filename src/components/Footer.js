
import '../styles/Footer.css';
import { ReactComponent as Logo } from '../assets/Logo_white.svg';
import twitter from '../assets/icons/Twitter.svg';
import facebook from '../assets/icons/Facebook.svg';
import tiktok from '../assets/icons/Tiktok.svg';
import instagram from '../assets/icons/Instagram.svg';

export function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column first">
          <Logo className="footer-logo" />
          <p className="grey">Only the best products are available here! Each product has warranty period.</p>
        </div>
        <div className="footer-column">
                  
          <nav className="footer-nav">
            <h5>Services</h5>
            <ul>
              <li><a href="#home">Bonus program</a></li>
              <li><a href="#home">Gift cards</a></li>
              <li><a href="#home">Credit and payment</a></li>
              <li><a href="#home">Service contracts</a></li>
              <li><a href="#home">Payments</a></li>
            </ul>
          </nav>
        </div>

        <div className="footer-column">
          <nav className="footer-nav">
            <h5>Support</h5>
            <ul>
              <li><a href="#home">Find an order</a></li>
              <li><a href="#home">Terms of delivery</a></li>
              <li><a href="#home">Exchange and return of goods</a></li>
              <li><a href="#home">Guarantee</a></li>
              <li><a href="#home">Frequently asked questions</a></li>
              <li><a href="#home">Terms of use of the site</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="footer-icon-container">
        <img src={twitter} alt="twitter"/>
        <img src={facebook} alt="facebook"/>
        <img src={tiktok} alt="tiktok"/>
        <img src={instagram} alt="instagram"/>
      </div>
    </footer>
  );
}

export default Footer;
