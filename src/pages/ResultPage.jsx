import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'

export default function ResultPage({ analysis }) {
  const scoreRotation = Math.round((analysis.impactScore / 100) * 180)

  return (
    <div className="page-stack">
      <section className="result-layout">
        <div className="glass-card">
          <SectionTitle
            eyebrow="Result"
            title="Your waste analysis"
            text="EcoSort AI translates the uploaded item into a practical disposal path with an environmental context."
          />

          <div className="result-grid">
            <article className="result-item">
              <span>Waste Type</span>
              <strong>{analysis.wasteType}</strong>
              <p>{analysis.category}</p>
            </article>
            <article className="result-item">
              <span>Disposal Method</span>
              <strong>Recommended action</strong>
              <p>{analysis.disposalMethod}</p>
            </article>
            <article className="result-item">
              <span>Environmental Tip</span>
              <strong>Better next step</strong>
              <p>{analysis.environmentalTip}</p>
            </article>
          </div>
        </div>

        <aside className="impact-card">
          <p className="eyebrow">Impact Score</p>
          <div className="gauge">
            <div
              className="gauge-fill"
              style={{ transform: `rotate(${scoreRotation}deg)` }}
            />
            <div className="gauge-center">
              <strong>{analysis.impactScore}</strong>
              <span>/ 100</span>
            </div>
          </div>
          <h3>{analysis.impactLabel}</h3>
          <p>
            Higher scores signal greater environmental risk when waste is disposed of
            incorrectly.
          </p>
          <Link to="/upload" className="button button-primary">
            Scan another item
          </Link>
        </aside>
      </section>
    </div>
  )
}
