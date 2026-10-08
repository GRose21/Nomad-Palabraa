import { useState } from 'react'
import { estimateSpeechSeconds, speechSpeedMultiplier, speechSpeedOptions, type SpeechSpeed } from './speech'

type AudioDockProps = {
  text: string
  language: string
  langCode: string
  charIndex: number
  speed: SpeechSpeed
  volume: number
  paused: boolean
  allowRewind: boolean
  canRewind: boolean
  onToggle: () => void
  onRewind: () => void
  onStop: () => void
  onSeek: (seconds: number) => void
  onSpeedChange: (speed: SpeechSpeed) => void
  onVolumeChange: (volume: number) => void
}

const formatTime = (seconds: number) => {
  const whole = Math.max(0, Math.round(seconds))
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`
}

function AudioDock({
  text, language, langCode, charIndex, speed, volume, paused, allowRewind, canRewind,
  onToggle, onRewind, onStop, onSeek, onSpeedChange, onVolumeChange,
}: AudioDockProps) {
  const [scrubSeconds, setScrubSeconds] = useState<number | null>(null)
  const multiplier = speechSpeedMultiplier(speed)
  const duration = Math.max(1, estimateSpeechSeconds(text, langCode, multiplier))
  const elapsed = Math.min(duration, estimateSpeechSeconds(charIndex, langCode, multiplier))
  const shown = scrubSeconds ?? elapsed
  const commitSeek = () => {
    if (scrubSeconds === null) return
    onSeek(scrubSeconds)
    setScrubSeconds(null)
  }

  return (
    <aside className="audio-dock" aria-label="Audio playback controls">
      <div className="audio-dock-top">
        <strong className="audio-dock-status">{paused ? 'Audio paused' : `Playing ${language}`}</strong>
        <div className="audio-dock-buttons">
          {allowRewind && <button className="audio-dock-rewind" type="button" onClick={onRewind} disabled={!canRewind} aria-label="Go back 5 seconds">↶ 5s</button>}
          <button className="audio-dock-button" type="button" onClick={onToggle} aria-label={paused ? 'Resume audio' : 'Pause audio'}>
            {paused ? '▶ Resume' : 'Ⅱ Pause'}
          </button>
          <button className="audio-dock-stop" type="button" onClick={onStop} aria-label="Stop audio">■</button>
        </div>
      </div>
      <div className="audio-dock-seek">
        <span>{formatTime(shown)}</span>
        <input
          type="range"
          min={0}
          max={Math.round(duration)}
          step={1}
          value={Math.round(shown)}
          disabled={!allowRewind}
          aria-label="Audio position"
          aria-valuetext={`${formatTime(shown)} of ${formatTime(duration)}`}
          onChange={(event) => setScrubSeconds(Number(event.target.value))}
          onPointerUp={commitSeek}
          onKeyUp={commitSeek}
          onBlur={commitSeek}
        />
        <span>{formatTime(duration)}</span>
      </div>
      <div className="audio-dock-options">
        <div className="audio-dock-speed" role="group" aria-label="Playback speed">
          {speechSpeedOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={speed === option.value ? 'active' : ''}
              aria-pressed={speed === option.value}
              onClick={() => onSpeedChange(option.value)}
            >{option.label}</button>
          ))}
        </div>
        <label className="audio-dock-volume">
          <span aria-hidden="true">{volume === 0 ? '🔇' : '🔊'}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(volume * 100)}
            aria-label="Volume"
            onChange={(event) => onVolumeChange(Number(event.target.value) / 100)}
          />
        </label>
      </div>
    </aside>
  )
}

export default AudioDock
