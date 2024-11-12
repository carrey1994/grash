import '../styles/Features.css'

const Features = () => {
  const features = [
    {
      title: 'Modern Design',
      description: 'Clean and contemporary interface that puts user experience first',
      icon: '🎨'
    },
    {
      title: 'Responsive',
      description: 'Perfectly adapted to work on any device, from mobile to desktop',
      icon: '📱'
    },
    {
      title: 'Fast Performance',
      description: 'Optimized for speed to ensure the best possible user experience',
      icon: '⚡'
    },
    {
      title: 'Secure',
      description: 'Built with security in mind to protect your data',
      icon: '🔒'
    }
  ]

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features-header">
          <h2>Why Choose Us</h2>
          <p>Discover what makes our platform stand out from the rest. Experience the difference with our cutting-edge features.</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
            >
              <div className="feature-icon-wrapper">
                <span className="feature-icon">{feature.icon}</span>
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
