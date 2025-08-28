import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import TaskCard from './TaskCard'

const TaskGrid = ({ tasks, onToggleComplete, onDeleteTask }) => {
  const gridRef = useRef(null)

  useEffect(() => {
    // Animate grid entrance
    if (tasks.length > 0) {
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 30, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.8
        }
      )
    }
  }, [tasks.length])

  if (tasks.length === 0) {
    return (
      <main className="tasks-grid">
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <div className="empty-text">No tasks found for the current filter.</div>
        </div>
      </main>
    )
  }

  return (
    <main className="tasks-grid" ref={gridRef}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </main>
  )
}

export default TaskGrid
