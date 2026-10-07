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
