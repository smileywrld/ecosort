import { NavLink, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'
import ResultPage from './pages/ResultPage'
import SdgPage from './pages/SdgPage'

const DEFAULT_RESULT = {
  wasteType: 'Plastic Packaging',
  category: 'Plastic',
  disposalMethod: 'Clean it, separate it from food waste, and drop it in a plastic recycling stream if your local recycler accepts soft packaging.',
  environmentalTip: 'Reduce single-use plastics by reusing containers and choosing refillable products where possible.',
  impactScore: 74,
  impactLabel: 'Moderate Risk',
}

export default function App() {
  const [analysis, setAnalysis] = useState(DEFAULT_RESULT)

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand-mark">
          <span className="brand-orb" />
          <span>
            EcoSort AI
            <small>Waste guidance for SDG 12</small>
          </span>
        </NavLink>

        <nav className="site-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/upload">Scanner</NavLink>
          <NavLink to="/result">Result</NavLink>
          <NavLink to="/sdg">SDG 12</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/upload"
            element={<UploadPage analysis={analysis} setAnalysis={setAnalysis} />}
          />
          <Route path="/result" element={<ResultPage analysis={analysis} />} />
          <Route path="/sdg" element={<SdgPage />} />
        </Routes>
      </main>
    </div>
  )
}
