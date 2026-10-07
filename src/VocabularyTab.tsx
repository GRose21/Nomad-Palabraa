import { useMemo, useState } from 'react'
import { courseLevels, getVocabulary, type VocabularyEntry } from './vocabulary'
import type { CourseLevel } from './learnCourse'

type VocabularyTabProps = {
  entries?: VocabularyEntry[]
  levels?: readonly CourseLevel[]
  language?: string
}

function VocabularyTab({ entries, levels = courseLevels, language = 'Spanish' }: VocabularyTabProps) {
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState<'all' | CourseLevel>('all')
  const [revealedEntries, setRevealedEntries] = useState<string[]>([])
  const vocabulary = useMemo(() => entries ?? getVocabulary(), [entries])
  const targetLanguageCode = language === 'Mandarin Chinese' ? 'zh-CN'
    : language === 'Modern Standard Arabic' ? 'ar'
      : language === 'Russian' ? 'ru-RU'
        : language === 'Italian' ? 'it-IT'
          : 'es-ES'
  const targetDirection = language === 'Modern Standard Arabic' ? 'rtl' : 'auto'
  const visibleEntries = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase()
    return vocabulary.filter((entry) => {
      const matchesLevel = levelFilter === 'all' || entry.level === levelFilter
      const matchesSearch = !normalizedSearch || `${entry.spanish} ${entry.english} ${entry.lessonTitle}`.toLocaleLowerCase().includes(normalizedSearch)
      return matchesLevel && matchesSearch
    })
  }, [levelFilter, search, vocabulary])

  const toggleEntry = (entry: VocabularyEntry) => {
    const key = `${entry.lessonId}:${entry.spanish}`
    setRevealedEntries((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key])
  }

  return (
    <div className="content vocabulary-page">
      <div className="section-heading">
        <div><span className="eyebrow">LESSON VOCABULARY</span><h2>Words in context</h2><p>Review {language} vocabulary from grammar lessons and the complete Pre-A1–C2 learning path. New lesson words appear automatically.</p></div>
        <span className="question-count">{visibleEntries.length} of {vocabulary.length} phrases</span>
      </div>
      <div className="vocabulary-controls">
        <label className="vocabulary-search"><span>Search vocabulary</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${language}, English, or lesson`} /></label>
        <div className="filters" aria-label="Filter vocabulary by CEFR level">
          {(['all', ...levels] as const).map((filter) => <button key={filter} className={levelFilter === filter ? 'active' : ''} onClick={() => setLevelFilter(filter)}>{filter === 'all' ? 'All levels' : filter}</button>)}
        </div>
      </div>
      {visibleEntries.length ? <div className="vocabulary-grid">
        {visibleEntries.map((entry) => {
          const key = `${entry.lessonId}:${entry.spanish}`
          const isRevealed = revealedEntries.includes(key)
          return <button className={`vocabulary-card${isRevealed ? ' revealed' : ''}`} key={key} onClick={() => toggleEntry(entry)} aria-expanded={isRevealed}>
            <span className="vocabulary-meta"><span>{entry.level}</span><span>{isRevealed ? 'MEANING' : 'TAP TO REVEAL'}</span></span>
            <strong lang={targetLanguageCode} dir={targetDirection}>{entry.spanish}</strong>
            {isRevealed && <span className="vocabulary-translation">{entry.english}</span>}
            <span className="vocabulary-source">{entry.lessonTitle}</span>
          </button>
        })}
      </div> : <p className="vocabulary-empty">No vocabulary matches that search. Try another word or level.</p>}
    </div>
  )
}

export default VocabularyTab
