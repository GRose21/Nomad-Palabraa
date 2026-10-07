import assert from 'node:assert/strict'
import test from 'node:test'
import { getVocabulary } from './vocabulary.ts'
import {
  italianActivityCards,
  italianAssessmentQuestions,
  italianGrammarLessons,
  italianGrammarLevels,
  italianLessonContent,
  italianLessonSupport,
  italianPlans,
  italianStarters,
  italianSupplementalLessons,
} from './italian.ts'
import { italianCourseLevels } from './italian.ts'
import { italianLevelVideoResources } from './resourceVideos.ts'
import { buildDlptReadingResources } from './dlptPractice.ts'

test('provides Italian grammar lessons across the full CEFR range', () => {
  assert.deepEqual([...new Set(italianGrammarLessons.map((lesson) => lesson.level))], italianGrammarLevels)
  assert.deepEqual(italianGrammarLevels.map((level) => italianGrammarLessons.filter((lesson) => lesson.level === level).length), [6, 7, 6, 5, 5, 4])
  for (const lesson of italianGrammarLessons) {
    assert.ok(lesson.sections.length >= 2)
    assert.ok(lesson.exercises.length >= 2)
    for (const exercise of lesson.exercises) {
      assert.ok(exercise.answer >= 0 && exercise.answer < exercise.options.length)
    }
  }
})

test('provides complete Italian learning path material from Pre-A1 through C2', () => {
  assert.equal(italianStarters.length, 3)
  assert.equal(Object.keys(italianLessonSupport).length, 18)
  assert.equal(Object.keys(italianPlans).length, 6)
  assert.equal(italianSupplementalLessons.length, 42)
  assert.equal(italianCourseLevels.length, 7)
  assert.equal(italianStarters.length + Object.keys(italianLessonSupport).length + italianSupplementalLessons.length, 63)
  assert.equal(Object.keys(italianLessonContent).length, 63)
  for (const lesson of italianStarters) {
    assert.ok(lesson.vocabulary.length >= 4)
    assert.equal(lesson.questions.length, 2)
    assert.ok(lesson.passage)
  }
  for (const level of italianGrammarLevels) {
    assert.equal(italianSupplementalLessons.filter((lesson) => lesson.level === level).length, 7)
    assert.equal(3 + italianSupplementalLessons.filter((lesson) => lesson.level === level).length, 10)
  }
  for (const lesson of italianSupplementalLessons.filter((item) => item.id.startsWith('italian-expanded-'))) {
    assert.equal(lesson.questions.length, 4)
    assert.ok(lesson.passage.includes('\n\n'))
  }
  for (const [title, support] of Object.entries(italianLessonSupport)) {
    assert.ok(italianLessonContent[title], `${title} needs a reading`)
    assert.ok(support.vocabulary.length >= 4)
    assert.ok(italianGrammarLessons.some((lesson) => lesson.id === support.grammarLessonId))
  }
})

test('provides DLPT-style Italian readings across A1–C2', () => {
  const readings = buildDlptReadingResources('Italian', italianSupplementalLessons)
  assert.equal(readings.length, 6)
  assert.ok(readings.every((resource) => resource.comprehension?.length === 4 && resource.tag.startsWith('ILR')))
})

test('scales the expanded Italian readings up in length from A1 through C2', () => {
  const expanded = italianSupplementalLessons.filter((lesson) => lesson.id.startsWith('italian-expanded-'))
  const minimumWordsByLevel = italianGrammarLevels.map((level) => {
    const levelLessons = expanded.filter((lesson) => lesson.level === level)
    assert.equal(levelLessons.length, 5, `${level} should have five new lessons`)
    return Math.min(...levelLessons.map((lesson) => lesson.passage.trim().split(/\s+/).length))
  })
  for (let index = 1; index < minimumWordsByLevel.length; index += 1) {
    assert.ok(minimumWordsByLevel[index] > minimumWordsByLevel[index - 1], 'each CEFR level should have longer reading material')
  }
})

test('provides companion video resources and comprehension at every Italian CEFR level', () => {
  for (const level of italianGrammarLevels) {
    const videos = italianLevelVideoResources.filter((resource) => resource.level === level)
    assert.ok(videos.length >= 1, `${level} needs a level-matched video resource`)
    assert.ok(videos.every((video) => video.passage && video.comprehension?.length))
  }
})

test('provides Italian assessment, practice, and course vocabulary', () => {
  assert.equal(italianAssessmentQuestions.length, 18)
  assert.equal(italianActivityCards.length, 22)
  assert.ok(italianActivityCards.some((activity) => activity.level === 'Pre-A1'))
  assert.ok(italianActivityCards.some((activity) => activity.level === 'C2'))
  assert.ok(getVocabulary(italianGrammarLessons, italianStarters, italianLessonSupport, italianSupplementalLessons).length > 0)
})
