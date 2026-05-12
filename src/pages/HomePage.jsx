import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'

export default function HomePage() {
  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
        <span className="availability-badge"><span className="dot"></span> available for work</span>
        <h1 className="hero-title">
          EcoSort AI <strong>crafting a greener</strong> online presence
        </h1>
        <p className="hero-subtitle">
          Beautifully designed, easy-to-use tools that help you understand and sort waste with confidence.
        </p>
        <div className="hero-cta-group">
          <Link to="/upload" className="btn-dark">Scan Waste</Link>
          <Link to="/sdg" className="btn-light">Explore SDG</Link>
        </div>
      </section>

      <section className="portfolio-gallery">
        <div className="gallery-track">
          <div className="gallery-item small"><img src="/q4_decomposition_1778561031445.png" alt="waste" /></div>
          <div className="gallery-item medium"><img src="/q1_sdg12_1778560909823.png" alt="SDG" /></div>
          <div className="gallery-item large main-image"><img src="/q2_plastic_rate_1778560964687.png" alt="Plastic" /></div>
          <div className="gallery-item medium"><img src="/q5_compost_1778561485563.png" alt="Compost" /></div>
          <div className="gallery-item small"><img src="/q3_battery_bin_1778561000495.png" alt="Battery" /></div>
        </div>
      </section>

      <section className="portfolio-about-stats">
        <div className="bio-card">
          <h2>I'm EcoSort</h2>
          <p>
            An AI guide with a passion for environmental impact. I create intuitive, fast experiences that help households and businesses sort waste correctly. 
            With a focus on SDG 12, I strike the optimal balance of machine learning and user-friendly design to ensure every item finds the right bin.
          </p>
          <div className="bio-avatar">
            <Link to="/upload" className="btn-full-width">Try Scanner</Link>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-top"><h3>10+</h3><span>Categories</span></div>
            <p>From plastics to organic compost, I can identify the most common household waste.</p>
          </div>
          <div className="stat-box">
            <div className="stat-top"><h3>95%</h3><span>Accuracy</span></div>
            <p>High success rate in directing waste to correct recycling or disposal streams.</p>
          </div>
          <div className="stat-box">
            <div className="stat-top"><h3>SDG 12</h3><span>Aligned</span></div>
            <p>Directly supporting global goals for responsible consumption and production.</p>
          </div>
          <div className="stat-box">
            <div className="stat-top"><h3>100%</h3><span>Free</span></div>
            <p>Accessible tools for everyone to make better environmental choices daily.</p>
          </div>
        </div>
      </section>

      <section className="portfolio-projects">
        <div className="projects-header">
          <span className="section-tag">Interactive Features</span>
          <h2>Ways to engage with EcoSort</h2>
        </div>
        
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-img-wrapper"><img src="/q2_plastic_rate_1778560964687.png" alt="Game"/></div>
            <div className="project-info">
              <span className="status-tag">Fun & Fast</span>
              <h3>Sorting Game</h3>
              <p>Race against the clock</p>
              <Link to="/game" className="stretched-link"></Link>
            </div>
          </div>
          <div className="project-card">
            <div className="project-img-wrapper"><img src="/q1_sdg12_1778560909823.png" alt="Quiz"/></div>
            <div className="project-info">
              <span className="status-tag">Educational</span>
              <h3>Eco Quiz</h3>
              <p>Test your sustainability knowledge</p>
              <Link to="/quiz" className="stretched-link"></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
