type PassageTextProps = {
  text: string
  lang: string
  direction: 'auto' | 'rtl'
  className?: string
}

function PassageText({ text, lang, direction, className }: PassageTextProps) {
  return (
    <div className={className} lang={lang} dir={direction}>
      {text.split(/\n\s*\n/).filter((paragraph) => paragraph.trim()).map((paragraph, index) => (
        <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph.trim()}</p>
      ))}
    </div>
  )
}

export default PassageText
