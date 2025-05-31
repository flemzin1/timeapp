"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CreateProject.css"

interface Task {
  id: string
  name: string
  assignedTo: string
  dependencies: string[]
  estimatedDuration: number
}

interface TeamMember {
  id: string
  walletAddress: string
  role: string
}

const CreateProject: React.FC = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isGeneratingPath, setIsGeneratingPath] = useState<boolean>(false)
  const [isDeploying, setIsDeploying] = useState<boolean>(false)

  // Form state
  const [projectName, setProjectName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [deadline, setDeadline] = useState<string>("")
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [criticalPath, setCriticalPath] = useState<string[]>([])

  // Team member form
  const [newMemberAddress, setNewMemberAddress] = useState<string>("")
  const [newMemberRole, setNewMemberRole] = useState<string>("")

  // Task form
  const [newTaskName, setNewTaskName] = useState<string>("")
  const [newTaskAssignee, setNewTaskAssignee] = useState<string>("")
  const [newTaskDuration, setNewTaskDuration] = useState<number>(1)
  const [newTaskDependencies, setNewTaskDependencies] = useState<string[]>([])

  const addTeamMember = () => {
    if (newMemberAddress && newMemberRole) {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        walletAddress: newMemberAddress,
        role: newMemberRole,
      }
      setTeamMembers([...teamMembers, newMember])
      setNewMemberAddress("")
      setNewMemberRole("")
    }
  }

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  const addTask = () => {
    if (newTaskName && newTaskAssignee) {
      const newTask: Task = {
        id: Date.now().toString(),
        name: newTaskName,
        assignedTo: newTaskAssignee,
        dependencies: newTaskDependencies,
        estimatedDuration: newTaskDuration,
      }
      setTasks([...tasks, newTask])
      setNewTaskName("")
      setNewTaskAssignee("")
      setNewTaskDuration(1)
      setNewTaskDependencies([])
    }
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const generateCriticalPath = () => {
    setIsGeneratingPath(true)
    // Simulate critical path calculation
    setTimeout(() => {
      const randomTasks = tasks.slice(0, Math.min(3, tasks.length)).map((task) => task.id)
      setCriticalPath(randomTasks)
      setIsGeneratingPath(false)
    }, 2000)
  }

  const deployToChain = () => {
    setIsDeploying(true)
    // Simulate blockchain deployment
    setTimeout(() => {
      setIsDeploying(false)
      navigate("/dashboard/projects")
    }, 3000)
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const steps = [
    { number: 1, title: "Project Info", description: "Basic project details" },
    { number: 2, title: "Team Members", description: "Add team members and roles" },
    { number: 3, title: "Tasks", description: "Define project tasks" },
    { number: 4, title: "Deploy", description: "Generate path and deploy" },
  ]

  return (
    <div className="create-project">
      <div className="create-project-header">
        <h1>Create New Project</h1>
        <p>Set up your project with tasks, team members, and critical path analysis</p>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        {steps.map((step) => (
          <div key={step.number} className={`step ${currentStep >= step.number ? "active" : ""}`}>
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              
            </div>
          </div>
        ))}
      </div>

      <div className="form-container">
        {/* Step 1: Project Info */}
        {currentStep === 1 && (
          <div className="form-step">
            <h2>Project Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="projectName">Project Name *</label>
                <input
                  type="text"
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="deadline">Deadline *</label>
                <input
                  type="date"
                  id="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project goals and objectives"
                  rows={4}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Team Members */}
        {currentStep === 2 && (
          <div className="form-step">
            <h2>Team Members & Roles</h2>

            <div className="add-member-form">
              <div className="form-row">
                <input
                  type="text"
                  value={newMemberAddress}
                  onChange={(e) => setNewMemberAddress(e.target.value)}
                  placeholder="Wallet address (0x...)"
                />
                <input
                  type="text"
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  placeholder="Role (e.g., Developer, Designer)"
                />
                <button type="button" onClick={addTeamMember} className="add-btn">
                  Add Member
                </button>
              </div>
            </div>

            <div className="team-members-list">
              {teamMembers.map((member) => (
                <div key={member.id} className="member-item">
                  <div className="member-info">
                    <span className="member-address">{member.walletAddress}</span>
                    <span className="member-role">{member.role}</span>
                  </div>
                  <button onClick={() => removeTeamMember(member.id)} className="remove-btn">
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {teamMembers.length === 0 && (
              <div className="empty-state">
                <p>No team members added yet. Add wallet addresses and their roles.</p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Tasks */}
        {currentStep === 3 && (
          <div className="form-step">
            <h2>Project Tasks</h2>

            <div className="add-task-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Task Name *</label>
                  <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="Enter task name"
                  />
                </div>

                <div className="form-group">
                  <label>Assign To *</label>
                  <select value={newTaskAssignee} onChange={(e) => setNewTaskAssignee(e.target.value)}>
                    <option value="">Select team member</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.walletAddress}>
                        {member.role} ({member.walletAddress.slice(0, 8)}...)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Duration (days)</label>
                  <input
                    type="number"
                    value={newTaskDuration}
                    onChange={(e) => setNewTaskDuration(Number(e.target.value))}
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label>Dependencies</label>
                  <select
                    multiple
                    value={newTaskDependencies}
                    onChange={(e) =>
                      setNewTaskDependencies(Array.from(e.target.selectedOptions, (option) => option.value))
                    }
                  >
                    {tasks.map((task) => (
                      <option key={task.id} value={task.id}>
                        {task.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="button" onClick={addTask} className="add-task-btn">
                Add Task
              </button>
            </div>

            <div className="tasks-list">
              {tasks.map((task) => (
                <div key={task.id} className="task-item">
                  <div className="task-info">
                    <h4>{task.name}</h4>
                    <p>Assigned to: {task.assignedTo.slice(0, 8)}...</p>
                    <p>Duration: {task.estimatedDuration} days</p>
                    {task.dependencies.length > 0 && <p>Dependencies: {task.dependencies.length} task(s)</p>}
                  </div>
                  <button onClick={() => removeTask(task.id)} className="remove-btn">
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {tasks.length === 0 && (
              <div className="empty-state">
                <p>No tasks added yet. Start by adding your first task.</p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Deploy */}
        {currentStep === 4 && (
          <div className="form-step">
            <h2>Generate Critical Path & Deploy</h2>

            <div className="project-summary">
              <h3>Project Summary</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="label">Project Name:</span>
                  <span className="value">{projectName}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Deadline:</span>
                  <span className="value">{deadline}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Team Members:</span>
                  <span className="value">{teamMembers.length}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Total Tasks:</span>
                  <span className="value">{tasks.length}</span>
                </div>
              </div>
            </div>

            <div className="critical-path-section">
              <div className="section-header">
                <h3>Critical Path Analysis</h3>
                <button
                  onClick={generateCriticalPath}
                  disabled={isGeneratingPath || tasks.length === 0}
                  className="generate-btn"
                >
                  {isGeneratingPath ? "Generating..." : "Generate Critical Path"}
                </button>
              </div>

              {criticalPath.length > 0 && (
                <div className="critical-path-result">
                  <h4>Critical Path Tasks:</h4>
                  <div className="critical-tasks">
                    {criticalPath.map((taskId) => {
                      const task = tasks.find((t) => t.id === taskId)
                      return (
                        <div key={taskId} className="critical-task">
                          <span className="task-name">{task?.name}</span>
                          <span className="task-duration">{task?.estimatedDuration} days</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="deploy-section">
              <button
                onClick={deployToChain}
                disabled={isDeploying || criticalPath.length === 0}
                className="deploy-btn"
              >
                {isDeploying ? "Deploying to Blockchain..." : "Deploy to Chain"}
              </button>
              <p className="deploy-note">This will create your project on the Sui blockchain and make it immutable.</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="form-navigation">
          {currentStep > 1 && (
            <button onClick={prevStep} className="nav-btn secondary">
              Previous
            </button>
          )}
          {currentStep < 4 && (
            <button
              onClick={nextStep}
              disabled={
                (currentStep === 1 && (!projectName || !deadline)) ||
                (currentStep === 2 && teamMembers.length === 0) ||
                (currentStep === 3 && tasks.length === 0)
              }
              className="nav-btn primary"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateProject
