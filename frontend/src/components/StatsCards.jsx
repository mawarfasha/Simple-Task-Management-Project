import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const StatsCards = ({ stats }) => {
  const cardsRef = useRef([])

  useEffect(() => {
    // Reset refs
    cardsRef.current = cardsRef.current.slice(0, 4)
    
    // Premium entrance animation with Nike-style timing
    gsap.fromTo(cardsRef.current,
      { 
        opacity: 0, 
        y: 80, 
        scale: 0.8,
        rotationX: -15
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotationX: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.3
      }
    )

    // Add premium hover animations
    cardsRef.current.forEach(card => {
      if (card) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -16,
            scale: 1.02,
            duration: 0.4,
            ease: "power3.out"
          })
        })
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power3.out"
          })
        })
      }
    })
  }, [])

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  return (
    <section className="stats">
      <div className="stat-card" ref={addToRefs}>
        <span className="stat-number">{stats.total}</span>
        <div className="stat-label">Total Tasks</div>
      </div>
      <div className="stat-card" ref={addToRefs}>
        <span className="stat-number">{stats.completed}</span>
        <div className="stat-label">Completed</div>
      </div>
      <div className="stat-card" ref={addToRefs}>
        <span className="stat-number">{stats.pending}</span>
        <div className="stat-label">In Progress</div>
      </div>
      <div className="stat-card" ref={addToRefs}>
        <span className="stat-number">{stats.completionRate}%</span>
        <div className="stat-label">Success Rate</div>
      </div>
    </section>
  )
}

export default StatsCards
