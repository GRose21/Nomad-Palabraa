import assert from 'node:assert/strict'
import test from 'node:test'
import { grammarLessons } from './grammar.ts'
import { courseLevelInfo, courseLevels, lessonSupport, starterLessons, supplementalLessons } from './learnCourse.ts'

test('organizes the learning path from an absolute-beginner stage through C2', () => {
  assert.deepEqual(courseLevels, ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'])
  assert.match(courseLevelInfo['Pre-A1'].description, /No Spanish needed/)
  assert.ok(courseLevelInfo.C2.description.length > 0)
})

test('provides vocabulary, grammar, and speaking/listening practice for all CEFR lessons', () => {
  const validGrammarIds = new Set(grammarLessons.map((lesson) => lesson.id))
  assert.equal(Object.keys(lessonSupport).length, 18)

  for (const [title, support] of Object.entries(lessonSupport)) {
    assert.ok(support.objective, `${title} needs a learning objective`)
    assert.ok(support.vocabulary.length >= 4, `${title} needs vocabulary`)
    assert.ok(validGrammarIds.has(support.grammarLessonId), `${title} needs a real grammar lesson`)
    assert.ok(support.speakingPrompt, `${title} needs a speaking task`)
    assert.ok(support.listeningPrompt, `${title} needs a listening focus`)
  }
})

test('starts with complete zero-knowledge lessons and comprehension questions', () => {
  assert.equal(starterLessons.length, 3)
  for (const lesson of starterLessons) {
    assert.ok(lesson.vocabulary.length >= 4)
    assert.ok(lesson.grammarExplanation)
    assert.ok(lesson.passage)
    assert.equal(lesson.questions.length, 2)
    assert.ok(lesson.speakingPrompt)
    assert.ok(lesson.listeningPrompt)
  }
})

test('adds two complete passage-based Learn lessons at every CEFR level', () => {
  const validGrammarIds = new Set(grammarLessons.map((lesson) => lesson.id))
  for (const level of courseLevels.slice(1)) {
    const lessons = supplementalLessons.filter((lesson) => lesson.level === level)
    assert.equal(lessons.length, 2, `${level} should get two additional lessons`)
    for (const lesson of lessons) {
      assert.ok(validGrammarIds.has(lesson.grammarLessonId))
      assert.ok(lesson.vocabulary.length >= 5)
      assert.ok(lesson.passage.length > 100)
      assert.equal(lesson.questions.length, 2)
      assert.ok(lesson.speakingPrompt)
      assert.ok(lesson.listeningPrompt)
      for (const question of lesson.questions) {
        assert.ok(question.answer >= 0 && question.answer < question.options.length)
      }
    }
  }
})
