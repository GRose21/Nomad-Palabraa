import assert from 'node:assert/strict'
import test from 'node:test'
import { buildDlptListeningResources, dlptListeningTopics } from './dlptListening.ts'

const languages = ['Spanish', 'Italian', 'Mandarin Chinese', 'Modern Standard Arabic', 'Russian'] as const
const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const

test('provides three DLPT listening passages for every topic at every level', () => {
  for (const language of languages) {
    const resources = buildDlptListeningResources(language)
    assert.equal(resources.length, 108, `${language} should have 108 listening passages`)

    for (const level of levels) {
      for (const topic of dlptListeningTopics) {
        const passages = resources.filter((resource) => resource.level === level && resource.topic === topic)
        assert.equal(passages.length, 3, `${language} ${level} ${topic} should have three passages`)
        assert.equal(new Set(passages.map((resource) => resource.passage)).size, 3, `${language} ${level} ${topic} passages should be distinct`)
      }
    }
    for (const topic of dlptListeningTopics) {
      const storyTitle = resources.find((resource) => resource.topic === topic)?.title.split(' · ').at(-1)
      assert.ok(storyTitle)
      const versions = levels.map((level) => resources.find((resource) =>
        resource.level === level && resource.topic === topic && resource.title.endsWith(storyTitle),
      )?.passage)
      assert.equal(new Set(versions).size, 6, `${language} ${topic} should have level-adjusted passages`)
      assert.ok((versions[0]?.length ?? 0) < (versions[5]?.length ?? 0), `${language} ${topic} should scale passage length by level`)
    }
  }
})

test('all DLPT listening passages include usable questions and localized passage text', () => {
  for (const language of languages) {
    for (const resource of buildDlptListeningResources(language)) {
      assert.ok(resource.passage)
      assert.equal(resource.type, 'reading')
      assert.equal(resource.comprehension?.length, 1)
      const question = resource.comprehension?.[0]
      assert.ok(question)
      assert.equal(question.answers.length, 4)
      assert.ok(question.correctIndex >= 0 && question.correctIndex < question.answers.length)
    }
  }
})

test('Arabic DLPT listening passages contain Arabic script only', () => {
  const arabicLetters = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\s،؛؟.!؟…«»():\-0-9]+/
  for (const resource of buildDlptListeningResources('Modern Standard Arabic')) {
    assert.equal(resource.passage?.replace(arabicLetters, '').trim(), '', resource.title)
  }
})
