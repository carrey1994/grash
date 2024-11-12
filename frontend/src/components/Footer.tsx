import '../styles/Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Fancy Site</h3>
          <p className="footer-description">
            Share your stories with the world. Join our community of writers and readers.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">
              <span className="social-icon">📱</span>
            </a>
            <a href="#" className="social-link">
              <span className="social-icon">💬</span>
            </a>
            <a href="#" className="social-link">
              <span className="social-icon">📧</span>
            </a>
            <a href="#" className="social-link">
              <span className="social-icon">🌐</span>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#articles">Articles</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Contact Us</h4>
          <ul className="footer-contact">
            <li>
              <span className="contact-icon">📍</span>
              123 Street Name, City, Country
            </li>
            <li>
              <span className="contact-icon">📞</span>
              +1 234 567 890
            </li>
            <li>
              <span className="contact-icon">📧</span>
              contact@example.com
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Newsletter</h4>
          <p>Subscribe to our newsletter for updates</p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Fancy Site. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer