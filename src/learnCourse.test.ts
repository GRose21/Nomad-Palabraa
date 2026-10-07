import assert from 'node:assert/strict'
import test from 'node:test'
import { grammarLessons } from './grammar.ts'
import { courseLevelInfo, courseLevels, lessonSupport, starterLessons, supplementalLessons } from './learnCourse.ts'
import { spanishLevelVideoResources } from './resourceVideos.ts'

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

test('provides ten complete passage-based Learn lessons at every CEFR level', () => {
  const validGrammarIds = new Set(grammarLessons.map((lesson) => lesson.id))
  for (const level of courseLevels.slice(1)) {
    const lessons = supplementalLessons.filter((lesson) => lesson.level === level)
    assert.equal(lessons.length, 7, `${level} should have two original and five new supplementary lessons`)
    assert.equal(3 + lessons.length, 10, `${level} should have at least ten Learn lessons`)
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

test('scales the expanded Spanish readings up in length from A1 through C2', () => {
  const expanded = supplementalLessons.filter((lesson) => lesson.id.startsWith('spanish-expanded-'))
  const minimumWordsByLevel = courseLevels.slice(1).map((level) => {
    const levelLessons = expanded.filter((lesson) => lesson.level === level)
    assert.equal(levelLessons.length, 5, `${level} should have five new lessons`)
    return Math.min(...levelLessons.map((lesson) => lesson.passage.trim().split(/\s+/).length))
  })
  for (let index = 1; index < minimumWordsByLevel.length; index += 1) {
    assert.ok(minimumWordsByLevel[index] > minimumWordsByLevel[index - 1], 'each CEFR level should have longer reading material')
  }
})

test('provides companion video resources and comprehension at every Spanish CEFR level', () => {
  for (const level of courseLevels.slice(1)) {
    const videos = spanishLevelVideoResources.filter((resource) => resource.level === level)
    assert.ok(videos.length >= 1, `${level} needs a level-matched video resource`)
    assert.ok(videos.every((video) => video.passage && video.comprehension?.length))
  }
})
