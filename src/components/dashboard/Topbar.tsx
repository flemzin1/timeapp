import type React from "react"
import "./Topbar.css"
import { Moon, SunMoon, User } from 'lucide-react';
interface TopbarProps {
  walletAddress: string
  isDarkMode: boolean
  onToggleTheme: () => void
  onToggleSidebar: () => void
  isMobileSidebarOpen: boolean
}

const Topbar: React.FC<TopbarProps> = ({ 
  walletAddress, 
  isDarkMode, 
  onToggleTheme, 
  onToggleSidebar,
  isMobileSidebarOpen 
}) => {
  const shortenAddress = (address: string) => {
    const isMobile = window.innerWidth <= 768;
    return isMobile 
      ? `${address.slice(0, 4)}...${address.slice(-3)}`
      : `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    // You could add a toast notification here
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button 
          className={`sidebar-toggle ${isMobileSidebarOpen ? 'active' : ''}`} 
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="topbar-right">
        <button className="theme-toggle" onClick={onToggleTheme} title="Toggle theme">
          {isDarkMode ?  <SunMoon /> :   <Moon />}
        </button>

        <div className="wallet-info" onClick={copyToClipboard} title="Click to copy full address">
        
          <span className="wallet-address">{shortenAddress(walletAddress)}</span>
        </div>

        <div className="profile-menu">
          <div className="profile-icon">
            <span><User /></span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
