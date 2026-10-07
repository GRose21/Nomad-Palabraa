import type { Level } from './learning'

export type PracticeLevel = 'Pre-A1' | Level
export type PracticeActivity = {
  level: PracticeLevel
  icon: string
  title: string
  prompt: string
  audioPhrase: string
  options: string[]
  answer: number
}

export const activityCards: PracticeActivity[] = [
  { level: 'A1', icon: '◉', title: 'Choose the correct word', prompt: 'How do you say “I am from Spain” in Spanish?', audioPhrase: 'Soy de España', options: ['Soy de España', 'Estoy de España', 'Vivo en España', 'Soy España'], answer: 0 },
  { level: 'A1', icon: '⌁', title: 'Listen & repeat', prompt: 'Listen to the phrase, then repeat it aloud.', audioPhrase: 'Quiero un café', options: ['Quiero un café', 'Dime tu nombre', 'Estoy aprendiendo', 'Gracias por tu ayuda'], answer: 0 },
  { level: 'A1', icon: '✦', title: 'Fill in the gap', prompt: 'Complete the sentence: “____ es mi hermano.”', audioPhrase: 'Él es mi hermano', options: ['Yo', 'Él', 'Ella', 'Aquí'], answer: 1 },
  { level: 'A1', icon: '♫', title: 'Listen for meaning', prompt: 'Listen to the question. What does it mean in English?', audioPhrase: '¿Dónde está la estación?', options: ['Where is the station?', 'When does the station open?', 'Who is at the station?', 'How far is the station?'], answer: 0 },
  { level: 'A1', icon: '↔', title: 'Choose a natural reply', prompt: 'Someone asks “¿Cómo estás?” Choose a natural reply.', audioPhrase: 'Estoy muy bien, gracias', options: ['Estoy muy bien, gracias', 'Me llamo Ana', 'Tengo veinte años', 'Vivo en Madrid'], answer: 0 },
  { level: 'A2', icon: '◷', title: 'Practice the past tense', prompt: 'Complete the sentence: “Ayer nosotros ____ al museo.”', audioPhrase: 'Ayer nosotros fuimos al museo', options: ['fuimos', 'vamos', 'iremos', 'vamos a ir'], answer: 0 },
  { level: 'A2', icon: '⌂', title: 'Learn a useful phrase', prompt: 'How do you say “I need a table for two” in Spanish?', audioPhrase: 'Necesito una mesa para dos', options: ['Necesito una mesa para dos', 'Quiero dos mesas grandes', 'La mesa está para dos', 'Tengo una mesa pequeña'], answer: 0 },
  { level: 'A2', icon: '▤', title: 'Understand the sentence', prompt: 'Listen to the sentence. Where does the speaker’s sister work?', audioPhrase: 'Mi hermana trabaja en una escuela', options: ['At a school', 'At a hospital', 'At a restaurant', 'At a library'], answer: 0 },
  { level: 'Pre-A1', icon: '👋', title: 'Match your first greeting', prompt: 'Which Spanish word means “hello”?', audioPhrase: 'Hola', options: ['Hola', 'Adiós', 'Gracias'], answer: 0 },
  { level: 'Pre-A1', icon: '♫', title: 'Hear a polite word', prompt: 'Listen and choose the phrase that means “please.”', audioPhrase: 'Por favor', options: ['Por favor', 'Buenos días', 'Hasta luego'], answer: 0 },
  { level: 'A1', icon: '▧', title: 'Choose the right article', prompt: 'Complete: “___ casa es pequeña.”', audioPhrase: 'La casa es pequeña', options: ['El', 'La', 'Los'], answer: 1 },
  { level: 'A1', icon: '⌖', title: 'Follow simple directions', prompt: 'Where should you turn?', audioPhrase: 'Gira a la derecha', options: ['To the right', 'To the left', 'Go straight ahead'], answer: 0 },
  { level: 'A2', icon: '☕', title: 'Order politely', prompt: 'Choose a polite way to ask for water.', audioPhrase: 'Quisiera un vaso de agua, por favor', options: ['Quisiera un vaso de agua, por favor', 'Soy agua mañana', 'Tengo una mesa'], answer: 0 },
  { level: 'A2', icon: '◷', title: 'Put the day in order', prompt: 'What happened first?', audioPhrase: 'Primero desayuné y después fui al trabajo', options: ['I had breakfast', 'I went to work', 'I arrived home'], answer: 0 },
  { level: 'B1', icon: '↪', title: 'Choose the story connector', prompt: 'Complete: “___ esperábamos, empezó a llover.”', audioPhrase: 'Mientras esperábamos, empezó a llover', options: ['Mientras', 'Por consiguiente', 'Aunque mañana'], answer: 0 },
  { level: 'B1', icon: '▣', title: 'Understand a travel update', prompt: 'Why was the passenger concerned?', audioPhrase: 'El tren se ha cancelado y tengo una conexión en Zaragoza', options: ['They had a connection', 'They lost a bag', 'They missed a meeting'], answer: 0 },
  { level: 'B2', icon: '⚖', title: 'Choose a concession', prompt: 'The speaker accepts this as a fact: “Aunque ___ costoso, el plan está aprobado.”', audioPhrase: 'Aunque es costoso, el plan está aprobado', options: ['es', 'sea', 'sería'], answer: 0 },
  { level: 'B2', icon: '⇄', title: 'Identify the balanced proposal', prompt: 'Which solution combines a benefit and a safeguard?', audioPhrase: 'El modelo híbrido funciona siempre y cuando los días presenciales respondan a necesidades reales', options: ['A hybrid model with a real coordination purpose', 'More office days without a purpose', 'No coordination at all'], answer: 0 },
  { level: 'C1', icon: '⌁', title: 'Interpret the qualification', prompt: 'What does “por sí solo” mean in an argument?', audioPhrase: 'El resultado no demuestra por sí solo la causa', options: ['By itself', 'At the same time', 'For this reason'], answer: 0 },
  { level: 'C1', icon: '◉', title: 'Spot the inference', prompt: 'A result is compatible with a hypothesis but does not prove it. What should you do?', audioPhrase: 'La correlación es compatible con la hipótesis, pero no establece causalidad', options: ['Look for other explanations and evidence', 'Treat correlation as proof', 'Ignore the result completely'], answer: 0 },
  { level: 'C2', icon: '❝', title: 'Read the implied reservation', prompt: 'What does “con esas reservas” signal?', audioPhrase: 'Con esas reservas, me parece razonable', options: ['Agreement with qualifications', 'Complete rejection', 'A change of subject'], answer: 0 },
  { level: 'C2', icon: '↔', title: 'Choose a precise formal request', prompt: 'Which is polite and still gives a clear deadline?', audioPhrase: '¿Podrías enviarlo antes de las cinco?', options: ['¿Podrías enviarlo antes de las cinco?', 'Quizá algún día se podría enviar', 'Envíalo cuando sea'], answer: 0 },
]
