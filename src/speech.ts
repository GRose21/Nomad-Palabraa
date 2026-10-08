type SpeechVoice = Pick<SpeechSynthesisVoice, 'lang' | 'name' | 'default'>

export function chooseSpeechVoice<T extends SpeechVoice>(voices: readonly T[], language: string): T | undefined {
  const normalizedLanguage = language.toLocaleLowerCase()
  const baseLanguage = normalizedLanguage.split('-')[0]
  const matchingVoices = voices.filter((voice) => voice.lang.toLocaleLowerCase().split('-')[0] === baseLanguage)

  return matchingVoices
    .map((voice) => {
      const voiceLanguage = voice.lang.toLocaleLowerCase()
      const naturalVoice = /natural|enhanced|premium|neural|siri|google|microsoft/i.test(voice.name)
      const score = (voiceLanguage === normalizedLanguage ? 4 : 0)
        + (naturalVoice ? 3 : 0)
        + (voice.default ? 1 : 0)
      return { voice, score }
    })
    .sort((first, second) => second.score - first.score)[0]?.voice
}

export type SpeechSpeed = 'slow' | 'normal' | 'fast'

export const speechSpeedOptions: ReadonlyArray<{ value: SpeechSpeed; label: string; multiplier: number }> = [
  { value: 'slow', label: 'Slow', multiplier: 0.75 },
  { value: 'normal', label: 'Normal', multiplier: 1 },
  { value: 'fast', label: 'Fast', multiplier: 1.3 },
]

export const speechSpeedMultiplier = (speed: SpeechSpeed) =>
  speechSpeedOptions.find((option) => option.value === speed)?.multiplier ?? 1

export function speechRate(language: string, multiplier = 1) {
  const baseRate = language.toLocaleLowerCase().startsWith('zh') ? 0.88 : 0.92
  return Math.min(2, Math.max(0.5, baseRate * multiplier))
}

const charactersPerSecond = (language: string, multiplier = 1) => {
  const languageBase = language.toLocaleLowerCase().split('-')[0]
  const base = languageBase === 'zh' ? 5 : languageBase === 'ar' ? 15 : 18
  return base * multiplier
}

const snapToBoundary = (text: string, targetIndex: number) => {
  if (targetIndex <= 0) return 0
  if (targetIndex >= text.length) return text.length
  const prefix = text.slice(0, targetIndex)
  const boundary = [...' \n。！？；，、：,.!?;:؛،؟']
    .reduce((latest, mark) => Math.max(latest, prefix.lastIndexOf(mark)), -1)
  return boundary > 0 ? boundary + 1 : 0
}

export function estimateSpeechSeconds(textOrLength: string | number, language: string, multiplier = 1) {
  const length = typeof textOrLength === 'number' ? textOrLength : textOrLength.length
  return length / charactersPerSecond(language, multiplier)
}

export function seekSpeechIndex(text: string, seconds: number, language: string, multiplier = 1) {
  return snapToBoundary(text, Math.round(seconds * charactersPerSecond(language, multiplier)))
}

export function rewindSpeechIndex(text: string, currentIndex: number, language: string, seconds = 5, multiplier = 1) {
  const targetIndex = Math.max(0, currentIndex - Math.round(charactersPerSecond(language, multiplier) * seconds))
  return snapToBoundary(text, targetIndex)
}
