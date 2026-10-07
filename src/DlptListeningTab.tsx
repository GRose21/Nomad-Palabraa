import { useState } from 'react'
import type { CourseLevel } from './learnCourse'
import type { Resource } from './resourceCatalog'
import type { dlptListeningTopics } from './dlptListening'
import AudioControl from './AudioControl'
import CourseLevelBadge from './CourseLevelBadge'
import { ilrDisclaimer } from './ilr'
import ListeningTranscript from './ListeningTranscript'

type Topic = typeof dlptListeningTopics[number]
type DlptListeningTabProps = {
  language: string
  resources: Resource[]
  lang: string
  direction: 'auto' | 'rtl'
  activeAudioText: string
  audioStatus: 'idle' | 'playing' | 'paused'
  listenedPassages: Set<string>
  visibleTranscripts: Set<string>
  onListen: (text: string) => void
  onToggleTranscript: (language: string, text: string) => void
}

const levels: CourseLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const passageKey = (language: string, text: string) => `${language}:${text}`

function DlptListeningTab({
  language,
  resources,
  lang,
  direction,
  activeAudioText,
  audioStatus,
  listenedPassages,
  visibleTranscripts,
  onListen,
  onToggleTranscript,
}: DlptListeningTabProps) {
  const [selected, setSelected] = useState<Resource | null>(null)
  const [levelFilter, setLevelFilter] = useState<CourseLevel | 'all'>('A1')
  const [topicFilter, setTopicFilter] = useState<Topic | 'all'>('all')
  const [answers, setAnswers] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const questions = selected?.comprehension ?? []
  const score = questions.filter((question, index) => answers[index] === question.correctIndex).length
  const topics = [...new Set(resources.map((resource) => resource.topic).filter((topic): topic is Topic => Boolean(topic)))]

  const openPractice = (resource: Resource) => {
    setSelected(resource)
    setAnswers([])
    setChecked(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (selected?.passage) {
    const key = passageKey(lang, selected.passage)
    const hasListened = listenedPassages.has(key)
    return (
      <div className="content lesson-view">
        <button className="back-button" type="button" onClick={() => setSelected(null)}>← All DLPT listening passages</button>
        <div className="lesson-hero">
          <div><span className="eyebrow">DLPT-STYLE LISTENING · {selected.topic?.toLocaleUpperCase()}</span><h2>{selected.title}</h2><p>Listen to the report, then answer the comprehension question. The transcript unlocks after playback finishes.</p></div>
          <CourseLevelBadge level={selected.level as CourseLevel} />
        </div>
        <article className="reading-panel dlpt-listening-panel">
          <div className="reading-text">
            <span className="reading-label">LISTENING PASSAGE · {language.toLocaleUpperCase()}</span>
            <AudioControl
              phrase={selected.passage}
              language={language}
              status={audioStatus}
              isCurrent={activeAudioText === selected.passage}
              onActivate={onListen}
              label="Listen to passage"
            />
            <ListeningTranscript
              text={selected.passage}
              lang={lang}
              direction={direction}
              unlocked={listenedPassages.has(key)}
              visible={visibleTranscripts.has(key)}
              onToggle={() => onToggleTranscript(lang, selected.passage!)}
            />
          </div>
          <div className="comprehension">
            <h3>Listening comprehension</h3>
            {questions.map((question, questionIndex) => (
              <div key={question.prompt}>
                <strong>{question.prompt}</strong>
                <div>{question.answers.map((answer, answerIndex) => {
                  const isCorrect = checked && answerIndex === question.correctIndex
                  const isIncorrect = checked && answers[questionIndex] === answerIndex && !isCorrect
                  return <button
                    key={answer}
                    type="button"
                    lang="en"
                    className={`${answers[questionIndex] === answerIndex ? 'selected' : ''}${isCorrect ? ' correct' : ''}${isIncorrect ? ' incorrect' : ''}`}
                    disabled={checked || !hasListened}
                    onClick={() => setAnswers((current) => {
                      const next = [...current]
                      next[questionIndex] = answerIndex
                      return next
                    })}
                  >{answer}</button>
                })}</div>
              </div>
            ))}
          </div>
          {!checked
            ? <button className="primary-button" type="button" disabled={!hasListened || answers.length !== questions.length || answers.some((answer) => answer === undefined)} onClick={() => setChecked(true)}>Submit answer</button>
            : <div className="score-message" role="status">
              <span>{score} of {questions.length} correct. This practice is not a DLPT score estimate.</span>
              <button className="secondary-button" type="button" onClick={() => { setAnswers([]); setChecked(false) }}>Try again</button>
            </div>}
        </article>
        <p className="ilr-disclaimer">{ilrDisclaimer}</p>
      </div>
    )
  }

  const visibleResources = resources.filter((resource) =>
    (levelFilter === 'all' || resource.level === levelFilter)
    && (topicFilter === 'all' || resource.topic === topicFilter),
  )

  return (
    <div className="content">
      <div className="section-heading">
        <div><span className="eyebrow">LISTENING COMPREHENSION</span><h2>DLPT-style listening practice</h2><p>Listen to reports across politics, culture, sports, the economy, society, and science, then check your understanding in {language}.</p></div>
        <span className="question-count">{resources.length} listening passages</span>
      </div>
      <p className="ilr-disclaimer">{ilrDisclaimer}</p>
      <div className="dlpt-filters" aria-label="Filter DLPT listening passages">
        <div className="filters" aria-label="Filter by CEFR level">
          {(['all', ...levels] as const).map((level) => <button key={level} type="button" className={levelFilter === level ? 'active' : ''} onClick={() => setLevelFilter(level)}>{level === 'all' ? 'All levels' : level}</button>)}
        </div>
        <div className="filters" aria-label="Filter by topic">
          {(['all', ...topics] as const).map((topic) => <button key={topic} type="button" className={topicFilter === topic ? 'active' : ''} onClick={() => setTopicFilter(topic)}>{topic === 'all' ? 'All topics' : topic}</button>)}
        </div>
      </div>
      <div className="resource-grid">
        {visibleResources.map((resource) => (
          <article className="resource-card" key={resource.title} role="button" tabIndex={0} aria-label={`Start ${resource.title}`} onClick={() => openPractice(resource)} onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              openPractice(resource)
            }
          }}>
            <div className="resource-art listening"><span>♫</span></div>
            <div>
              <div className="resource-meta"><span>{resource.topic}</span><CourseLevelBadge level={resource.level as CourseLevel} /></div>
              <h3>{resource.title.replace(`${resource.level} `, '')}</h3>
              <p>{resource.description}</p>
              <div className="resource-footer"><small>{resource.comprehension?.length ?? 0} comprehension question</small><span className="resource-open">Listen & practise →</span></div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default DlptListeningTab
