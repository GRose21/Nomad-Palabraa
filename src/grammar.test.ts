import assert from 'node:assert/strict'
import test from 'node:test'
import { grammarLessons, grammarLevels } from './grammar.ts'

test('provides a progressive course across every CEFR grammar level', () => {
  assert.deepEqual([...new Set(grammarLessons.map((lesson) => lesson.level))], grammarLevels)
  for (const level of grammarLevels) {
    assert.ok(grammarLessons.filter((lesson) => lesson.level === level).length >= 4, `${level} should have a substantial lesson sequence`)
  }
})

test('every grammar lesson includes teaching material and answerable practice', () => {
  const lessonIds = grammarLessons.map((lesson) => lesson.id)
  assert.equal(new Set(lessonIds).size, lessonIds.length)

  for (const lesson of grammarLessons) {
    assert.ok(lesson.title.length > 0)
    assert.ok(lesson.summary.length > 0)
    assert.ok(lesson.sections.length >= 2, `${lesson.title} should teach multiple concepts`)
    assert.ok(lesson.exercises.length >= 2, `${lesson.title} should include multiple exercises`)
    for (const exercise of lesson.exercises) {
      assert.ok(exercise.options.length >= 3)
      assert.ok(exercise.answer >= 0 && exercise.answer < exercise.options.length)
      assert.ok(exercise.explanation.length > 0)
    }
  }
})
