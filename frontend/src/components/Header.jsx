import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const Header = () => {
  const headerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const decorRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    // Set initial states
    gsap.set([titleRef.current, subtitleRef.current], { 
      opacity: 0, 
      y: 60 
    })
    
    // Create premium entrance animation
    tl.to(headerRef.current, {
      background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #333333 100%)",
      duration: 0.1
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power4.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.8")

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      if (headerRef.current) {
        headerRef.current.style.transform = `translateY(${rate}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <h1 ref={titleRef}>TaskFlow</h1>
        <p ref={subtitleRef}>
          Unleash your productivity. Built for focus, designed for all.        
        </p>
      </div>
    </header>
  )
}

export default Header
