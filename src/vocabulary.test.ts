import assert from 'node:assert/strict'
import test from 'node:test'
import { grammarLessons } from './grammar.ts'
import { getVocabulary } from './vocabulary.ts'
import { dlptDictionarySourceIds, dlptDictionarySourceLabels, getDlptVocabulary, dlptVocabularyTopics } from './dlptVocabulary.ts'
import { learningLanguages } from './extraLanguages.ts'

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

test('provides at least 1,000 unique, leveled DLPT vocabulary words for every language', () => {
  for (const language of learningLanguages) {
    const entries = getDlptVocabulary(language)
    assert.ok(entries.length >= 1000, `${language} should contain at least 1,000 words`)
    const targetKey = (word: string) => language === 'Modern Standard Arabic'
      ? word.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase()
      : word.toLocaleLowerCase()
    assert.equal(new Set(entries.map((entry) => targetKey(entry.spanish))).size, entries.length, `${language} target words should be unique`)
    for (const entry of entries) {
      assert.ok(entry.sense, `${language} ${entry.spanish} should include its dictionary sense`)
      assert.ok(entry.dictionarySources.includes('GTX'), `${language} ${entry.spanish} should be checked with Google Translate`)
      assert.ok(entry.dictionarySources.length === 1 || dlptDictionarySourceIds[language].every((source) => entry.dictionarySources.includes(source)), `${language} ${entry.spanish} should cite its language-specific dictionaries`)
      assert.ok(entry.dictionarySources.every((source) => source in dlptDictionarySourceLabels), `${language} ${entry.spanish} should cite known dictionaries`)
    }
    for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
      assert.ok(entries.filter((entry) => entry.level === level).length >= 190, `${language} should contain about 200 ${level} words`)
    }
    for (const topic of dlptVocabularyTopics) {
      assert.ok(entries.some((entry) => entry.topic === topic), `${language} should include the ${topic} topic`)
    }
  }
  const spanish = getDlptVocabulary('Spanish')
  assert.ok(!spanish.some((entry) => entry.spanish === 'dos' && entry.english === 'unity'), 'Spanish dos must not be paired with the sense of unity')
})

test('deduplicates DLPT vocabulary against lesson vocabulary while preserving topic metadata', () => {
  const existing = getVocabulary()
  const duplicate = existing[0]
  const additions = [{
    ...duplicate,
    lessonId: 'dlpt-duplicate',
    lessonTitle: 'DLPT · duplicate',
    topic: 'Politics & government',
  }]
  const combined = getVocabulary(grammarLessons, undefined, undefined, undefined, additions)
  assert.equal(combined.filter((entry) =>
    entry.spanish.toLocaleLowerCase() === duplicate.spanish.toLocaleLowerCase()
    && entry.english.toLocaleLowerCase() === duplicate.english.toLocaleLowerCase(),
  ).length, 1)

  const dlptEntry = getDlptVocabulary('Spanish')[0]
  const withDlpt = getVocabulary(grammarLessons, undefined, undefined, undefined, [dlptEntry])
  assert.ok(withDlpt.some((entry) => entry.lessonId === dlptEntry.lessonId && entry.topic === dlptEntry.topic))
})
