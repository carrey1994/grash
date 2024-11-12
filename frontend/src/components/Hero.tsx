import '../styles/Hero.css'

const Hero = () => {
  const scrollToReviews = (event: React.MouseEvent) => {
    event.preventDefault()
    const element = document.getElementById('reviews')
    if (element) {
      const navbarHeight = 60
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Discover Honest Reviews</h1>
          <p className="hero-subtitle">
            Explore authentic reviews and experiences shared by our community. 
            Make informed decisions with real insights from real people.
          </p>
          <div className="hero-buttons">
            <button className="hero-button primary" onClick={scrollToReviews}>
              Read Reviews
            </button>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-shape"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
