import assert from 'node:assert/strict'
import test from 'node:test'
import { chooseSpeechVoice, estimateSpeechSeconds, rewindSpeechIndex, seekSpeechIndex, speechRate, speechSpeedMultiplier } from './speech.ts'

test('prefers an enhanced voice in the requested language', () => {
  const voices = [
    { name: 'Default Spanish', lang: 'es-ES', default: true },
    { name: 'Microsoft Spanish Natural', lang: 'es-ES', default: false },
    { name: 'Google español', lang: 'es-MX', default: false },
    { name: 'Microsoft English Natural', lang: 'en-US', default: false },
  ]

  assert.equal(chooseSpeechVoice(voices, 'es-ES')?.name, 'Microsoft Spanish Natural')
})

test('falls back to a matching language voice and uses a measured speech rate', () => {
  const voices = [
    { name: 'English Voice', lang: 'en-US', default: true },
    { name: 'Arabic Voice', lang: 'ar-SA', default: false },
  ]

  assert.equal(chooseSpeechVoice(voices, 'ar'), voices[1])
  assert.equal(chooseSpeechVoice(voices, 'ru-RU'), undefined)
  assert.equal(speechRate('zh-CN'), 0.88)
  assert.equal(speechRate('es-ES'), 0.92)
})

test('rewinds from a speech boundary by an estimated five seconds', () => {
  const passage = Array(10).fill('This is a long passage with several words for testing playback rewind.').join(' ')
  const englishIndex = rewindSpeechIndex(passage, passage.length, 'en-US')
  const chineseIndex = rewindSpeechIndex('你好，世界。'.repeat(12), 48, 'zh-CN')
  assert.ok(englishIndex > 0 && englishIndex < passage.length - 70)
  assert.ok(chineseIndex > 0 && chineseIndex < 48)
  assert.equal(rewindSpeechIndex(passage, 20, 'en-US'), 0)
})

test('applies slow, normal, and fast speed multipliers to rate and duration', () => {
  assert.ok(speechRate('es-ES', speechSpeedMultiplier('slow')) < speechRate('es-ES', speechSpeedMultiplier('normal')))
  assert.ok(speechRate('es-ES', speechSpeedMultiplier('fast')) > speechRate('es-ES', speechSpeedMultiplier('normal')))
  const text = 'x'.repeat(180)
  assert.ok(estimateSpeechSeconds(text, 'es-ES', speechSpeedMultiplier('fast')) < estimateSpeechSeconds(text, 'es-ES', speechSpeedMultiplier('slow')))
})

test('seeks to a word boundary near the requested time', () => {
  const passage = Array(20).fill('palabra').join(' ')
  const index = seekSpeechIndex(passage, 3, 'es-ES')
  assert.ok(index > 0 && index <= 54)
  assert.equal(passage[index - 1], ' ')
  assert.equal(seekSpeechIndex(passage, 0, 'es-ES'), 0)
  assert.equal(seekSpeechIndex(passage, 9999, 'es-ES'), passage.length)
})
