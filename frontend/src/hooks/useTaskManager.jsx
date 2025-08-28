import { useState, useEffect } from 'react'

export const useTaskManager = () => {
  const [tasks, setTasks] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all')

  // Load initial tasks
  useEffect(() => {
    const initialTasks = [
      {
        id: 1,
        title: "Welcome to TaskFlow",
        description: "This is your first task. TaskFlow helps you stay organized and focused on what matters most.",
        priority: "medium",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: "Review quarterly goals",
        description: "Take time to reflect on progress and adjust objectives for the upcoming quarter.",
        priority: "high",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        createdAt: new Date().toISOString()
      }
    ]
    setTasks(initialTasks)
  }, [])

  const addTask = (task) => {
    setTasks(prevTasks => [task, ...prevTasks])
    showNotification('Task created successfully')
  }

  const toggleComplete = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { 
              ...task, 
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : null
            }
          : task
      )
    )
    
    const task = tasks.find(t => t.id === id)
    const message = task?.completed ? 'Task reopened' : 'Task completed'
    showNotification(message)
  }

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
    showNotification('Task deleted')
  }

  const setFilter = (filter) => {
    setCurrentFilter(filter)
  }

  const getFilteredTasks = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    switch (currentFilter) {
      case 'pending':
        return tasks.filter(t => !t.completed)
      case 'completed':
        return tasks.filter(t => t.completed)
      case 'high':
        return tasks.filter(t => t.priority === 'high')
      case 'overdue':
        return tasks.filter(t => {
          if (!t.dueDate || t.completed) return false
          const dueDate = new Date(t.dueDate)
          return dueDate < today
        })
      default:
        return tasks
    }
  }

  const getStats = () => {
    const total = tasks.length
    const completed = tasks.filter(t => t.completed).length
    const pending = total - completed
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    return {
      total,
      completed,
      pending,
      completionRate
    }
  }

  const showNotification = (message) => {
    // Remove existing notifications
    const existing = document.querySelector('.notification')
    if (existing) {
      existing.remove()
    }

    const notification = document.createElement('div')
    notification.className = 'notification'
    notification.textContent = message
    document.body.appendChild(notification)

    // Trigger show animation
    setTimeout(() => notification.classList.add('show'), 100)
    
    // Auto hide
    setTimeout(() => {
      notification.classList.remove('show')
      setTimeout(() => notification.remove(), 400)
    }, 3000)
  }

  return {
    tasks,
    currentFilter,
    addTask,
    toggleComplete,
    deleteTask,
    setFilter,
    getFilteredTasks,
    getStats
  }
}
