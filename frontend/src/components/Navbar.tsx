import { useState } from 'react'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    event?.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 60 // matches --navbar-height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      })
      setIsOpen(false)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="#" className="navbar-logo" onClick={(e) => {
          e.preventDefault()
          scrollToSection('hero')
        }}>
          Fancy Site
        </a>
        <button 
          className={`navbar-burger ${isOpen ? 'is-active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
        <div className="navbar-end">
          <a href="#hero" className="navbar-item" onClick={(e) => {
            e.preventDefault()
            scrollToSection('hero')
          }}>Home</a>
          <a href="#features" className="navbar-item" onClick={(e) => {
            e.preventDefault()
            scrollToSection('features')
          }}>Features</a>
          <a href="#reviews" className="navbar-item" onClick={(e) => {
            e.preventDefault()
            scrollToSection('reviews')
          }}>Reviews</a>
          <a href="#contact" className="navbar-item" onClick={(e) => {
            e.preventDefault()
            scrollToSection('contact')
          }}>Contact</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
