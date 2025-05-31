// CriticalPathDisplay.tsx
import React from 'react'
import type { CPATask, CriticalPathResult } from './criticalPathAnalysis'
import './CriticalPathDisplay.css'

interface CriticalPathDisplayProps {
  result: CriticalPathResult | null
  startDate: string
  isGenerating: boolean
  onGenerate: () => void
  canGenerate: boolean
}

const CriticalPathDisplay: React.FC<CriticalPathDisplayProps> = ({
  result,
  startDate,
  isGenerating,
  onGenerate,
  canGenerate
}) => {
  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString()
  }

  const getStatusColor = (task: CPATask): string => {
    if (task.isCritical) return '#ef4444' // red
    if (task.totalSlack <= 2) return '#f59e0b' // amber
    return '#10b981' // green
  }

  const getStatusText = (task: CPATask): string => {
    if (task.isCritical) return 'CRITICAL'
    if (task.totalSlack <= 2) return 'HIGH RISK'
    return 'Normal'
  }

  return (
    <div className="critical-path-analysis">
      <div className="cpa-header">
        <h3>Critical Path Analysis</h3>
        <button
          onClick={onGenerate}
          disabled={isGenerating || !canGenerate}
          className={`generate-btn ${isGenerating ? 'generating' : ''}`}
        >
          {isGenerating ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            'Generate Critical Path'
          )}
        </button>
      </div>

      {result && (
        <div className="cpa-results">
          {/* Critical Path Summary */}
          <div className="critical-path-summary">
            <div className="summary-card critical">
              <div className="summary-content">
                <h4>Critical Path</h4>
                <div className="critical-tasks-list">
                  {result.criticalTasks.map((task, index) => (
                    <span key={task.id} className="critical-task-name">
                      {task.name}
                      {index < result.criticalTasks.length - 1 && ' → '}
                    </span>
                  ))}
                </div>
                <p className="critical-tasks-note">
                  Critical Tasks: {result.criticalTasks.map(t => t.name).join(', ')}
                </p>
              </div>
            </div>

            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-label">Project Duration</span>
                <span className="stat-value">{result.projectDuration} days</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Critical Tasks</span>
                <span className="stat-value">{result.criticalTasks.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Tasks</span>
                <span className="stat-value">{result.tasks.length}</span>
              </div>
            </div>
          </div>


          {/* Detailed Task Schedule */}
          <div className="task-schedule">
            <h4>📋 Detailed Task Schedule</h4>
            <div className="schedule-table">
              <div className="table-header">
                <div className="col-task-id">Task ID</div>
                <div className="col-task-name">Task Name</div>
                <div className="col-duration">Duration</div>
                <div className="col-start">Start Date</div>
                <div className="col-end">End Date</div>
                <div className="col-slack">Total Slack</div>
                <div className="col-status">Status</div>
              </div>
              
              {result.tasks
                .sort((a, b) => a.earliestStart - b.earliestStart)
                .map((task) => {
                  const baseDate = new Date(startDate)
                  const taskStartDate = new Date(baseDate)
                  taskStartDate.setDate(baseDate.getDate() + task.earliestStart)
                  
                  const taskEndDate = new Date(taskStartDate)
                  taskEndDate.setDate(taskStartDate.getDate() + task.estimatedDuration - 1)

                  return (
                    <div 
                      key={task.id} 
                      className={`table-row ${task.isCritical ? 'critical-row' : ''}`}
                    >
                      <div className="col-task-id">
                        <span className="task-id-badge">{task.name.substring(0, 8)}</span>
                      </div>
                      <div className="col-task-name">{task.name}</div>
                      <div className="col-duration">{task.estimatedDuration} days</div>
                      <div className="col-start">{formatDate(taskStartDate.toISOString())}</div>
                      <div className="col-end">{formatDate(taskEndDate.toISOString())}</div>
                      <div className="col-slack">
                        <span className={`slack-badge ${task.totalSlack === 0 ? 'zero-slack' : ''}`}>
                          {task.totalSlack} days
                        </span>
                      </div>
                      <div className="col-status">
                        <span 
                          className="status-badge" 
                          style={{ 
                            backgroundColor: getStatusColor(task),
                            color: 'white'
                          }}
                        >
                          {task.isCritical && '🔴'} {getStatusText(task)}
                        </span>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="risk-assessment">
            <h4>⚠️ Risk Assessment</h4>
            <div className="risk-items">
              {result.criticalTasks.length > 0 && (
                <div className="risk-item high-risk">
                  <div className="risk-icon">🚨</div>
                  <div className="risk-content">
                    <h5>Critical Path Risk</h5>
                    <p>
                      {result.criticalTasks.length} task(s) are on the critical path. 
                      Any delay in these tasks will delay the entire project.
                    </p>
                  </div>
                </div>
              )}
              
              {result.tasks.filter(t => t.totalSlack > 0 && t.totalSlack <= 2).length > 0 && (
                <div className="risk-item medium-risk">
                  <div className="risk-icon">⚠️</div>
                  <div className="risk-content">
                    <h5>Low Slack Tasks</h5>
                    <p>
                      {result.tasks.filter(t => t.totalSlack > 0 && t.totalSlack <= 2).length} task(s) 
                      have minimal slack time. Monitor these closely.
                    </p>
                  </div>
                </div>
              )}

              {result.tasks.filter(t => t.totalSlack > 2).length > 0 && (
                <div className="risk-item low-risk">
                  <div className="risk-icon">✅</div>
                  <div className="risk-content">
                    <h5>Flexible Tasks</h5>
                    <p>
                      {result.tasks.filter(t => t.totalSlack > 2).length} task(s) 
                      have good buffer time and can absorb delays.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {!result && !isGenerating && (
        <div className="cpa-placeholder">
          <div className="placeholder-icon">📊</div>
          <h4>Ready for Analysis</h4>
          <p>Add tasks with dependencies and click "Generate Critical Path" to see the analysis.</p>
        </div>
      )}
    </div>
  )
}

export default CriticalPathDisplay