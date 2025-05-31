"use client"

import type React from "react"
import { Link } from "react-router-dom"
import "./DashboardHome.css"
import { Eye, Plus, ChartColumnIncreasing } from 'lucide-react';
const DashboardHome: React.FC = () => {
  const projectStats = [
    { title: "Ongoing Projects", count: 3, color: "blue" },
    { title: "Completed Projects", count: 12, color: "green" },
    { title: "Tasks Due Today", count: 5, color: "orange" },
    { title: "Total Tasks", count: 47, color: "purple" },
  ]

  const recentProjects = [
    { id: 1, name: "TimeChain Mobile App", progress: 75, status: "On Track", dueDate: "2024-02-15" },
    { id: 2, name: "Smart Contract Audit", progress: 45, status: "At Risk", dueDate: "2024-02-10" },
    { id: 3, name: "UI/UX Redesign", progress: 90, status: "On Track", dueDate: "2024-02-20" },
  ]

  const urgentTasks = [
    { id: 1, title: "Complete API integration", project: "TimeChain Mobile App", dueIn: "2 hours" },
    { id: 2, title: "Review smart contract code", project: "Smart Contract Audit", dueIn: "1 day" },
    { id: 3, title: "Finalize color scheme", project: "UI/UX Redesign", dueIn: "3 days" },
  ]

  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <h1>Welcome back!</h1>
        <p>Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {projectStats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-content">
              <h3 className="stat-count">{stat.count}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/dashboard/create-project" className="action-btn tertiary">
            <span className="btn-icon"> <Plus  size={16}/></span>
            Create New Project
          </Link>
          <Link to="/dashboard/todo" className="action-btn tertiary">
            <span className="btn-icon"> <Eye  size={16}/></span>
            View Tasks
          </Link>
          <Link to="/dashboard/analytics" className="action-btn tertiary">
            <span className="btn-icon"> <ChartColumnIncreasing size={16} /></span>
            Analytics
          </Link>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Recent Projects */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Projects</h2>
            <Link to="/dashboard/projects" className="view-all-link">
              View All
            </Link>
          </div>
          <div className="projects-list">
            {recentProjects.map((project) => (
              <div key={project.id} className="project-item">
                <div className="project-info">
                  <h3 className="project-name">{project.name}</h3>
                  <div className="project-meta">
                    <span className={`status ${project.status.toLowerCase().replace(" ", "-")}`}>{project.status}</span>
                    <span className="due-date">Due: {project.dueDate}</span>
                  </div>
                </div>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
                  </div>
                  <span className="progress-text">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Urgent Tasks</h2>
            <Link to="/dashboard/todo" className="view-all-link">
              View All
            </Link>
          </div>
          <div className="tasks-list">
            {urgentTasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-info">
                  <h4 className="task-title">{task.title}</h4>
                  <p className="task-project">{task.project}</p>
                </div>
                <div className="task-due">
                  <span className="due-time">{task.dueIn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome
