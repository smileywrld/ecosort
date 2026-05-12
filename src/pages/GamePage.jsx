import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { gameItems, gameBins } from '../data'

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const TOTAL_ROUNDS = 12
const TIME_LIMIT = 60

/* Small colored dot for bins */
function BinDot({ color }) {
  return (
    <span
      className="bin-dot"
      style={{ background: color }}
    />
  )
}

export default function GamePage() {
  const [gameState, setGameState] = useState('idle')
  const [items, setItems] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [feedback, setFeedback] = useState(null)
  const [shakeWrong, setShakeWrong] = useState(null)
  const [popCorrect, setPopCorrect] = useState(null)
  const [history, setHistory] = useState([])
  const timerRef = useRef(null)

  const currentItem = items[currentIndex] || null

  const startGame = useCallback(() => {
    const shuffled = shuffleArray(gameItems).slice(0, TOTAL_ROUNDS)
    setItems(shuffled)
    setCurrentIndex(0)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setTimeLeft(TIME_LIMIT)
    setFeedback(null)
    setShakeWrong(null)
    setPopCorrect(null)
    setHistory([])
    setGameState('playing')
  }, [])

  useEffect(() => {
    if (gameState !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setGameState('finished')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [gameState])

  function handleBinClick(binId) {
    if (gameState !== 'playing' || !currentItem || feedback) return
    const correct = currentItem.bin === binId
    const binLabel = gameBins.find((b) => b.id === currentItem.bin)?.label || currentItem.bin

    if (correct) {
      const streakBonus = streak >= 2 ? Math.min(streak, 5) : 0
      setScore((s) => s + 10 + streakBonus)
      setStreak((s) => {
        const next = s + 1
        setBestStreak((b) => Math.max(b, next))
        return next
      })
      setPopCorrect(binId)
      setTimeout(() => setPopCorrect(null), 400)
    } else {
      setStreak(0)
      setShakeWrong(binId)
      setTimeout(() => setShakeWrong(null), 500)
    }

    setFeedback({ correct, correctBin: binLabel })
    setHistory((h) => [...h, { item: currentItem, chosen: binId, correct }])

    setTimeout(() => {
      setFeedback(null)
      if (currentIndex + 1 >= items.length) {
        setGameState('finished')
        clearInterval(timerRef.current)
      } else {
        setCurrentIndex((i) => i + 1)
      }
    }, 1000)
  }

  const pct = items.length ? ((currentIndex) / items.length) * 100 : 0
  const timePct = (timeLeft / TIME_LIMIT) * 100
  const finalPct = items.length ? Math.round((history.filter((h) => h.correct).length / items.length) * 100) : 0

  /* ─── Idle ─── */
  if (gameState === 'idle') {
    return (
      <div className="page-stack">
        <section className="game-intro-section">
          <div className="game-intro-left">
            <span className="eyebrow">EcoSort Game</span>
            <h1 className="game-intro-title">Sort the waste.<br />Beat the clock.</h1>
            <p className="game-intro-text">
              Test your waste sorting knowledge in a fast-paced challenge.
              You'll see waste items one by one — pick the right bin before time runs out.
            </p>
            <button type="button" className="button button-primary game-start-btn" onClick={startGame}>
              Start Game
            </button>
          </div>

          <div className="game-intro-right">
            <div className="intro-rule-card">
              <div className="intro-rule-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <div>
                <strong>Sort {TOTAL_ROUNDS} items</strong>
                <p>Each correct sort earns 10 points</p>
              </div>
            </div>
            <div className="intro-rule-card">
              <div className="intro-rule-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <div>
                <strong>Build streaks</strong>
                <p>Consecutive correct answers earn bonus points</p>
              </div>
            </div>
            <div className="intro-rule-card">
              <div className="intro-rule-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <strong>{TIME_LIMIT} second timer</strong>
                <p>Sort as many as you can before time is up</p>
              </div>
            </div>
            <div className="intro-rule-card">
              <div className="intro-rule-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C6 4 6 4.5 6 6m12 3h1.5a2.5 2.5 0 0 0 0-5C18 4 18 4.5 18 6m-6-2v14m-4 0h8"/></svg>
              </div>
              <div>
                <strong>Aim for the top</strong>
                <p>Perfect score: {TOTAL_ROUNDS * 10 + 30}+ points</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  /* ─── Finished ─── */
  if (gameState === 'finished') {
    const grade =
      finalPct >= 90 ? { label: 'Eco Champion', tone: 'champion' }
      : finalPct >= 70 ? { label: 'Green Warrior', tone: 'warrior' }
      : finalPct >= 50 ? { label: 'Eco Learner', tone: 'learner' }
      : { label: 'Keep Trying', tone: 'beginner' }

    return (
      <div className="page-stack">
        <section className="game-result-section">
          <div className="game-result-header">
            <span className="result-badge">{grade.label}</span>
            <h2 className="game-score-big">{score}</h2>
            <p className="game-score-sub">points scored</p>
          </div>

          <div className="game-stats-row">
            <div className="game-stat">
              <strong>{history.filter((h) => h.correct).length}</strong>
              <span>Correct</span>
            </div>
            <div className="game-stat">
              <strong>{history.filter((h) => !h.correct).length}</strong>
              <span>Wrong</span>
            </div>
            <div className="game-stat">
              <strong>{bestStreak}</strong>
              <span>Best Streak</span>
            </div>
            <div className="game-stat">
              <strong>{finalPct}%</strong>
              <span>Accuracy</span>
            </div>
          </div>

          <div className="game-history">
            <p className="eyebrow" style={{ marginBottom: '12px' }}>Round Summary</p>
            {history.map((h, i) => {
              const binColor = gameBins.find((b) => b.id === h.item.bin)?.color
              return (
                <div className={`history-row ${h.correct ? 'correct' : 'wrong'}`} key={i}>
                  <BinDot color={binColor} />
                  <span className="history-name">{h.item.name}</span>
                  <span className="history-result">{h.correct ? '✓' : '✗'}</span>
                  {!h.correct && (
                    <span className="history-hint">
                      → {gameBins.find((b) => b.id === h.item.bin)?.label}
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          <div className="game-actions-row">
            <button type="button" className="button button-primary" onClick={startGame}>
              Play Again
            </button>
            <Link to="/quiz" className="button button-secondary">
              Try the Quiz
            </Link>
          </div>
        </section>
      </div>
    )
  }

  /* ─── Playing ─── */
  return (
    <div className="page-stack">
      <section className="game-hud">
        <div className="hud-item">
          <span>Score</span>
          <strong>{score}</strong>
        </div>
        <div className="hud-item">
          <span>Item</span>
          <strong>{currentIndex + 1} / {items.length}</strong>
        </div>
        <div className="hud-item hud-streak">
          <span>Streak</span>
          <strong>{streak > 0 ? `${streak}x` : '—'}</strong>
        </div>
        <div className={`hud-item ${timeLeft <= 10 ? 'hud-danger' : ''}`}>
          <span>Time</span>
          <strong>{timeLeft}s</strong>
        </div>
      </section>

      <div className="game-progress-track">
        <div className="game-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="game-timer-track">
        <div className={`game-timer-fill ${timeLeft <= 10 ? 'timer-danger' : ''}`} style={{ width: `${timePct}%` }} />
      </div>

      {/* Current item */}
      <section className="game-item-showcase">
        <div className={`game-item-card ${feedback ? (feedback.correct ? 'flash-correct' : 'flash-wrong') : ''}`}>
          <span className="game-item-initial" style={{ '--item-color': gameBins.find(b => b.id === currentItem?.bin)?.color || '#fff' }}>
            {currentItem?.name?.charAt(0)}
          </span>
          <h3 className="game-item-name">{currentItem?.name}</h3>
          <p className="game-item-hint">Which bin does this belong to?</p>
          {feedback && (
            <div className={`game-feedback ${feedback.correct ? 'fb-correct' : 'fb-wrong'}`}>
              {feedback.correct ? 'Correct!' : `Wrong — goes in ${feedback.correctBin}`}
            </div>
          )}
        </div>
      </section>

      {/* Bins */}
      <section className="game-bins-grid">
        {gameBins.map((bin) => (
          <button
            key={bin.id}
            type="button"
            className={`game-bin-btn ${shakeWrong === bin.id ? 'shake' : ''} ${popCorrect === bin.id ? 'pop' : ''}`}
            style={{ '--bin-color': bin.color }}
            onClick={() => handleBinClick(bin.id)}
            disabled={!!feedback}
          >
            <BinDot color={bin.color} />
            <span className="bin-label">{bin.label}</span>
          </button>
        ))}
      </section>
    </div>
  )
}
