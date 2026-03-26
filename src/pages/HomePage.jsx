import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'

export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">AI-powered waste education</p>
          <h1>Identify waste faster and dispose of it with confidence.</h1>
          <p className="hero-text">
            EcoSort AI helps people understand what kind of waste they are holding,
            how to dispose of it properly, and why that choice matters for the
            planet.
          </p>
          <div className="hero-actions">
            <Link to="/upload" className="button button-primary">
              Try AI Scanner
            </Link>
            <Link to="/sdg" className="button button-secondary">
              Explore SDG 12
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="metric-card">
            <strong>3-step flow</strong>
            <span>Upload, analyze, act responsibly</span>
          </div>
          <div className="metric-grid">
            <article>
              <strong>Type</strong>
              <p>Plastic, organic, metal, and more</p>
            </article>
            <article>
              <strong>Action</strong>
              <p>Clear disposal guidance for each item</p>
            </article>
            <article>
              <strong>Impact</strong>
              <p>Simple environmental awareness at a glance</p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="glass-card">
          <SectionTitle
            eyebrow="What is this?"
            title="A simple AI assistant for responsible waste sorting"
            text="Many people want to do the right thing but do not know which bin, process, or disposal path is correct. EcoSort AI closes that knowledge gap with image-based guidance."
          />
        </div>

        <div className="sdg-highlight">
          <p className="eyebrow">SDG highlight</p>
          <h3>Built around Sustainable Development Goal 12</h3>
          <p>
            SDG 12 focuses on responsible consumption and production. Better waste
            sorting reduces contamination, lowers pollution, and supports circular
            systems.
          </p>
          <Link to="/sdg" className="text-link">
            Learn why waste matters
          </Link>
        </div>
      </section>

      <section className="feature-strip">
        <SectionTitle
          eyebrow="Why EcoSort"
          title="Waste decisions become climate decisions"
          text="Incorrect disposal sends recyclable materials to landfill, increases toxic leakage, and creates avoidable emissions. A fast classification tool helps people act earlier and better."
        />
        <div className="feature-cards">
          <article className="glass-card">
            <strong>Identify waste type</strong>
            <p>Get a clear label for the item you upload.</p>
          </article>
          <article className="glass-card">
            <strong>Follow the right method</strong>
            <p>See disposal instructions in simple language.</p>
          </article>
          <article className="glass-card">
            <strong>Understand environmental impact</strong>
            <p>Learn the consequence behind each disposal choice.</p>
          </article>
        </div>
      </section>
    </div>
  )
}
