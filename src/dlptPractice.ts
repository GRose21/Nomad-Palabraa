import type { SupplementalLesson } from './learnCourse'
import type { Resource } from './resourceCatalog'
import { ilrReference } from './ilr.ts'

export function buildDlptReadingResources(language: string, lessons: SupplementalLesson[]): Resource[] {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const

  return levels.flatMap((level) => {
    const lesson = lessons.find((candidate) => candidate.level === level && candidate.questions.length >= 4)
    if (!lesson) return []

    return [{
      type: 'reading' as const,
      title: `${level} DLPT-style reading · ${language}`,
      description: `Read a longer ${language} passage and answer main-idea, detail, author-purpose, and inference questions.`,
      source: 'DLPT-style practice',
      level,
      tag: ilrReference[level],
      url: '',
      embedUrl: '',
      passage: lesson.passage,
      comprehension: lesson.questions.map((question, questionIndex) => {
        const offset = (levels.indexOf(level) + questionIndex) % question.options.length
        return {
          prompt: question.prompt,
          answers: [...question.options.slice(offset), ...question.options.slice(0, offset)],
          correctIndex: (question.answer - offset + question.options.length) % question.options.length,
        }
      }),
    }]
  })
}
