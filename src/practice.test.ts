import assert from 'node:assert/strict'
import test from 'node:test'
import { courseLevels } from './learnCourse.ts'
import { activityCards } from './practice.ts'

test('provides more practice cards at every level from absolute beginner through C2', () => {
  assert.equal(activityCards.length, 22)
  for (const level of courseLevels) {
    const activities = activityCards.filter((activity) => activity.level === level)
    assert.ok(activities.length >= 2, `${level} should have at least two practice activities`)
  }

  for (const activity of activityCards) {
    assert.ok(activity.audioPhrase)
    assert.ok(activity.options.length >= 3)
    assert.ok(activity.answer >= 0 && activity.answer < activity.options.length)
  }
})
