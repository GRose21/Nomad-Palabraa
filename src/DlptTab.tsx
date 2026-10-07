import { useState } from 'react'
import type { CourseLevel } from './learnCourse'
import type { Resource } from './resourceCatalog'
import { formatCourseLevel, ilrDisclaimer } from './ilr'
import PassageText from './PassageText'

type DlptTabProps = {
  language: string
  resources: Resource[]
  lang: string
  direction: 'auto' | 'rtl'
}

function DlptTab({ language, resources, lang, direction }: DlptTabProps) {
  const [selected, setSelected] = useState<Resource | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const questions = selected?.comprehension ?? []
  const score = questions.filter((question, index) => answers[index] === question.correctIndex).length

  const openPractice = (resource: Resource) => {
    setSelected(resource)
    setAnswers([])
    setChecked(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (selected) {
    const level = selected.level as CourseLevel
    return (
      <div className="content lesson-view">
        <button className="back-button" onClick={() => setSelected(null)}>← All DLPT-style readings</button>
        <div className="lesson-hero">
          <div><span className="eyebrow">DLPT-STYLE READING PRACTICE</span><h2>{selected.title}</h2><p>{formatCourseLevel(level)} · Read the passage first, then answer all questions.</p></div>
          <span className="level-badge">{formatCourseLevel(level)}</span>
        </div>
        <article className="reading-panel">
          <div className="reading-text">
            <span className="reading-label">READING PASSAGE · {language.toLocaleUpperCase()}</span>
            <PassageText className="dlpt-passage" text={selected.passage ?? ''} lang={lang} direction={direction} />
          </div>
          <div className="comprehension">
            <h3>Reading comprehension</h3>
            {questions.map((question, questionIndex) => (
              <div key={question.prompt}>
                <strong>{question.prompt}</strong>
                <div>{question.answers.map((answer, answerIndex) => {
                  const isCorrect = checked && answerIndex === question.correctIndex
                  const isIncorrect = checked && answers[questionIndex] === answerIndex && !isCorrect
                  return <button key={answer} lang="en" className={`${answers[questionIndex] === answerIndex ? 'selected' : ''}${isCorrect ? ' correct' : ''}${isIncorrect ? ' incorrect' : ''}`} disabled={checked} onClick={() => setAnswers((current) => {
                    const next = [...current]
                    next[questionIndex] = answerIndex
                    return next
                  })}>{answer}</button>
                })}</div>
              </div>
            ))}
          </div>
          {!checked
            ? <button className="primary-button" disabled={answers.length !== questions.length || answers.some((answer) => answer === undefined)} onClick={() => setChecked(true)}>Submit answers</button>
            : <div className="score-message" role="status">
              <span>{score} of {questions.length} correct. This practice set is not a DLPT score estimate.</span>
              <button className="secondary-button" onClick={() => { setAnswers([]); setChecked(false) }}>Try again</button>
            </div>}
        </article>
        <p className="ilr-disclaimer">{ilrDisclaimer}</p>
      </div>
    )
  }

  const levels: CourseLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  return (
    <div className="content">
      <div className="section-heading">
        <div><span className="eyebrow">READING COMPREHENSION</span><h2>DLPT-style reading practice</h2><p>Practise identifying main ideas, details, purpose, inference, and qualified claims in longer {language} readings.</p></div>
        <span className="question-count">{resources.length} reading sets</span>
      </div>
      <p className="ilr-disclaimer">{ilrDisclaimer}</p>
      <div className="resource-grid">
        {levels.map((level) => {
          const resource = resources.find((item) => item.level === level)
          if (!resource) return null
          return <article className="resource-card" key={resource.title} role="button" tabIndex={0} aria-label={`Start ${resource.title}`} onClick={() => openPractice(resource)} onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              openPractice(resource)
            }
          }}>
            <div className="resource-art reading"><span>文</span></div>
            <div><div className="resource-meta"><span>READING</span><span>{formatCourseLevel(level)}</span></div><h3>{resource.title}</h3><p>{resource.description}</p><div className="resource-footer"><small>{resource.comprehension?.length ?? 0} multiple-choice questions</small><span className="resource-open">Start practice →</span></div></div>
          </article>
        })}
      </div>
    </div>
  )
}

export default DlptTab
