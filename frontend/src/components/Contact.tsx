import { useState } from 'react'
import '../styles/Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here we would typically handle form submission
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <span>📍</span>
                </div>
                <p>123 Business Street, Suite 100</p>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <span>📧</span>
                </div>
                <p>contact@example.com</p>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <span>📱</span>
                </div>
                <p>+1 234 567 890</p>
              </div>
            </div>
          </div>

        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Message subject"
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message"
                  rows={4}
                />
              </div>
            </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
