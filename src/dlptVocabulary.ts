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

function isCourseLevel(value: unknown): value is CourseLevel {
  return typeof value === 'string' && courseLevels.some((level) => level === value)
}

export function getDlptVocabulary(language: LearningLanguage): VocabularyEntry[] {
  const rows = vocabularyData[language]

  return rows.map((row, index) => {
    if (!Array.isArray(row) || row.length !== 4) {
      throw new Error(`Invalid vocabulary record ${index} for ${language}`)
    }

    const [level, topic, english, target] = row
    if (!isCourseLevel(level) || typeof topic !== 'string' || typeof english !== 'string' || typeof target !== 'string') {
      throw new Error(`Invalid vocabulary fields in record ${index} for ${language}`)
    }

    return {
      spanish: target,
      english,
      lessonId: `dlpt-${language}-${index}`,
      lessonTitle: `DLPT · ${topic}`,
      level,
      topic,
    }
  })
}
