import PassageText from './PassageText'

type ListeningTranscriptProps = {
  text: string
  lang: string
  direction: 'auto' | 'rtl'
  unlocked: boolean
  visible: boolean
  onToggle: () => void
}

function ListeningTranscript({ text, lang, direction, unlocked, visible, onToggle }: ListeningTranscriptProps) {
  if (!unlocked) {
    return <p className="transcript-locked">Listen to the full passage to unlock its transcript.</p>
  }

  return (
    <div className="transcript-section">
      <button type="button" className="transcript-toggle" onClick={onToggle} aria-expanded={visible}>
        {visible ? 'Hide transcript' : 'Show transcript'}
      </button>
      {visible && <PassageText className="resource-passage" text={text} lang={lang} direction={direction} />}
    </div>
  )
}

export default ListeningTranscript
