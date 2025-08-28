import React, { useRef } from 'react'
import { gsap } from 'gsap'

const TaskCard = ({ task, onToggleComplete, onDeleteTask }) => {
  const cardRef = useRef(null)

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
  const dueDateFormatted = task.dueDate 
    ? new Date(task.dueDate).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }) 
    : 'No due date'

  const handleComplete = () => {
    // Animation before completing
    gsap.to(cardRef.current, {
      scale: 0.98,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        onToggleComplete(task.id)
        gsap.to(cardRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power2.inOut"
        })
      }
    })
  }

  const handleDelete = () => {
    // Slide out animation before deletion
    gsap.to(cardRef.current, {
      x: "100%",
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        onDeleteTask(task.id)
      }
    })
  }

  return (
    <article 
      className={`task-card ${task.completed ? 'completed' : ''} fade-in`}
      ref={cardRef}
      data-task-id={task.id}
    >
      <header className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-meta">
          <span className={`priority-badge priority-${task.priority}`}>
            {task.priority}
          </span>
          <span 
            className="task-date" 
            style={isOverdue ? { color: 'var(--error-red)', fontWeight: '600' } : {}}
          >
            {isOverdue ? 'Overdue • ' : ''}{dueDateFormatted}
          </span>
        </div>
      </header>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <footer className="task-actions">
        <button 
          className="task-btn complete-btn" 
          onClick={handleComplete}
        >
          {task.completed ? 'Reopen' : 'Complete'}
        </button>
        <button 
          className="task-btn delete-btn" 
          onClick={handleDelete}
        >
          Delete
        </button>
      </footer>
    </article>
  )
}

export default TaskCard
