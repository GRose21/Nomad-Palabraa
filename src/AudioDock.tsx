type AudioDockProps = {
  text: string
  language: string
  lang: string
  direction: 'auto' | 'rtl'
  paused: boolean
  allowRewind: boolean
  canRewind: boolean
  onToggle: () => void
  onRewind: () => void
  onStop: () => void
}

function AudioDock({ text, language, lang, direction, paused, allowRewind, canRewind, onToggle, onRewind, onStop }: AudioDockProps) {
  return (
    <aside className="audio-dock" aria-label="Audio playback controls">
      <div className="audio-dock-copy">
        <strong>{paused ? 'Audio paused' : `Playing ${language}`}</strong>
        <p lang={lang} dir={direction}>{text}</p>
      </div>
      {allowRewind && <button className="audio-dock-rewind" type="button" onClick={onRewind} disabled={!canRewind} aria-label="Go back 5 seconds">↶ 5s</button>}
      <button className="audio-dock-button" type="button" onClick={onToggle} aria-label={paused ? 'Resume audio' : 'Pause audio'}>
        {paused ? '▶ Resume' : 'Ⅱ Pause'}
      </button>
      <button className="audio-dock-stop" type="button" onClick={onStop} aria-label="Stop audio">■</button>
    </aside>
  )
}

export default AudioDock
