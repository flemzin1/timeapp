// criticalPathAnalysis.ts
export interface Task {
  id: string
  name: string
  assignedTo: string
  dependencies: string[]
  estimatedDuration: number
}

export interface CPATask extends Task {
  earliestStart: number
  earliestFinish: number
  latestStart: number
  latestFinish: number
  totalSlack: number
  isCritical: boolean
}

export interface CriticalPathResult {
  tasks: CPATask[]
  criticalPath: string[]
  projectDuration: number
  criticalTasks: CPATask[]
}

export class CriticalPathAnalyzer {
  private tasks: Task[]
  private taskMap: Map<string, CPATask>

  constructor(tasks: Task[]) {
    this.tasks = tasks
    this.taskMap = new Map()
  }

  public analyze(): CriticalPathResult {
    // Initialize CPA tasks
    this.initializeTasks()
    
    // Perform forward pass (calculate earliest start/finish)
    this.forwardPass()
    
    // Perform backward pass (calculate latest start/finish)
    this.backwardPass()
    
    // Calculate slack and identify critical tasks
    this.calculateSlackAndCriticalPath()
    
    // Build critical path
    const criticalPath = this.buildCriticalPath()
    const criticalTasks = Array.from(this.taskMap.values()).filter(task => task.isCritical)
    const projectDuration = Math.max(...Array.from(this.taskMap.values()).map(task => task.earliestFinish))

    return {
      tasks: Array.from(this.taskMap.values()),
      criticalPath,
      projectDuration,
      criticalTasks
    }
  }

  private initializeTasks(): void {
    this.tasks.forEach(task => {
      const cpaTask: CPATask = {
        ...task,
        earliestStart: 0,
        earliestFinish: 0,
        latestStart: 0,
        latestFinish: 0,
        totalSlack: 0,
        isCritical: false
      }
      this.taskMap.set(task.id, cpaTask)
    })
  }

  private forwardPass(): void {
    const visited = new Set<string>()
    const visiting = new Set<string>()

    const visit = (taskId: string): number => {
      if (visiting.has(taskId)) {
        throw new Error(`Circular dependency detected involving task: ${taskId}`)
      }
      
      if (visited.has(taskId)) {
        return this.taskMap.get(taskId)!.earliestFinish
      }

      visiting.add(taskId)
      const task = this.taskMap.get(taskId)!

      if (task.dependencies.length === 0) {
        task.earliestStart = 0
      } else {
        const maxFinish = Math.max(
          ...task.dependencies.map(depId => visit(depId))
        )
        task.earliestStart = maxFinish
      }

      task.earliestFinish = task.earliestStart + task.estimatedDuration
      visiting.delete(taskId)
      visited.add(taskId)

      return task.earliestFinish
    }

    this.tasks.forEach(task => visit(task.id))
  }

  private backwardPass(): void {
    const projectDuration = Math.max(
      ...Array.from(this.taskMap.values()).map(task => task.earliestFinish)
    )

    // Initialize latest finish for tasks with no successors
    Array.from(this.taskMap.values()).forEach(task => {
      const successors = this.getSuccessors(task.id)
      if (successors.length === 0) {
        task.latestFinish = projectDuration
      }
    })

    const visited = new Set<string>()
    const visiting = new Set<string>()

    const visit = (taskId: string): number => {
      if (visiting.has(taskId)) {
        throw new Error(`Circular dependency detected in backward pass: ${taskId}`)
      }

      if (visited.has(taskId)) {
        return this.taskMap.get(taskId)!.latestStart
      }

      visiting.add(taskId)
      const task = this.taskMap.get(taskId)!
      const successors = this.getSuccessors(taskId)

      if (successors.length === 0) {
        task.latestFinish = projectDuration
      } else {
        const minStart = Math.min(
          ...successors.map(successorId => visit(successorId))
        )
        task.latestFinish = minStart
      }

      task.latestStart = task.latestFinish - task.estimatedDuration
      visiting.delete(taskId)
      visited.add(taskId)

      return task.latestStart
    }

    // Process tasks in reverse topological order
    const endTasks = Array.from(this.taskMap.values())
      .filter(task => this.getSuccessors(task.id).length === 0)
    
    endTasks.forEach(task => visit(task.id))
    
    // Visit remaining tasks
    Array.from(this.taskMap.keys()).forEach(taskId => {
      if (!visited.has(taskId)) {
        visit(taskId)
      }
    })
  }

  private getSuccessors(taskId: string): string[] {
    return Array.from(this.taskMap.values())
      .filter(task => task.dependencies.includes(taskId))
      .map(task => task.id)
  }

  private calculateSlackAndCriticalPath(): void {
    this.taskMap.forEach(task => {
      task.totalSlack = task.latestStart - task.earliestStart
      task.isCritical = task.totalSlack === 0
    })
  }

  private buildCriticalPath(): string[] {
    const criticalTasks = Array.from(this.taskMap.values())
      .filter(task => task.isCritical)
      .sort((a, b) => a.earliestStart - b.earliestStart)

    return criticalTasks.map(task => task.id)
  }

  public getTaskSchedule(startDate: string): Array<CPATask & { startDate: string; endDate: string }> {
    const baseDate = new Date(startDate)
    
    return Array.from(this.taskMap.values()).map(task => {
      const taskStartDate = new Date(baseDate)
      taskStartDate.setDate(baseDate.getDate() + task.earliestStart)
      
      const taskEndDate = new Date(taskStartDate)
      taskEndDate.setDate(taskStartDate.getDate() + task.estimatedDuration - 1)

      return {
        ...task,
        startDate: taskStartDate.toISOString().split('T')[0],
        endDate: taskEndDate.toISOString().split('T')[0]
      }
    })
  }

  public validateTasks(): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Check for invalid dependencies
    this.tasks.forEach(task => {
      task.dependencies.forEach(depId => {
        if (!this.taskMap.has(depId)) {
          errors.push(`Task "${task.name}" has invalid dependency: ${depId}`)
        }
      })
    })

    // Check for self-dependencies
    this.tasks.forEach(task => {
      if (task.dependencies.includes(task.id)) {
        errors.push(`Task "${task.name}" cannot depend on itself`)
      }
    })

    // Check for circular dependencies
    try {
      this.forwardPass()
    } catch (error) {
      if (error instanceof Error && error.message.includes('Circular dependency')) {
        errors.push(error.message)
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}