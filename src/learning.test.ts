import assert from 'node:assert/strict'
import test from 'node:test'
import { getActivityScore, getDailyMinutes, getLevelFromScore, getStreak, getWeekDays } from './learning.ts'

test('scores a learner using explicit CEFR thresholds', () => {
  assert.equal(getLevelFromScore(1), 'A1')
  assert.equal(getLevelFromScore(3), 'A2')
  assert.equal(getLevelFromScore(6), 'B1')
  assert.equal(getLevelFromScore(9), 'B2')
  assert.equal(getLevelFromScore(12), 'C1')
  assert.equal(getLevelFromScore(15), 'C2')
})

test('resets daily activity when the date changes', () => {
  const today = '2026-10-06'
  const yesterday = { minutes: 20, lastActivityDate: '2026-10-05' }
  assert.deepEqual(getDailyMinutes(yesterday, today), { minutes: 0, lastActivityDate: today })

  const current = { minutes: 10, lastActivityDate: today }
  assert.deepEqual(getDailyMinutes(current, today, 10), { minutes: 20, lastActivityDate: today })
})

test('awards a perfect activity score for all correct answers', () => {
  assert.equal(getActivityScore([0, 1, 2], [0, 1, 2]), 3)
  assert.equal(getActivityScore([0, 1], [0, 2]), 1)
})

test('uses the correct current week and local weekday labels', () => {
  const week = getWeekDays(new Date('2026-10-06T12:00:00'))
  assert.deepEqual(week.map((day) => day.label), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  assert.deepEqual(week.map((day) => day.isToday), [false, true, false, false, false, false, false])
  assert.equal(getWeekDays(new Date('2026-10-11T12:00:00'))[6].label, 'Sun')
})

test('counts only actual consecutive learning days', () => {
  assert.equal(getStreak([], '2026-10-06'), 0)
  assert.equal(getStreak(['2026-10-06'], '2026-10-06'), 1)
  assert.equal(getStreak(['2026-10-05', '2026-10-06'], '2026-10-06'), 2)
  assert.equal(getStreak(['2026-10-04', '2026-10-06'], '2026-10-06'), 1)
  assert.equal(getStreak(['2026-10-05'], '2026-10-06'), 1)
  assert.equal(getStreak(['2026-10-03'], '2026-10-06'), 0)
})
