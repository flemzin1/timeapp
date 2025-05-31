import type React from "react"
import { useState } from "react"
import "./DashboardLayout.css"
// Assuming the correct paths for Sidebar and Topbar are as follows:
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

interface DashboardLayoutProps {
  children: React.ReactNode
  walletAddress: string
  isDarkMode: boolean
  onToggleTheme: () => void
  // onLogout: () => void
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  walletAddress,
  isDarkMode,
  onToggleTheme,
  
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false)

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen)
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed)
    }
  }

  return (
    <div className={`dashboard-layout ${isMobileSidebarOpen ? 'mobile-sidebar-open' : ''}`}>
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        // onLogout={onLogout} 
        mobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className={`dashboard-main ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <Topbar
          walletAddress={walletAddress}
          isDarkMode={isDarkMode}
          onToggleTheme={onToggleTheme}
          onToggleSidebar={toggleSidebar}
          isMobileSidebarOpen={isMobileSidebarOpen}
        />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
