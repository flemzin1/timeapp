"use client"

import type React from "react"
import { useState } from "react"
import "./NavBar.css"

interface NavbarProps {
  isWalletConnected: boolean
  walletAddress: string
  onWalletConnect: () => void
  onWalletDisconnect: () => void
}

const Navbar: React.FC<NavbarProps> = ({ isWalletConnected, walletAddress, onWalletConnect, onWalletDisconnect }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const shortenAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img className="logo" src="/logo.png"/>
          <h1 className="logo">TimeChain</h1>
        </div>

        <div className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
         

          {isWalletConnected ? (
            <div className="wallet-connected">
              <a href="/dashboard" className="navbar-link dashboard-link">
                Dashboard
              </a>
              <div className="wallet-info">
                <span className="wallet-address">{shortenAddress(walletAddress)}</span>
                <button className="disconnect-btn" onClick={onWalletDisconnect}>
                  Disconnect
                </button>
              </div>
            </div>
          ) : (
            <button className="connect-wallet-btn" onClick={onWalletConnect}>
              Connect Wallet
            </button>
          )}
        </div>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
