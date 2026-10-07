import { grammarLessons, grammarLevels, type GrammarLesson, type GrammarLevel } from './grammar.ts'
import { courseLevels, lessonSupport, starterLessons, supplementalLessons, type CourseLevel } from './learnCourse.ts'

export type VocabularyEntry = {
  spanish: string
  english: string
  lessonId: string
  lessonTitle: string
  level: CourseLevel
}

export function getVocabulary(
  lessons: GrammarLesson[] = grammarLessons,
  starters = starterLessons,
  supports: Record<string, typeof lessonSupport[string]> = lessonSupport,
  supplements = supplementalLessons,
): VocabularyEntry[] {
  const entries = new Map<string, VocabularyEntry>()
  const addEntry = (entry: VocabularyEntry) => {
    const key = `${entry.spanish.toLocaleLowerCase()}|${entry.english.toLocaleLowerCase()}`
    if (!entries.has(key)) entries.set(key, entry)
  }

  for (const lesson of lessons) {
    for (const section of lesson.sections) {
      for (const example of section.examples) {
        const separatorIndex = example.indexOf(' — ')
        if (separatorIndex < 1) continue

        const spanish = example.slice(0, separatorIndex).trim()
        const english = example.slice(separatorIndex + 3).trim()
        if (!spanish || !english) continue

        addEntry({ spanish, english, lessonId: lesson.id, lessonTitle: lesson.title, level: lesson.level })
      }
    }
  }

  for (const lesson of starters) {
    for (const word of lesson.vocabulary) {
      addEntry({ ...word, lessonId: `pre-a1-${lesson.title}`, lessonTitle: lesson.title, level: 'Pre-A1' })
    }
  }

  const lessonLevels: Record<string, GrammarLevel> = {
    'Everyday phrases': 'A1',
    'Listen to simple stories': 'A1',
    'Describe yourself': 'A1',
    'Daily routines': 'A2',
    'Read a short update': 'A2',
    'Order at a café': 'A2',
    'Listen to a news summary': 'B1',
    'Read a local story': 'B1',
    'Speak about your weekend': 'B1',
    'Analyze a video': 'B2',
    'Read an opinion piece': 'B2',
    'Write a structured response': 'B2',
    'Review complex media': 'C1',
    'Practice academic reading': 'C1',
    'Build an argument': 'C1',
    'Master natural expression': 'C2',
    'Read at native pace': 'C2',
    'Speak with precision': 'C2',
  }
  for (const [lessonTitle, support] of Object.entries(supports)) {
    const level = lessonLevels[lessonTitle]
    if (!level) continue
    for (const word of support.vocabulary) {
      addEntry({ ...word, lessonId: `learn-${lessonTitle}`, lessonTitle, level })
    }
  }

  for (const lesson of supplements) {
    for (const word of lesson.vocabulary) {
      addEntry({ ...word, lessonId: lesson.id, lessonTitle: lesson.title, level: lesson.level })
    }
  }

  return [...entries.values()].sort((first, second) =>
    courseLevels.indexOf(first.level) - courseLevels.indexOf(second.level),
  )
}

export { courseLevels, grammarLevels }
