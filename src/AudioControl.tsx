type AudioPlaybackStatus = 'idle' | 'playing' | 'paused'

type AudioControlProps = {
  phrase: string
  language: string
  status: AudioPlaybackStatus
  isCurrent: boolean
  onActivate: (phrase: string) => void
  label?: string
  disabled?: boolean
}

function AudioControl({ phrase, language, status, isCurrent, onActivate, label = 'Listen', disabled = false }: AudioControlProps) {
  const isPlaying = isCurrent && status === 'playing'
  const isPaused = isCurrent && status === 'paused'
  const action = isPlaying ? 'Pause' : isPaused ? 'Resume' : label

  return (
    <button
      className="audio-button"
      type="button"
      disabled={disabled}
      onClick={() => onActivate(phrase)}
      aria-label={`${action} (${language})`}
      aria-pressed={isPlaying}
    >
      <span aria-hidden="true">{isPlaying ? 'Ⅱ' : '▶'}</span>
      {action}
    </button>
  )
}

export default AudioControl
