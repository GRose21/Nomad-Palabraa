import assert from 'node:assert/strict'
import test from 'node:test'
import { findGlossaryTerms, glossaryExample, glossaryTerms } from './glossary.ts'
import { grammarLessons } from './grammar.ts'
import { emojiForGloss, sceneForLesson } from './pictures.ts'

test('defines the core grammar terms with examples', () => {
  const names = glossaryTerms.map((entry) => entry.term)
  for (const expected of ['Preterite (simple past)', 'Subjunctive', 'Imperfect', 'Conditional', 'Reflexive verb']) assert.ok(names.includes(expected))
  assert.ok(glossaryTerms.every((entry) => entry.definition.length > 20 && entry.example.length > 0))
})

test('finds the terms a grammar lesson mentions and localizes examples', () => {
  const lesson = grammarLessons.find((entry) => entry.title === 'Present subjunctive')
  assert.ok(lesson)
  const found = findGlossaryTerms(`${lesson.title} ${lesson.summary} ${lesson.sections.map((section) => section.explanation).join(' ')}`)
  assert.ok(found.some((entry) => entry.term === 'Subjunctive'))
  const subjunctive = glossaryTerms.find((entry) => entry.term === 'Subjunctive')!
  assert.match(glossaryExample(subjunctive, 'Spanish'), /Quiero que/)
  assert.match(glossaryExample(subjunctive, 'Russian'), /wish/)
})

test('picks pictures for common vocabulary and lesson themes', () => {
  assert.equal(emojiForGloss('the book'), '📖')
  assert.equal(emojiForGloss('zzz'), null)
  assert.deepEqual(sceneForLesson('Order food at a café', 'A1'), ['🍽️', '☕', '🛒'])
  assert.ok(sceneForLesson('Something else', 'B2').length === 3)
})
