import assert from 'node:assert/strict'
import test from 'node:test'
import { assessmentQuestions } from './assessment.ts'
import { getActivityScore, getLevelFromScore } from './learning.ts'

test('provides an expanded assessment and allows a proficient score', () => {
  assert.equal(assessmentQuestions.length, 18)
  for (const question of assessmentQuestions) {
    assert.ok(question.prompt)
    assert.ok(question.answers.length >= 3)
    assert.ok(question.correctIndex >= 0 && question.correctIndex < question.answers.length)
  }

  const perfectScore = getActivityScore(assessmentQuestions.map((question) => question.correctIndex), assessmentQuestions.map((question) => question.correctIndex))
  assert.equal(perfectScore, 18)
  assert.equal(getLevelFromScore(perfectScore), 'C2')
})

test('marks the natural translations for requests and ongoing actions as correct', () => {
  const coffeeQuestion = assessmentQuestions.find((question) => question.prompt.includes('I would like a coffee'))
  const residenceQuestion = assessmentQuestions.find((question) => question.prompt.includes('I have lived here for two years'))

  assert.equal(coffeeQuestion?.answers[coffeeQuestion.correctIndex], 'Quisiera un café')
  assert.equal(residenceQuestion?.answers[residenceQuestion.correctIndex], 'Vivo aquí desde hace dos años')
})
