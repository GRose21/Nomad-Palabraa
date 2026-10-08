import vocabularyData from './dlptVocabularyData.json' with { type: 'json' }
import type { LearningLanguage } from './extraLanguages.ts'
import { courseLevels, type VocabularyEntry } from './vocabulary.ts'
import type { CourseLevel } from './learnCourse.ts'

export const dlptVocabularyTopics = [
  'DLPT core',
  'Politics & government',
  'Economy & trade',
  'Security & international affairs',
  'Society & education',
  'Health',
  'Environment & agriculture',
  'Science & technology',
  'Culture & media',
  'Geography & disasters',
  'Sports',
] as const

export const dlptDictionarySourceLabels: Record<string, string> = {
  'PWN-3.0': 'Princeton WordNet 3.0',
  'MCR-SPA': 'Multilingual Central Repository (Spanish)',
  'MWN-ITA': 'MultiWordNet (Italian)',
  'IWN-ITA': 'ItalWordNet',
  'COW-CMN': 'Chinese Open Wordnet',
  'AWN-ARB': 'Arabic WordNet',
  'WIKT-RUS': 'Wiktionary-derived Russian Wordnet',
  GTX: 'Google Translate',
}

export const dlptDictionarySourceIds: Record<LearningLanguage, readonly string[]> = {
  Spanish: ['PWN-3.0', 'MCR-SPA'],
  Italian: ['PWN-3.0', 'MWN-ITA', 'IWN-ITA'],
  'Mandarin Chinese': ['PWN-3.0', 'COW-CMN'],
  'Modern Standard Arabic': ['PWN-3.0', 'AWN-ARB'],
  Russian: ['PWN-3.0', 'WIKT-RUS'],
}

function isCourseLevel(value: unknown): value is CourseLevel {
  return typeof value === 'string' && courseLevels.some((level) => level === value)
}

export function getDlptVocabulary(language: LearningLanguage): VocabularyEntry[] {
  const rows = vocabularyData[language]

  return rows.map((row, index) => {
    if (!Array.isArray(row) || row.length !== 6) {
      throw new Error(`Invalid vocabulary record ${index} for ${language}`)
    }

    const [level, topic, english, target, sense, dictionarySources] = row
    if (
      !isCourseLevel(level)
      || typeof topic !== 'string'
      || typeof english !== 'string'
      || typeof target !== 'string'
      || typeof sense !== 'string'
      || !sense.trim()
      || !Array.isArray(dictionarySources)
      || !dictionarySources.length
      || !dictionarySources.every((source) => typeof source === 'string' && source in dlptDictionarySourceLabels)
      || (dictionarySources.length > 1 && !dlptDictionarySourceIds[language].every((source) => dictionarySources.includes(source)))
    ) {
      throw new Error(`Invalid vocabulary fields in record ${index} for ${language}`)
    }

    return {
      spanish: target,
      english,
      lessonId: `dlpt-${language}-${index}`,
      lessonTitle: `DLPT · ${topic}`,
      level,
      topic,
      sense,
      dictionarySources,
    }
  })
}
