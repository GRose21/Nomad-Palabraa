import { useState } from 'react'
import { grammarLessons as defaultLessons, grammarLevels as defaultLevels, type GrammarLesson, type GrammarLevel } from './grammar'
import CollegeCourseCard from './CollegeCourseCard'

type GrammarTabProps = {
  completedLessons: string[]
  onComplete: (lessonId: string) => void
  lessons?: GrammarLesson[]
  levels?: readonly GrammarLevel[]
  language?: string
}

function GrammarTab({ completedLessons, onComplete, lessons = defaultLessons, levels = defaultLevels, language = 'Spanish' }: GrammarTabProps) {
  const targetLanguageCode = language === 'Mandarin Chinese' ? 'zh-CN'
    : language === 'Modern Standard Arabic' ? 'ar'
      : language === 'Russian' ? 'ru-RU'
        : language === 'Italian' ? 'it-IT'
          : 'es-ES'
  const targetDirection = language === 'Modern Standard Arabic' ? 'rtl' : 'auto'
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
          <div><span className="eyebrow">{language.toLocaleUpperCase()} COLLEGE-STYLE GRAMMAR SEQUENCE</span><h2>Build your grammar, step by step</h2><p>Progress from introductory forms to advanced academic syntax, register, and rhetorical control. Lessons pair explicit explanations with guided application.</p></div>
          <span className="question-count">{completedSet.size} of {lessons.length} lessons complete</span>
        </div>
        <p className="college-path-disclaimer">The year and semester labels describe a typical progression, not college credit or a formal placement determination.</p>
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
              <CollegeCourseCard level={level} mode="grammar" />
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
              <ul>{section.examples.map((example) => <li key={example} lang={targetLanguageCode} dir={targetDirection}>{example}</li>)}</ul>
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
                    lang={targetLanguageCode}
                    dir={targetDirection}
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
  A1: 'Sentence structure, noun patterns, and essential present-tense forms.',
  A2: 'Questions, negation, common past forms, and everyday sentence patterns.',
  B1: 'Narration, linked clauses, and expressing cause, condition, and result.',
  B2: 'Complex sentence structures, argument, and formal communication.',
  C1: 'Formal writing, evidence, attribution, and precise argument structure.',
  C2: 'Nuance, register, implication, and fine distinctions in meaning.',
}

export default GrammarTab
