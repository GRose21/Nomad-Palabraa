import assert from 'node:assert/strict'
import test from 'node:test'
import { grammarLessons } from './grammar.ts'
import { getVocabulary } from './vocabulary.ts'

test('builds vocabulary from the example translations in grammar lessons', () => {
  const entries = getVocabulary()
  assert.ok(entries.length >= 200, `expected a broad vocabulary library, received ${entries.length} entries`)

  assert.ok(entries.some((entry) => entry.spanish === 'María lee un libro.' && entry.english === 'María reads a book.'))
  assert.ok(entries.some((entry) => entry.level === 'Pre-A1'))
  for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
    assert.ok(entries.some((entry) => entry.level === level), `${level} should contribute vocabulary`)
  }
  assert.equal(new Set(entries.map((entry) => `${entry.spanish.toLocaleLowerCase()}|${entry.english.toLocaleLowerCase()}`)).size, entries.length)
})

test('automatically includes vocabulary examples from newly added lessons', () => {
  const newLesson = {
    id: 'new-vocabulary-test',
    level: 'A1' as const,
    title: 'New test lesson',
    summary: 'A newly added grammar lesson.',
    sections: [{ heading: 'Example', explanation: 'Example explanation.', examples: ['La niña canta. — The girl sings.'] }],
    exercises: [{ prompt: 'Test prompt', options: ['A', 'B', 'C'], answer: 0, explanation: 'Test explanation.' }],
  }
  const entries = getVocabulary([...grammarLessons, newLesson])
  assert.ok(entries.some((entry) => entry.lessonId === newLesson.id && entry.spanish === 'La niña canta.' && entry.english === 'The girl sings.'))
})
