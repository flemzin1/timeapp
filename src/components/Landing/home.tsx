
import type React from "react"
import "./home.css"
import { ConnectButton } from "@suiet/wallet-kit"
interface HeroProps {

  isWalletConnected: boolean
}

const Hero: React.FC<HeroProps> = ({ isWalletConnected }) => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
        <div className="supported-wallets">
            <span>Powered By:</span>
            <div className="wallet-icons">
              <span className="wallet-name">Sui Wallet</span>
              
            </div>
          </div>
          <h1 className="hero-title">TimeChain</h1>
          <p className="hero-tagline">Reclaim Time. Build Accountability.</p>
          <p className="hero-description">
            Transform your productivity with blockchain-powered time tracking. Create projects, assign tasks, and earn
            tokens while building unstoppable accountability.
          </p>

          {!isWalletConnected ? (
            <ConnectButton className="hero-cta-btn">
              Connect Wallet
            </ConnectButton>
          ) : (
            <a href="/dashboard" className="hero-cta-btn">
              Get Started
            </a>
          )}

         
        </div>

        <div className="hero-visual">
          <div className="project-card-demo">
            <div className="demo-card">
              <h3>TimeChain</h3>
              <div className="card-content1">
                <div className="tasks-info">
                  <span className="tasks-left">
                    Tasks left: <strong>12</strong>
                  </span>
                </div>
                <div className="time-complexity">
                  <div className="time-spent">
                    <span>Time spent</span>
                    <strong>03:20:30</strong>
                  </div>
                  <div className="complexity">
                    <span>Complexity</span>
                    <strong>5/10</strong>
                  </div>
                </div>
                <div className="progress-section">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "20%" }}></div>
                  </div>
                  <span className="progress-text">20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
