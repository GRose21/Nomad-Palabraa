import type { VocabularyEntry } from './vocabulary'

export type WritingMode = 'cloze' | 'translate' | 'dictation'

export type WritingItem = {
  id: string
  mode: WritingMode
  prompt: string
  hint: string
  answers: string[]
  audio?: string
}

export type AnswerResult = 'correct' | 'accent' | 'wrong'

const segmenterLocale: Record<string, string> = { Spanish: 'es', Italian: 'it', 'Mandarin Chinese': 'zh', 'Modern Standard Arabic': 'ar', Russian: 'ru' }
const blank = '＿＿＿'

export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    ;[result[index], result[swap]] = [result[swap], result[index]]
  }
  return result
}

export function segmentWords(text: string, language: string) {
  const segmenter = new Intl.Segmenter(segmenterLocale[language] ?? 'en', { granularity: 'word' })
  return Array.from(segmenter.segment(text), (part) => ({ text: part.segment, isWord: part.isWordLike === true }))
}

const stripMarks = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '').normalize('NFC')

const baseNormalize = (value: string) => value
  .normalize('NFC')
  .toLocaleLowerCase()
  .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
  .replace(/[أإآٱ]/g, 'ا')
  .replace(/ё/g, 'е')
  .replace(/[\p{P}\p{S}]/gu, ' ')
  .replace(/\s+/g, ' ')
  .trim()

export function checkWritingAnswer(input: string, answers: readonly string[]): AnswerResult {
  const given = baseNormalize(input).replace(/\s/g, ' ')
  if (!given) return 'wrong'
  const targets = answers.map(baseNormalize)
  // Chinese is written without spaces, so compare with spaces removed too.
  const squash = (value: string) => value.replace(/\s/g, '')
  if (targets.some((target) => target === given || squash(target) === squash(given))) return 'correct'
  const softGiven = squash(stripMarks(given))
  if (targets.some((target) => squash(stripMarks(target)) === softGiven)) return 'accent'
  return 'wrong'
}

const hasMultipleWords = (entry: VocabularyEntry, language: string) => segmentWords(entry.spanish, language).filter((part) => part.isWord).length >= 3

function clozeItem(entry: VocabularyEntry, language: string, random: () => number): WritingItem | null {
  const parts = segmentWords(entry.spanish, language)
  const words = parts.map((part, index) => ({ ...part, index })).filter((part) => part.isWord)
  if (words.length < 3) return null
  const minLength = language === 'Mandarin Chinese' ? 2 : 3
  const candidates = words.filter((word) => Array.from(word.text).length >= minLength && !/^\d+$/.test(word.text))
  const pool = candidates.length > 0 ? candidates : words
  const chosen = pool[Math.floor(random() * pool.length)]
  return {
    id: `cloze-${entry.lessonId}-${entry.spanish}`,
    mode: 'cloze',
    prompt: parts.map((part, index) => (index === chosen.index ? blank : part.text)).join(''),
    hint: entry.english,
    answers: [chosen.text],
    audio: entry.spanish,
  }
}

export function buildWritingItems(
  entries: readonly VocabularyEntry[],
  mode: WritingMode,
  language: string,
  count = 10,
  random: () => number = Math.random,
): WritingItem[] {
  const items: WritingItem[] = []
  const used = new Set<string>()

  if (mode === 'translate') {
    const targetsByEnglish = new Map<string, string[]>()
    for (const entry of entries) {
      const key = entry.english.toLocaleLowerCase()
      targetsByEnglish.set(key, [...(targetsByEnglish.get(key) ?? []), entry.spanish])
    }
    for (const entry of shuffle(entries.filter((candidate) => candidate.spanish.length <= 40), random)) {
      const key = entry.english.toLocaleLowerCase()
      if (used.has(key)) continue
      used.add(key)
      items.push({ id: `translate-${entry.lessonId}-${entry.spanish}`, mode, prompt: entry.english, hint: `Write this in ${language}`, answers: targetsByEnglish.get(key) ?? [entry.spanish], audio: entry.spanish })
      if (items.length === count) break
    }
    return items
  }

  const pool = shuffle(entries.filter((entry) => hasMultipleWords(entry, language) && entry.spanish.length <= 120), random)
  for (const entry of pool) {
    if (used.has(entry.spanish)) continue
    used.add(entry.spanish)
    if (mode === 'cloze') {
      const item = clozeItem(entry, language, random)
      if (item) items.push(item)
    } else {
      items.push({ id: `dictation-${entry.lessonId}-${entry.spanish}`, mode, prompt: 'Listen, then write what you hear.', hint: entry.english, answers: [entry.spanish], audio: entry.spanish })
    }
    if (items.length === count) break
  }
  return items
}

const latinExtras = (extras: string) => [...extras]

export function getKeyboardRows(language: string): string[][] {
  switch (language) {
    case 'Spanish':
      return [[...'qwertyuiop'], [...'asdfghjklñ'], [...'zxcvbnm'], latinExtras('áéíóúü¿¡,.?!')]
    case 'Italian':
      return [[...'qwertyuiop'], [...'asdfghjkl'], [...'zxcvbnm'], latinExtras('àèéìòù’,.?!')]
    case 'Russian':
      return [[...'йцукенгшщзхъ'], [...'фывапролджэ'], [...'ячсмитьбюё'], latinExtras(',.?!-')]
    case 'Modern Standard Arabic':
      return [[...'ضصثقفغعهخحجد'], [...'شسيبلاتنمكط'], [...'ئءؤرىةوزظذ'], ['\u064E', '\u064F', '\u0650', '\u0651', '\u0652', '\u064B', '\u064C', '\u064D', '،', '؟']]
    default:
      return []
  }
}

// Mandarin has no letter-based keyboard; offer the characters needed plus nearby characters from the level pool.
export function buildCharacterBank(answers: readonly string[], pool: readonly string[], size = 16, random: () => number = Math.random) {
  const needed = new Set(Array.from(answers.join('')).filter((character) => /\p{Script=Han}/u.test(character)))
  const extras = shuffle(Array.from(new Set(Array.from(pool.join('')).filter((character) => /\p{Script=Han}/u.test(character) && !needed.has(character)))), random)
  return shuffle([...needed, ...extras.slice(0, Math.max(0, size - needed.size))], random)
}
