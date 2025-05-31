import type React from "react"
import "./footer.css"

const Footer: React.FC = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">TimeChain</h3>
            <p className="footer-description">
              Reclaim Time. Build Accountability. Transform your productivity with blockchain-powered time tracking.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#how-it-works">How It Works</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="contact-info">
              <p>Email: hello@timechain.io</p>
              <p>Twitter: @TimeChainApp</p>
              <p>Discord: TimeChain Community</p>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Built on Sui</h4>
            <p className="sui-info">
              TimeChain is built on the Sui blockchain, ensuring fast, secure, and scalable Web3 experiences.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 TimeChain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
