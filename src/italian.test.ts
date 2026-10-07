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
  assert.equal(italianSupplementalLessons.length, 12)
  assert.equal(italianCourseLevels.length, 7)
  assert.equal(italianStarters.length + Object.keys(italianLessonSupport).length + italianSupplementalLessons.length, 33)
  assert.equal(Object.keys(italianLessonContent).length, 33)
  for (const lesson of italianStarters) {
    assert.ok(lesson.vocabulary.length >= 4)
    assert.equal(lesson.questions.length, 2)
    assert.ok(lesson.passage)
  }
  for (const level of italianGrammarLevels) {
    assert.equal(italianSupplementalLessons.filter((lesson) => lesson.level === level).length, 2)
  }
  for (const [title, support] of Object.entries(italianLessonSupport)) {
    assert.ok(italianLessonContent[title], `${title} needs a reading`)
    assert.ok(support.vocabulary.length >= 4)
    assert.ok(italianGrammarLessons.some((lesson) => lesson.id === support.grammarLessonId))
  }
})

test('provides Italian assessment, practice, and course vocabulary', () => {
  assert.equal(italianAssessmentQuestions.length, 18)
  assert.equal(italianActivityCards.length, 22)
  assert.ok(italianActivityCards.some((activity) => activity.level === 'Pre-A1'))
  assert.ok(italianActivityCards.some((activity) => activity.level === 'C2'))
  assert.ok(getVocabulary(italianGrammarLessons, italianStarters, italianLessonSupport, italianSupplementalLessons).length > 0)
})
