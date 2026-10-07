import { useState } from 'react'
import { grammarLessons as defaultLessons, grammarLevels as defaultLevels, type GrammarLesson, type GrammarLevel } from './grammar'

type GrammarTabProps = {
  completedLessons: string[]
  onComplete: (lessonId: string) => void
  lessons?: GrammarLesson[]
  levels?: readonly GrammarLevel[]
  language?: string
}

function GrammarTab({ completedLessons, onComplete, lessons = defaultLessons, levels = defaultLevels, language = 'Spanish' }: GrammarTabProps) {
  const orderedLessons = [...lessons].sort((first, second) => levels.indexOf(first.level) - levels.indexOf(second.level))
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId) ?? null
  const completedSet = new Set(completedLessons)

  const openLesson = (lesson: GrammarLesson) => {
    setSelectedLessonId(lesson.id)
    setAnswers([])
    setChecked(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const chooseAnswer = (questionIndex: number, answerIndex: number) => {
    setAnswers((current) => {
      const next = [...current]
      next[questionIndex] = answerIndex
      return next
    })
    setChecked(false)
  }

  const checkAnswers = () => {
    if (!selectedLesson || selectedLesson.exercises.some((_, index) => answers[index] === undefined)) return
    setChecked(true)
    const correctCount = selectedLesson.exercises.filter((exercise, index) => answers[index] === exercise.answer).length
    if (correctCount === selectedLesson.exercises.length && !completedSet.has(selectedLesson.id)) {
      onComplete(selectedLesson.id)
    }
  }

  const resetQuiz = () => {
    setAnswers([])
    setChecked(false)
  }

  const goToLesson = (lesson: GrammarLesson) => openLesson(lesson)
  const selectedIndex = selectedLesson ? orderedLessons.findIndex((lesson) => lesson.id === selectedLesson.id) : -1
  const previousLesson = selectedIndex > 0 ? orderedLessons[selectedIndex - 1] : null
  const nextLesson = selectedIndex >= 0 && selectedIndex < orderedLessons.length - 1 ? orderedLessons[selectedIndex + 1] : null
  const score = selectedLesson && checked
    ? selectedLesson.exercises.filter((exercise, index) => answers[index] === exercise.answer).length
    : 0

  if (!selectedLesson) {
    return (
      <div className="content grammar-page">
        <div className="section-heading">
          <div><span className="eyebrow">{language.toLocaleUpperCase()} GRAMMAR COURSE</span><h2>Build your grammar, step by step</h2><p>Start with sentence basics and work through verb forms, tenses, pronouns, and advanced structures.</p></div>
          <span className="question-count">{completedSet.size} of {lessons.length} lessons complete</span>
        </div>
        <div className="grammar-overall-progress" aria-label={`${completedSet.size} of ${lessons.length} grammar lessons complete`}>
          <span style={{ width: `${completedSet.size / lessons.length * 100}%` }} />
        </div>
        {levels.map((level) => {
          const lessonsAtLevel = lessons.filter((lesson) => lesson.level === level)
          const completedInLevel = lessonsAtLevel.filter((lesson) => completedSet.has(lesson.id)).length
          return (
            <section className="grammar-level" key={level}>
              <div className="grammar-level-heading">
                <div><span className="level-badge">{level}</span><div><h3>{level} grammar</h3><p>{levelDescription[level]}</p></div></div>
                <small>{completedInLevel} / {lessonsAtLevel.length} complete</small>
              </div>
              <div className="grammar-lesson-grid">
                {lessonsAtLevel.map((lesson, index) => {
                  const isComplete = completedSet.has(lesson.id)
                  return (
                    <article className={`grammar-lesson-card${isComplete ? ' complete' : ''}`} key={lesson.id} onClick={() => goToLesson(lesson)}>
                      <span>{isComplete ? '✓ COMPLETE' : `LESSON ${String(index + 1).padStart(2, '0')}`}</span>
                      <h4>{lesson.title}</h4>
                      <p>{lesson.summary}</p>
                      <button className="plan-start" onClick={(event) => { event.stopPropagation(); goToLesson(lesson) }}>{isComplete ? 'Review lesson →' : 'Start lesson →'}</button>
                    </article>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    )
  }

  return (
    <div className="content grammar-page">
      <div className="grammar-lesson-nav">
        <button className="back-button" onClick={() => setSelectedLessonId(null)}>← All grammar lessons</button>
        <span className="level-badge">{selectedLesson.level}</span>
      </div>
      <header className="grammar-lesson-header">
        <span className="eyebrow">GRAMMAR LESSON · {selectedLesson.level}</span>
        <h2>{selectedLesson.title}</h2>
        <p>{selectedLesson.summary}</p>
      </header>
      <div className="grammar-content-grid">
        <article className="grammar-teaching">
          <span className="eyebrow">THE LESSON</span>
          {selectedLesson.sections.map((section) => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.explanation}</p>
              <ul>{section.examples.map((example) => <li key={example}>{example}</li>)}</ul>
            </section>
          ))}
        </article>
        <article className="grammar-quiz">
          <span className="eyebrow">PRACTICE</span>
          <h3>Check your understanding</h3>
          {selectedLesson.exercises.map((exercise, questionIndex) => (
            <section className="grammar-question" key={exercise.prompt}>
              <strong>{questionIndex + 1}. {exercise.prompt}</strong>
              <div>{exercise.options.map((option, answerIndex) => {
                const correct = checked && answerIndex === exercise.answer
                const incorrect = checked && answers[questionIndex] === answerIndex && !correct
                return (
                  <button
                    key={option}
                    className={`${answers[questionIndex] === answerIndex ? 'selected' : ''}${correct ? ' correct' : ''}${incorrect ? ' incorrect' : ''}`}
                    disabled={checked}
                    onClick={() => chooseAnswer(questionIndex, answerIndex)}
                  >
                    {option}
                  </button>
                )
              })}</div>
              {checked && <p className="grammar-explanation">{exercise.explanation}</p>}
            </section>
          ))}
          {!checked
            ? <button className="primary-button" disabled={selectedLesson.exercises.some((_, index) => answers[index] === undefined)} onClick={checkAnswers}>Check answers</button>
            : <div className="grammar-results" role="status">
              <strong>{score} of {selectedLesson.exercises.length} correct</strong>
              <p>{score === selectedLesson.exercises.length ? 'Excellent work — lesson complete!' : 'Review the explanations and try the questions again. Get them all right to complete the lesson.'}</p>
              {score !== selectedLesson.exercises.length && <button className="secondary-button" onClick={resetQuiz}>Try again</button>}
            </div>}
        </article>
      </div>
      <nav className="grammar-next-nav" aria-label="Grammar lesson navigation">
        <button className="secondary-button" disabled={!previousLesson} onClick={() => previousLesson && goToLesson(previousLesson)}>← Previous lesson</button>
        {nextLesson && <button className="primary-button" onClick={() => goToLesson(nextLesson)}>Next lesson →</button>}
      </nav>
    </div>
  )
}

const levelDescription: Record<GrammarLevel, string> = {
  A1: 'Sentence foundations, nouns, articles, and essential present-tense verbs.',
  A2: 'Agreement, questions, stem-changing verbs, reflexives, and the first past tense.',
  B1: 'Past narration, future and conditional forms, and object pronouns.',
  B2: 'Subjunctive, commands, and choosing por or para.',
  C1: 'Compound tenses, hypothetical clauses, and relative-clause mood.',
  C2: 'Reported speech, sequence of tenses, and precise discourse structure.',
}

export default GrammarTab
