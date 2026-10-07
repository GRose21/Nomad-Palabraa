export type Resource = {
  type: 'video' | 'reading'
  title: string
  description: string
  source: string
  level: string
  tag: string
  url: string
  embedUrl: string
  passage?: string
  comprehension?: Array<{ prompt: string; answers: string[]; correctIndex: number }>
}
