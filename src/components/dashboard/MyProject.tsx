"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./MyProject.css"
import { Eye, Plus } from 'lucide-react';
interface Project {
  id: number
  name: string
  description: string
  status: "active" | "completed" | "paused"
  progress: number
  dueDate: string
  teamMembers: number
  tasksTotal: number
  tasksCompleted: number
}

const MyProjects: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "active" | "completed" | "paused">("all")

  const projects: Project[] = [
    {
      id: 1,
      name: "TimeChain Mobile App",
      description: "Developing the mobile application for TimeChain platform",
      status: "active",
      progress: 75,
      dueDate: "2024-02-15",
      teamMembers: 4,
      tasksTotal: 24,
      tasksCompleted: 18,
    },
    {
      id: 2,
      name: "Smart Contract Audit",
      description: "Security audit of TimeChain smart contracts",
      status: "active",
      progress: 45,
      dueDate: "2024-02-10",
      teamMembers: 2,
      tasksTotal: 12,
      tasksCompleted: 5,
    },
    {
      id: 3,
      name: "UI/UX Redesign",
      description: "Complete redesign of the user interface",
      status: "active",
      progress: 90,
      dueDate: "2024-02-20",
      teamMembers: 3,
      tasksTotal: 15,
      tasksCompleted: 13,
    },
    {
      id: 4,
      name: "Documentation Update",
      description: "Update all project documentation",
      status: "completed",
      progress: 100,
      dueDate: "2024-01-30",
      teamMembers: 2,
      tasksTotal: 8,
      tasksCompleted: 8,
    },
    {
      id: 5,
      name: "Marketing Campaign",
      description: "Launch marketing campaign for TimeChain",
      status: "paused",
      progress: 30,
      dueDate: "2024-03-01",
      teamMembers: 5,
      tasksTotal: 20,
      tasksCompleted: 6,
    },
  ]

  const filteredProjects = projects.filter((project) => filter === "all" || project.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "blue"
      case "completed":
        return "green"
      case "paused":
        return "orange"
      default:
        return "gray"
    }
  }

  return (
    <div className="my-projects">
      <div className="projects-header">
        <div className="header-content">
          <h1>My Projects</h1>
          <p>Manage and track all your projects in one place</p>
        </div>
        <Link to="/dashboard/create-project" className="create-project-btn">
          <span className="btn-icon"> <Plus  size={16}/></span>
          Create Project
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button className={`filter-tab ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
          All Projects ({projects.length})
        </button>
        <button className={`filter-tab ${filter === "active" ? "active" : ""}`} onClick={() => setFilter("active")}>
          Active ({projects.filter((p) => p.status === "active").length})
        </button>
        <button
          className={`filter-tab ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed ({projects.filter((p) => p.status === "completed").length})
        </button>
        <button className={`filter-tab ${filter === "paused" ? "active" : ""}`} onClick={() => setFilter("paused")}>
          Paused ({projects.filter((p) => p.status === "paused").length})
        </button>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <div className="project-title">
                <h3>{project.name}</h3>
                <span className={`status-badge ${getStatusColor(project.status)}`}>{project.status}</span>
              </div>
              <div className="project-actions">
                <Link to={`/dashboard/project/${project.id}`} className="view-btn" title="View Project">
                <Eye  size={16}/>
                </Link>
              </div>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="project-progress">
              <div className="progress-header">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
              </div>
            </div>

            <div className="project-stats">
              <div className="stat">
                <span className="stat-label">Tasks</span>
                <span className="stat-value">
                  {project.tasksCompleted}/{project.tasksTotal}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Team</span>
                <span className="stat-value">{project.teamMembers} members</span>
              </div>
              <div className="stat">
                <span className="stat-label">Due Date</span>
                <span className="stat-value">{project.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <h3>No projects found</h3>
          <p>{filter === "all" ? "You haven't created any projects yet." : `No ${filter} projects at the moment.`}</p>
          {filter === "all" && (
            <Link to="/dashboard/create-project" className="create-first-project-btn">
              Create Your First Project
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default MyProjects
