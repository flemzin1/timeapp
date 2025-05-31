"use client"

import type React from "react"
import "./ActionButton.css";
import {
  ConnectButton,
  addressEllipsis,
} from "@suiet/wallet-kit";


interface CallToActionProps {
  isWalletConnected: boolean
}

const CallToAction: React.FC<CallToActionProps> = ({  isWalletConnected }) => {
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
            <ConnectButton>Connect Wallet</ConnectButton>
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
