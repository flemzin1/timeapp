"use client"

import React from "react"
import "./Setting.css"

interface SettingsProps {
  walletAddress: string
  isDarkMode: boolean
  onToggleTheme: () => void
}

const Settings: React.FC<SettingsProps> = ({ walletAddress, isDarkMode, onToggleTheme }) => {
  const [roleName, setRoleName] = React.useState<string>("Lead Developer")
  const [notificationsEnabled, setNotificationsEnabled] = React.useState<boolean>(true)
  const [emailNotifications, setEmailNotifications] = React.useState<boolean>(false)
  const [showCopiedMessage, setShowCopiedMessage] = React.useState<boolean>(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    setShowCopiedMessage(true)
    setTimeout(() => setShowCopiedMessage(false), 2000)
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and application settings</p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2 className="section-title">Account Settings</h2>

          <div className="settings-card">
            <div className="settings-group">
              <label className="settings-label">Wallet Address</label>
              <div className="wallet-display">
                <span className="wallet-address">{walletAddress}</span>
                <button className="copy-btn" onClick={copyToClipboard}>
                  {showCopiedMessage ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <div className="settings-group">
              <label className="settings-label">Role Name</label>
              <div className="role-input">
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="Enter your role"
                />
                <button className="save-btn">Save</button>
              </div>
              <p className="settings-help">This is how you'll appear to other team members</p>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">UI Preferences</h2>

          <div className="settings-card">
            <div className="settings-group">
              <label className="settings-label">Theme</label>
              <div className="theme-toggle-container">
                <span className="theme-label">Light</span>
                <div className="toggle-switch">
                  <input type="checkbox" id="theme-toggle" checked={isDarkMode} onChange={onToggleTheme} />
                  <label htmlFor="theme-toggle" className="toggle-label"></label>
                </div>
                <span className="theme-label">Dark</span>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Notification Settings</h2>

          <div className="settings-card">
            <div className="settings-group">
              <div className="notification-option">
                <div className="option-text">
                  <label className="settings-label">In-App Notifications</label>
                  <p className="settings-help">Receive notifications within the application</p>
                </div>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="app-notifications"
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  />
                  <label htmlFor="app-notifications" className="toggle-label"></label>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <div className="notification-option">
                <div className="option-text">
                  <label className="settings-label">Email Notifications</label>
                  <p className="settings-help">Receive notifications via email (coming soon)</p>
                </div>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="email-notifications"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                    disabled
                  />
                  <label htmlFor="email-notifications" className="toggle-label"></label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">About & Support</h2>

          <div className="settings-card">
            <div className="about-timechain">
              <h3>TimeChain v1.0.0</h3>
              <p>
                TimeChain is a blockchain-powered productivity platform that helps you track time, manage projects, and
                build accountability.
              </p>
              <div className="support-links">
                <a href="#" className="support-link">
                  Documentation
                </a>
                <a href="#" className="support-link">
                  Support Center
                </a>
                <a href="#" className="support-link">
                  Report an Issue
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
