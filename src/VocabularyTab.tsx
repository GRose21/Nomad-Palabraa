import { useEffect, useMemo, useState } from 'react'
import { courseLevels, getVocabulary, type VocabularyEntry } from './vocabulary'
import { dlptDictionarySourceLabels } from './dlptVocabulary'
import AudioControl from './AudioControl'
import type { CourseLevel } from './learnCourse'

type VocabularyTabProps = {
  entries?: VocabularyEntry[]
  levels?: readonly CourseLevel[]
  language?: string
  speechStatus: 'idle' | 'playing' | 'paused'
  activeSpeechText: string
  activeSpeechLanguage: string
  onSpeak: (phrase: string) => void
}

type PracticeMode = 'flashcards' | 'quiz' | 'match'
type WordStatus = 'learning' | 'known'
type StatusFilter = 'all' | 'new' | WordStatus
type StatusMap = Record<string, WordStatus>

const statusFilters: Array<[StatusFilter, string]> = [
  ['all', 'All words'],
  ['new', 'New to me'],
  ['learning', 'Still learning'],
  ['known', 'Already know'],
]

const statusStorageKey = (language: string) => `nomad-vocab-status-${language}`

const readStatuses = (language: string): StatusMap => {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(statusStorageKey(language)) || '{}')
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    return Object.fromEntries(Object.entries(parsed).filter(([, value]) => value === 'learning' || value === 'known')) as StatusMap
  } catch {
    return {}
  }
}

type QuizQuestion = { entry: VocabularyEntry; options: string[]; answer: string }

const shuffle = <T,>(items: T[], seed: number): T[] => {
  const result = [...items]
  let currentSeed = Math.floor(((Math.sin(seed * 12.9898 + 78.233) * 43758.5453) % 1 + 1) % 1 * 2_147_483_645) + 1
  const random = () => {
    currentSeed = (currentSeed * 16_807) % 2_147_483_647
    return currentSeed / 2_147_483_647
  }
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }
  return result
}

const vocabularyKey = (entry: VocabularyEntry) =>
  `${entry.spanish.toLocaleLowerCase()}|${entry.english.toLocaleLowerCase()}`

function makeQuizQuestions(entries: VocabularyEntry[], pool: VocabularyEntry[], seed: number): QuizQuestion[] {
  return entries.map((entry, index) => {
    const questionSeed = seed + index
    const distractors = shuffle(pool.filter((candidate) =>
      candidate.english.toLocaleLowerCase() !== entry.english.toLocaleLowerCase(),
    ), questionSeed + 1).slice(0, 3).map((candidate) => candidate.english)

    return {
      entry,
      options: shuffle([...new Set([entry.english, ...distractors])], questionSeed + 2),
      answer: entry.english,
    }
  })
}

function VocabularyTab({
  entries,
  levels = courseLevels,
  language = 'Spanish',
  speechStatus,
  activeSpeechText,
  activeSpeechLanguage,
  onSpeak,
}: VocabularyTabProps) {
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState<'all' | CourseLevel>('all')
  const [topicFilter, setTopicFilter] = useState('all')
  const [page, setPage] = useState(0)
  const [revealedEntries, setRevealedEntries] = useState<string[]>([])
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('flashcards')
  const [practiceRound, setPracticeRound] = useState(() => Math.random())
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [statuses, setStatuses] = useState<StatusMap>(() => readStatuses(language))
  const [roundStatuses, setRoundStatuses] = useState<StatusMap>(statuses)
  const [quizAnswers, setQuizAnswers] = useState<Array<{ correct: boolean; choice: string }>>([])
  const [quizIndex, setQuizIndex] = useState(0)
  const [flashcardIndex, setFlashcardIndex] = useState(0)
  const [flashcardRevealed, setFlashcardRevealed] = useState(false)
  const [knownCount, setKnownCount] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const [matchFeedback, setMatchFeedback] = useState('')
  const vocabulary = useMemo(() => entries ?? getVocabulary(), [entries])
  useEffect(() => {
    try { localStorage.setItem(statusStorageKey(language), JSON.stringify(statuses)) } catch { /* storage unavailable */ }
  }, [language, statuses])
  const statusOf = (entry: VocabularyEntry): StatusFilter => statuses[vocabularyKey(entry)] ?? 'new'
  const setStatus = (entry: VocabularyEntry, status: WordStatus | 'new') => setStatuses((current) => {
    const next = { ...current }
    if (status === 'new') delete next[vocabularyKey(entry)]
    else next[vocabularyKey(entry)] = status
    return next
  })
  const statusCounts = useMemo(() => {
    const counts = { all: vocabulary.length, new: 0, learning: 0, known: 0 }
    for (const entry of vocabulary) counts[statuses[vocabularyKey(entry)] ?? 'new'] += 1
    return counts
  }, [statuses, vocabulary])
  const targetLanguageCode = language === 'Mandarin Chinese' ? 'zh-CN'
    : language === 'Modern Standard Arabic' ? 'ar'
      : language === 'Russian' ? 'ru-RU'
        : language === 'Italian' ? 'it-IT'
          : 'es-ES'
  const targetDirection = language === 'Modern Standard Arabic' ? 'rtl' : 'auto'
  const availableTopics = useMemo(
    () => [...new Set(vocabulary.flatMap((entry) => entry.topic ? [entry.topic] : []))].sort((a, b) => a.localeCompare(b)),
    [vocabulary],
  )
  // Statuses are read when a round starts so marking words mid-round doesn't reshuffle it.
  const practicePool = useMemo(() => vocabulary.filter((entry) =>
    (levelFilter === 'all' || entry.level === levelFilter)
    && (topicFilter === 'all' || entry.topic === topicFilter)
    && (statusFilter === 'all' || (roundStatuses[vocabularyKey(entry)] ?? 'new') === statusFilter),
  ), [levelFilter, topicFilter, statusFilter, vocabulary, roundStatuses])
  const practiceEntries = useMemo(() => shuffle(practicePool, practiceRound).slice(0, 10), [practicePool, practiceRound])
  const quizQuestions = useMemo(() => makeQuizQuestions(practiceEntries, practicePool, practiceRound), [practiceEntries, practicePool, practiceRound])
  const matchEntries = useMemo(() => shuffle(practicePool, practiceRound + 0.5).slice(0, 4), [practicePool, practiceRound])
  const matchTargetEntries = useMemo(() => shuffle(matchEntries, practiceRound + 0.7), [matchEntries, practiceRound])
  const matchEnglishEntries = useMemo(() => shuffle(matchEntries, practiceRound + 0.8), [matchEntries, practiceRound])
  const visibleEntries = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase()
    return vocabulary.filter((entry) => {
      const matchesLevel = levelFilter === 'all' || entry.level === levelFilter
      const matchesTopic = topicFilter === 'all' || entry.topic === topicFilter
      const matchesSearch = !normalizedSearch || `${entry.spanish} ${entry.english} ${entry.sense ?? ''} ${entry.lessonTitle}`.toLocaleLowerCase().includes(normalizedSearch)
      const matchesStatus = statusFilter === 'all' || (statuses[vocabularyKey(entry)] ?? 'new') === statusFilter
      return matchesLevel && matchesTopic && matchesSearch && matchesStatus
    })
  }, [levelFilter, search, statusFilter, statuses, topicFilter, vocabulary])
  const pageSize = 48
  const pageCount = Math.ceil(visibleEntries.length / pageSize)
  const pageEntries = visibleEntries.slice(page * pageSize, (page + 1) * pageSize)

  const resetProgress = () => {
    setQuizAnswers([])
    setQuizIndex(0)
    setFlashcardIndex(0)
    setFlashcardRevealed(false)
    setKnownCount(0)
    setMatchedPairs([])
    setSelectedMatch(null)
    setMatchFeedback('')
  }

  const toggleEntry = (entry: VocabularyEntry) => {
    const key = `${entry.lessonId}:${entry.spanish}`
    setRevealedEntries((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key])
  }

  const resetPractice = () => {
    setPracticeRound(Math.random())
    setRoundStatuses(statuses)
    resetProgress()
  }

  const changeLevelFilter = (level: 'all' | CourseLevel) => {
    setLevelFilter(level)
    setPage(0)
    resetPractice()
  }

  const changeStatusFilter = (status: StatusFilter) => {
    setStatusFilter(status)
    setPage(0)
    resetPractice()
  }

  const changeTopicFilter = (topic: string) => {
    setTopicFilter(topic)
    setPage(0)
    resetPractice()
  }

  const changePracticeMode = (mode: PracticeMode) => {
    setPracticeMode(mode)
    resetPractice()
  }

  const answerMatch = (englishKey: string) => {
    if (!selectedMatch || matchedPairs.includes(englishKey)) return
    if (selectedMatch === englishKey) {
      setMatchedPairs((current) => [...current, englishKey])
      setMatchFeedback('Correct match.')
      setSelectedMatch(null)
      return
    }
    setMatchFeedback('Not a match yet. Try another translation.')
  }

  const currentQuizQuestion = quizQuestions[quizIndex]
  const currentFlashcard = practiceEntries[flashcardIndex]
  const quizScore = quizAnswers.filter((answer) => answer?.correct).length
  const matchComplete = matchEntries.length > 0 && matchedPairs.length === matchEntries.length
  const renderAudioControl = (entry: VocabularyEntry, label = 'Listen to word') => (
    <div className="vocabulary-audio">
      <AudioControl
        phrase={entry.spanish}
        language={language}
        status={speechStatus}
        isCurrent={activeSpeechText === entry.spanish && activeSpeechLanguage === targetLanguageCode}
        onActivate={onSpeak}
        label={label}
      />
    </div>
  )

  return (
    <div className="content vocabulary-page">
      <div className="section-heading">
        <div><span className="eyebrow">LESSON + DLPT VOCABULARY</span><h2>Words in context</h2><p>Explore more than 1,000 DLPT-oriented words for {language}. Reveal a word to see its dictionary-checked sense and sources, alongside terms from lessons and the learning path.</p></div>
        <span className="question-count">{visibleEntries.length} of {vocabulary.length} entries</span>
      </div>
      <div className="vocabulary-controls">
        <label className="vocabulary-search"><span>Search vocabulary</span><input type="search" value={search} onChange={(event) => { setSearch(event.target.value); setPage(0) }} placeholder={`Search ${language}, English, or topic`} /></label>
        <div className="filters" aria-label="Filter vocabulary by CEFR level">
          {(['all', ...levels] as const).map((filter) => <button key={filter} className={levelFilter === filter ? 'active' : ''} aria-pressed={levelFilter === filter} onClick={() => changeLevelFilter(filter)}>{filter === 'all' ? 'All levels' : filter}</button>)}
        </div>
        <div className="filters vocabulary-status-filters" aria-label="Filter vocabulary by progress">
          {statusFilters.map(([filter, label]) => <button key={filter} className={statusFilter === filter ? 'active' : ''} aria-pressed={statusFilter === filter} onClick={() => changeStatusFilter(filter)}>{label} <span className="vocabulary-count">{statusCounts[filter]}</span></button>)}
        </div>
      </div>

      <section className="vocabulary-practice" aria-label="Vocabulary practice games">
        <div className="vocabulary-practice-heading">
          <div><span className="eyebrow">PRACTICE</span><h3>Test your vocabulary</h3><p>{practicePool.length} entries available · choose a level and topic to focus your practice.</p></div>
          <button className="secondary-button" onClick={resetPractice}>New round</button>
        </div>
        <div className="vocabulary-game-controls">
          <label><span>Practice level</span><select value={levelFilter} onChange={(event) => changeLevelFilter(event.target.value as 'all' | CourseLevel)}>
            <option value="all">All levels</option>
            {levels.map((level) => <option key={level} value={level}>{level}</option>)}
          </select></label>
          <label><span>DLPT topic</span><select value={topicFilter} onChange={(event) => changeTopicFilter(event.target.value)}>
            <option value="all">All topics</option>
            {availableTopics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
          </select></label>
          <div className="vocabulary-mode-picker" aria-label="Practice mode">
            {([
              ['flashcards', 'Flashcards'],
              ['quiz', 'Quick quiz'],
              ['match', 'Match pairs'],
            ] as const).map(([mode, title]) => <button key={mode} className={practiceMode === mode ? 'active' : ''} aria-pressed={practiceMode === mode} onClick={() => changePracticeMode(mode)}>{title}</button>)}
          </div>
        </div>

        {!practicePool.length ? <p className="vocabulary-empty">No words are available for that level and topic. Try another combination.</p> : (
          <div className="vocabulary-game">
            {practiceMode === 'flashcards' && (currentFlashcard ? <>
              <div className="vocabulary-game-progress"><span>Card {flashcardIndex + 1} of {practiceEntries.length}</span><span>{knownCount} marked “know it”</span></div>
              <div className="vocabulary-flashcard">
                <span>{currentFlashcard.level}{currentFlashcard.topic ? ` · ${currentFlashcard.topic}` : ''}</span>
                <strong lang={targetLanguageCode} dir={targetDirection}>{currentFlashcard.spanish}</strong>
                {renderAudioControl(currentFlashcard)}
                {flashcardRevealed ? <>
                  <p>{currentFlashcard.english}</p>
                  {currentFlashcard.sense && <small className="vocabulary-sense">{currentFlashcard.sense}</small>}
                  {currentFlashcard.dictionarySources && <small className="vocabulary-evidence">Cross-checked in {currentFlashcard.dictionarySources.map((source) => dlptDictionarySourceLabels[source]).join(' · ')}</small>}
                </> : <button className="secondary-button" onClick={() => setFlashcardRevealed(true)}>Reveal meaning</button>}
              </div>
              {flashcardRevealed && <div className="vocabulary-game-actions">
                <button className="secondary-button" onClick={() => { setStatus(currentFlashcard, 'learning'); setFlashcardIndex((index) => index + 1); setFlashcardRevealed(false) }}>Still learning</button>
                <button className="primary-button" onClick={() => { setStatus(currentFlashcard, 'known'); setKnownCount((count) => count + 1); setFlashcardIndex((index) => index + 1); setFlashcardRevealed(false) }}>Know it</button>
              </div>}
            </> : <div className="vocabulary-game-result"><strong>Round complete</strong><p>You marked {knownCount} of {practiceEntries.length} cards as known.</p><button className="secondary-button" onClick={resetPractice}>Practice again</button></div>)}

            {practiceMode === 'quiz' && (currentQuizQuestion ? <>
              <div className="vocabulary-game-progress"><span>Question {quizIndex + 1} of {quizQuestions.length}</span><span>Score: {quizScore}</span></div>
              <div className="vocabulary-quiz-question">
                <span>Choose the English meaning</span>
                <strong lang={targetLanguageCode} dir={targetDirection}>{currentQuizQuestion.entry.spanish}</strong>
                {renderAudioControl(currentQuizQuestion.entry)}
              </div>
              <div className="vocabulary-quiz-options">
                {currentQuizQuestion.options.map((option) => {
                  const answer = quizAnswers[quizIndex]
                  const answered = answer !== undefined
                  const isAnswer = option === currentQuizQuestion.answer
                  const isCorrectChoice = answered && isAnswer
                  const isIncorrectChoice = answered && !answer.correct && option === answer.choice
                  return <button
                    key={option}
                    className={`${isCorrectChoice ? 'correct' : ''}${isIncorrectChoice ? ' incorrect' : ''}`}
                    disabled={answered}
                    onClick={() => {
                      const correct = option === currentQuizQuestion.answer
                      setQuizAnswers((current) => {
                        const next = [...current]
                        next[quizIndex] = { correct, choice: option }
                        return next
                      })
                      setStatus(currentQuizQuestion.entry, correct ? 'known' : 'learning')
                    }}
                  >{option}</button>
                })}
              </div>
              {quizAnswers[quizIndex] !== undefined && <div className="vocabulary-game-actions">
                <p className="vocabulary-answer-feedback" role="status">{quizAnswers[quizIndex].correct ? 'Correct!' : `The answer is “${currentQuizQuestion.answer}”.`}</p>
                <button className="primary-button" onClick={() => setQuizIndex((index) => index + 1)}>{quizIndex + 1 === quizQuestions.length ? 'See results' : 'Next word'}</button>
              </div>}
            </> : <div className="vocabulary-game-result"><strong>Quiz complete</strong><p>You answered {quizScore} of {quizQuestions.length} correctly.</p><button className="secondary-button" onClick={resetPractice}>Try another round</button></div>)}

            {practiceMode === 'match' && (matchComplete ? <div className="vocabulary-game-result"><strong>All matched!</strong><p>You matched {matchEntries.length} target-language words with their English meanings.</p><button className="secondary-button" onClick={resetPractice}>Play again</button></div> : matchEntries.length >= 2 ? <>
              <div className="vocabulary-game-progress"><span>Match each word with its meaning</span><span>{matchedPairs.length} of {matchEntries.length} matched</span></div>
              <div className="vocabulary-match-grid">
                <div><h4>{language}</h4>{matchTargetEntries.map((entry) => {
                  const key = vocabularyKey(entry)
                  const matched = matchedPairs.includes(key)
                  return <div className="vocabulary-match-target-row" key={key}>
                    <button lang={targetLanguageCode} dir={targetDirection} className={`${selectedMatch === key ? 'selected' : ''}${matched ? ' matched' : ''}`} disabled={matched} aria-pressed={selectedMatch === key} onClick={() => { setSelectedMatch(key); setMatchFeedback('') }}>{entry.spanish}</button>
                    {renderAudioControl(entry)}
                  </div>
                })}</div>
                <div><h4>English</h4>{matchEnglishEntries.map((entry) => {
                  const key = vocabularyKey(entry)
                  const matched = matchedPairs.includes(key)
                  return <button key={key} className={matched ? 'matched' : ''} disabled={matched} onClick={() => answerMatch(key)}>{entry.english}</button>
                })}</div>
              </div>
              <p className="vocabulary-match-feedback" role="status">{matchFeedback || 'Select a word, then select its English meaning.'}</p>
            </> : <p className="vocabulary-empty">Matching needs at least two words in this level and topic. Choose another level or topic.</p>)}
          </div>
        )}
      </section>

      {visibleEntries.length ? <div className="vocabulary-grid">
        {pageEntries.map((entry) => {
          const key = `${entry.lessonId}:${entry.spanish}`
          const isRevealed = revealedEntries.includes(key)
          return <div className="vocabulary-card-item" key={key}>
            <button className={`vocabulary-card${isRevealed ? ' revealed' : ''}`} onClick={() => toggleEntry(entry)} aria-expanded={isRevealed}>
              <span className="vocabulary-meta"><span>{entry.level}{entry.topic ? ` · ${entry.topic}` : ''}</span><span>{isRevealed ? 'MEANING' : 'TAP TO REVEAL'}</span></span>
              <strong lang={targetLanguageCode} dir={targetDirection}>{entry.spanish}</strong>
              {isRevealed && <>
                <span className="vocabulary-translation">{entry.english}</span>
                {entry.sense && <span className="vocabulary-sense">{entry.sense}</span>}
                {entry.dictionarySources && <span className="vocabulary-evidence">Cross-checked in {entry.dictionarySources.map((source) => dlptDictionarySourceLabels[source]).join(' · ')}</span>}
              </>}
              <span className="vocabulary-source">{entry.lessonTitle}</span>
            </button>
            <div className="vocabulary-card-actions">
              {(['new', 'learning', 'known'] as const).map((status) => <button key={status} className={`vocabulary-status-button ${status}${statusOf(entry) === status ? ' active' : ''}`} aria-pressed={statusOf(entry) === status} onClick={() => setStatus(entry, status)}>{status === 'new' ? 'New' : status === 'learning' ? 'Learning' : 'Known'}</button>)}
              {renderAudioControl(entry)}
            </div>
          </div>
        })}
      </div> : <p className="vocabulary-empty">No vocabulary matches those filters. Try another word, level, topic, or progress filter.</p>}
      {pageCount > 1 && <nav className="vocabulary-pagination" aria-label="Vocabulary pages">
        <button className="secondary-button" disabled={page === 0} onClick={() => setPage((current) => current - 1)}>Previous</button>
        <span>Page {page + 1} of {pageCount} · {pageEntries.length} entries shown</span>
        <button className="secondary-button" disabled={page + 1 >= pageCount} onClick={() => setPage((current) => current + 1)}>Next</button>
      </nav>}
    </div>
  )
}

export default VocabularyTab
