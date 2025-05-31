"use client"

import type React from "react"
import { useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import "./ProjectTracker.css"

interface TeamMember {
  id: string
  walletAddress: string
  role: string
  tasksAssigned: number
  tasksCompleted: number
}

interface Task {
  id: string
  name: string
  status: "pending" | "in-progress" | "completed"
  assignedTo: string
  deadline: string
  timeEstimate: number
  timeSpent: number
  dependencies: string[]
  isCriticalPath: boolean
}

interface Milestone {
  id: string
  name: string
  deadline: string
  isCompleted: boolean
  completedAt?: string
  tasks: string[]
}

const ProjectTracker: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "team" | "timeline">("overview")

  // Mock project data
  const project = {
    id: id || "1",
    
    status: "active",
    startDate: "2024-01-15",
    deadline: "2024-03-15",
    progress: 75,
    criticalPathProgress: 60,
  }

  // Mock team members
  const teamMembers: TeamMember[] = [
    {
      id: "member-1",
      walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
      role: "Lead Developer",
      tasksAssigned: 8,
      tasksCompleted: 6,
    },
    {
      id: "member-2",
      walletAddress: "0x2345678901abcdef2345678901abcdef23456789",
      role: "UI/UX Designer",
      tasksAssigned: 6,
      tasksCompleted: 5,
    },
    {
      id: "member-3",
      walletAddress: "0x3456789012abcdef3456789012abcdef34567890",
      role: "Backend Developer",
      tasksAssigned: 7,
      tasksCompleted: 4,
    },
    {
      id: "member-4",
      walletAddress: "0x4567890123abcdef4567890123abcdef45678901",
      role: "QA Engineer",
      tasksAssigned: 3,
      tasksCompleted: 3,
    },
  ]

  // Mock tasks
  const tasks: Task[] = [
    {
      id: "task-1",
      name: "Design user interface mockups",
      status: "completed",
      assignedTo: "0x2345678901abcdef2345678901abcdef23456789",
      deadline: "2024-01-25",
      timeEstimate: 20,
      timeSpent: 18,
      dependencies: [],
      isCriticalPath: true,
    },
    {
      id: "task-2",
      name: "Set up project architecture",
      status: "completed",
      assignedTo: "0x1234567890abcdef1234567890abcdef12345678",
      deadline: "2024-01-30",
      timeEstimate: 15,
      timeSpent: 12,
      dependencies: [],
      isCriticalPath: true,
    },
    {
      id: "task-3",
      name: "Implement authentication system",
      status: "completed",
      assignedTo: "0x3456789012abcdef3456789012abcdef34567890",
      deadline: "2024-02-05",
      timeEstimate: 25,
      timeSpent: 30,
      dependencies: ["task-2"],
      isCriticalPath: true,
    },
    {
      id: "task-4",
      name: "Create dashboard components",
      status: "in-progress",
      assignedTo: "0x2345678901abcdef2345678901abcdef23456789",
      deadline: "2024-02-10",
      timeEstimate: 30,
      timeSpent: 20,
      dependencies: ["task-1"],
      isCriticalPath: true,
    },
    {
      id: "task-5",
      name: "Implement API integration",
      status: "in-progress",
      assignedTo: "0x1234567890abcdef1234567890abcdef12345678",
      deadline: "2024-02-15",
      timeEstimate: 40,
      timeSpent: 25,
      dependencies: ["task-3"],
      isCriticalPath: true,
    },
    {
      id: "task-6",
      name: "Write unit tests",
      status: "in-progress",
      assignedTo: "0x4567890123abcdef4567890123abcdef45678901",
      deadline: "2024-02-20",
      timeEstimate: 20,
      timeSpent: 10,
      dependencies: ["task-3", "task-5"],
      isCriticalPath: false,
    },
    {
      id: "task-7",
      name: "Implement wallet connection",
      status: "pending",
      assignedTo: "0x3456789012abcdef3456789012abcdef34567890",
      deadline: "2024-02-25",
      timeEstimate: 35,
      timeSpent: 0,
      dependencies: ["task-5"],
      isCriticalPath: true,
    },
    {
      id: "task-8",
      name: "User acceptance testing",
      status: "pending",
      assignedTo: "0x4567890123abcdef4567890123abcdef45678901",
      deadline: "2024-03-05",
      timeEstimate: 25,
      timeSpent: 0,
      dependencies: ["task-4", "task-6", "task-7"],
      isCriticalPath: false,
    },
  ]

  // Mock milestones
  const milestones: Milestone[] = [
    {
      id: "milestone-1",
      name: "Project Setup & Design",
      deadline: "2024-01-30",
      isCompleted: true,
      completedAt: "2024-01-28",
      tasks: ["task-1", "task-2"],
    },
    {
      id: "milestone-2",
      name: "Core Functionality",
      deadline: "2024-02-15",
      isCompleted: false,
      tasks: ["task-3", "task-4", "task-5"],
    },
    {
      id: "milestone-3",
      name: "Testing & Integration",
      deadline: "2024-03-05",
      isCompleted: false,
      tasks: ["task-6", "task-7", "task-8"],
    },
    {
      id: "milestone-4",
      name: "Final Release",
      deadline: "2024-03-15",
      isCompleted: false,
      tasks: [],
    },
  ]

  const getTasksByStatus = (status: "pending" | "in-progress" | "completed") => {
    return tasks.filter((task) => task.status === status)
  }

  const getTasksForMilestone = (milestoneId: string) => {
    const milestone = milestones.find((m) => m.id === milestoneId)
    if (!milestone) return []
    return tasks.filter((task) => milestone.tasks.includes(task.id))
  }

  const getMemberById = (walletAddress: string) => {
    return teamMembers.find((member) => member.walletAddress === walletAddress)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const calculateDaysLeft = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysLeft = calculateDaysLeft(project.deadline)

  return (
    <div className="project-tracker">
      <div className="project-header">
        <div className="project-title-section">
         
          <span className={`status-badge ${project.status}`}>{project.status}</span>
        </div>
        
      </div>

      <div className="project-meta">
        <div className="meta-item">
          <span className="meta-label">Start Date:</span>
          <span className="meta-value">{formatDate(project.startDate)}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Deadline:</span>
          <span className="meta-value">{formatDate(project.deadline)}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Time Left:</span>
          <span className={`meta-value ${daysLeft < 7 ? "urgent" : ""}`}>
            {daysLeft > 0 ? `${daysLeft} days` : "Overdue"}
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Team Size:</span>
          <span className="meta-value">{teamMembers.length} members</span>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-item">
          <div className="progress-header">
            <span className="progress-label">Overall Progress</span>
            <span className="progress-percentage">{project.progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
          </div>
        </div>
        <div className="progress-item">
          <div className="progress-header">
            <span className="progress-label">Critical Path Progress</span>
            <span className="progress-percentage">{project.criticalPathProgress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill critical" style={{ width: `${project.criticalPathProgress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="project-tabs">
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button className={`tab-btn ${activeTab === "tasks" ? "active" : ""}`} onClick={() => setActiveTab("tasks")}>
          Tasks
        </button>
        <button className={`tab-btn ${activeTab === "team" ? "active" : ""}`} onClick={() => setActiveTab("team")}>
          Team
        </button>
        <button
          className={`tab-btn ${activeTab === "timeline" ? "active" : ""}`}
          onClick={() => setActiveTab("timeline")}
        >
          Timeline
        </button>
      </div>

      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="overview-tab">
            <div className="overview-grid">
              <div className="overview-card">
                <h3 className="card-title">Task Summary</h3>
                <div className="task-summary">
                  <div className="summary-item">
                    <span className="summary-label">Total Tasks</span>
                    <span className="summary-value">{tasks.length}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Completed</span>
                    <span className="summary-value">{getTasksByStatus("completed").length}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">In Progress</span>
                    <span className="summary-value">{getTasksByStatus("in-progress").length}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Pending</span>
                    <span className="summary-value">{getTasksByStatus("pending").length}</span>
                  </div>
                </div>
                <div className="task-distribution">
                  <div
                    className="distribution-segment completed"
                    style={{
                      width: `${(getTasksByStatus("completed").length / tasks.length) * 100}%`,
                    }}
                  ></div>
                  <div
                    className="distribution-segment in-progress"
                    style={{
                      width: `${(getTasksByStatus("in-progress").length / tasks.length) * 100}%`,
                    }}
                  ></div>
                  <div
                    className="distribution-segment pending"
                    style={{ width: `${(getTasksByStatus("pending").length / tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="overview-card">
                <h3 className="card-title">Critical Path Tasks</h3>
                <div className="critical-tasks-list">
                  {tasks
                    .filter((task) => task.isCriticalPath)
                    .map((task) => (
                      <div key={task.id} className={`critical-task-item ${task.status}`}>
                        <span className="task-name">{task.name}</span>
                        <span className="task-status">{task.status}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="overview-card">
                <h3 className="card-title">Upcoming Deadlines</h3>
                <div className="deadlines-list">
                  {tasks
                    .filter((task) => task.status !== "completed")
                    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                    .slice(0, 3)
                    .map((task) => (
                      <div key={task.id} className="deadline-item">
                        <div className="deadline-info">
                          <span className="deadline-task">{task.name}</span>
                          <span className="deadline-date">{formatDate(task.deadline)}</span>
                        </div>
                        <div className="deadline-days-left">
                          <span className={`days-left ${calculateDaysLeft(task.deadline) < 3 ? "urgent" : ""}`}>
                            {calculateDaysLeft(task.deadline)} days left
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="overview-card">
                <h3 className="card-title">Milestones</h3>
                <div className="milestones-list">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className={`milestone-item ${milestone.isCompleted ? "completed" : ""}`}>
                      <div className="milestone-header">
                        <span className="milestone-name">{milestone.name}</span>
                        <span className="milestone-status">{milestone.isCompleted ? "Completed" : "In Progress"}</span>
                      </div>
                      <div className="milestone-date">
                        <span className="date-label">{milestone.isCompleted ? "Completed on:" : "Due by:"}</span>
                        <span className="date-value">{formatDate(milestone.completedAt || milestone.deadline)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === "tasks" && (
          <div className="tasks-tab">
            <div className="tasks-header">
              <h2>Project Tasks</h2>
              <NavLink to="/dashboard/create-project" className="add-task-btn">Add New Task</NavLink>
            </div>

            <div className="tasks-filter">
              <input type="text" placeholder="Search tasks..." className="task-search" />
              <select className="task-filter">
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="critical">Critical Path</option>
              </select>
            </div>

            <div className="tasks-list">
              <table className="tasks-table">
                <thead>
                  <tr>
                    <th>Task id</th>
                    <th>Task name</th>
                    <th>Status</th>
                    <th>Deadline</th>
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => {
                    const assignee = getMemberById(task.assignedTo)
                    return (
                      <tr key={task.id} className={task.isCriticalPath ? "critical-path-row" : ""}>
                        <td className="task-name-cell">
                          <span className="task-name">{task.name}</span>
                          {task.isCriticalPath && <span className="critical-badge">Critical Path</span>}
                        </td>
                        <td>
                          <div className="assignee">
                            <span className="assignee-role">{assignee?.role}</span>
                            <span className="assignee-address">
                              {task.assignedTo.slice(0, 6)}...{task.assignedTo.slice(-4)}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className={`status-pill ${task.status}`}>{task.status}</span>
                        </td>
                        <td>
                          <span
                            className={`deadline ${
                              calculateDaysLeft(task.deadline) < 3 && task.status !== "completed" ? "urgent" : ""
                            }`}
                          >
                            {formatDate(task.deadline)}
                          </span>
                        </td>
                        <td>
                          <div className="time-info">
                            <span className="time-spent">{task.timeSpent}h</span>
                            <span className="time-separator">/</span>
                            <span className="time-estimate">{task.timeEstimate}h</span>
                          </div>
                        </td>
                        <td>
                          <div className="task-actions">
                            <button className="action-btn edit">Edit</button>
                            <button className="action-btn view">View</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === "team" && (
          <div className="team-tab">
            <div className="team-header">
              <h2>Project Team</h2>
              <button className="add-member-btn">Add Team Member</button>
            </div>

            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-member-card">
                  <div className="member-avatar">
                    <span className="avatar-placeholder">{member.role.charAt(0)}</span>
                  </div>
                  <div className="member-info">
                    <h3 className="member-role">{member.role}</h3>
                    <span className="member-address">
                      {member.walletAddress.slice(0, 6)}...{member.walletAddress.slice(-4)}
                    </span>
                  </div>
                  <div className="member-stats">
                    <div className="stat">
                      <span className="stat-label">Tasks Assigned</span>
                      <span className="stat-value">{member.tasksAssigned}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Tasks Completed</span>
                      <span className="stat-value">{member.tasksCompleted}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Completion Rate</span>
                      <span className="stat-value">
                        {Math.round((member.tasksCompleted / member.tasksAssigned) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="member-actions">
                    <button className="action-btn">Message</button>
                    <button className="action-btn">View Tasks</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === "timeline" && (
          <div className="timeline-tab">
            <div className="timeline-header">
              <h2>Project Timeline</h2>
            </div>

            <div className="timeline-container">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="timeline-milestone">
                  <div className="milestone-marker">
                    <div className={`marker ${milestone.isCompleted ? "completed" : ""}`}>{index + 1}</div>
                    {index < milestones.length - 1 && <div className="connector"></div>}
                  </div>
                  <div className="milestone-content">
                    <div className="milestone-header">
                      <h3 className="milestone-title">{milestone.name}</h3>
                      <span className="milestone-date">{formatDate(milestone.deadline)}</span>
                    </div>
                    <div className="milestone-tasks">
                      {getTasksForMilestone(milestone.id).map((task) => (
                        <div key={task.id} className={`milestone-task ${task.status}`}>
                          <span className="task-name">{task.name}</span>
                          <span className="task-status">{task.status}</span>
                        </div>
                      ))}
                      {getTasksForMilestone(milestone.id).length === 0 && (
                        <p className="no-tasks">No tasks assigned to this milestone yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectTracker
