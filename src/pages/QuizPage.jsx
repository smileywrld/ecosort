import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { quizQuestions } from '../data'
import { sdgImage } from '../assets'

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const LEVELS = {
  easy: { timeLimit: 60, label: 'Easy', desc: '60 seconds per question' },
  medium: { timeLimit: 30, label: 'Medium', desc: '30 seconds per question' },
  hard: { timeLimit: 15, label: 'Hard', desc: '15 seconds per question' },
}

export default function QuizPage() {
  const [quizState, setQuizState] = useState('idle') // idle, level-select, playing, review
  const [level, setLevel] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(0)

  // Timer logic
  useEffect(() => {
    if (quizState !== 'playing' || showExplanation) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleTimeOut()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizState, showExplanation, currentQ])

  const startLevelSelect = () => setQuizState('level-select')

  const startQuiz = useCallback((selectedLevel) => {
    setLevel(selectedLevel)
    setQuestions(shuffleArray(quizQuestions))
    setCurrentQ(0)
    setSelectedOption(null)
    setShowExplanation(false)
    setAnswers([])
    setTimeLeft(LEVELS[selectedLevel].timeLimit)
    setQuizState('playing')
  }, [])

  const handleTimeOut = () => {
    setSelectedOption(-1) // -1 indicates timeout
    setAnswers((prev) => [...prev, { questionId: question.id, selectedIndex: -1, correct: false }])
    setShowExplanation(true)
  }

  const question = questions[currentQ]
  const totalCorrect = answers.filter((a) => a.correct).length

  function handleOptionClick(optionIndex) {
    if (selectedOption !== null || showExplanation) return
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
    setCurrentQ((q) => q + 1)
    setSelectedOption(null)
    setShowExplanation(false)
    setTimeLeft(LEVELS[level].timeLimit)
  }

  /* ── Idle ── */
  if (quizState === 'idle') {
    return (
      <div className="quiz-container">
        <section className="quiz-intro-card">
          <span className="section-tag">EcoSort Quiz</span>
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>Test your sustainability knowledge</h1>
          <p className="hero-subtitle">
            Answer 10 questions about waste management, recycling, and SDG 12. Learn something new with every answer.
          </p>
          <button type="button" className="button button-primary" onClick={startLevelSelect} style={{ marginTop: '24px' }}>
            Choose Difficulty
          </button>
        </section>
      </div>
    )
  }

  /* ── Level Select ── */
  if (quizState === 'level-select') {
    return (
      <div className="quiz-container">
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h2>Select Difficulty</h2>
          <div className="level-selection">
            {Object.entries(LEVELS).map(([key, data]) => (
              <button key={key} type="button" className="level-btn" onClick={() => startQuiz(key)}>
                <h3>{data.label}</h3>
                <p>{data.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  /* ── Review ── */
  if (quizState === 'review') {
    const scorePct = Math.round((totalCorrect / questions.length) * 100)
    return (
      <div className="quiz-container">
        <section className="quiz-intro-card" style={{ padding: '40px 0' }}>
          <h2>Quiz Complete!</h2>
          <div style={{ fontSize: '4rem', fontWeight: '800', color: 'var(--accent-green)', margin: '20px 0' }}>
            {scorePct}%
          </div>
          <p className="hero-subtitle">You got {totalCorrect} out of {questions.length} correct on {LEVELS[level].label} difficulty.</p>
          <div className="hero-cta-group" style={{ marginTop: '32px' }}>
            <button type="button" className="button button-primary" onClick={startLevelSelect}>
              Play Again
            </button>
            <Link to="/" className="button button-secondary">
              Back Home
            </Link>
          </div>
        </section>
      </div>
    )
  }

  /* ── Playing ── */
  const timeLimit = LEVELS[level].timeLimit
  const timePct = (timeLeft / timeLimit) * 100

  return (
    <div className="quiz-container">
      <section className="quiz-hud">
        <div><strong>Question {currentQ + 1}</strong> / {questions.length}</div>
        <div className="timer-bar-container">
          <div className={`timer-bar-fill ${timeLeft <= 5 ? 'timer-danger' : ''}`} style={{ width: `${timePct}%` }}></div>
        </div>
        <div style={{ width: '80px', textAlign: 'right' }}><strong>{timeLeft}s</strong></div>
      </section>

      <section className="quiz-question-layout">
        <div className="quiz-image-side">
          <img src={question?.image || sdgImage} alt="Question Context" />
        </div>
        
        <div className="quiz-content-side">
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

          {showExplanation && (
            <div className={`quiz-explanation ${answers[answers.length - 1]?.correct ? 'exp-correct' : 'exp-wrong'}`}>
              <div className="exp-header">
                {answers[answers.length - 1]?.correct ? 'Correct!' : (selectedOption === -1 ? 'Time\'s up!' : 'Not quite')}
              </div>
              <p>{question?.explanation}</p>
              
              <button type="button" className="button button-primary" onClick={handleNext} style={{ marginTop: '16px', width: '100%' }}>
                {currentQ + 1 >= questions.length ? 'See Results' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
