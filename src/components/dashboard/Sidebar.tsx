import type React from "react"
import { NavLink} from "react-router-dom" 
import "./Sidebar.css"
import { House, FolderOpenDot, CheckCheck, Plus, ChartColumnIncreasing, Bell, Settings, LogOut, X } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean
  onLogout: () => void
  mobileOpen?: boolean
  onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onLogout, mobileOpen, onClose }) => {
 // const location = useLocation()

  const menuItems = [
    { path: "/dashboard", icon: <House />, label: "Home" },
    { path: "/dashboard/projects", icon: <FolderOpenDot />, label: "My Projects" },
    { path: "/dashboard/create-project", icon: <Plus />, label: "Create Project" },
    { path: "/dashboard/todo", icon: <CheckCheck />, label: "To-Do List" },
    { path: "/dashboard/analytics", icon: <ChartColumnIncreasing />, label: "Analytics" },
    { path: "/dashboard/notifications", icon: <Bell />, label: "Notifications" },
    { path: "/dashboard/settings", icon:<Settings />, label: "Settings" },
  ]

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-header">
        <NavLink to='/home' className="sidebar-logo">
          <span className="logo-icon"><img src='/logo.png' className="img" /></span>
          {!isCollapsed && <span className="logo-text">TimeChain</span>}
        </NavLink>
        {mobileOpen && (
          <button className="mobile-close-btn" onClick={onClose} aria-label="Close sidebar">
            <X size={24} />
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                title={isCollapsed ? item.label : ""}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-label">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout} title={isCollapsed ? "Logout" : ""}>
          <span className="nav-icon"><LogOut /></span>
          {!isCollapsed && <span className="nav-label">Logout</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
