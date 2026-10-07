import assert from 'node:assert/strict'
import test from 'node:test'
import { chooseSpeechVoice, speechRate } from './speech.ts'

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
