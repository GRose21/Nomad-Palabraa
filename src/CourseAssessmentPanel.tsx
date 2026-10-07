import { useState } from 'react'
import type { Resource } from './resourceCatalog'
import AudioControl from './AudioControl'
import { formatCourseLevel } from './ilr'
import type { CourseLevel } from './learnCourse'

type CourseAssessmentProps = {
  milestone: number
  level: CourseLevel
  language: string
  lang: string
  direction: 'auto' | 'rtl'
  reading: Resource
  listening: Resource
  listensUsed: number
  activeAudioText: string
  audioStatus: 'idle' | 'playing' | 'paused'
  onListen: (text: string) => void
  onComplete: (score: number, total: number) => void
  onExit: () => void
}

function CourseAssessment({
  milestone,
  level,
  language,
  lang,
  direction,
  reading,
  listening,
  listensUsed,
  activeAudioText,
  audioStatus,
  onListen,
  onComplete,
  onExit,
}: CourseAssessmentProps) {
  const [readingAnswers, setReadingAnswers] = useState<number[]>([])
  const [listeningAnswers, setListeningAnswers] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const readingQuestions = reading.comprehension ?? []
  const listeningQuestions = listening.comprehension ?? []
  const totalQuestions = readingQuestions.length + listeningQuestions.length
  const score = [
    ...readingQuestions.map((question, index) => readingAnswers[index] === question.correctIndex),
    ...listeningQuestions.map((question, index) => listeningAnswers[index] === question.correctIndex),
  ].filter(Boolean).length
  const canSubmit = readingQuestions.every((_, index) => readingAnswers[index] !== undefined)
    && listeningQuestions.every((_, index) => listeningAnswers[index] !== undefined)
    && listensUsed > 0

  const renderQuestions = (
    questions: NonNullable<Resource['comprehension']>,
    answers: number[],
    setAnswers: (update: (current: number[]) => number[]) => void,
    prefix: string,
  ) => questions.map((question, questionIndex) => (
    <div className="course-assessment-question" key={`${prefix}-${question.prompt}`}>
      <strong>{questionIndex + 1}. {question.prompt}</strong>
      <div>{question.answers.map((answer, answerIndex) => {
        const correct = checked && answerIndex === question.correctIndex
        const incorrect = checked && answers[questionIndex] === answerIndex && !correct
        return (
          <button
            key={answer}
            type="button"
            lang="en"
            className={`${answers[questionIndex] === answerIndex ? 'selected' : ''}${correct ? ' correct' : ''}${incorrect ? ' incorrect' : ''}`}
            disabled={checked}
            onClick={() => setAnswers((current) => {
              const next = [...current]
              next[questionIndex] = answerIndex
              return next
            })}
          >
            {answer}
          </button>
        )
      })}</div>
    </div>
  ))

  const submit = () => {
    if (!canSubmit || checked) return
    setChecked(true)
    onComplete(score, totalQuestions)
  }

  return (
    <div className="content course-assessment">
      <button className="back-button" type="button" onClick={onExit}>← Back to learning path</button>
      <div className="section-heading">
        <div><span className="eyebrow">LEARN CHECKPOINT · {milestone} LESSONS COMPLETE</span><h2>Reading and listening assessment</h2><p>{formatCourseLevel(level)} · {language}. Listen carefully: assessment audio can be played up to two times.</p></div>
      </div>
      <section className="course-assessment-section">
        <div className="course-assessment-reading">
          <span className="reading-label">READING · {reading.title}</span>
          <p className="assessment-instruction">Read the passage and answer the questions without using audio.</p>
          <div className="course-assessment-passage" lang={lang} dir={direction}>{reading.passage}</div>
        </div>
        <div className="course-assessment-questions">
          <h3>Reading questions</h3>
          {renderQuestions(readingQuestions, readingAnswers, setReadingAnswers, 'reading')}
        </div>
      </section>
      <section className="course-assessment-section listening-assessment">
        <div className="listening-assessment-intro">
          <span className="reading-label">LISTENING · {listening.title}</span>
          <p className="assessment-instruction">The transcript is hidden during this test. Listen once or twice, then answer.</p>
          <AudioControl
            phrase={listening.passage ?? ''}
            language={language}
            status={audioStatus}
            isCurrent={activeAudioText === listening.passage}
            disabled={listensUsed >= 2 && !(activeAudioText === listening.passage && audioStatus !== 'idle')}
            onActivate={onListen}
            label="Listen to assessment audio"
          />
          <span className="assessment-listen-count" role="status">{listensUsed} of 2 listens used</span>
        </div>
        <div className="course-assessment-questions">
          <h3>Listening questions</h3>
          {renderQuestions(listeningQuestions, listeningAnswers, setListeningAnswers, 'listening')}
        </div>
      </section>
      {!checked
        ? <button className="primary-button" type="button" disabled={!canSubmit} onClick={submit}>Submit assessment</button>
        : <div className="score-message" role="status"><span>Checkpoint complete: {score} of {totalQuestions} correct.</span><button className="secondary-button" type="button" onClick={onExit}>Return to Learn</button></div>}
    </div>
  )
}

export default CourseAssessment
