"use client"

import type React from "react"
import { useState } from "react"
import "./TodoList.css"

interface Task {
  id: string
  title: string
  project: string
  status: "pending" | "in-progress" | "completed"
  deadline: string
  timeLeft: string
  isUrgent: boolean
  isCriticalPath: boolean
  description: string
  assignedTo: string
}

const TodoList: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all")
  const [showUrgentOnly, setShowUrgentOnly] = useState<boolean>(false)

  // Mock data for tasks
  const tasks: Task[] = [
    {
      id: "task-1",
      title: "Complete API integration",
      project: "TimeChain Mobile App",
      status: "in-progress",
      deadline: "2024-02-10",
      timeLeft: "2 days",
      isUrgent: true,
      isCriticalPath: true,
      description: "Integrate the TimeChain API with the mobile application frontend",
      assignedTo: "0x1234567890abcdef1234567890abcdef12345678",
    },
    {
      id: "task-2",
      title: "Design user dashboard",
      project: "TimeChain Mobile App",
      status: "pending",
      deadline: "2024-02-15",
      timeLeft: "7 days",
      isUrgent: false,
      isCriticalPath: true,
      description: "Create wireframes and mockups for the user dashboard",
      assignedTo: "0x1234567890abcdef1234567890abcdef12345678",
    },
    {
      id: "task-3",
      title: "Write unit tests",
      project: "Smart Contract Audit",
      status: "pending",
      deadline: "2024-02-12",
      timeLeft: "4 days",
      isUrgent: true,
      isCriticalPath: false,
      description: "Write comprehensive unit tests for the smart contract",
      assignedTo: "0x1234567890abcdef1234567890abcdef12345678",
    },
    {
      id: "task-4",
      title: "Update documentation",
      project: "Documentation Update",
      status: "completed",
      deadline: "2024-01-30",
      timeLeft: "Completed",
      isUrgent: false,
      isCriticalPath: false,
      description: "Update the project documentation with the latest changes",
      assignedTo: "0x1234567890abcdef1234567890abcdef12345678",
    },
    {
      id: "task-5",
      title: "Review pull requests",
      project: "TimeChain Mobile App",
      status: "in-progress",
      deadline: "2024-02-08",
      timeLeft: "Today",
      isUrgent: true,
      isCriticalPath: false,
      description: "Review and merge pending pull requests",
      assignedTo: "0x1234567890abcdef1234567890abcdef12345678",
    },
  ]

  const handleStatusChange = (taskId: string, newStatus: "pending" | "in-progress" | "completed") => {
    // In a real app, this would update the task status in the database
    console.log(`Task ${taskId} status changed to ${newStatus}`)
  }

  const filteredTasks = tasks.filter(
    (task) => (filter === "all" || task.status === filter) && (!showUrgentOnly || task.isUrgent),
  )

  return (
    <div className="todo-list-container">
      <div className="todo-header">
        <div className="header-content">
          <h1>To-Do List</h1>
          <p>Manage your assigned tasks and track progress</p>
        </div>
      </div>

      <div className="todo-filters">
        <div className="filter-tabs">
          <button className={`filter-tab ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
            All Tasks ({tasks.length})
          </button>
          <button className={`filter-tab ${filter === "pending" ? "active" : ""}`} onClick={() => setFilter("pending")}>
            Pending ({tasks.filter((t) => t.status === "pending").length})
          </button>
          <button
            className={`filter-tab ${filter === "in-progress" ? "active" : ""}`}
            onClick={() => setFilter("in-progress")}
          >
            In Progress ({tasks.filter((t) => t.status === "in-progress").length})
          </button>
          <button
            className={`filter-tab ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed ({tasks.filter((t) => t.status === "completed").length})
          </button>
        </div>

        <div className="urgent-filter">
          <label className="checkbox-container">
            <input type="checkbox" checked={showUrgentOnly} onChange={() => setShowUrgentOnly(!showUrgentOnly)} />
            <span className="checkmark"></span>
            Show urgent tasks only
          </label>
        </div>
      </div>

      <div className="tasks-container">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`task-card ${task.isUrgent ? "urgent" : ""} ${task.isCriticalPath ? "critical-path" : ""}`}
          >
            <div className="task-header">
              <div className="task-title-section">
                <h3 className="task-title">{task.title}</h3>
                <div className="task-badges">
                  {task.isUrgent && <span className="badge urgent">Urgent</span>}
                  {task.isCriticalPath && <span className="badge critical">Critical Path</span>}
                </div>
              </div>
              <div className="task-project">{task.project}</div>
            </div>

            <div className="task-description">{task.description}</div>

            <div className="task-meta">
              <div className="task-deadline">
                <span className="label">Deadline:</span>
                <span className="value">{task.deadline}</span>
              </div>
              <div className="task-time-left">
                <span className="label">Time Left:</span>
                <span className={`value ${task.timeLeft === "Today" ? "urgent" : ""}`}>{task.timeLeft}</span>
              </div>
            </div>

            <div className="task-actions">
              <div className="status-selector">
                <span className="label">Status:</span>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value as never)}
                  className={`status-select ${task.status}`}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {task.status !== "completed" && (
                <button className="complete-btn" onClick={() => handleStatusChange(task.id, "completed")}>
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">✓</div>
            <h3>No tasks found</h3>
            <p>
              {filter === "all" ? "You don't have any tasks assigned to you." : `You don't have any ${filter} tasks.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoList
