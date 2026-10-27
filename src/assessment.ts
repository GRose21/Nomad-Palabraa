export type AssessmentQuestion = {
  prompt: string
  answers: string[]
  correctIndex: number
}

import { spanishExtraAssessmentQuestions } from './assessmentExtra.ts'

const coreAssessmentQuestions: AssessmentQuestion[] = [
  { prompt: 'What does “Yo soy Ana” mean?', answers: ['I am Ana', 'I am from Ana', 'Ana is me', 'I have Ana'], correctIndex: 0 },
  { prompt: 'Which word means “book”?', answers: ['Un libro', 'Una casa', 'Una taza', 'Un coche'], correctIndex: 0 },
  { prompt: 'Which sentence means “I am learning Spanish”?', answers: ['Estoy aprendiendo español', 'Aprendo Spanish', 'Soy español', 'Aprendí español'], correctIndex: 0 },
  { prompt: 'What is the Spanish word for “today”?', answers: ['Hoy', 'Hoyes', 'Hoya', 'Esa'], correctIndex: 0 },
  { prompt: 'Which phrase means “I would like a coffee”?', answers: ['Quiero un café', 'Me encanta el café', 'Quisiera un café', 'Tengo café'], correctIndex: 2 },
  { prompt: 'What does “El mercado está abierto” mean?', answers: ['The market is closed', 'The market is open', 'The market is new', 'The market is big'], correctIndex: 1 },
  { prompt: 'Which phrase best describes a Spanish newspaper?', answers: ['Un periódico', 'Un colegio', 'Un aeropuerto', 'Un jardín'], correctIndex: 0 },
  { prompt: 'Choose the correct sentence for “I have lived here for two years.”', answers: ['Vivo aquí desde hace dos años', 'Viví aquí desde hace dos años', 'Estoy aquí desde dos años', 'Viviré aquí dos años'], correctIndex: 0 },
  { prompt: 'What does “No entiendo el vídeo” mean?', answers: ['I do not understand the video', 'I do not want the video', 'I am watching the video', 'I made the video'], correctIndex: 0 },
  { prompt: 'Which option expresses an opinion?', answers: ['Estoy cansado', 'Creo que el plan es mejor', 'La reunión empieza a las ocho', 'El tren llega a las nueve'], correctIndex: 1 },
  { prompt: 'Which sentence uses the subjunctive mood?', answers: ['Digo que venga', 'Digo que viene', 'Digo que vino', 'Digo que vendrá'], correctIndex: 0 },
  { prompt: 'What is the most natural translation of “The speaker’s argument was persuasive”?', answers: ['El argumento del hablante fue persuasivo', 'El hablante argumentó con fuerza', 'La conversación fue muy larga', 'El público no habló'], correctIndex: 0 },
  { prompt: 'Complete: “Las calles son ___.” (quiet)', answers: ['tranquilo', 'tranquilas', 'tranquila', 'tranquilos'], correctIndex: 1 },
  { prompt: 'Choose the natural continuation: “Ayer llegué tarde, así que…”', answers: ['perdí el autobús', 'pierdo el autobús mañana', 'perdería el autobús ayer', 'estoy perdiendo el autobús'], correctIndex: 0 },
  { prompt: 'What does “Se venden entradas en la taquilla” mean?', answers: ['Tickets are sold at the box office', 'The cashier is looking for tickets', 'Tickets were sold yesterday', 'The box office is closed'], correctIndex: 0 },
  { prompt: 'Choose the sentence that makes a conjecture about a completed past event.', answers: ['Habrá salido ya', 'Saldrá mañana', 'Salía todos los días', 'Sale ahora'], correctIndex: 0 },
  { prompt: 'Which phrase best expresses “Although the evidence is limited, the pattern is clear” as an accepted fact?', answers: ['Aunque las pruebas son limitadas, el patrón está claro', 'Aunque las pruebas sean limitadas, el patrón estaba claro', 'Si las pruebas fueran limitadas, el patrón sería claro', 'Las pruebas para el patrón'], correctIndex: 0 },
  { prompt: 'Choose a natural formal sentence emphasizing who made the decision.', answers: ['Fue el comité quien tomó la decisión', 'El comité fue la decisión tomada', 'Quien la decisión el comité tomó'], correctIndex: 0 },
]

export const assessmentQuestions: AssessmentQuestion[] = [...coreAssessmentQuestions, ...spanishExtraAssessmentQuestions]

const tiersPerBlock = 6
const questionsPerTier = 3
const blockSize = tiersPerBlock * questionsPerTier

function shuffled<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    ;[result[index], result[swap]] = [result[swap], result[index]]
  }
  return result
}

export function shuffleAssessmentAnswers(question: AssessmentQuestion, random: () => number = Math.random): AssessmentQuestion {
  const order = shuffled(question.answers.map((_, index) => index), random)
  return {
    ...question,
    answers: order.map((index) => question.answers[index]),
    correctIndex: order.indexOf(question.correctIndex),
  }
}

// The bank is laid out in blocks of 18: three questions for each CEFR level, easiest first.
// A session draws three random questions per level and shuffles their answer order.
export function buildAssessmentSession(bank: AssessmentQuestion[], random: () => number = Math.random): AssessmentQuestion[] {
  if (bank.length % blockSize !== 0) return bank.map((question) => shuffleAssessmentAnswers(question, random))
  const session: AssessmentQuestion[] = []
  for (let tier = 0; tier < tiersPerBlock; tier += 1) {
    const candidates = bank.filter((_, index) => Math.floor((index % blockSize) / questionsPerTier) === tier)
    session.push(...shuffled(candidates, random).slice(0, questionsPerTier).map((question) => shuffleAssessmentAnswers(question, random)))
  }
  return session
}
