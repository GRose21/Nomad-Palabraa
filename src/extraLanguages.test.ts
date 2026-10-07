import assert from 'node:assert/strict'
import test from 'node:test'
import { additionalLanguagePacks, getLanguageTextMetadata, learningLanguages } from './extraLanguages.ts'

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const

test('adds Mandarin Chinese, Modern Standard Arabic, and Russian as selectable languages', () => {
  assert.deepEqual(learningLanguages, ['Spanish', 'Italian', 'Mandarin Chinese', 'Modern Standard Arabic', 'Russian'])
  assert.equal(getLanguageTextMetadata('Mandarin Chinese').lang, 'zh-CN')
  assert.equal(getLanguageTextMetadata('Modern Standard Arabic').dir, 'rtl')
  assert.equal(getLanguageTextMetadata('Russian').lang, 'ru-RU')
})

test('each added language includes ten lessons and level-matched videos across A1–C2', () => {
  for (const [language, pack] of Object.entries(additionalLanguagePacks)) {
    assert.equal(pack.starters.length, 3, `${language} should have three Pre-A1 starters`)
    assert.equal(pack.supplementalLessons.length, 60, `${language} should have sixty CEFR lessons`)
    assert.equal(pack.assessmentQuestions.length, 18, `${language} should have a full assessment`)
    assert.ok(pack.activityCards.length >= 12, `${language} should have practice activities`)
    for (const level of levels) {
      const lessons = pack.supplementalLessons.filter((lesson) => lesson.level === level)
      assert.equal(lessons.length, 10, `${language} ${level} should have ten lessons`)
      assert.ok(pack.grammarLessons.some((lesson) => lesson.level === level), `${language} ${level} should have grammar`)
      assert.ok(pack.resources.some((resource) => resource.level === level && resource.type === 'video'), `${language} ${level} should have a video resource`)
      assert.ok(lessons.every((lesson) => lesson.minutes === `${{ A1: 12, A2: 16, B1: 20, B2: 24, C1: 28, C2: 32 }[level]} min`))
    }
    assert.equal(Object.keys(pack.lessonContent).length, 63)
  }
})

test('new language lessons include target-script text, pronunciation support, and answerable questions', () => {
  const samples = [
    additionalLanguagePacks['Mandarin Chinese'].supplementalLessons[0].vocabulary[0].spanish,
    additionalLanguagePacks['Modern Standard Arabic'].supplementalLessons[0].vocabulary[0].spanish,
    additionalLanguagePacks.Russian.supplementalLessons[0].vocabulary[0].spanish,
  ]
  assert.match(samples[0], /你好.*nǐ hǎo/)
  assert.match(samples[1], /مَرْحَبًا.*marḥaban/)
  assert.match(samples[2], /Здравствуйте.*zdravstvuyte/)

  for (const pack of Object.values(additionalLanguagePacks)) {
    for (const lesson of pack.supplementalLessons) {
      assert.ok(lesson.passage.length > lesson.vocabulary[0].spanish.length)
      assert.ok(lesson.passage.includes('\n\n'))
      assert.ok(lesson.questions.every((question) => question.answer >= 0 && question.answer < question.options.length))
    }
  }
})

test('Arabic readings contain Arabic script only and DLPT resources cover all levels', () => {
  const arabic = additionalLanguagePacks['Modern Standard Arabic']
  const allReadings = [
    ...arabic.starters.map((lesson) => lesson.passage),
    ...arabic.supplementalLessons.map((lesson) => lesson.passage),
    ...arabic.resources.map((resource) => resource.passage ?? ''),
  ]
  const arabicLetters = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\s،؛؟.!؟…«»():\-0-9]+/
  for (const passage of allReadings) {
    assert.ok(passage.length > 0)
    assert.equal(passage.replace(arabicLetters, '').trim(), '', `Arabic reading contains non-Arabic text: ${passage.slice(0, 50)}`)
  }
  for (const pack of Object.values(additionalLanguagePacks)) {
    const dlpt = pack.resources.filter((resource) => resource.source === 'DLPT-style practice')
    assert.equal(dlpt.length, 6)
    assert.ok(dlpt.every((resource) => resource.comprehension?.length === 4))
  }
})
