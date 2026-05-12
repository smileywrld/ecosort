import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'

const quickActions = [
  {
    title: 'Smart Detection',
    text: 'Scan a waste item and get a clear category before you dispose of it.',
  },
  {
    title: 'Home Guidance',
    text: 'Understand the right bin, drop-off path, or safer alternative in seconds.',
  },
  {
    title: 'Eco Habits',
    text: 'Learn small changes that reduce contamination and improve recycling rates.',
  },
  {
    title: 'SDG 12 Focus',
    text: 'Connect everyday sorting choices with responsible consumption goals.',
  },
]

const spotlightCards = [
  {
    tone: 'sage',
    eyebrow: 'Quick start',
    title: 'Scan & Sort',
    text: 'Upload a photo and move from confusion to action in one flow.',
    to: '/upload',
  },
  {
    tone: 'clay',
    eyebrow: 'Play & Learn',
    title: '🎮 Sorting Game',
    text: 'Race against the clock to sort waste into the right bins. Build streaks!',
    to: '/game',
  },
  {
    tone: 'sand',
    eyebrow: 'Challenge',
    title: '📝 Eco Quiz',
    text: 'Test your recycling and sustainability knowledge with 10 questions.',
    to: '/quiz',
  },
  {
    tone: 'forest',
    eyebrow: 'Context',
    title: 'Explore SDG 12',
    text: 'See how better household waste choices support global sustainability.',
    to: '/sdg',
  },
]

export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-card hero-card-eco">
        <div className="hero-copy">
          <p className="eyebrow">Nature-inspired waste guidance</p>
          <h1>Sort waste with more calm, clarity, and confidence.</h1>
          <p className="hero-text">
            EcoSort AI brings a softer, simpler path to responsible disposal. Scan
            an item, understand what it is, and choose the next step with less
            guesswork.
          </p>
          <div className="hero-actions">
            <Link to="/upload" className="button button-primary">
              Open Scanner
            </Link>
            <Link to="/sdg" className="button button-secondary">
              Why It Matters
            </Link>
          </div>
        </div>

        <div className="hero-botanical" aria-hidden="true">
          <span className="leaf leaf-large" />
          <span className="leaf leaf-medium" />
          <span className="leaf leaf-small" />
          <span className="leaf leaf-tall" />
          <span className="leaf leaf-mini" />
        </div>
      </section>

      <section className="feature-ribbon">
        {quickActions.map((item) => (
          <article className="ribbon-card" key={item.title}>
            <div className="ribbon-icon" />
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="content-grid content-grid-balanced">
        <div className="glass-card textured-card">
          <SectionTitle
            eyebrow="What EcoSort does"
            title="A practical guide for people who want to dispose of waste better"
            text="The app is built for quick household decisions. Instead of abstract recycling advice, you get a direct explanation of what the item is, what to do with it, and why that choice matters."
          />
        </div>

        <div className="sdg-highlight warm-panel">
          <p className="eyebrow">Waste to impact</p>
          <h3>Better sorting supports cleaner systems</h3>
          <p>
            Correct separation protects recycling streams, reduces contamination,
            and helps communities recover more materials instead of sending them to
            landfill.
          </p>
          <Link to="/sdg" className="text-link">
            Explore the SDG connection
          </Link>
        </div>
      </section>

      <section className="feature-strip">
        <SectionTitle
          eyebrow="Explore"
          title="Four ways to explore the experience"
          text="Scan waste, play the sorting game, test your knowledge with the quiz, or learn about SDG 12."
        />
        <div className="spotlight-grid">
          {spotlightCards.map((card) => (
            <article className={`spotlight-card ${card.tone}`} key={card.title}>
              <span>{card.eyebrow}</span>
              <strong>{card.title}</strong>
              <p>{card.text}</p>
              <Link to={card.to} className="text-link">
                Open page
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
