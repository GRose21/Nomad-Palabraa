import assert from 'node:assert/strict'
import test from 'node:test'
import { assessmentQuestions, buildAssessmentSession } from './assessment.ts'
import { getActivityScore, getLevelFromScore } from './learning.ts'

test('provides an expanded assessment and allows a proficient score', () => {
  assert.equal(assessmentQuestions.length, 36)
  for (const question of assessmentQuestions) {
    assert.ok(question.prompt)
    assert.ok(question.answers.length >= 3)
    assert.ok(question.correctIndex >= 0 && question.correctIndex < question.answers.length)
  }

  const perfectScore = getActivityScore(assessmentQuestions.map((question) => question.correctIndex), assessmentQuestions.map((question) => question.correctIndex))
  assert.equal(perfectScore, 36)
  assert.equal(getLevelFromScore(18), 'C2')
})

test('marks the natural translations for requests and ongoing actions as correct', () => {
  const coffeeQuestion = assessmentQuestions.find((question) => question.prompt.includes('I would like a coffee'))
  const residenceQuestion = assessmentQuestions.find((question) => question.prompt.includes('I have lived here for two years'))

  assert.equal(coffeeQuestion?.answers[coffeeQuestion.correctIndex], 'Quisiera un café')
  assert.equal(residenceQuestion?.answers[residenceQuestion.correctIndex], 'Vivo aquí desde hace dos años')
})

test('each session has 18 questions with shuffled answers that stay correct', () => {
  const positions = new Set<number>()
  for (let run = 0; run < 30; run += 1) {
    const session = buildAssessmentSession(assessmentQuestions)
    assert.equal(session.length, 18)
    for (const question of session) {
      const original = assessmentQuestions.find((entry) => entry.prompt === question.prompt)
      assert.ok(original)
      assert.equal(question.answers[question.correctIndex], original.answers[original.correctIndex])
      assert.deepEqual([...question.answers].sort(), [...original.answers].sort())
      positions.add(question.correctIndex)
    }
  }
  assert.ok(positions.size > 1, 'correct answer position should vary')
})

test('sessions draw three different questions per level from the larger bank', () => {
  const seen = new Set<string>()
  for (let run = 0; run < 20; run += 1) buildAssessmentSession(assessmentQuestions).forEach((question) => seen.add(question.prompt))
  assert.ok(seen.size > 18)
  const session = buildAssessmentSession(assessmentQuestions, () => 0.3)
  assert.equal(new Set(session.map((question) => question.prompt)).size, 18)
})
