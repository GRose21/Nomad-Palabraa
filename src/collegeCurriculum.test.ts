import assert from 'node:assert/strict'
import test from 'node:test'
import { collegeCourses, buildCollegeGrammarLessons } from './collegeCurriculum.ts'
import { additionalLanguagePacks } from './extraLanguages.ts'
import { courseLevels } from './learnCourse.ts'

test('maps each CEFR course to a coherent college-style progression', () => {
  assert.ok(collegeCourses['Pre-A1'].year.includes('Preparatory'))
  assert.ok(collegeCourses.A1.year.includes('year 1'))
  assert.ok(collegeCourses.A2.year.includes('year 1'))
  assert.ok(collegeCourses.B1.year.includes('year 2'))
  assert.ok(collegeCourses.B2.year.includes('year 3'))
  assert.ok(collegeCourses.C1.year.includes('year 4'))
  assert.ok(collegeCourses.C2.course.includes('Capstone'))

  for (const level of courseLevels) {
    const course = collegeCourses[level]
    assert.ok(course.focus.length > 20)
    assert.ok(course.outcomes.length >= 2)
    assert.ok(course.signatureTask.length > 30)
    assert.ok(course.grammarFocus.length > 20)
    assert.ok(course.grammarTask.length > 20)
    assert.ok(course.studyPractice.length > 20)
  }
})

test('provides scaffolded college grammar extensions for Mandarin, Arabic, and Russian', () => {
  for (const language of ['Mandarin Chinese', 'Modern Standard Arabic', 'Russian'] as const) {
    const pack = additionalLanguagePacks[language]
    const collegeLessons = buildCollegeGrammarLessons(language)
    assert.equal(collegeLessons.length, 6)
    for (const lesson of collegeLessons) {
      assert.ok(pack.grammarLessons.some((candidate) => candidate.id === lesson.id))
      assert.equal(lesson.sections.length, 2)
      assert.ok(lesson.sections.every((section) => section.examples.length >= 2))
      assert.ok(lesson.exercises.length >= 3)
      assert.ok(lesson.exercises.every((exercise) =>
        exercise.options.length >= 3
        && exercise.answer >= 0
        && exercise.answer < exercise.options.length
        && exercise.explanation.length > 20,
      ))
    }
  }
})
