import assert from 'node:assert/strict'
import test from 'node:test'
import { buildCharacterBank, buildWritingItems, checkWritingAnswer, getKeyboardRows, segmentWords } from './writing.ts'
import type { VocabularyEntry } from './vocabulary.ts'

const entry = (spanish: string, english: string): VocabularyEntry => ({ spanish, english, lessonId: 'l1', lessonTitle: 'Lesson', level: 'A1' })

test('builds fill-in-the-blank items whose answer is a word from the sentence', () => {
  const entries = [entry('Yo bebo agua fría', 'I drink cold water'), entry('Ella lee un libro', 'She reads a book'), entry('hola', 'hello')]
  const items = buildWritingItems(entries, 'cloze', 'Spanish', 10, () => 0.2)
  assert.equal(items.length, 2)
  for (const item of items) {
    assert.ok(item.prompt.includes('＿＿＿'))
    const source = entries.find((candidate) => candidate.english === item.hint)
    assert.ok(source?.spanish.includes(item.answers[0]))
    assert.equal(item.prompt.replace('＿＿＿', item.answers[0]), source?.spanish)
  }
})

test('segments Mandarin sentences and blanks a whole word', () => {
  const words = segmentWords('我喜欢喝茶', 'Mandarin Chinese').filter((part) => part.isWord)
  assert.ok(words.length >= 3)
  const [item] = buildWritingItems([entry('我喜欢喝茶', 'I like drinking tea')], 'cloze', 'Mandarin Chinese', 1, () => 0.5)
  assert.ok(item.answers[0].length >= 1 && item.prompt.includes('＿＿＿'))
})

test('translate items accept any target with the same English meaning', () => {
  const items = buildWritingItems([entry('coche', 'car'), entry('auto', 'car'), entry('casa', 'house')], 'translate', 'Spanish', 10)
  const car = items.find((item) => item.prompt === 'car')
  assert.deepEqual([...(car?.answers ?? [])].sort(), ['auto', 'coche'])
  assert.equal(items.length, 2)
})

test('checks answers ignoring case, punctuation, Arabic vowels and soft accents', () => {
  assert.equal(checkWritingAnswer('  Hola, ¿qué tal? ', ['hola qué tal']), 'correct')
  assert.equal(checkWritingAnswer('que tal', ['qué tal']), 'accent')
  assert.equal(checkWritingAnswer('adios', ['hola']), 'wrong')
  assert.equal(checkWritingAnswer('مرحبا', ['مَرْحَبًا']), 'correct')
  assert.equal(checkWritingAnswer('Привет', ['привет!']), 'correct')
  assert.equal(checkWritingAnswer('我 喜欢 茶', ['我喜欢茶']), 'correct')
  assert.equal(checkWritingAnswer('', ['hola']), 'wrong')
})

test('on-screen keyboards use only the language script and Mandarin uses a character bank', () => {
  for (const row of getKeyboardRows('Russian')) for (const key of row.slice(0, 11)) assert.match(key, /[\u0400-\u04FF]|[,.?!-]/)
  for (const key of getKeyboardRows('Modern Standard Arabic').flat()) assert.doesNotMatch(key, /[A-Za-z]/)
  assert.deepEqual(getKeyboardRows('Mandarin Chinese'), [])
  const bank = buildCharacterBank(['我喜欢茶'], ['你好吗谢谢再见'], 8, () => 0.4)
  for (const character of '我喜欢茶') assert.ok(bank.includes(character))
  assert.ok(bank.every((character) => /\p{Script=Han}/u.test(character)))
})
