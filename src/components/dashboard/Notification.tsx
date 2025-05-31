"use client"

import type React from "react"
import { useState } from "react"
import "./Notification.css"
import { User, Clock, FolderOpenDot,  Sparkle, MessageCircle  } from 'lucide-react';
interface Notification {
  id: string
  type: "role" | "task" | "deadline" | "project" | "milestone" | "message"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  project?: string
  sender?: string
}

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "unread" | "system" | "messages">("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-1",
      type: "role",
      title: "Role Assigned",
      message: "You have been assigned as Lead Developer on TimeChain Mobile App",
      timestamp: "2024-02-05 09:30",
      isRead: false,
      project: "TimeChain Mobile App",
    },
    {
      id: "notif-2",
      type: "task",
      title: "Task Completed",
      message: "Update documentation task has been marked as completed",
      timestamp: "2024-02-04 14:15",
      isRead: true,
      project: "Documentation Update",
    },
    {
      id: "notif-3",
      type: "deadline",
      title: "Deadline Approaching",
      message: "The deadline for 'Complete API integration' is in 2 days",
      timestamp: "2024-02-03 10:45",
      isRead: false,
      project: "TimeChain Mobile App",
    },
    {
      id: "notif-4",
      type: "project",
      title: "Project Started",
      message: "Smart Contract Audit project has officially started",
      timestamp: "2024-02-02 08:00",
      isRead: true,
      project: "Smart Contract Audit",
    },
    {
      id: "notif-5",
      type: "milestone",
      title: "Milestone Achieved",
      message: "First milestone 'Initial Design' has been completed",
      timestamp: "2024-02-01 16:20",
      isRead: false,
      project: "TimeChain Mobile App",
    },
    {
      id: "notif-6",
      type: "message",
      title: "New Message",
      message: "Can you review the latest pull request when you get a chance?",
      timestamp: "2024-01-31 11:05",
      isRead: false,
      project: "TimeChain Mobile App",
      sender: "0x7890abcdef1234567890abcdef1234567890abcd",
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "role":
        return <User />
      case "task":
        return "✓"
      case "deadline":
        return  <Clock />
      case "project":
        return <FolderOpenDot />
      case "milestone":
        return  <Sparkle />
      case "message":
        return  <MessageCircle />
      default:
        return "📣"
    }
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true
    if (filter === "unread") return !notif.isRead
    if (filter === "system") return notif.type !== "message"
    if (filter === "messages") return notif.type === "message"
    return true
  })

  const unreadCount = notifications.filter((notif) => !notif.isRead).length

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="header-content">
          <h1>Notifications</h1>
          <p>Stay updated with project activities and messages</p>
        </div>
        {unreadCount > 0 && (
          <button className="mark-all-read-btn" onClick={markAllAsRead}>
            Mark All as Read
          </button>
        )}
      </div>

      <div className="notifications-filters">
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={`filter-btn ${filter === "unread" ? "active" : ""}`} onClick={() => setFilter("unread")}>
          Unread {unreadCount > 0 && <span className="count">{unreadCount}</span>}
        </button>
        <button className={`filter-btn ${filter === "system" ? "active" : ""}`} onClick={() => setFilter("system")}>
          System
        </button>
        <button className={`filter-btn ${filter === "messages" ? "active" : ""}`} onClick={() => setFilter("messages")}>
          Messages
        </button>
      </div>

      <div className="notifications-list">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${notification.isRead ? "read" : "unread"}`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="notification-icon">{getNotificationIcon(notification.type)}</div>
            <div className="notification-content">
              <div className="notification-header">
                <h3 className="notification-title">{notification.title}</h3>
                <span className="notification-time">{notification.timestamp}</span>
              </div>
              <p className="notification-message">{notification.message}</p>
              {notification.project && (
                <div className="notification-project">
                  <span className="label">Project:</span>
                  <span className="value">{notification.project}</span>
                </div>
              )}
              {notification.sender && (
                <div className="notification-sender">
                  <span className="label">From:</span>
                  <span className="value">
                    {notification.sender.slice(0, 6)}...{notification.sender.slice(-4)}
                  </span>
                </div>
              )}
            </div>
            {!notification.isRead && <div className="unread-indicator"></div>}
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No notifications</h3>
            <p>You're all caught up! No {filter !== "all" ? filter : ""} notifications to display.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
