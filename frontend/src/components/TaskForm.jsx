import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const TaskForm = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  })

  const formRef = useRef(null)

  useEffect(() => {
    // Premium entrance animation
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 1.2, 
        ease: "power4.out", 
        delay: 0.6 
      }
    )

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0]
    const dateInput = document.getElementById('taskDueDate')
    if (dateInput) {
      dateInput.setAttribute('min', today)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    const task = {
      id: Date.now(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate,
      completed: false,
      createdAt: new Date().toISOString()
    }

    onAddTask(task)
    
    // Reset form with animation
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    })

    // Button animation feedback
    const submitBtn = e.target.querySelector('button[type="submit"]')
    gsap.timeline()
      .to(submitBtn, {
        scale: 0.92,
        duration: 0.1,
        ease: "power2.inOut"
      })
      .to(submitBtn, {
        scale: 1.05,
        duration: 0.2,
        ease: "back.out(1.7)"
      })
      .to(submitBtn, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="input-section" ref={formRef}>
      <h2 className="form-title">Create Your Next Victory</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="taskTitle">Task Title</label>
            <input
              type="text"
              id="taskTitle"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What would you like to accomplish?"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="taskPriority">Priority Level</label>
            <select
              id="taskPriority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="taskDueDate">Due Date</label>
            <input
              type="date"
              id="taskDueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="taskDescription">Description</label>
          <textarea
            id="taskDescription"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add more details about this task (optional)"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Add Task
          </button>
        </div>
      </form>
    </section>
  )
}

export default TaskForm
