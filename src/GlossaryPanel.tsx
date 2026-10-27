import { useState } from 'react'
import { findGlossaryTerms, glossaryExample, glossaryTerms } from './glossary'

type KeyTermsProps = { text: string; language: string; langCode: string; dir: 'ltr' | 'rtl' | 'auto' }

export function KeyTerms({ text, language, langCode, dir }: KeyTermsProps) {
  const terms = findGlossaryTerms(text)
  if (terms.length === 0) return null
  return (
    <aside className="key-terms" aria-label="Key grammar terms">
      <span className="eyebrow">KEY TERMS</span>
      <dl>
        {terms.map((entry) => {
          const example = glossaryExample(entry, language)
          const targetExample = entry.examples?.[language] !== undefined
          return (
            <div key={entry.term}>
              <dt>{entry.term}</dt>
              <dd>{entry.definition}<em lang={targetExample ? langCode : 'en'} dir={targetExample ? dir : 'ltr'}>e.g. {example}</em></dd>
            </div>
          )
        })}
      </dl>
    </aside>
  )
}

type GlossaryProps = { language: string; langCode: string; dir: 'ltr' | 'rtl' | 'auto' }

export function GrammarGlossary({ language, langCode, dir }: GlossaryProps) {
  const [query, setQuery] = useState('')
  const needle = query.trim().toLocaleLowerCase()
  const matches = glossaryTerms.filter((entry) => !needle || entry.term.toLocaleLowerCase().includes(needle) || entry.definition.toLocaleLowerCase().includes(needle))
  return (
    <details className="glossary-card">
      <summary><span className="eyebrow">GRAMMAR GLOSSARY</span> What do terms like “preterite” and “subjunctive” mean?</summary>
      <label className="glossary-search">Search terms
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. subjunctive" />
      </label>
      <dl className="glossary-list">
        {matches.map((entry) => {
          const targetExample = entry.examples?.[language] !== undefined
          return (
            <div key={entry.term}>
              <dt>{entry.term}</dt>
              <dd>{entry.definition}<em lang={targetExample ? langCode : 'en'} dir={targetExample ? dir : 'ltr'}>e.g. {glossaryExample(entry, language)}</em></dd>
            </div>
          )
        })}
        {matches.length === 0 && <p>No matching terms.</p>}
      </dl>
    </details>
  )
}
