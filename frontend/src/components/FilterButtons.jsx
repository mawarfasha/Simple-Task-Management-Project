import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const FilterButtons = ({ currentFilter, onFilterChange }) => {
  const buttonsRef = useRef([])

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
    { key: 'high', label: 'High Priority' },
    { key: 'overdue', label: 'Overdue' }
  ]

  useEffect(() => {
    gsap.fromTo(buttonsRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.6
      }
    )
  }, [])

  const addToRefs = (el) => {
    if (el && !buttonsRef.current.includes(el)) {
      buttonsRef.current.push(el)
    }
  }

  const handleFilterClick = (filter) => {
    onFilterChange(filter)
    
    // Animation feedback
    const button = buttonsRef.current.find(btn => 
      btn.getAttribute('data-filter') === filter
    )
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      })
    }
  }

  return (
    <section className="filter-section">
      {filters.map((filter) => (
        <button
          key={filter.key}
          ref={addToRefs}
          className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
          data-filter={filter.key}
          onClick={() => handleFilterClick(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </section>
  )
}

export default FilterButtons
