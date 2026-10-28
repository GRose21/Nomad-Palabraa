import type { CourseLevel } from './learnCourse'
import { getExpandedReadingArticle } from './curriculumExpansion.ts'
import { getLanguageReadingExtension } from './extraLanguages.ts'
import type { LearningLanguage } from './extraLanguages'
import type { LessonQuestion } from './quizShuffle'

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
  'Modern Standard Arabic': 'مَرْحَبًا. اِسْمِي آنَا. أَنَا هُنَا. شُكْرًا.',
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

const extensionQuestions: Record<Exclude<CourseLevel, 'Pre-A1'>, LessonQuestion[]> = {
  A1: [
    { prompt: 'Extended reading · What is the extra article about?', options: ['Simple everyday routines in a neighborhood', 'A long train journey', 'Preparing for an exam'], answer: 0 },
    { prompt: 'Extended reading · Where do neighbors rest and chat?', options: ['In the square with trees and benches', 'In a library', 'On a bus'], answer: 0 },
  ],
  A2: [
    { prompt: 'Extended reading · What is the extra article about?', options: ['What a city library offers and who may not reach it', 'A shopping trip', 'A train timetable'], answer: 0 },
    { prompt: 'Extended reading · Why can’t everyone use the library easily?', options: ['Some live far away or work during opening hours', 'It only lends newspapers', 'It is always full of children'], answer: 0 },
  ],
  B1: [
    { prompt: 'Extended reading · What is the extra article about?', options: ['A plan to improve the plaza next to the market', 'A new school building', 'A bus strike'], answer: 0 },
    { prompt: 'Extended reading · How long will the first phase last?', options: ['Three months', 'One week', 'Two years'], answer: 0 },
  ],
  B2: [
    { prompt: 'Extended reading · What is the extra article about?', options: ['Whether expanding public transport will help, and what it costs', 'Building a new highway', 'A tax on cars'], answer: 0 },
    { prompt: 'Extended reading · What does it recommend before applying the plan everywhere?', options: ['A small-scale pilot', 'Cancelling the plan', 'Raising fares'], answer: 0 },
  ],
  C1: [
    { prompt: 'Extended reading · What does the municipal report find?', options: ['Waits fell, but the short study cannot prove the bus change was the only cause', 'Waits fell, which proves the change was the only cause', 'Waits rose in every area'], answer: 0 },
    { prompt: 'Extended reading · What does the report recommend?', options: ['Observing longer and analysing by route, time and transfers', 'Stopping the study', 'Using only average results'], answer: 0 },
  ],
  C2: [
    { prompt: 'Extended reading · Which statement matches the committee’s position?', options: ['It does not reject reform but asks whether the design can meet its goals without shifting costs onto others', 'It rejects reform entirely', 'It fully approves the plan as presented'], answer: 0 },
    { prompt: 'Extended reading · What do the early indicators show?', options: ['Average speed rose, but that does not show reliability or differences between areas', 'Average speed fell everywhere', 'Costs fell for every group'], answer: 0 },
  ],
}

const starterNames: Record<LearningLanguage, string> = {
  Spanish: 'Ana', Italian: 'Anna', 'Mandarin Chinese': 'Anna (安娜)', 'Modern Standard Arabic': 'Anna (آنا)', Russian: 'Anna (Анна)',
}

// Returns questions about the generic text appended to a lesson, but only when that text is actually on the page.
export function getExtensionQuestions(passage: string, level: CourseLevel, language: LearningLanguage): LessonQuestion[] {
  if (level === 'Pre-A1') {
    return passage.includes(starterText[language])
      ? [{ prompt: 'Practice lines · What is the speaker’s name in the short practice lines?', options: [starterNames[language], 'Leo', 'Marta'], answer: 0 }]
      : []
  }
  const extension = language === 'Spanish' || language === 'Italian'
    ? getExpandedReadingArticle(language, level)
    : getLanguageReadingExtension(language, level)
  return passage.includes(extension) ? extensionQuestions[level] : []
}
