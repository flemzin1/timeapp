"use client"

import type React from "react"
import { useState } from "react"
import "./NavBar.css"
import {
  ConnectButton,
} from "@suiet/wallet-kit";

import '@suiet/wallet-kit/style.css'

interface NavbarProps {
  isWalletConnected: boolean
}

const Navbar: React.FC<NavbarProps> = ({ isWalletConnected}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // const shortenAddress = (address: string) => {
  //   if (!address) return "";
  //   return `${address.slice(0, 4)}...${address.slice(-4)}`;
  // }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img className="logo" src="/logo.png"/>
          <h1 className="logo">TimeChain</h1>
        </div>

        <div className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
         

            <div className="wallet-connected">
              {isWalletConnected&& (<a href="/dashboard" className="navbar-link dashboard-link">
                Dashboard
              </a>)}
              
              <ConnectButton>Connect Wallet</ConnectButton>

            </div>

       
              
          
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
