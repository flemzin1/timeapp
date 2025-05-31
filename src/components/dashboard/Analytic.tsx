"use client"

import type React from "react"
import { useState } from "react"
import "./Analytic.css"
import { DollarSign } from 'lucide-react';

interface ProjectAnalytics {
  id: string
  name: string
  timeSpent: number
  timeEstimated: number
  tasksCompleted: number
  totalTasks: number
  completionRate: number
}

interface UserAnalytics {
  tasksCompleted: number
  totalTasksAssigned: number
  completionRate: number
  onTimeCompletion: number
  lateCompletion: number
  tokensEarned: number
  penaltiesIncurred: number
}

interface HistoricalData {
  totalProjects: number
  completedProjects: number
  averageProjectTime: number
  criticalPathAccuracy: number
  allTimeTokens: number
}

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"projects" | "personal" | "history">("projects")

  // Mock data for project analytics
  const projectAnalytics: ProjectAnalytics[] = [
    {
      id: "proj-1",
      name: "TimeChain Mobile App",
      timeSpent: 120,
      timeEstimated: 160,
      tasksCompleted: 18,
      totalTasks: 24,
      completionRate: 75,
    },
    {
      id: "proj-2",
      name: "Smart Contract Audit",
      timeSpent: 40,
      timeEstimated: 80,
      tasksCompleted: 5,
      totalTasks: 12,
      completionRate: 41.67,
    },
    {
      id: "proj-3",
      name: "UI/UX Redesign",
      timeSpent: 60,
      timeEstimated: 50,
      tasksCompleted: 13,
      totalTasks: 15,
      completionRate: 86.67,
    },
  ]

  // Mock data for user analytics
  const userAnalytics: UserAnalytics = {
    tasksCompleted: 36,
    totalTasksAssigned: 51,
    completionRate: 70.59,
    onTimeCompletion: 30,
    lateCompletion: 6,
    tokensEarned: 450,
    penaltiesIncurred: 30,
  }

  // Mock data for historical data
  const historicalData: HistoricalData = {
    totalProjects: 15,
    completedProjects: 12,
    averageProjectTime: 18, // days
    criticalPathAccuracy: 85, // percentage
    allTimeTokens: 2450,
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <p>Track your performance metrics and project statistics</p>
      </div>

      <div className="analytics-tabs">
        <button
          className={`tab-btn ${activeTab === "projects" ? "active" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          Project Analytics
        </button>
        <button
          className={`tab-btn ${activeTab === "personal" ? "active" : ""}`}
          onClick={() => setActiveTab("personal")}
        >
          Personal Performance
        </button>
        <button
          className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          Historical Data
        </button>
      </div>

      <div className="analytics-content">
        {/* Project Analytics Tab */}
        {activeTab === "projects" && (
          <div className="projects-analytics">
            <div className="section-title">
              <h2>Project-Level Analytics</h2>
              <p>Time spent vs. estimated and task completion rates</p>
            </div>

            <div className="projects-grid">
              {projectAnalytics.map((project) => (
                <div key={project.id} className="project-analytics-card">
                  <h3 className="project-name">{project.name}</h3>

                  <div className="analytics-metrics">
                    <div className="metric">
                      <div className="metric-header">
                        <span className="metric-label">Time Progress</span>
                        <span className="metric-value">
                          {Math.round((project.timeSpent / project.timeEstimated) * 100)}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${(project.timeSpent / project.timeEstimated) * 100}%` }}
                        ></div>
                      </div>
                      <div className="metric-details">
                        <span>
                          {project.timeSpent} hrs spent / {project.timeEstimated} hrs estimated
                        </span>
                      </div>
                    </div>

                    <div className="metric">
                      <div className="metric-header">
                        <span className="metric-label">Task Completion</span>
                        <span className="metric-value">{project.completionRate.toFixed(0)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${project.completionRate}%` }}></div>
                      </div>
                      <div className="metric-details">
                        <span>
                          {project.tasksCompleted} completed / {project.totalTasks} total tasks
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="efficiency-indicator">
                    <span className="label">Efficiency:</span>
                    <span className={`value ${project.timeSpent <= project.timeEstimated ? "positive" : "negative"}`}>
                      {project.timeSpent <= project.timeEstimated
                        ? `${Math.round(
                            ((project.timeEstimated - project.timeSpent) / project.timeEstimated) * 100,
                          )}% under estimated time`
                        : `${Math.round(
                            ((project.timeSpent - project.timeEstimated) / project.timeEstimated) * 100,
                          )}% over estimated time`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personal Performance Tab */}
        {activeTab === "personal" && (
          <div className="personal-analytics">
            <div className="section-title">
              <h2>Personal Performance Metrics</h2>
              <p>Your task completion rates and token earnings</p>
            </div>

            <div className="analytics-cards-grid">
              <div className="analytics-card">
                <div className="card-header">
                  <h3>Task Completion</h3>
                </div>
                <div className="card-content">
                  <div className="completion-chart">
                    <div className="chart-circle">
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path
                          className="circle-bg"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="circle"
                          strokeDasharray={`${userAnalytics.completionRate}, 100`}
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" className="percentage">
                          {userAnalytics.completionRate.toFixed(0)}%
                        </text>
                      </svg>
                    </div>
                    <div className="chart-details">
                      <div className="detail-item">
                        <span className="label">Completed:</span>
                        <span className="value">{userAnalytics.tasksCompleted} tasks</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Assigned:</span>
                        <span className="value">{userAnalytics.totalTasksAssigned} tasks</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="analytics-card">
                <div className="card-header">
                  <h3>Timeliness</h3>
                </div>
                <div className="card-content">
                  <div className="timeliness-chart">
                    <div className="chart-bars">
                      <div className="bar-group">
                        <div
                          className="bar on-time"
                          style={{
                            height: `${(userAnalytics.onTimeCompletion / userAnalytics.tasksCompleted) * 100}%`,
                          }}
                        ></div>
                        <span className="bar-label">On Time</span>
                        <span className="bar-value">{userAnalytics.onTimeCompletion}</span>
                      </div>
                      <div className="bar-group">
                        <div
                          className="bar late"
                          style={{ height: `${(userAnalytics.lateCompletion / userAnalytics.tasksCompleted) * 100}%` }}
                        ></div>
                        <span className="bar-label">Late</span>
                        <span className="bar-value">{userAnalytics.lateCompletion}</span>
                      </div>
                    </div>
                    <div className="chart-details">
                      <div className="detail-item">
                        <span className="label">On-time rate:</span>
                        <span className="value">
                          {((userAnalytics.onTimeCompletion / userAnalytics.tasksCompleted) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="analytics-card">
                <div className="card-header">
                  <h3>Token Earnings</h3>
                </div>
                <div className="card-content">
                  <div className="tokens-summary">
                    <div className="token-balance">
                      
                      <span className="token-amount">
                      <DollarSign />  {userAnalytics.tokensEarned - userAnalytics.penaltiesIncurred}
                      </span>
                    </div>
                    <div className="token-details">
                      <div className="detail-item">
                        <span className="label">Earned:</span>
                        <span className="value positive">+{userAnalytics.tokensEarned}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Penalties:</span>
                        <span className="value negative">-{userAnalytics.penaltiesIncurred}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Historical Data Tab */}
        {activeTab === "history" && (
          <div className="historical-analytics">
            <div className="section-title">
              <h2>Historical Performance Data</h2>
              <p>Your all-time statistics and project history</p>
            </div>

            <div className="history-stats-grid">
              <div className="stat-card">
                
                <div className="stat-content">
                  <h3 className="stat-value">{historicalData.totalProjects}</h3>
                  <p className="stat-label">Total Projects</p>
                </div>
              </div>

              <div className="stat-card">
                
                <div className="stat-content">
                  <h3 className="stat-value">{historicalData.completedProjects}</h3>
                  <p className="stat-label">Completed Projects</p>
                </div>
              </div>

              <div className="stat-card">
                
                <div className="stat-content">
                  <h3 className="stat-value">{historicalData.averageProjectTime} days</h3>
                  <p className="stat-label">Avg. Project Time</p>
                </div>
              </div>

              <div className="stat-card">
             
                <div className="stat-content">
                  <h3 className="stat-value">{historicalData.criticalPathAccuracy}%</h3>
                  <p className="stat-label">Critical Path Accuracy</p>
                </div>
              </div>

              <div className="stat-card">
                
                <div className="stat-content">
                  <h3 className="stat-value">{historicalData.allTimeTokens}</h3>
                  <p className="stat-label">All-Time Tokens</p>
                </div>
              </div>
            </div>

            <div className="completion-trend">
              <h3>Project Completion Trend</h3>
              <div className="trend-chart">
                <div className="chart-placeholder">
                  <p>Chart visualization would be displayed here</p>
                  <p className="chart-note">
                    This would show your project completion rates over time, highlighting trends in your productivity
                    and efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Analytics
