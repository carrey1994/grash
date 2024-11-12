import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="reviews">
          <Reviews />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
    </div>
  )
}

export default App
