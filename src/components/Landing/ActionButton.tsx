"use client"

import type React from "react"
import "./ActionButton.css"

interface CallToActionProps {
  onWalletConnect: () => void
  isWalletConnected: boolean
}

const CallToAction: React.FC<CallToActionProps> = ({ onWalletConnect, isWalletConnected }) => {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Reclaim Your Time?</h2>
          <p className="cta-description">
            Join thousands of users who have transformed their productivity with TimeChain. Start building
            accountability and earning rewards today.
          </p>

          {!isWalletConnected ? (
            <button className="cta-button" onClick={onWalletConnect}>
              Connect Wallet
            </button>
          ) : (
            <a href="/dashboard" className="cta-button">
             Get Started
            </a>
          )}

          <div className="cta-stats">
            <div className="stat">
              <strong>10,000+</strong>
              <span>Active Users</span>
            </div>
            <div className="stat">
              <strong>50,000+</strong>
              <span>Projects Completed</span>
            </div>
            <div className="stat">
              <strong>1M+</strong>
              <span>Tokens Earned</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
