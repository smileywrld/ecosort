import { NavLink, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'
import ResultPage from './pages/ResultPage'
import SdgPage from './pages/SdgPage'
import GamePage from './pages/GamePage'
import QuizPage from './pages/QuizPage'

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
          <span>EcoSort AI</span>
        </NavLink>

        <nav className="site-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/upload">Scanner</NavLink>
          <NavLink to="/result">Result</NavLink>
          <NavLink to="/game">Game</NavLink>
          <NavLink to="/quiz">Quiz</NavLink>
          <NavLink to="/sdg" className="nav-btn">SDG 12</NavLink>
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
          <Route path="/game" element={<GamePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/sdg" element={<SdgPage />} />
        </Routes>
      </main>
    </div>
  )
}
