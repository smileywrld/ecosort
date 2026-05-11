import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { quizQuestions } from '../data'

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function QuizPage() {
  const [quizState, setQuizState] = useState('idle') // idle | playing | review
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState([]) // { questionId, selectedIndex, correct }
  const [animateOut, setAnimateOut] = useState(false)

  const startQuiz = useCallback(() => {
    setQuestions(shuffleArray(quizQuestions))
    setCurrentQ(0)
    setSelectedOption(null)
    setShowExplanation(false)
    setAnswers([])
    setAnimateOut(false)
    setQuizState('playing')
  }, [])

  const question = questions[currentQ]
  const totalCorrect = answers.filter((a) => a.correct).length

  function handleOptionClick(optionIndex) {
    if (selectedOption !== null) return // already answered
    setSelectedOption(optionIndex)
    const correct = optionIndex === question.correctIndex
    setAnswers((prev) => [...prev, { questionId: question.id, selectedIndex: optionIndex, correct }])
    setShowExplanation(true)
  }

  function handleNext() {
    if (currentQ + 1 >= questions.length) {
      setQuizState('review')
      return
    }
    setAnimateOut(true)
    setTimeout(() => {
      setCurrentQ((q) => q + 1)
      setSelectedOption(null)
      setShowExplanation(false)
      setAnimateOut(false)
    }, 300)
  }

  const pct = questions.length ? ((currentQ) / questions.length) * 100 : 0

  /* ── Idle ── */
  if (quizState === 'idle') {
    return (
      <div className="page-stack">
        <section className="glass-card quiz-intro-card">
          <SectionTitle
            eyebrow="EcoSort Quiz"
            title="Test your recycling & sustainability knowledge"
            text="Answer 10 questions about waste management, recycling, and the UN Sustainable Development Goals. Learn something new with every answer!"
          />

          <div className="quiz-preview-grid">
            <div className="quiz-preview-item">
              <span className="quiz-preview-icon">📋</span>
              <strong>10 Questions</strong>
              <p>Covering waste, recycling & SDGs</p>
            </div>
            <div className="quiz-preview-item">
              <span className="quiz-preview-icon">💡</span>
              <strong>Learn as you go</strong>
              <p>Explanations after every answer</p>
            </div>
            <div className="quiz-preview-item">
              <span className="quiz-preview-icon">🎯</span>
              <strong>Track your score</strong>
              <p>See how you compare at the end</p>
            </div>
          </div>

          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <button type="button" className="button button-primary game-start-btn" onClick={startQuiz}>
              📝 Start Quiz
            </button>
          </div>
        </section>
      </div>
    )
  }

  /* ── Review ── */
  if (quizState === 'review') {
    const scorePct = Math.round((totalCorrect / questions.length) * 100)
    const grade =
      scorePct >= 90 ? { label: 'Sustainability Expert 🌟', tone: 'expert' }
      : scorePct >= 70 ? { label: 'Eco Advocate 💚', tone: 'advocate' }
      : scorePct >= 50 ? { label: 'Green Learner 🌱', tone: 'learner' }
      : { label: 'Keep Learning 📚', tone: 'beginner' }

    return (
      <div className="page-stack">
        <section className="glass-card quiz-result-card">
          <div className="quiz-result-header">
            <span className="quiz-result-badge">{grade.label}</span>
            <h2 className="quiz-result-score">
              {totalCorrect} <span>/ {questions.length}</span>
            </h2>
            <p className="quiz-result-subtitle">{scorePct}% correct</p>
          </div>

          {/* Score ring */}
          <div className="quiz-ring-container">
            <svg className="quiz-ring" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke="url(#quizGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${scorePct * 3.267} 326.7`}
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dasharray 1s ease' }}
              />
              <defs>
                <linearGradient id="quizGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f5d1ac" />
                  <stop offset="100%" stopColor="#88a669" />
                </linearGradient>
              </defs>
            </svg>
            <span className="quiz-ring-label">{scorePct}%</span>
          </div>

          {/* Answers review */}
          <div className="quiz-review-list">
            <p className="eyebrow" style={{ marginBottom: '12px' }}>Answer Review</p>
            {questions.map((q, i) => {
              const ans = answers[i]
              return (
                <div className={`quiz-review-row ${ans?.correct ? 'correct' : 'wrong'}`} key={q.id}>
                  <span className="review-number">{i + 1}</span>
                  <div className="review-content">
                    <p className="review-question">{q.question}</p>
                    {!ans?.correct && (
                      <p className="review-correct-ans">
                        Correct: <strong>{q.options[q.correctIndex]}</strong>
                      </p>
                    )}
                  </div>
                  <span className="review-mark">{ans?.correct ? '✓' : '✗'}</span>
                </div>
              )
            })}
          </div>

          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <button type="button" className="button button-primary" onClick={startQuiz}>
              🔄 Retake Quiz
            </button>
            <Link to="/game" className="button button-secondary">
              🎮 Play the Game
            </Link>
          </div>
        </section>
      </div>
    )
  }

  /* ── Playing ── */
  return (
    <div className="page-stack">
      {/* Progress HUD */}
      <section className="quiz-hud">
        <div className="hud-item">
          <span>Question</span>
          <strong>{currentQ + 1} / {questions.length}</strong>
        </div>
        <div className="hud-item">
          <span>Score</span>
          <strong>{totalCorrect} ✓</strong>
        </div>
      </section>

      <div className="game-progress-track">
        <div className="game-progress-fill quiz-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      {/* Question card */}
      <section className={`quiz-question-card ${animateOut ? 'slide-out' : 'slide-in'}`}>
        <div className="quiz-q-number">Q{currentQ + 1}</div>
        <h3 className="quiz-q-text">{question?.question}</h3>

        <div className="quiz-options">
          {question?.options.map((opt, i) => {
            let cls = 'quiz-option'
            if (selectedOption !== null) {
              if (i === question.correctIndex) cls += ' option-correct'
              else if (i === selectedOption) cls += ' option-wrong'
              else cls += ' option-disabled'
            }
            return (
              <button
                key={i}
                type="button"
                className={cls}
                onClick={() => handleOptionClick(i)}
                disabled={selectedOption !== null}
              >
                <span className="option-letter">{'ABCD'[i]}</span>
                <span className="option-text">{opt}</span>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`quiz-explanation ${answers[answers.length - 1]?.correct ? 'exp-correct' : 'exp-wrong'}`}>
            <div className="exp-header">
              {answers[answers.length - 1]?.correct ? '✓ Correct!' : '✗ Not quite'}
            </div>
            <p>{question?.explanation}</p>
          </div>
        )}

        {selectedOption !== null && (
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '16px' }}>
            <button type="button" className="button button-primary" onClick={handleNext}>
              {currentQ + 1 >= questions.length ? 'See Results' : 'Next Question →'}
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
