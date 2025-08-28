import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Header from './components/Header'
import StatsCards from './components/StatsCards'
import TaskForm from './components/TaskForm'
import FilterButtons from './components/FilterButtons'
import TaskGrid from './components/TaskGrid'
import { useTaskManager } from './hooks/useTaskManager'

function App() {
  const {
    tasks,
    currentFilter,
    addTask,
    toggleComplete,
    deleteTask,
    setFilter,
    getFilteredTasks,
    getStats
  } = useTaskManager()

  const appRef = useRef(null)

  useEffect(() => {
    // GSAP initial animation
    gsap.fromTo(appRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
  }, [])

  return (
    <div className="container" ref={appRef}>
      <Header />
      <StatsCards stats={getStats()} />
      <TaskForm onAddTask={addTask} />
      <FilterButtons 
        currentFilter={currentFilter} 
        onFilterChange={setFilter} 
      />
      <TaskGrid
        tasks={getFilteredTasks()}
        onToggleComplete={toggleComplete}
        onDeleteTask={deleteTask}
      />
    </div>
  )
}

export default App
