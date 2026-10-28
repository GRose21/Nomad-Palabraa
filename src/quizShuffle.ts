export type LessonQuestion = { prompt: string; options: string[]; answer: number }
export type ResourceQuestion = { prompt: string; answers: string[]; correctIndex: number }

export function seededRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffleChoices(choices: string[], answer: number, random: () => number) {
  const order = choices.map((_, index) => index)
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    ;[order[index], order[swap]] = [order[swap], order[index]]
  }
  return { choices: order.map((index) => choices[index]), answer: order.indexOf(answer) }
}

export function shuffleLessonQuestions(questions: LessonQuestion[], random: () => number): LessonQuestion[] {
  return questions.map((question) => {
    const { choices, answer } = shuffleChoices(question.options, question.answer, random)
    return { ...question, options: choices, answer }
  })
}

export function shuffleResourceQuestions<T extends ResourceQuestion>(questions: T[], random: () => number = Math.random): T[] {
  return questions.map((question) => {
    const { choices, answer } = shuffleChoices(question.answers, question.correctIndex, random)
    return { ...question, answers: choices, correctIndex: answer }
  })
}
