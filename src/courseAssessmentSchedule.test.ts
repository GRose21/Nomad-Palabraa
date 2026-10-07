import assert from 'node:assert/strict'
import test from 'node:test'
import { getNextCourseAssessmentMilestone } from './courseAssessmentSchedule.ts'

test('unlocks a course assessment after each five completed lessons', () => {
  assert.equal(getNextCourseAssessmentMilestone(4, []), 5)
  assert.equal(getNextCourseAssessmentMilestone(5, []), 5)
  assert.equal(getNextCourseAssessmentMilestone(10, []), 5)
})

test('returns the first eligible unfinished milestone', () => {
  assert.equal(getNextCourseAssessmentMilestone(10, [5]), 10)
  assert.equal(getNextCourseAssessmentMilestone(15, [5, 10]), 15)
  assert.equal(getNextCourseAssessmentMilestone(15, [5, 10, 15]), 20)
})
