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

export default function GamePage() {
  const [gameState, setGameState] = useState('idle') // idle | playing | finished
  const [items, setItems] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [feedback, setFeedback] = useState(null) // { correct, correctBin }
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

  // Timer
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

  /* ─── Idle screen ─── */
  if (gameState === 'idle') {
    return (
      <div className="page-stack">
        <section className="glass-card game-intro-card">
          <SectionTitle
            eyebrow="EcoSort Game"
            title="Sort the waste into the correct bins!"
            text="Test your waste sorting knowledge with this fast-paced sorting challenge. You'll be shown waste items one by one — tap the correct bin before time runs out."
          />

          <div className="game-rules">
            <div className="rule-item">
              <span className="rule-icon">🎯</span>
              <div>
                <strong>Sort {TOTAL_ROUNDS} items</strong>
                <p>Each correct sort earns 10 points</p>
              </div>
            </div>
            <div className="rule-item">
              <span className="rule-icon">🔥</span>
              <div>
                <strong>Build streaks</strong>
                <p>Consecutive correct answers earn bonus points</p>
              </div>
            </div>
            <div className="rule-item">
              <span className="rule-icon">⏱️</span>
              <div>
                <strong>{TIME_LIMIT} second timer</strong>
                <p>Sort as many as you can before time is up</p>
              </div>
            </div>
            <div className="rule-item">
              <span className="rule-icon">🏆</span>
              <div>
                <strong>Aim for the top</strong>
                <p>Perfect score: {TOTAL_ROUNDS * 10 + 30}+ points</p>
              </div>
            </div>
          </div>

          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <button type="button" className="button button-primary game-start-btn" onClick={startGame}>
              🎮 Start Game
            </button>
          </div>
        </section>
      </div>
    )
  }

  /* ─── Finished screen ─── */
  if (gameState === 'finished') {
    const grade =
      finalPct >= 90 ? { label: 'Eco Champion 🏆', tone: 'champion' }
      : finalPct >= 70 ? { label: 'Green Warrior 💚', tone: 'warrior' }
      : finalPct >= 50 ? { label: 'Eco Learner 🌱', tone: 'learner' }
      : { label: 'Keep Trying 🔄', tone: 'beginner' }

    return (
      <div className="page-stack">
        <section className="glass-card game-result-card">
          <div className="game-result-header">
            <span className="game-result-badge">{grade.label}</span>
            <h2 className="game-result-score">{score}</h2>
            <p className="game-result-subtitle">points scored</p>
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
            {history.map((h, i) => (
              <div className={`history-row ${h.correct ? 'correct' : 'wrong'}`} key={i}>
                <span className="history-emoji">{h.item.emoji}</span>
                <span className="history-name">{h.item.name}</span>
                <span className="history-result">{h.correct ? '✓' : '✗'}</span>
                {!h.correct && (
                  <span className="history-hint">
                    → {gameBins.find((b) => b.id === h.item.bin)?.label}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <button type="button" className="button button-primary" onClick={startGame}>
              🔄 Play Again
            </button>
            <Link to="/quiz" className="button button-secondary">
              📝 Try the Quiz
            </Link>
          </div>
        </section>
      </div>
    )
  }

  /* ─── Playing screen ─── */
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
          <strong>{streak > 0 ? `🔥 ${streak}` : '—'}</strong>
        </div>
        <div className={`hud-item hud-timer ${timeLeft <= 10 ? 'hud-danger' : ''}`}>
          <span>Time</span>
          <strong>{timeLeft}s</strong>
        </div>
      </section>

      {/* Progress bar */}
      <div className="game-progress-track">
        <div className="game-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      {/* Timer bar */}
      <div className="game-timer-track">
        <div
          className={`game-timer-fill ${timeLeft <= 10 ? 'timer-danger' : ''}`}
          style={{ width: `${timePct}%` }}
        />
      </div>

      {/* Current item */}
      <section className="game-item-showcase">
        <div className={`game-item-card ${feedback ? (feedback.correct ? 'flash-correct' : 'flash-wrong') : ''}`}>
          <span className="game-item-emoji">{currentItem?.emoji}</span>
          <h3 className="game-item-name">{currentItem?.name}</h3>
          {feedback && (
            <div className={`game-feedback ${feedback.correct ? 'fb-correct' : 'fb-wrong'}`}>
              {feedback.correct
                ? '✓ Correct!'
                : `✗ Wrong — goes in ${feedback.correctBin}`}
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
            <span className="bin-emoji">{bin.emoji}</span>
            <span className="bin-label">{bin.label}</span>
          </button>
        ))}
      </section>
    </div>
  )
}
