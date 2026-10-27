import { useMemo, useRef, useState } from 'react'
import AudioControl from './AudioControl'
import { buildCharacterBank, buildWritingItems, checkWritingAnswer, getKeyboardRows, type AnswerResult, type WritingItem, type WritingMode } from './writing'
import type { VocabularyEntry } from './vocabulary'
import type { CourseLevel } from './learnCourse'

type WritingTabProps = {
  entries: VocabularyEntry[]
  levels: readonly CourseLevel[]
  language: string
  langCode: string
  dir: 'ltr' | 'rtl' | 'auto'
  speechStatus: 'idle' | 'playing' | 'paused'
  activeSpeechText: string
  activeSpeechLanguage: string
  onSpeak: (phrase: string) => void
}

type Round = { items: WritingItem[]; index: number; results: Array<{ item: WritingItem; given: string; result: AnswerResult }> }

const modes: Array<[WritingMode, string, string]> = [
  ['cloze', 'Fill in the blank', 'Complete the sentence with the missing word.'],
  ['translate', 'Translate', 'Write the word or phrase in the language you are learning.'],
  ['dictation', 'Dictation', 'Listen and write what you hear.'],
]
const keyboardPreferenceKey = 'nomad-writing-keyboard'
const roundSize = 10

function WritingTab({ entries, levels, language, langCode, dir, speechStatus, activeSpeechText, activeSpeechLanguage, onSpeak }: WritingTabProps) {
  const [mode, setMode] = useState<WritingMode>('cloze')
  const [level, setLevel] = useState<'all' | CourseLevel>('all')
  const [round, setRound] = useState<Round | null>(null)
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState<AnswerResult | null>(null)
  const [keyboardOpen, setKeyboardOpen] = useState(() => localStorage.getItem(keyboardPreferenceKey) === 'on')
  const [bankSeed, setBankSeed] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const pool = useMemo(() => entries.filter((entry) => level === 'all' || entry.level === level), [entries, level])
  const item = round && round.index < round.items.length ? round.items[round.index] : null
  const rows = getKeyboardRows(language)
  const characterBank = useMemo(
    () => (language === 'Mandarin Chinese' && item ? buildCharacterBank(item.answers, pool.map((entry) => entry.spanish)) : []),
    // bankSeed forces a fresh bank only when the question changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language, item?.id, bankSeed, pool],
  )

  const startRound = () => {
    const items = buildWritingItems(pool, mode, language, roundSize)
    setRound({ items, index: 0, results: [] })
    setValue('')
    setChecked(null)
    setBankSeed((seed) => seed + 1)
  }

  const toggleKeyboard = () => {
    const next = !keyboardOpen
    setKeyboardOpen(next)
    localStorage.setItem(keyboardPreferenceKey, next ? 'on' : 'off')
  }

  const insert = (text: string) => {
    if (checked) return
    const input = inputRef.current
    const start = input?.selectionStart ?? value.length
    const end = input?.selectionEnd ?? value.length
    setValue(`${value.slice(0, start)}${text}${value.slice(end)}`)
    requestAnimationFrame(() => {
      input?.focus()
      const caret = start + text.length
      input?.setSelectionRange(caret, caret)
    })
  }

  const backspace = () => {
    if (checked) return
    const input = inputRef.current
    const start = input?.selectionStart ?? value.length
    const end = input?.selectionEnd ?? value.length
    const characters = Array.from(value.slice(0, start))
    const nextStart = end > start ? start : start - (characters.length > 0 ? characters[characters.length - 1].length : 0)
    setValue(`${value.slice(0, nextStart)}${value.slice(end)}`)
    requestAnimationFrame(() => {
      input?.focus()
      input?.setSelectionRange(nextStart, nextStart)
    })
  }

  const check = () => {
    if (!item || !round || checked) return
    const result = checkWritingAnswer(value, item.answers)
    setChecked(result)
    setRound({ ...round, results: [...round.results, { item, given: value, result }] })
  }

  const next = () => {
    if (!round) return
    setRound({ ...round, index: round.index + 1 })
    setValue('')
    setChecked(null)
    setBankSeed((seed) => seed + 1)
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const correctCount = round ? round.results.filter((entry) => entry.result !== 'wrong').length : 0
  const missed = round ? round.results.filter((entry) => entry.result === 'wrong') : []
  const modeInfo = modes.find(([id]) => id === mode)

  return (
    <div className="content writing-tab">
      <div className="section-heading">
        <div><span className="eyebrow">WRITING PRACTICE</span><h2>Write in {language}</h2><p>Practice fill-in-the-blank, translation, and dictation. Questions are shuffled every round, and answers use the {language} script only.</p></div>
      </div>

      <section className="writing-setup" aria-label="Writing options">
        <div className="writing-modes" role="group" aria-label="Exercise type">
          {modes.map(([id, label]) => <button key={id} className={mode === id ? 'filter-button active' : 'filter-button'} aria-pressed={mode === id} onClick={() => { setMode(id); setRound(null) }}>{label}</button>)}
        </div>
        <label className="writing-level">Level
          <select value={level} onChange={(event) => { setLevel(event.target.value as 'all' | CourseLevel); setRound(null) }}>
            <option value="all">All levels</option>
            {levels.map((entry) => <option key={entry} value={entry}>{entry}</option>)}
          </select>
        </label>
        <button className="secondary-button" aria-pressed={keyboardOpen} onClick={toggleKeyboard}>{keyboardOpen ? 'Hide on-screen keyboard' : 'Show on-screen keyboard'}</button>
      </section>

      <section className="writing-card">
        {!round && (
          <div className="writing-start">
            <h3>{modeInfo?.[1]}</h3>
            <p>{modeInfo?.[2]}</p>
            <button className="primary-button" onClick={startRound} disabled={pool.length === 0}>Start a round of {roundSize}</button>
            {pool.length === 0 && <p>No vocabulary is available for this level yet.</p>}
          </div>
        )}

        {round && item && (
          <div className="writing-question">
            <div className="quiz-meta"><span>{modeInfo?.[1].toLocaleUpperCase()}</span><span>{round.index + 1} / {round.items.length}</span></div>
            <div className="quiz-progress"><span style={{ width: `${(round.index / round.items.length) * 100}%` }} /></div>
            {item.mode === 'dictation' ? (
              <div className="writing-dictation">
                <p>{item.prompt}</p>
                <AudioControl phrase={item.audio ?? item.answers[0]} language={langCode} status={speechStatus} isCurrent={activeSpeechText === item.audio && activeSpeechLanguage === langCode} onActivate={onSpeak} label="Play sentence" />
              </div>
            ) : (
              <h3 className="writing-prompt" lang={item.mode === 'cloze' ? langCode : 'en'} dir={item.mode === 'cloze' ? dir : 'ltr'}>{item.prompt}</h3>
            )}
            {item.mode === 'cloze' && <p className="writing-hint">Meaning: {item.hint}</p>}
            {item.mode === 'translate' && <p className="writing-hint">{item.hint}</p>}
            <form className="writing-form" onSubmit={(event) => { event.preventDefault(); if (checked) next(); else check() }}>
              <input
                ref={inputRef}
                className="writing-input"
                value={value}
                lang={langCode}
                dir={dir}
                onChange={(event) => setValue(event.target.value)}
                readOnly={checked !== null}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Your answer"
                placeholder={item.mode === 'cloze' ? 'Missing word' : `Type in ${language}`}
              />
              {!checked && <button className="primary-button" disabled={value.trim().length === 0}>Check</button>}
              {checked && <button className="primary-button">{round.index === round.items.length - 1 ? 'See results' : 'Next →'}</button>}
            </form>

            {keyboardOpen && (
              <div className="onscreen-keyboard" lang={langCode} dir={dir} role="group" aria-label={`${language} on-screen keyboard`}>
                {language === 'Mandarin Chinese' ? (
                  <div className="keyboard-row character-bank">
                    {characterBank.map((character) => <button type="button" key={character} onClick={() => insert(character)}>{character}</button>)}
                  </div>
                ) : rows.map((row, rowIndex) => (
                  <div className="keyboard-row" key={rowIndex}>
                    {row.map((key) => <button type="button" key={key} onClick={() => insert(key)}>{/\p{M}/u.test(key) ? `\u25CC${key}` : key}</button>)}
                  </div>
                ))}
                <div className="keyboard-row keyboard-actions">
                  <button type="button" className="wide" onClick={() => insert(' ')}>Space</button>
                  <button type="button" onClick={backspace} aria-label="Backspace">⌫</button>
                  <button type="button" onClick={() => { setValue(''); inputRef.current?.focus() }}>Clear</button>
                </div>
              </div>
            )}

            {checked && (
              <div className={checked === 'wrong' ? 'writing-feedback wrong' : 'writing-feedback correct'} role="status">
                <strong>{checked === 'correct' ? 'Correct!' : checked === 'accent' ? 'Correct — check the accents.' : 'Not quite.'}</strong>
                <p lang={langCode} dir={dir}>{checked === 'wrong' ? 'Answer: ' : 'Full answer: '}{item.mode === 'cloze' ? item.prompt.replace('＿＿＿', item.answers[0]) : item.answers[0]}</p>
              </div>
            )}
          </div>
        )}

        {round && !item && (
          <div className="writing-results">
            <span className="eyebrow">ROUND COMPLETE</span>
            <h3>{correctCount} of {round.items.length} correct</h3>
            {missed.length > 0 ? (
              <>
                <p>Review what to practise:</p>
                <ol className="writing-review">
                  {missed.map(({ item: missedItem, given }) => (
                    <li key={missedItem.id}>
                      <strong lang={missedItem.mode === 'cloze' ? langCode : 'en'} dir={missedItem.mode === 'cloze' ? dir : 'ltr'}>{missedItem.prompt}</strong>
                      <p lang={langCode} dir={dir}>Your answer: {given || '—'}</p>
                      <p lang={langCode} dir={dir}>Correct: {missedItem.answers[0]}</p>
                    </li>
                  ))}
                </ol>
              </>
            ) : <p>Perfect round — nicely done!</p>}
            <button className="primary-button" onClick={startRound}>New round</button>
          </div>
        )}
      </section>
    </div>
  )
}

export default WritingTab
