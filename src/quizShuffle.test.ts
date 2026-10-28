import assert from 'node:assert/strict'
import test from 'node:test'
import { additionalLanguagePacks } from './extraLanguages.ts'
import { italianSupplementalLessons, italianLessonContent, italianStarters } from './italian.ts'
import { starterLessons, supplementalLessons } from './learnCourse.ts'
import { getExtensionQuestions } from './readingContent.ts'
import { seededRandom, shuffleLessonQuestions, shuffleResourceQuestions } from './quizShuffle.ts'

test('shuffling keeps the correct answer text and spreads positions', () => {
  const question = { prompt: 'q', options: ['right', 'x', 'y', 'z'], answer: 0 }
  const positions = new Set<number>()
  for (let seed = 1; seed <= 60; seed += 1) {
    const [shuffled] = shuffleLessonQuestions([question], seededRandom(seed))
    assert.equal(shuffled.options[shuffled.answer], 'right')
    assert.deepEqual([...shuffled.options].sort(), ['right', 'x', 'y', 'z'])
    positions.add(shuffled.answer)
  }
  assert.equal(positions.size, 4)
  const [resource] = shuffleResourceQuestions([{ prompt: 'q', answers: ['a', 'b', 'c'], correctIndex: 1 }])
  assert.equal(resource.answers[resource.correctIndex], 'b')
})

type Lesson = { title: string; passage: string; vocabulary: Array<{ spanish: string }>; questions: Array<{ options: string[]; answer: number }>; speakingPrompt: string }
const lessonSets: Array<[string, Lesson[]]> = [
  ['Spanish', [...starterLessons, ...supplementalLessons] as Lesson[]],
  ['Italian', [...italianStarters, ...italianSupplementalLessons] as Lesson[]],
  ...Object.entries(additionalLanguagePacks).map(([name, pack]): [string, Lesson[]] => [name, [...pack.starters, ...pack.supplementalLessons] as Lesson[]]),
]

test('every lesson question has a valid, unique-option answer', () => {
  for (const [language, lessons] of lessonSets) {
    for (const lesson of lessons) {
      for (const question of lesson.questions) {
        assert.ok(question.answer >= 0 && question.answer < question.options.length, `${language} ${lesson.title}`)
        assert.equal(new Set(question.options).size, question.options.length, `${language} ${lesson.title} has duplicate options`)
      }
    }
  }
})

test('quoted words in speaking prompts come from the passage or the lesson vocabulary', () => {
  for (const [language, lessons] of lessonSets) {
    for (const lesson of lessons) {
      for (const [, rawQuoted] of lesson.speakingPrompt.matchAll(/“([^”]+)”/g)) {
        const quoted = rawQuoted.replace(/[….\s]+$/, '').toLocaleLowerCase()
        const passage = lesson.passage.toLocaleLowerCase()
        const known = passage.includes(quoted) || lesson.vocabulary.some((word) => word.spanish.toLocaleLowerCase().includes(quoted) || quoted.includes(word.spanish.toLocaleLowerCase()))
        assert.ok(known || quoted === lesson.title.toLocaleLowerCase(), `${language} ${lesson.title}: “${quoted}” is not in the passage`)
      }
    }
  }
})

test('extension questions are only added when the generic text is on the page', () => {
  const italianLesson = Object.values(italianLessonContent)[10]
  assert.equal(getExtensionQuestions('Ciao.', 'B1', 'Italian').length, 0)
  assert.ok(getExtensionQuestions(italianLesson.text, 'A1', 'Italian').length >= 0)
  const pack = additionalLanguagePacks['Russian']
  const lesson = pack.supplementalLessons.find((entry) => entry.level === 'B1')!
  assert.equal(getExtensionQuestions(lesson.passage, 'B1', 'Russian').length, 2)
})
