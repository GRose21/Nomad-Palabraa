import type { CourseLevel } from './learnCourse'
import { getExpandedReadingArticle } from './curriculumExpansion.ts'
import { getLanguageReadingExtension } from './extraLanguages.ts'
import type { LearningLanguage } from './extraLanguages'

export const minimumReadingLength: Record<Exclude<CourseLevel, 'Pre-A1'>, number> = {
  A1: 80,
  A2: 100,
  B1: 130,
  B2: 140,
  C1: 150,
  C2: 160,
}

const readingExpansionThreshold: Record<Exclude<CourseLevel, 'Pre-A1'>, number> = {
  A1: 85,
  A2: 120,
  B1: 155,
  B2: 190,
  C1: 220,
  C2: 250,
}

const starterText: Record<LearningLanguage, string> = {
  Spanish: 'Hola. Me llamo Ana. Estoy aquí. Gracias.',
  Italian: 'Ciao. Mi chiamo Anna. Sono qui. Grazie.',
  'Mandarin Chinese': '你好。我叫安娜。我在这里。谢谢。',
  'Modern Standard Arabic': 'مَرْحَبًا. اِسْمِي أَنَا. أَنَا هُنَا. شُكْرًا.',
  Russian: 'Здравствуйте. Меня зовут Анна. Я здесь. Спасибо.',
}

export function expandReadingContent(text: string, level: CourseLevel, language: LearningLanguage) {
  const readingLength = language === 'Mandarin Chinese'
    ? [...text.replace(/\s/g, '')].length
    : text.trim().split(/\s+/).length
  const hasMultipleParagraphs = /\n\s*\n/.test(text)

  if (level === 'Pre-A1') {
    return readingLength >= 25 && hasMultipleParagraphs ? text : `${text}\n\n${starterText[language]}`
  }

  const meetsLength = readingLength >= readingExpansionThreshold[level]
  if (hasMultipleParagraphs && meetsLength) return text

  const extension = language === 'Spanish' || language === 'Italian'
    ? getExpandedReadingArticle(language, level)
    : getLanguageReadingExtension(language, level)

  return `${text}\n\n${extension}`
}
