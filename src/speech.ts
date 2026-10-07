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

export function speechRate(language: string) {
  return language.toLocaleLowerCase().startsWith('zh') ? 0.88 : 0.92
}

export function rewindSpeechIndex(text: string, currentIndex: number, language: string, seconds = 5) {
  const languageBase = language.toLocaleLowerCase().split('-')[0]
  const charactersPerSecond = languageBase === 'zh' ? 5 : languageBase === 'ar' ? 15 : 18
  const targetIndex = Math.max(0, currentIndex - Math.round(charactersPerSecond * seconds))
  const prefix = text.slice(0, targetIndex)
  const boundary = [...' \n。！？；，、：,.!?;:؛،؟']
    .reduce((latest, mark) => Math.max(latest, prefix.lastIndexOf(mark)), -1)
  return boundary > 0 ? boundary + 1 : 0
}
