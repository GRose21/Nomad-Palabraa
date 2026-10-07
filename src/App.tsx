import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { getActivityScore, getDailyMinutes, getLevelFromScore, getStreak, getWeekDays, type Level } from './learning'
import { grammarLessons, grammarLevels } from './grammar'
import { courseLevelInfo, courseLevels, lessonSupport, starterLessons, supplementalLessons, type CourseLevel, type LessonSupport } from './learnCourse'
import { assessmentQuestions } from './assessment'
import { activityCards } from './practice'
import { getVocabulary } from './vocabulary'
import { italianActivityCards, italianAssessmentQuestions, italianCourseLevels, italianGrammarLessons, italianGrammarLevels, italianLessonContent, italianLessonSupport, italianPlans, italianStarters, italianSupplementalLessons } from './italian'
import GrammarTab from './GrammarTab'
import VocabularyTab from './VocabularyTab'
import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'
import './App.css'

type Page = 'dashboard' | 'assessment' | 'learn' | 'grammar' | 'vocabulary' | 'resources' | 'play' | 'progress' | 'feedback'
type FeedbackCategory = 'bug' | 'recommendation' | 'other'
type Resource = {
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

type SpeechRecognitionAlternative = { transcript: string }
type SpeechRecognitionResult = ArrayLike<SpeechRecognitionAlternative>
type SpeechRecognitionEvent = { results: ArrayLike<SpeechRecognitionResult> }
type SpeechRecognitionErrorEvent = { error: string }
type BrowserSpeechRecognition = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}
type BrowserSpeechRecognitionConstructor = new () => BrowserSpeechRecognition

declare global {
  interface Window {
    SpeechRecognition?: BrowserSpeechRecognitionConstructor
    webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor
  }
}

const levelData: Record<Level, { label: string; title: string; description: string; progress: number }> = {
  A1: { label: 'A1', title: 'Beginner', description: 'Build basic words and simple phrases for everyday situations.', progress: 25 },
  A2: { label: 'A2', title: 'Elementary', description: 'Handle simple conversations and understand familiar information.', progress: 40 },
  B1: { label: 'B1', title: 'Intermediate', description: 'Manage everyday conversations and understand main ideas in familiar texts.', progress: 60 },
  B2: { label: 'B2', title: 'Upper Intermediate', description: 'Discuss ideas in detail and understand varied text types.', progress: 75 },
  C1: { label: 'C1', title: 'Advanced', description: 'Express complex ideas and communicate fluently in professional contexts.', progress: 90 },
  C2: { label: 'C2', title: 'Proficient', description: 'Communicate naturally, precisely, and effectively in any context.', progress: 100 },
}
const isLevel = (value: unknown): value is Level =>
  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].some((candidate) => candidate === value)

const coreResources: Resource[] = [
  { type: 'video', title: 'Spanish Greetings: Formal, Casual & Slang', description: 'Learn useful ways to greet people in Spanish, from formal to casual.', source: 'The Language Tutor', level: 'A1–A2', tag: 'Video lesson', url: 'https://www.youtube.com/watch?v=AqfQQZVmTUw', embedUrl: 'https://www.youtube-nocookie.com/embed/AqfQQZVmTUw' },
  { type: 'video', title: 'A Very Special Dinner: Spanish Story', description: 'Follow an engaging beginner-friendly story told in Spanish.', source: 'Dreaming Spanish', level: 'A1–A2', tag: 'Comprehensible input', url: 'https://www.youtube.com/watch?v=wEO_8ghFM04', embedUrl: 'https://www.youtube-nocookie.com/embed/wEO_8ghFM04' },
  { type: 'video', title: 'Are We Becoming a Society of Complainers?', description: 'Listen to an advanced Spanish discussion and follow the speaker’s argument.', source: 'Dreaming Spanish', level: 'C1–C2', tag: 'Discussion', url: 'https://www.youtube.com/watch?v=wLHq5dFOibU', embedUrl: 'https://www.youtube-nocookie.com/embed/wLHq5dFOibU' },
  { type: 'reading', title: 'A City in Motion', description: 'A short newspaper-style reading about a busy neighborhood and local life.', source: 'Nomad Palabra News', level: 'A2–B1', tag: 'News', url: 'https://www.reuters.com/world/latin-america', embedUrl: '', passage: 'La mañana empieza con el sonido de los autobuses. Marta vive en un barrio donde la gente trabaja, compra y comparte historias. El mercado abre temprano y el café de la esquina ya tiene clientes. Marta quiere visitar la biblioteca, pero primero debe atender una llamada de su hermana.', comprehension: [{ prompt: 'What time does the market open?', answers: ['Late afternoon', 'Early in the morning', 'At night', 'After lunch'], correctIndex: 1 }, { prompt: 'Who calls Marta?', answers: ['Her sister', 'Her teacher', 'Her neighbor', 'Her doctor'], correctIndex: 0 }] },
  { type: 'reading', title: 'The Story of a Family', description: 'A simple narrative with clear vocabulary and a short comprehension guide.', source: 'Story Library', level: 'A1–A2', tag: 'Book', url: 'https://www.bookshop.org', embedUrl: '', passage: 'Los días de Ana empiezan con un desayuno de pan y café. Su familia vive en una casa pequeña cerca del parque. Ana quiere aprender a cocinar y le gusta escuchar las historias de su abuela.', comprehension: [{ prompt: 'What does Ana enjoy learning?', answers: ['To cook', 'To drive', 'To swim', 'To travel'], correctIndex: 0 }] },
  { type: 'reading', title: 'A Journey Through the Andes', description: 'An engaging travel article designed for intermediate Spanish readers.', source: 'Travel Spanish', level: 'B1–B2', tag: 'Travel', url: 'https://www.elpais.com', embedUrl: '', passage: 'El viaje por los Andes ofrece paisajes que cambian de hora en hora. Las montañas altas tienen caminos sinuosos, mientras que los pueblos pequeños conservan culturas únicas. Cada parada permite conocer una historia nueva.', comprehension: [{ prompt: 'What changes throughout the journey?', answers: ['The weather only', 'The landscapes', 'The train schedule', 'The local currency'], correctIndex: 1 }] },
]

const resources: Resource[] = [
  ...coreResources,
  ...starterLessons.map((lesson): Resource => ({
    type: 'reading',
    title: lesson.title,
    description: lesson.detail,
    source: 'Nomad Palabra beginner path',
    level: 'Pre-A1',
    tag: 'First steps',
    url: '',
    embedUrl: '',
    passage: lesson.passage,
    comprehension: lesson.questions.map((question) => ({
      prompt: question.prompt,
      answers: question.options,
      correctIndex: question.answer,
    })),
  })),
  ...supplementalLessons.map((lesson): Resource => ({
    type: 'reading',
    title: lesson.title,
    description: lesson.detail,
    source: 'Nomad Palabra graded reader',
    level: lesson.level,
    tag: lesson.label.split(' · ')[0].toLocaleLowerCase(),
    url: '',
    embedUrl: '',
    passage: lesson.passage,
    comprehension: lesson.questions.map((question) => ({
      prompt: question.prompt,
      answers: question.options,
      correctIndex: question.answer,
    })),
  })),
]

const plans: Record<Level, Array<{ title: string; detail: string; minutes: string; speakingPrompt?: string }>> = {
  A1: [
    { title: 'Everyday phrases', detail: 'Learn greetings, introductions, and names through short audio.', minutes: '10 min', speakingPrompt: 'Greet someone in Spanish, introduce yourself, ask their name and where they are from, then answer those questions as if you were that person.' },
    { title: 'Listen to simple stories', detail: 'Follow a short story and identify key words from context.', minutes: '15 min' },
    { title: 'Describe yourself', detail: 'Use basic sentence patterns to introduce yourself.', minutes: '10 min', speakingPrompt: 'Introduce yourself in Spanish. Say your name, where you are from, what you study or do, and one thing you like.' },
  ],
  A2: [
    { title: 'Daily routines', detail: 'Practice talking about your schedule and common activities.', minutes: '15 min' },
    { title: 'Read a short update', detail: 'Understand simple information from a local news summary.', minutes: '15 min' },
    { title: 'Order at a café', detail: 'Practice useful food, drinks, and market vocabulary.', minutes: '10 min', speakingPrompt: 'Role-play ordering at a café in Spanish. Greet the server, order a drink and something to eat, ask the price, and thank them.' },
  ],
  B1: [
    { title: 'Listen to a news summary', detail: 'Identify main ideas and important details in a short report.', minutes: '20 min' },
    { title: 'Read a local story', detail: 'Practice inference, vocabulary, and a short summary.', minutes: '20 min' },
    { title: 'Speak about your weekend', detail: 'Use past-tense phrases to describe a recent experience.', minutes: '15 min', speakingPrompt: 'Describe your last weekend in Spanish. Say where you went, who you went with, what you did, and what you thought about it.' },
  ],
  B2: [
    { title: 'Analyze a video', detail: 'Compare the main argument, tone, and supporting details.', minutes: '25 min' },
    { title: 'Read an opinion piece', detail: 'Identify the writer’s position and supporting arguments.', minutes: '20 min' },
    { title: 'Write a structured response', detail: 'Create a clear paragraph with examples and conclusion.', minutes: '20 min' },
  ],
  C1: [
    { title: 'Review complex media', detail: 'Analyze opinion, nuance, and implied meaning in a longer clip.', minutes: '25 min' },
    { title: 'Practice academic reading', detail: 'Summarize an extended article in your own words.', minutes: '25 min' },
    { title: 'Build an argument', detail: 'Prepare a detailed response with evidence and nuance.', minutes: '30 min', speakingPrompt: 'Make a short argument in Spanish about whether cities should create more car-free streets. State your position, give two reasons, and acknowledge one opposing view.' },
  ],
  C2: [
    { title: 'Master natural expression', detail: 'Refine idiomatic language and register for complex situations.', minutes: '30 min', speakingPrompt: 'In Spanish, respond naturally to a colleague who asks you to take on an urgent task. Politely explain that you are busy, suggest a realistic alternative, and agree on a next step.' },
    { title: 'Read at native pace', detail: 'Use dense texts to develop precision and vocabulary.', minutes: '30 min' },
    { title: 'Speak with precision', detail: 'Practice natural delivery with clear, complex structures.', minutes: '30 min', speakingPrompt: 'Explain in Spanish a project that met its immediate goal but did not solve the underlying problem. Make the distinction clear and recommend a next step.' },
  ],
}

type LessonQuestion = { prompt: string; options: string[]; answer: number }
type LessonContent = { label: string; text: string; questions: LessonQuestion[] }

const lessonContent: Record<string, LessonContent> = {
  'First words: hola and gracias': {
    label: 'FIRST EXCHANGE · GREETINGS',
    text: '—Hola.\n—Hola. Gracias.\n—Adiós.',
    questions: [
      { prompt: 'Which word means “thank you”?', options: ['hola', 'gracias', 'adiós'], answer: 1 },
      { prompt: 'Which word is a greeting?', options: ['hola', 'por favor', 'gracias'], answer: 0 },
    ],
  },
  'Say your name and where you are from': {
    label: 'DIÁLOGO · INTRODUCTIONS',
    text: '—Hola. Me llamo Ana. ¿Cómo te llamas?\n—Soy Leo. Mucho gusto.\n—Soy de Perú.',
    questions: [
      { prompt: 'What is the speaker’s name?', options: ['Ana', 'Leo', 'Perú'], answer: 0 },
      { prompt: 'Which phrase means “nice to meet you”?', options: ['me llamo', 'mucho gusto', 'soy de'], answer: 1 },
    ],
  },
  'Name things: el libro, la casa': {
    label: 'LECTURA · THINGS AROUND US',
    text: 'Es una casa. La casa es pequeña. Hay una mesa. El libro está en la mesa.',
    questions: [
      { prompt: 'Where is the book?', options: ['In the house', 'On the table', 'In the café'], answer: 1 },
      { prompt: 'Which article goes with libro in the passage?', options: ['la', 'el', 'una'], answer: 1 },
    ],
  },
  'Everyday phrases': {
    label: 'DIÁLOGO · GREETINGS',
    text: '—Hola, me llamo Lucía. ¿Cómo te llamas?\n—Soy Daniel. Mucho gusto.\n—¿De dónde eres, Daniel?\n—Soy de México, pero ahora vivo en Sevilla.',
    questions: [
      { prompt: 'Where is Daniel from?', options: ['Spain', 'Mexico', 'Seville', 'Argentina'], answer: 1 },
      { prompt: 'Where does Daniel live now?', options: ['Mexico City', 'Madrid', 'Seville', 'Barcelona'], answer: 2 },
    ],
  },
  'Listen to simple stories': {
    label: 'CUENTO · A SIMPLE STORY',
    text: 'Cada mañana, Ana pasea a su perro Sol por el parque. Sol corre detrás de una pelota roja y saluda a otros perros. Después, Ana compra pan en la tienda que está junto a su casa.',
    questions: [
      { prompt: 'What does Ana do every morning?', options: ['She walks her dog', 'She buys a newspaper', 'She visits her sister', 'She rides a bicycle'], answer: 0 },
      { prompt: 'Where does Ana buy bread?', options: ['At the market', 'At a shop near her home', 'At the café', 'At the park'], answer: 1 },
    ],
  },
  'Describe yourself': {
    label: 'MODELO · INTRODUCING YOURSELF',
    text: 'Me llamo Pablo y tengo diecinueve años. Soy de Colombia y estudio diseño en la universidad. En mi tiempo libre, me gusta dibujar y jugar al fútbol con mis amigos.',
    questions: [
      { prompt: 'What does Pablo study?', options: ['Music', 'Design', 'History', 'Medicine'], answer: 1 },
      { prompt: 'What does Pablo like to do in his free time?', options: ['Cook and read', 'Swim and run', 'Draw and play football', 'Watch films and dance'], answer: 2 },
    ],
  },
  'Daily routines': {
    label: 'LECTURA · A DAILY ROUTINE',
    text: 'De lunes a viernes, Marta se despierta a las siete. Desayuna fruta y toma el autobús al trabajo. Al volver a casa, prepara la cena y estudia español durante media hora.',
    questions: [
      { prompt: 'How does Marta get to work?', options: ['By train', 'By bus', 'On foot', 'By car'], answer: 1 },
      { prompt: 'How long does she study Spanish?', options: ['One hour', 'Fifteen minutes', 'Half an hour', 'Two hours'], answer: 2 },
    ],
  },
  'Read a short update': {
    label: 'NOTICIA · COMMUNITY UPDATE',
    text: 'El ayuntamiento abrirá una nueva biblioteca en el barrio de San Pedro el próximo lunes. El edificio tendrá una sala infantil y un espacio para estudiar. Durante la primera semana, los vecinos podrán inscribirse gratis.',
    questions: [
      { prompt: 'When will the library open?', options: ['Next Monday', 'Tomorrow morning', 'Next month', 'This Friday'], answer: 0 },
      { prompt: 'What can neighbors do for free during the first week?', options: ['Borrow a computer', 'Join the library', 'Attend a concert', 'Take a language exam'], answer: 1 },
    ],
  },
  'Order at a café': {
    label: 'DIÁLOGO · AT A CAFÉ',
    text: '—Buenos días. ¿Qué desea?\n—Un café con leche y una tostada, por favor.\n—¿Quiere algo más?\n—No, gracias. ¿Cuánto es?\n—Son cuatro euros con cincuenta.',
    questions: [
      { prompt: 'What does the customer order?', options: ['Tea and a cake', 'Coffee with milk and toast', 'Juice and a sandwich', 'Water and fruit'], answer: 1 },
      { prompt: 'How much does it cost?', options: ['€3.50', '€4.00', '€4.50', '€5.00'], answer: 2 },
    ],
  },
  'Listen to a news summary': {
    label: 'RESUMEN DE NOTICIAS · TRANSCRIPT',
    text: 'La ciudad de Valencia ampliará su red de carriles bici durante los próximos seis meses. El proyecto conectará varios barrios con la universidad y la estación central. Según el ayuntamiento, también se plantarán árboles a lo largo de las nuevas rutas.',
    questions: [
      { prompt: 'What will the project expand?', options: ['The bus network', 'The bicycle-lane network', 'The train station', 'The university campus'], answer: 1 },
      { prompt: 'What else will happen along the new routes?', options: ['Trees will be planted', 'New shops will open', 'Street markets will close', 'A river will be built'], answer: 0 },
    ],
  },
  'Read a local story': {
    label: 'RELATO · A NEIGHBORHOOD STORY',
    text: 'Cuando cerró la antigua panadería, muchos vecinos pensaron que el local quedaría vacío. Sin embargo, Clara convenció a su abuelo para convertirlo en una pequeña librería. Ahora, cada sábado, los niños del barrio se reúnen allí para escuchar cuentos y elegir un libro.',
    questions: [
      { prompt: 'What did Clara and her grandfather make from the old bakery?', options: ['A café', 'A bookstore', 'A school', 'A restaurant'], answer: 1 },
      { prompt: 'What do children do there on Saturdays?', options: ['Bake bread', 'Play football', 'Listen to stories and choose a book', 'Study mathematics'], answer: 2 },
    ],
  },
  'Speak about your weekend': {
    label: 'MODELO · A WEEKEND STORY',
    text: 'El sábado pasado fui a la costa con dos amigos. Salimos temprano porque queríamos evitar el tráfico y llegamos antes del mediodía. Aunque por la tarde empezó a llover, encontramos un restaurante pequeño y probamos pescado a la parrilla.',
    questions: [
      { prompt: 'Why did they leave early?', options: ['They wanted to avoid traffic', 'The restaurant was closing', 'They had to catch a train', 'They wanted to see the sunrise'], answer: 0 },
      { prompt: 'What did they eat?', options: ['Paella', 'Grilled fish', 'A sandwich', 'Fresh fruit'], answer: 1 },
    ],
  },
  'Analyze a video': {
    label: 'TRANSCRIPCIÓN · VIDEO EXCERPT',
    text: '«Cuando diseñamos una ciudad, solemos priorizar la rapidez: queremos llegar antes y movernos más lejos. Pero una calle no es solo un corredor de tráfico; también es un lugar donde la gente se encuentra. Si añadimos árboles, bancos y espacios seguros para caminar, no eliminamos la movilidad: hacemos que el barrio sea más habitable para todos.»',
    questions: [
      { prompt: 'What contrast does the speaker make?', options: ['Fast travel and streets as community spaces', 'Cars and public transport costs', 'Old buildings and new homes', 'City parks and rural life'], answer: 0 },
      { prompt: 'What is the speaker’s main argument?', options: ['Cities should ban all transport', 'Thoughtful street design can improve neighborhood life', 'People should move to the countryside', 'Trees make traffic move faster'], answer: 1 },
    ],
  },
  'Read an opinion piece': {
    label: 'ARTÍCULO DE OPINIÓN · PUBLIC LIBRARIES',
    text: 'Se suele medir el valor de una biblioteca por el número de libros que presta. Esa cifra importa, pero no cuenta toda la historia. Una biblioteca también ofrece acceso a internet, apoyo para quienes buscan empleo y un espacio tranquilo para estudiar. En una época en que tanta información cuesta dinero o exige una suscripción, mantener estos lugares abiertos es una forma concreta de ampliar las oportunidades.',
    questions: [
      { prompt: 'Which point does the author make about measuring a library’s value?', options: ['Book loans are the only useful measure', 'Book loans matter but do not show its full value', 'Libraries should charge membership fees', 'Libraries no longer need physical space'], answer: 1 },
      { prompt: 'Why does the author support keeping libraries open?', options: ['They make all information free online', 'They provide services and broaden access to opportunities', 'They replace schools and workplaces', 'They increase book sales'], answer: 1 },
    ],
  },
  'Write a structured response': {
    label: 'LECTURA · STRUCTURING AN ARGUMENT',
    text: 'Proteger los edificios históricos no significa conservar cada piedra sin cambios. Una ciudad puede adaptar un mercado antiguo para nuevos usos siempre que respete su estructura y su historia. Así se evita que el patrimonio se convierta en un museo vacío y se mantiene conectado con la vida cotidiana. La clave está en explicar primero el problema, presentar una propuesta viable y respaldarla con un ejemplo concreto.',
    questions: [
      { prompt: 'What does the passage say about adapting historic buildings?', options: ['It is possible while respecting their history', 'It should never be allowed', 'It requires turning them into museums', 'It is only useful for markets'], answer: 0 },
      { prompt: 'Which structure does the passage recommend for an argument?', options: ['Example, conclusion, then problem', 'Problem, practical proposal, and supporting example', 'Opinion without supporting details', 'A list of unrelated facts'], answer: 1 },
    ],
  },
  'Review complex media': {
    label: 'TRANSCRIPCIÓN · PODCAST EXCERPT',
    text: '«La primera reacción ante una ola de calor suele ser individual: cerrar las persianas, buscar sombra, encender el aire acondicionado. Es comprensible, pero insuficiente. Los barrios con menos árboles registran temperaturas más altas, y sus residentes suelen tener menos recursos para protegerse. Hablar de adaptación climática, por tanto, también obliga a hablar de desigualdad urbana.»',
    questions: [
      { prompt: 'What limitation of individual responses does the speaker point out?', options: ['They are too expensive to measure', 'They do not address unequal neighborhood exposure', 'They make heat waves last longer', 'They only work in rural areas'], answer: 1 },
      { prompt: 'What broader issue does the speaker connect to climate adaptation?', options: ['Urban inequality', 'Tourism', 'Public transportation schedules', 'International trade'], answer: 0 },
    ],
  },
  'Practice academic reading': {
    label: 'TEXTO ACADÉMICO · URBAN ECOLOGY',
    text: 'La presencia de polinizadores en entornos urbanos depende menos de la existencia de grandes parques que de la continuidad de pequeños hábitats. Balcones, solares y jardines escolares pueden funcionar como refugios si ofrecen flores durante distintas épocas del año. De ahí que algunas iniciativas municipales estén sustituyendo superficies ornamentales de una sola especie por plantaciones variadas y autóctonas.',
    questions: [
      { prompt: 'According to the passage, what can support pollinators across a city?', options: ['Only large parks', 'Connected small habitats with flowers across seasons', 'Ornamental lawns with one species', 'More paved public squares'], answer: 1 },
      { prompt: 'What change are some municipalities making?', options: ['Replacing varied plants with lawns', 'Planting a wider range of native species', 'Removing school gardens', 'Moving all gardens outside the city'], answer: 1 },
    ],
  },
  'Build an argument': {
    label: 'MODELO · BUILDING A CASE',
    text: 'La formación continua debería considerarse una parte habitual de la vida laboral, no una respuesta excepcional a una crisis. La automatización transforma tareas concretas, pero sus efectos varían según el sector y la experiencia de cada trabajador. Por eso, una política eficaz combinaría cursos accesibles con tiempo remunerado para aprender. Sin ese apoyo práctico, el derecho a formarse corre el riesgo de existir solo sobre el papel.',
    questions: [
      { prompt: 'What does the author argue about ongoing training?', options: ['It should be a regular part of working life', 'It should only follow job losses', 'It is unnecessary when automation increases', 'It should take place only outside work'], answer: 0 },
      { prompt: 'What practical support does the author recommend?', options: ['Fewer courses and longer shifts', 'Accessible courses and paid learning time', 'Training only for managers', 'Replacing training with written policies'], answer: 1 },
    ],
  },
  'Master natural expression': {
    label: 'USO Y REGISTRO · NATURAL EXPRESSION',
    text: 'En una conversación informal, alguien puede decir «ya veremos» no porque tenga una respuesta pendiente, sino para aplazar una decisión con tacto. En un correo profesional, la misma expresión podría sonar ambigua; «lo confirmaré mañana» comunica un compromiso más preciso. Elegir bien no depende solo del significado literal, sino también de la relación entre hablantes y de lo que la situación exige.',
    questions: [
      { prompt: 'Why might someone say “ya veremos” in an informal conversation?', options: ['To politely postpone a decision', 'To make a firm promise', 'To end the conversation immediately', 'To ask for written confirmation'], answer: 0 },
      { prompt: 'What determines which expression is appropriate?', options: ['Only the literal dictionary meaning', 'The relationship and the demands of the situation', 'The length of the sentence', 'Whether the message is spoken loudly'], answer: 1 },
    ],
  },
  'Read at native pace': {
    label: 'LECTURA · LITERARY EXCERPT',
    text: 'Al volver al pueblo, Inés encontró la estación convertida en un café. La pintura azul de las paredes seguía allí, aunque desvaída por el sol, y el reloj continuaba detenido a las cinco y veinte. Pidió un cortado sin mirar la carta: no era nostalgia, se dijo, sino una forma de comprobar que algunos gestos sobreviven incluso cuando los lugares cambian.',
    questions: [
      { prompt: 'What details suggest that the station’s past remains visible?', options: ['The blue paint and stopped clock', 'A timetable and a train ticket', 'A new sign and fresh flowers', 'A map and a newspaper'], answer: 0 },
      { prompt: 'How does Inés interpret her familiar coffee order?', options: ['As proof that she dislikes change', 'As a way to notice that some habits endure', 'As a mistake caused by the menu', 'As an attempt to meet an old friend'], answer: 1 },
    ],
  },
  'Speak with precision': {
    label: 'MODELO · PRECISE EXPLANATION',
    text: 'No afirmaría que el proyecto fracasó; diría, más bien, que alcanzó su objetivo inmediato —reducir las esperas—, aunque no resolvió el problema de fondo: la falta de personal. Esta distinción importa porque la solución adecuada depende de qué resultado consideremos prioritario. Ampliar el horario, por sí solo, podría incluso agravar la carga del equipo.',
    questions: [
      { prompt: 'What distinction does the speaker make?', options: ['The project met its immediate goal but not the underlying need', 'The project reduced staff but improved service', 'The project failed because hours were too short', 'The team solved the problem by extending hours'], answer: 0 },
      { prompt: 'Why might simply extending opening hours be a poor solution?', options: ['It could increase the team’s workload', 'It would reduce waiting times too much', 'It would require fewer staff', 'It would change the project’s immediate goal'], answer: 0 },
    ],
  },
}

const navItems: Array<{ id: Page; label: string; icon: string }> = [
  { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
  { id: 'assessment', label: 'Assessment', icon: '◎' },
  { id: 'learn', label: 'Learn', icon: '◈' },
  { id: 'grammar', label: 'Grammar', icon: '文' },
  { id: 'vocabulary', label: 'Vocabulary', icon: 'Aa' },
  { id: 'resources', label: 'Resources', icon: '▤' },
  { id: 'play', label: 'Play & practice', icon: '▶' },
  { id: 'progress', label: 'Progress', icon: '↗' },
  { id: 'feedback', label: 'Feedback', icon: '✉' },
]

const pageTitles: Record<Page, string> = {
  dashboard: 'Your learning space',
  assessment: 'CEFR assessment',
  learn: 'Learn Spanish',
  grammar: 'Spanish grammar',
  vocabulary: 'Spanish vocabulary',
  resources: 'Study library',
  play: 'Play & practice',
  progress: 'Your progress',
  feedback: 'Feedback',
}

const isStoredState = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

const readStoredState = (key = 'lingua-state'): Record<string, unknown> => {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(key) || '{}')
    return isStoredState(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

const isDateKey = (value: unknown): value is string =>
  typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)

const hasProgress = (value: Record<string, unknown>) => Object.keys(value).length > 0

type CoursePlan = {
  id: string
  courseLevel: CourseLevel
  title: string
  detail: string
  minutes: string
}

const coursePlans: CoursePlan[] = [
  ...starterLessons.map((lesson, index) => ({
    id: `pre-a1-${index + 1}`,
    courseLevel: 'Pre-A1' as const,
    title: lesson.title,
    detail: lesson.detail,
    minutes: lesson.minutes,
  })),
  ...courseLevels.filter((courseLevel): courseLevel is Level => courseLevel !== 'Pre-A1')
    .flatMap((courseLevel) => [
      ...plans[courseLevel].map((lesson, index) => ({
        id: `${courseLevel.toLowerCase()}-${index + 1}`,
        courseLevel,
        title: lesson.title,
        detail: lesson.detail,
        minutes: lesson.minutes,
      })),
      ...supplementalLessons.filter((lesson) => lesson.level === courseLevel).map((lesson) => ({
        id: lesson.id,
        courseLevel,
        title: lesson.title,
        detail: lesson.detail,
        minutes: lesson.minutes,
      })),
    ]),
]

const supplementalLessonContent = Object.fromEntries(supplementalLessons.map((lesson) => [
  lesson.title,
  { label: lesson.label, text: lesson.passage, questions: lesson.questions },
])) as Record<string, LessonContent>
const allLessonContent = { ...lessonContent, ...supplementalLessonContent }
const todayKey = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function App() {
  const [learningLanguage, setLearningLanguage] = useState<'Spanish' | 'Italian'>(() => {
    try {
      return localStorage.getItem('learning-language') === 'Italian' ? 'Italian' : 'Spanish'
    } catch {
      return 'Spanish'
    }
  })
  const isItalian = learningLanguage === 'Italian'
  const activeGrammarLessons = isItalian ? italianGrammarLessons : grammarLessons
  const activeGrammarLevels = isItalian ? italianGrammarLevels : grammarLevels
  const activeCourseLevels = isItalian ? italianCourseLevels : courseLevels
  const activeStarterLessons = isItalian ? italianStarters : starterLessons
  const activeSupplementalLessons = isItalian ? italianSupplementalLessons : supplementalLessons
  const activeLessonSupport = isItalian ? italianLessonSupport : lessonSupport
  const activeAssessmentQuestions = isItalian ? italianAssessmentQuestions : assessmentQuestions
  const activeActivityCards = isItalian ? italianActivityCards : activityCards
  const activePlans = isItalian ? italianPlans : plans
  const activeLessonContent = isItalian ? italianLessonContent : allLessonContent
  const activeCoursePlans: CoursePlan[] = useMemo(() => isItalian ? [
      ...italianStarters.map((lesson, index) => ({
        id: `pre-a1-${index + 1}`, courseLevel: 'Pre-A1' as const, title: lesson.title, detail: lesson.detail, minutes: lesson.minutes,
      })),
      ...italianCourseLevels.filter((courseLevel): courseLevel is Level => courseLevel !== 'Pre-A1')
        .flatMap((courseLevel) => [
          ...activePlans[courseLevel].map((lesson, index) => ({
            id: `${courseLevel.toLowerCase()}-${index + 1}`, courseLevel, title: lesson.title, detail: lesson.detail, minutes: lesson.minutes,
          })),
          ...italianSupplementalLessons.filter((lesson) => lesson.level === courseLevel).map((lesson) => ({
            id: lesson.id, courseLevel, title: lesson.title, detail: lesson.detail, minutes: lesson.minutes,
          })),
        ]),
    ] : coursePlans, [isItalian, activePlans])
  const currentGrammarLessonIds = useMemo(() => new Set(activeGrammarLessons.map((lesson) => lesson.id)), [activeGrammarLessons])
  const activeSupplementalLessonSupport = useMemo(() => Object.fromEntries(activeSupplementalLessons.map((lesson) => [
    lesson.title,
    {
      objective: lesson.objective,
      vocabulary: lesson.vocabulary,
      grammarLessonId: lesson.grammarLessonId,
      grammarNote: lesson.grammarNote,
      speakingPrompt: lesson.speakingPrompt,
      listeningPrompt: lesson.listeningPrompt,
    },
  ])) as Record<string, LessonSupport>, [activeSupplementalLessons])
  const activeVocabulary = useMemo(() => getVocabulary(activeGrammarLessons, activeStarterLessons, activeLessonSupport, activeSupplementalLessons), [activeGrammarLessons, activeStarterLessons, activeLessonSupport, activeSupplementalLessons])
  const [user, setUser] = useState<User | null>(null)
  const userId = user?.id ?? null
  const [authReady, setAuthReady] = useState(!supabase)
  const [loadedProgressOwner, setLoadedProgressOwner] = useState<string | null>(null)
  const [cloudWritableOwner, setCloudWritableOwner] = useState<string | null>(null)
  const [cloudStatus, setCloudStatus] = useState<'local' | 'loading' | 'saving' | 'saved' | 'error'>(supabase ? 'loading' : 'local')
  const [cloudError, setCloudError] = useState('')
  const [accountOpen, setAccountOpen] = useState(false)
  const [accountMode, setAccountMode] = useState<'signIn' | 'signUp'>('signIn')
  const [accountEmail, setAccountEmail] = useState('')
  const [accountPassword, setAccountPassword] = useState('')
  const [accountError, setAccountError] = useState('')
  const [accountMessage, setAccountMessage] = useState('')
  const [accountBusy, setAccountBusy] = useState(false)
  const saveQueueRef = useRef<Promise<void>>(Promise.resolve())
  const accountStorageKey = userId ? `lingua-state:${userId}:${learningLanguage.toLocaleLowerCase()}` : `lingua-state:${learningLanguage.toLocaleLowerCase()}`
  const [storedState] = useState(() => readStoredState(accountStorageKey))
  const currentDate = todayKey()
  const initialDailyState = getDailyMinutes({
    minutes: typeof storedState.minutes === 'number' && Number.isFinite(storedState.minutes) && storedState.minutes >= 0
      ? storedState.minutes
      : 0,
    lastActivityDate: typeof storedState.lastActivityDate === 'string' ? storedState.lastActivityDate : undefined,
  }, currentDate)
  const initialDailyItems = storedState.dailyActivityDate === currentDate && Array.isArray(storedState.dailyCompletedItems)
    ? [...new Set(storedState.dailyCompletedItems.filter((item: unknown): item is string => typeof item === 'string'))]
    : []
  const initialActiveDates = Array.isArray(storedState.activeDates)
    ? storedState.activeDates.filter((date: unknown): date is string => typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date))
    : []
  const initialActivityGoal = typeof storedState.dailyActivityGoal === 'number'
    && Number.isInteger(storedState.dailyActivityGoal)
    && storedState.dailyActivityGoal >= 1
    && storedState.dailyActivityGoal <= 20
    ? storedState.dailyActivityGoal
    : 3
  const initialCompletedActivities = Array.isArray(storedState.completedActivities)
    ? [...new Set(storedState.completedActivities.filter((index: unknown): index is number =>
      typeof index === 'number' && Number.isInteger(index) && index >= 0 && index < activeActivityCards.length,
    ))]
    : []
  const initialCompletedGrammarLessons = Array.isArray(storedState.completedGrammarLessons)
    ? storedState.completedGrammarLessons.filter((id: unknown): id is string => typeof id === 'string' && currentGrammarLessonIds.has(id))
    : []
  const initialCompletedLearnLessons = Array.isArray(storedState.completedLearnLessons)
    ? storedState.completedLearnLessons.filter((id: unknown): id is string => typeof id === 'string' && activeCoursePlans.some((plan) => plan.id === id))
    : []
  const [page, setPage] = useState<Page>('dashboard')
  const [level, setLevel] = useState<Level | null>(() =>
    storedState.assessmentCompleted === true && isLevel(storedState.level) ? storedState.level : null,
  )
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(() =>
    typeof storedState.score === 'number'
      && Number.isInteger(storedState.score)
      && storedState.score >= 0
      && storedState.score <= activeAssessmentQuestions.length
      ? storedState.score
      : 0,
  )
  const [assessmentCompleted, setAssessmentCompleted] = useState(storedState.assessmentCompleted === true)
  const [resourceFilter, setResourceFilter] = useState<'all' | 'video' | 'reading'>('all')
  const [resourceLevelFilter, setResourceLevelFilter] = useState<'all' | CourseLevel>('all')
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [passageAnswers, setPassageAnswers] = useState<number[]>([])
  const [passageScore, setPassageScore] = useState(0)
  const [passageChecked, setPassageChecked] = useState(false)
  const [activityIndex, setActivityIndex] = useState(0)
  const [activityLevelFilter, setActivityLevelFilter] = useState<'all' | CourseLevel>('all')
  const [activityAnswer, setActivityAnswer] = useState<number | null>(null)
  const [activityFeedback, setActivityFeedback] = useState('')
  const [completedActivities, setCompletedActivities] = useState<number[]>(initialCompletedActivities)
  const [completedGrammarLessons, setCompletedGrammarLessons] = useState<string[]>(initialCompletedGrammarLessons)
  const [completedLearnLessons, setCompletedLearnLessons] = useState<string[]>(initialCompletedLearnLessons)
  const [grammarTabKey, setGrammarTabKey] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState<CoursePlan | null>(null)
  const [planAnswers, setPlanAnswers] = useState<number[]>([])
  const [planAnswersChecked, setPlanAnswersChecked] = useState(false)
  const [speechPracticeStatus, setSpeechPracticeStatus] = useState<'idle' | 'listening' | 'ready' | 'error'>('idle')
  const [speechTranscript, setSpeechTranscript] = useState('')
  const [speechError, setSpeechError] = useState('')
  const speechRecognitionRef = useRef<BrowserSpeechRecognition | null>(null)
  const [minutes, setMinutes] = useState(initialDailyState.minutes)
  const [lastActivityDate, setLastActivityDate] = useState(initialDailyState.lastActivityDate)
  const [dailyActivityGoal, setDailyActivityGoal] = useState(initialActivityGoal)
  const [dailyCompletedItems, setDailyCompletedItems] = useState<string[]>(initialDailyItems)
  const [dailyActivityDate, setDailyActivityDate] = useState(currentDate)
  const [activeDates, setActiveDates] = useState<string[]>(initialActiveDates)
  const [isEditingGoal, setIsEditingGoal] = useState(false)
  const [goalDraft, setGoalDraft] = useState(String(initialActivityGoal))
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(storedState.darkMode === true)
  const [toast, setToast] = useState('')
  const [feedbackCategory, setFeedbackCategory] = useState<FeedbackCategory>('bug')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbackBusy, setFeedbackBusy] = useState(false)
  const [feedbackError, setFeedbackError] = useState('')
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const [weekDays] = useState(() => getWeekDays(new Date()))

  const applyProgressState = useCallback((state: Record<string, unknown>) => {
    setLevel(state.assessmentCompleted === true && isLevel(state.level) ? state.level : null)
    const dailyState = getDailyMinutes({
      minutes: typeof state.minutes === 'number' && Number.isFinite(state.minutes) && state.minutes >= 0 ? state.minutes : 0,
      lastActivityDate: isDateKey(state.lastActivityDate) ? state.lastActivityDate : undefined,
    }, currentDate)
    setMinutes(dailyState.minutes)
    setLastActivityDate(dailyState.lastActivityDate)
    setScore(typeof state.score === 'number' && Number.isInteger(state.score) && state.score >= 0 && state.score <= activeAssessmentQuestions.length ? state.score : 0)
    setAssessmentCompleted(state.assessmentCompleted === true)
    setDarkMode(state.darkMode === true)
    setCompletedActivities(Array.isArray(state.completedActivities)
      ? [...new Set(state.completedActivities.filter((index: unknown): index is number => typeof index === 'number' && Number.isInteger(index) && index >= 0 && index < activeActivityCards.length))]
      : [])
    setDailyActivityGoal(typeof state.dailyActivityGoal === 'number' && Number.isInteger(state.dailyActivityGoal) && state.dailyActivityGoal >= 1 && state.dailyActivityGoal <= 20 ? state.dailyActivityGoal : 3)
    setDailyCompletedItems(state.dailyActivityDate === currentDate && Array.isArray(state.dailyCompletedItems)
      ? [...new Set(state.dailyCompletedItems.filter((item: unknown): item is string => typeof item === 'string'))]
      : [])
    setDailyActivityDate(currentDate)
    setActiveDates(Array.isArray(state.activeDates)
      ? [...new Set(state.activeDates.filter(isDateKey))]
      : [])
    setCompletedGrammarLessons(Array.isArray(state.completedGrammarLessons)
      ? [...new Set(state.completedGrammarLessons.filter((id: unknown): id is string => typeof id === 'string' && currentGrammarLessonIds.has(id)))]
      : [])
    setCompletedLearnLessons(Array.isArray(state.completedLearnLessons)
      ? [...new Set(state.completedLearnLessons.filter((id: unknown): id is string => typeof id === 'string' && activeCoursePlans.some((plan) => plan.id === id)))]
      : [])
  }, [currentDate, activeAssessmentQuestions.length, activeActivityCards.length, currentGrammarLessonIds, activeCoursePlans])

  useEffect(() => {
    if (!supabase) return

    let active = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return
      setCloudWritableOwner((owner) => owner === session?.user.id ? owner : null)
      setCloudError('')
      setUser(session?.user ?? null)
      setAuthReady(true)
    })

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return
      if (error) {
        setCloudError(`Could not restore your login: ${error.message}`)
        setCloudStatus('error')
      }
      setUser(data.session?.user ?? null)
      setAuthReady(true)
    }).catch((error: unknown) => {
      if (!active) return
      setCloudError(error instanceof Error ? `Could not restore your login: ${error.message}` : 'Could not restore your login.')
      setCloudStatus('error')
      setAuthReady(true)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const submitAccountForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAccountError('')
    setAccountMessage('')
    if (!supabase) {
      setAccountError('Login is not configured yet. Add the Supabase project URL and publishable key to enable accounts.')
      return
    }

    setAccountBusy(true)
    try {
      if (accountMode === 'signUp') {
        const { data, error } = await supabase.auth.signUp({
          email: accountEmail.trim(),
          password: accountPassword,
          options: { emailRedirectTo: window.location.origin },
        })
        if (error) throw error
        if (data.session) {
          setAccountOpen(false)
          setAccountPassword('')
        } else {
          setAccountMessage('Check your email to confirm your account, then come back here to sign in.')
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: accountEmail.trim(),
          password: accountPassword,
        })
        if (error) throw error
        setAccountOpen(false)
        setAccountPassword('')
      }
    } catch (error) {
      setAccountError(error instanceof Error ? error.message : 'Account request failed. Please try again.')
    } finally {
      setAccountBusy(false)
    }
  }

  const signOut = async () => {
    if (!supabase) return
    setAccountBusy(true)
    setAccountError('')
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      window.location.reload()
    } catch (error) {
      setAccountError(error instanceof Error ? error.message : 'Could not sign out. Please try again.')
      setAccountBusy(false)
    }
  }

  useEffect(() => {
    if (!authReady) return
    let active = true

    const client = supabase
    const progressOwner = `${userId ?? 'signed-out'}:${learningLanguage}`
    if (!client || !userId) {
      const localProgress = readStoredState(accountStorageKey)
      const legacyProgress = learningLanguage === 'Spanish' && !hasProgress(localProgress) ? readStoredState() : localProgress
      if (client) {
        // oxlint-disable-next-line react/set-state-in-effect -- Restore the signed-out user's browser progress after an auth change.
        applyProgressState(legacyProgress)
      }
      else applyProgressState(legacyProgress)
      if (learningLanguage === 'Spanish' && hasProgress(legacyProgress) && !hasProgress(localProgress)) {
        try {
          localStorage.setItem(accountStorageKey, JSON.stringify(legacyProgress))
        } catch (error) {
          setCloudError(error instanceof Error ? `Could not migrate your saved progress: ${error.message}` : 'Could not migrate your saved progress.')
          setCloudStatus('error')
        }
      }
      setLoadedProgressOwner(progressOwner)
      return () => { active = false }
    }

    const storageKey = accountStorageKey
    const restoreProgress = async () => {
      const { data, error } = await client
        .from('user_progress')
        .select('progress')
        .eq('user_id', userId)
        .maybeSingle()
      if (!active) return
      if (error) {
        setCloudError(`Could not load your cloud progress: ${error.message}`)
        setCloudStatus('error')
        setLoadedProgressOwner(progressOwner)
        return
      }

      if (data && !isStoredState(data.progress)) {
        setCloudError('Your saved cloud progress is invalid. Local progress was left unchanged.')
        setCloudStatus('error')
        setLoadedProgressOwner(progressOwner)
        return
      }
      const remote = data && isStoredState(data.progress) ? data.progress : {}
      const cloudLanguages = isStoredState(remote.languages)
        ? remote.languages
        : hasProgress(remote) ? { Spanish: remote } : {}
      const selectedCloudProgress = cloudLanguages[learningLanguage]
      if (selectedCloudProgress !== undefined && !isStoredState(selectedCloudProgress)) {
        setCloudError('Your saved cloud progress is invalid. Local progress was left unchanged.')
        setCloudStatus('error')
        setLoadedProgressOwner(progressOwner)
        return
      }
      if (selectedCloudProgress && hasProgress(selectedCloudProgress)) {
        applyProgressState(selectedCloudProgress)
        let localCacheFailed = false
        try {
          localStorage.setItem(storageKey, JSON.stringify(selectedCloudProgress))
        } catch (error) {
          localCacheFailed = true
          setCloudError(error instanceof Error ? `Could not cache your progress locally: ${error.message}` : 'Could not cache your progress locally.')
          setCloudStatus('error')
        }
        setCloudWritableOwner(userId)
        if (!localCacheFailed) setCloudStatus('saved')
        setLoadedProgressOwner(progressOwner)
        return
      }

      const localAccountProgress = readStoredState(storageKey)
      const legacyProgress = learningLanguage === 'Spanish' ? readStoredState() : {}
      let initialProgress: Record<string, unknown>
      try {
        const alreadyMigrated = localStorage.getItem('lingua-local-progress-migrated') === 'true'
        initialProgress = hasProgress(localAccountProgress)
          ? localAccountProgress
          : learningLanguage === 'Spanish' && !alreadyMigrated && hasProgress(legacyProgress)
            ? legacyProgress
            : {}
      } catch (error) {
        setCloudError(error instanceof Error ? `Could not read local progress: ${error.message}` : 'Could not read local progress.')
        setCloudStatus('error')
        setLoadedProgressOwner(progressOwner)
        return
      }

      if (!hasProgress(initialProgress)) {
        initialProgress = {
          level: null,
          minutes: 0,
          score: 0,
          assessmentCompleted: false,
          darkMode: false,
          lastActivityDate: '',
          completedActivities: [],
          dailyActivityGoal: 3,
          dailyCompletedItems: [],
          dailyActivityDate: currentDate,
          activeDates: [],
          completedGrammarLessons: [],
          completedLearnLessons: [],
        }
      }
      applyProgressState(initialProgress)
      const storedLanguages = isStoredState(remote.languages)
        ? remote.languages
        : hasProgress(remote) ? { Spanish: remote } : {}
      const { error: saveError } = await client
        .from('user_progress')
        .upsert({
          user_id: userId,
          progress: { languages: { ...storedLanguages, [learningLanguage]: initialProgress } },
          updated_at: new Date().toISOString(),
        })
      if (!active) return
      if (saveError) {
        setCloudError(`Could not create your cloud progress record: ${saveError.message}`)
        setCloudStatus('error')
        setLoadedProgressOwner(progressOwner)
        return
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(initialProgress))
        localStorage.setItem('lingua-local-progress-migrated', 'true')
      } catch (error) {
        setCloudError(error instanceof Error ? `Cloud progress is saved, but local caching failed: ${error.message}` : 'Cloud progress is saved, but local caching failed.')
        setCloudStatus('error')
      }
      setCloudWritableOwner(userId)
      setCloudStatus('saved')
      setLoadedProgressOwner(progressOwner)
    }

    void restoreProgress().catch((error: unknown) => {
      if (!active) return
      setCloudError(error instanceof Error ? `Could not load your cloud progress: ${error.message}` : 'Could not load your cloud progress.')
      setCloudStatus('error')
      setLoadedProgressOwner(progressOwner)
    })
    return () => { active = false }
  }, [authReady, userId, learningLanguage, accountStorageKey, applyProgressState, currentDate])

  useEffect(() => {
    const expectedOwner = `${userId ?? 'signed-out'}:${learningLanguage}`
    if (!authReady || loadedProgressOwner !== expectedOwner) return

    const progress = {
      level, minutes, score, assessmentCompleted, darkMode, lastActivityDate, completedActivities,
      dailyActivityGoal, dailyCompletedItems, dailyActivityDate, activeDates, completedGrammarLessons, completedLearnLessons,
    }
    if (userId && cloudWritableOwner !== userId) return
    try {
      localStorage.setItem(accountStorageKey, JSON.stringify(progress))
    } catch (error) {
      // oxlint-disable-next-line react/set-state-in-effect -- Surface local persistence failure to the user.
      setCloudError(error instanceof Error ? `Could not save progress on this device: ${error.message}` : 'Could not save progress on this device.')
      // oxlint-disable-next-line react/set-state-in-effect -- Surface local persistence failure in the account panel.
      setCloudStatus('error')
    }
    const client = supabase
    if (!client || !userId || cloudWritableOwner !== userId) return

    const timeout = window.setTimeout(() => {
      // oxlint-disable-next-line react/set-state-in-effect -- Show the pending debounced cloud write in the sync UI.
      setCloudStatus('saving')
      saveQueueRef.current = saveQueueRef.current.then(async () => {
        const { data, error: readError } = await client
          .from('user_progress')
          .select('progress')
          .eq('user_id', userId)
          .maybeSingle()
        if (readError) throw readError
        const remote = data && isStoredState(data.progress) ? data.progress : {}
        const languages = isStoredState(remote.languages)
          ? remote.languages
          : hasProgress(remote) ? { Spanish: remote } : {}
        const { error } = await client
          .from('user_progress')
          .upsert({
            user_id: userId,
            progress: { languages: { ...languages, [learningLanguage]: progress } },
            updated_at: new Date().toISOString(),
          })
        if (error) throw error
      }).then(() => {
        setCloudStatus('saved')
        setCloudError('')
      }).catch((error: unknown) => {
        setCloudError(error instanceof Error ? `Could not save your cloud progress: ${error.message}` : 'Could not save your cloud progress.')
        setCloudStatus('error')
      })
    }, 700)
    return () => window.clearTimeout(timeout)
  }, [level, minutes, score, assessmentCompleted, darkMode, lastActivityDate, completedActivities, dailyActivityGoal, dailyCompletedItems, dailyActivityDate, activeDates, completedGrammarLessons, completedLearnLessons, authReady, loadedProgressOwner, accountStorageKey, userId, cloudWritableOwner, learningLanguage])

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  useEffect(() => () => {
    speechRecognitionRef.current?.stop()
  }, [])

  const currentLevel = level ? levelData[level] : null
  const learningStreak = getStreak(activeDates, currentDate)
  const activeResources: Resource[] = useMemo(() => isItalian
    ? [
      {
        type: 'video' as const,
        title: 'Listen to real Italian conversations',
        description: 'Explore beginner-friendly conversations and street interviews from Easy Italian.',
        source: 'Easy Italian',
        level: 'A1',
        tag: 'Video channel',
        url: 'https://www.youtube.com/@EasyItalian',
        embedUrl: '',
      },
      ...Object.entries(italianLessonContent).map(([title, content]) => ({
        type: 'reading' as const,
        title,
        description: `Italian reading and comprehension practice: ${title}.`,
        source: 'Nomad Palabra Italian course',
        level: activeCoursePlans.find((plan) => plan.title === title)?.courseLevel ?? 'A1',
        tag: 'Graded reading',
        url: '',
        embedUrl: '',
        passage: content.text,
        comprehension: content.questions.map((question) => ({
          prompt: question.prompt, answers: question.options, correctIndex: question.answer,
        })),
      })),
    ]
    : resources, [isItalian, activeCoursePlans])
  const resourceTypeFilters = ['all', 'video', 'reading'] as const
  const visibleResources = useMemo(
    () => activeResources.filter((resource) => {
      const matchesType = resourceFilter === 'all' || resource.type === resourceFilter
      const matchesLevel = resourceLevelFilter === 'all'
        || resource.level === resourceLevelFilter
        || resource.level.split(/[–\-\s]+/).includes(resourceLevelFilter)
      return matchesType && matchesLevel
    }),
    [resourceFilter, resourceLevelFilter, activeResources],
  )
  const visibleActivityIndices = activeActivityCards
    .map((activity, index) => ({ activity, index }))
    .filter(({ activity }) => activityLevelFilter === 'all' || activity.level === activityLevelFilter)
    .map(({ index }) => index)
  const activityPosition = visibleActivityIndices.indexOf(activityIndex)
  const nextLearnLesson = activeCoursePlans.find((plan) => !completedLearnLessons.includes(plan.id))
  const learnCompletion = completedLearnLessons.length / activeCoursePlans.length * 100
  const recentlyCompletedLessons = completedLearnLessons.slice(-3).reverse().map((id) => activeCoursePlans.find((plan) => plan.id === id)).filter((plan): plan is CoursePlan => Boolean(plan))
  const recentlyCompletedGrammar = completedGrammarLessons.slice(-3).reverse().map((id) => activeGrammarLessons.find((lesson) => lesson.id === id)).filter((lesson) => lesson !== undefined)
  const recentlyCompletedActivities = completedActivities.slice(-3).reverse().map((index) => activeActivityCards[index]).filter((activity) => activity !== undefined)
  const recentActivity = [
    ...recentlyCompletedLessons.map((plan) => ({ title: plan.title, detail: `${plan.courseLevel} learning-path lesson` })),
    ...recentlyCompletedGrammar.map((lesson) => ({ title: lesson.title, detail: `${lesson.level} grammar lesson` })),
    ...recentlyCompletedActivities.map((activity) => ({ title: activity.title, detail: `${activity.level} practice activity` })),
  ].slice(0, 5)
  const selectedStarter = selectedPlan?.courseLevel === 'Pre-A1'
    ? activeStarterLessons.find((lesson) => lesson.title === selectedPlan.title)
    : undefined
  const selectedSupport: LessonSupport | undefined = selectedStarter
    ? {
      objective: selectedStarter.detail,
      vocabulary: selectedStarter.vocabulary,
      grammarLessonId: '',
      grammarNote: selectedStarter.grammarExplanation,
      speakingPrompt: selectedStarter.speakingPrompt,
      listeningPrompt: selectedStarter.listeningPrompt,
    }
    : selectedPlan ? activeLessonSupport[selectedPlan.title] ?? activeSupplementalLessonSupport[selectedPlan.title] : undefined
  const selectedGrammarLesson = selectedSupport?.grammarLessonId
    ? activeGrammarLessons.find((lesson) => lesson.id === selectedSupport.grammarLessonId)
    : undefined
  const selectedLessonContent = selectedPlan ? activeLessonContent[selectedPlan.title] : undefined

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const navigate = (nextPage: Page) => {
    if (nextPage === 'learn') setSelectedPlan(null)
    if (nextPage === 'resources') setSelectedResource(null)
    if (nextPage === 'grammar') setGrammarTabKey((current) => current + 1)
    setPage(nextPage)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startAssessment = () => {
    setQuestionIndex(0)
    setAnswers([])
    setSelectedAnswer(null)
    setScore(0)
    setAssessmentCompleted(false)
    navigate('assessment')
  }

  const chooseAnswer = (index: number) => {
    setSelectedAnswer(index)
    const nextAnswers = [...answers]
    nextAnswers[questionIndex] = index
    setAnswers(nextAnswers)
  }

  const nextQuestion = () => {
    if (questionIndex < activeAssessmentQuestions.length - 1) {
      const nextIndex = questionIndex + 1
      setQuestionIndex(nextIndex)
      setSelectedAnswer(answers[nextIndex] ?? null)
    } else {
      const result = answers.reduce((total, answer, index) => total + (answer === activeAssessmentQuestions[index].correctIndex ? 1 : 0), 0)
      const estimatedLevel = getLevelFromScore(result)
      setScore(result)
      setLevel(estimatedLevel)
      setAssessmentCompleted(true)
      showToast(`Your estimate is ${estimatedLevel}. Your plan has been updated.`)
    }
  }

  const finishAssessment = () => {
    const result = getActivityScore(answers, activeAssessmentQuestions.map((question) => question.correctIndex))
    setScore(result)
    const estimatedLevel = getLevelFromScore(result)
    setLevel(estimatedLevel)
    setAssessmentCompleted(true)
    setQuestionIndex(activeAssessmentQuestions.length)
  }

  const openResource = (resource: Resource) => {
    setSelectedResource(resource)
    setPassageAnswers([])
    setPassageScore(0)
    setPassageChecked(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const choosePassageAnswer = (questionIndex: number, answerIndex: number) => {
    setPassageAnswers((current) => {
      const next = [...current]
      next[questionIndex] = answerIndex
      return next
    })
    setPassageChecked(false)
    setPassageScore(0)
  }

  const checkPassage = () => {
    if (!selectedResource?.comprehension?.length || passageAnswers.length !== selectedResource.comprehension.length || passageAnswers.some((answer) => answer === undefined)) return
    const correct = selectedResource.comprehension.reduce((total, question, index) => total + (passageAnswers[index] === question.correctIndex ? 1 : 0), 0)
    setPassageScore(correct)
    setPassageChecked(true)
    recordDailyActivity(`resource-${selectedResource.title}`)
  }

  const playActivityPhrase = (phrase: string) => {
    if (!('speechSynthesis' in window)) {
      showToast('Audio playback is not supported in this browser.')
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(phrase)
    utterance.lang = isItalian ? 'it-IT' : 'es-ES'
    utterance.rate = 0.85
    window.speechSynthesis.speak(utterance)
  }

  const startSpeakingPractice = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Recognition) {
      setSpeechPracticeStatus('error')
      setSpeechError('Speech recognition is not supported in this browser. You can still practice by saying your response aloud.')
      return
    }

    speechRecognitionRef.current?.stop()
    setSpeechTranscript('')
    setSpeechError('')
    setSpeechPracticeStatus('listening')

    const recognition = new Recognition()
    recognition.lang = isItalian ? 'it-IT' : 'es-ES'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.onresult = (event) => {
      if (speechRecognitionRef.current !== recognition) return
      const transcript = event.results[0]?.[0]?.transcript.trim()
      if (transcript) {
        setSpeechTranscript(transcript)
        setSpeechPracticeStatus('ready')
        if (selectedPlan) recordDailyActivity(`speaking-${selectedPlan.id}`)
      }
    }
    recognition.onerror = (event) => {
      if (speechRecognitionRef.current !== recognition) return
      const messages: Record<string, string> = {
        'not-allowed': 'Microphone access was blocked. Allow microphone access in your browser settings and try again.',
        'service-not-allowed': 'The browser speech service is unavailable. Try again later or use another browser.',
        'audio-capture': 'No microphone was detected. Connect a microphone and try again.',
        'no-speech': 'No speech was detected. Try speaking a little louder and closer to your microphone.',
        network: 'Speech recognition could not connect. Check your internet connection and try again.',
      }
      setSpeechError(messages[event.error] || `Speech recognition failed (${event.error}). Please try again.`)
      setSpeechPracticeStatus('error')
    }
    recognition.onend = () => {
      if (speechRecognitionRef.current !== recognition) return
      speechRecognitionRef.current = null
      setSpeechPracticeStatus((status) => status === 'listening' ? 'ready' : status)
    }
    speechRecognitionRef.current = recognition

    try {
      recognition.start()
    } catch (error) {
      speechRecognitionRef.current = null
      setSpeechPracticeStatus('error')
      setSpeechError(error instanceof Error ? `Could not start speech recognition: ${error.message}` : 'Could not start speech recognition. Please try again.')
    }
  }

  const stopSpeakingPractice = () => {
    speechRecognitionRef.current?.stop()
  }

  const recordDailyActivity = (activityId: string) => {
    setActiveDates((dates) => dates.includes(currentDate) ? dates : [...dates, currentDate])
    setDailyCompletedItems((current) => {
      const todaysActivities = dailyActivityDate === currentDate ? current : []
      return todaysActivities.includes(activityId) ? todaysActivities : [...todaysActivities, activityId]
    })
    setDailyActivityDate(currentDate)
  }

  const completeActivity = () => {
    if (activityAnswer === null) return
    if (activityAnswer !== activeActivityCards[activityIndex].answer) {
      setActivityFeedback('Not quite. Listen again, review the options, and try once more.')
      return
    }
    const alreadyCompleted = completedActivities.includes(activityIndex)
    setCompletedActivities((current) => current.includes(activityIndex) ? current : [...current, activityIndex])
    recordDailyActivity(`practice-${activityIndex}`)
    setActivityFeedback(alreadyCompleted ? 'Correct! Activity reviewed.' : 'Correct! Activity complete.')
    if (alreadyCompleted) {
      showToast('Practice reviewed. Your daily activity goal has been updated.')
      return
    }
    const dailyState = getDailyMinutes({ minutes, lastActivityDate }, currentDate, 10)
    setMinutes(dailyState.minutes)
    setLastActivityDate(dailyState.lastActivityDate)
    showToast('Activity complete. Your daily activity goal has been updated.')
  }

  const changeActivity = (direction: number) => {
    const nextPosition = Math.max(0, Math.min(visibleActivityIndices.length - 1, activityPosition + direction))
    const nextIndex = visibleActivityIndices[nextPosition]
    if (nextIndex !== undefined) setActivityIndex(nextIndex)
    setActivityAnswer(null)
    setActivityFeedback('')
  }

  const startPlan = (plan: CoursePlan) => {
    speechRecognitionRef.current?.stop()
    speechRecognitionRef.current = null
    setSelectedPlan(plan)
    setPlanAnswers([])
    setPlanAnswersChecked(false)
    setSpeechPracticeStatus('idle')
    setSpeechTranscript('')
    setSpeechError('')
    setPage('learn')
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const choosePlanAnswer = (questionIndex: number, answerIndex: number) => {
    setPlanAnswers((current) => {
      const next = [...current]
      next[questionIndex] = answerIndex
      return next
    })
    setPlanAnswersChecked(false)
  }

  const checkPlanAnswers = () => {
    if (!selectedPlan) return
    setPlanAnswersChecked(true)
    const content = activeLessonContent[selectedPlan.title]
    const score = content.questions.filter((question, index) => planAnswers[index] === question.answer).length
    if (score === content.questions.length) {
      setCompletedLearnLessons((current) => current.includes(selectedPlan.id) ? current : [...current, selectedPlan.id])
      recordDailyActivity(`learn-${selectedPlan.id}`)
    }
  }

  const saveActivityGoal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextGoal = Number(goalDraft)
    if (!Number.isInteger(nextGoal) || nextGoal < 1 || nextGoal > 20) {
      showToast('Choose a daily activity goal between 1 and 20.')
      return
    }
    setDailyActivityGoal(nextGoal)
    setIsEditingGoal(false)
  }

  const cancelActivityGoalEdit = () => {
    setGoalDraft(String(dailyActivityGoal))
    setIsEditingGoal(false)
  }

  const completeGrammarLesson = (lessonId: string) => {
    setCompletedGrammarLessons((current) => current.includes(lessonId) ? current : [...current, lessonId])
    recordDailyActivity(`grammar-${lessonId}`)
  }

  const submitFeedback = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedbackError('')
    setFeedbackSubmitted(false)
    const message = feedbackMessage.trim()
    if (message.length < 10 || message.length > 5000) {
      setFeedbackError('Feedback must be between 10 and 5,000 characters.')
      return
    }
    if (!supabase) {
      setFeedbackError('Feedback submission is not configured yet. Please try again later.')
      return
    }

    setFeedbackBusy(true)
    try {
      const { error } = await supabase.from('user_feedback').insert({
        category: feedbackCategory,
        message,
        language: learningLanguage,
        page,
        user_id: userId,
      })
      if (error) {
        setFeedbackError(`Could not submit your feedback: ${error.message}`)
        return
      }

      setFeedbackMessage('')
      setFeedbackSubmitted(true)
    } catch (error) {
      setFeedbackError(error instanceof Error ? `Could not submit your feedback: ${error.message}` : 'Could not submit your feedback. Please try again.')
    } finally {
      setFeedbackBusy(false)
    }
  }

  const changeLearningLanguage = (language: 'Spanish' | 'Italian') => {
    if (language === learningLanguage) return
    setLoadedProgressOwner(null)
    try {
      localStorage.setItem('learning-language', language)
    } catch (error) {
      setCloudError(error instanceof Error ? `Could not save your language choice: ${error.message}` : 'Could not save your language choice.')
    }
    speechRecognitionRef.current?.stop()
    speechRecognitionRef.current = null
    setLearningLanguage(language)
    setPage('dashboard')
    setSelectedPlan(null)
    setSelectedResource(null)
    setQuestionIndex(0)
    setAnswers([])
    setSelectedAnswer(null)
    setResourceFilter('all')
    setResourceLevelFilter('all')
    setPassageAnswers([])
    setPassageChecked(false)
    setActivityIndex(0)
    setActivityLevelFilter('all')
    setActivityAnswer(null)
    setActivityFeedback('')
    setSpeechPracticeStatus('idle')
    setSpeechTranscript('')
    setSpeechError('')
    setGrammarTabKey((key) => key + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentQuestion = activeAssessmentQuestions[questionIndex]
  const progress = Math.min(100, ((questionIndex + 1) / activeAssessmentQuestions.length) * 100)
  const currentPageTitle = page === 'learn'
    ? `Learn ${learningLanguage}`
    : page === 'grammar'
      ? `${learningLanguage} grammar`
      : page === 'vocabulary'
        ? `${learningLanguage} vocabulary`
        : pageTitles[page]

  if (supabase && (!authReady || loadedProgressOwner !== `${userId ?? 'signed-out'}:${learningLanguage}`)) {
    return <main className="auth-loading" role="status"><span className="brand-mark">N</span><strong>{userId ? 'Loading your saved progress…' : 'Starting Nomad Palabra…'}</strong></main>
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand"><span className="brand-mark">N</span><strong>Nomad Palabra</strong></div>
        <nav>
          {navItems.map((item) => (
            <button key={item.id} className={page === item.id ? 'nav-item active' : 'nav-item'} onClick={() => navigate(item.id)}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        {isEditingGoal ? (
          <form className="goal-card goal-editor" onSubmit={saveActivityGoal}>
            <label htmlFor="daily-activity-goal">ACTIVITIES PER DAY</label>
            <input id="daily-activity-goal" type="number" min="1" max="20" step="1" required value={goalDraft} onChange={(event) => setGoalDraft(event.target.value)} />
            <div><button type="button" onClick={cancelActivityGoalEdit}>Cancel</button><button type="submit">Save</button></div>
          </form>
        ) : (
          <button className="goal-card goal-button" onClick={() => { setGoalDraft(String(dailyActivityGoal)); setIsEditingGoal(true) }} aria-label={`Edit daily activity goal, currently ${dailyActivityGoal} activities`}>
            <small>DAILY ACTIVITY GOAL</small>
            <strong>{dailyActivityGoal} activities a day</strong>
            <div className="goal-track"><span style={{ width: `${Math.min(100, dailyCompletedItems.length / dailyActivityGoal * 100)}%` }} /></div>
            <p>{dailyCompletedItems.length} of {dailyActivityGoal} activities today <span aria-hidden="true">· Edit</span></p>
          </button>
        )}
        <button className="profile" onClick={() => { setAccountError(''); setAccountMessage(''); setAccountOpen(true) }}>
          <span>{user?.email?.slice(0, 1).toUpperCase() ?? 'G'}</span><div><strong>{user?.email ?? 'Account'}</strong><small>{user ? 'Cloud-synced account' : supabase ? 'Sign in to sync progress' : 'Saved on this device'}</small></div><b>•••</b>
        </button>
      </aside>

      <main>
        <header className="topbar">
          <button className="menu-button" aria-label="Open navigation" onClick={() => setMenuOpen((value) => !value)}>☰</button>
          <div><span className="eyebrow">{learningLanguage.toLocaleUpperCase()} · CEFR</span><h1>{currentPageTitle}</h1></div>
          <div className="top-actions">
            <label className="language-select"><span>Learning</span><select value={learningLanguage} onChange={(event) => changeLearningLanguage(event.target.value === 'Italian' ? 'Italian' : 'Spanish')} aria-label="Choose learning language">
              <option value="Spanish">Spanish</option>
              <option value="Italian">Italian</option>
            </select></label>
            {user && supabase && <button className={`sync-indicator ${cloudStatus === 'error' ? 'error' : ''}`} onClick={() => { setAccountError(''); setAccountMessage(''); setAccountOpen(true) }} aria-label={cloudStatus === 'error' ? 'Cloud sync problem. Open account details' : `Cloud sync ${cloudStatus}. Open account details`}>
              {cloudStatus === 'saving' ? 'Saving…' : cloudStatus === 'loading' ? 'Loading…' : cloudStatus === 'error' ? 'Sync issue' : 'Saved'}
            </button>}
            <button className="icon-button" onClick={() => setDarkMode((value) => !value)} aria-label="Toggle theme">{darkMode ? '☀' : '☾'}</button>
          </div>
        </header>

        {page === 'dashboard' && (
          <div className="content">
            <section className="hero-card">
              <div className="hero-copy">
                <span className="eyebrow light">YOUR {learningLanguage.toLocaleUpperCase()} JOURNEY</span>
                <h2>Small steps.<br /><em>Fluent confidence.</em></h2>
                <p>Build your {learningLanguage} through short assessments, meaningful media, and reading practice tuned to your CEFR level.</p>
                <div className="hero-actions"><button className="white-button" onClick={startAssessment}>Take a quick test →</button><button className="text-button" onClick={() => navigate('resources')}>Explore resources</button></div>
              </div>
              <div className="hero-art" aria-hidden="true"><div className="ring ring-one" /><div className="ring ring-two" /><div className="language-card"><span>{isItalian ? 'it' : 'es'}</span><small>{learningLanguage.toLocaleUpperCase()}</small></div><b className="floating-badge one">{level ?? '?'}</b><b className="floating-badge two">✓</b></div>
            </section>

            <section className="dashboard-grid">
              <article className="card level-card">
                <div className="card-title"><div><span className="eyebrow">CURRENT LEVEL</span><h3>{currentLevel ? `${currentLevel.label} · ${currentLevel.title}` : 'Not assessed yet'}</h3></div><span className="level-badge">{currentLevel?.label ?? '—'}</span></div>
                <p>{currentLevel?.description ?? 'Take the short CEFR assessment to find your starting point and personalize your study plan.'}</p>
                <div className="progress-bar"><span style={{ width: `${currentLevel?.progress ?? 0}%` }} /></div>
                <div className="level-scale"><span>A1</span><span>A2</span><span>B1</span><span>B2</span><span>C1</span><span>C2</span></div>
                <button className="secondary-button" onClick={startAssessment}>{currentLevel ? 'Reassess my level →' : 'Take the assessment →'}</button>
              </article>

              <article className="card streak-card">
                <div className="card-title"><div><span className="eyebrow">LEARNING STREAK</span><h3>Keep it going</h3></div><span className="streak-icon">✦</span></div>
                <div className="streak-number"><strong>{learningStreak}</strong><span>{learningStreak === 1 ? 'day' : 'days'}</span></div>
                <div className="week-row">{weekDays.map((day) => <span key={day.date} className={`${activeDates.includes(day.date) ? 'done' : ''}${day.isToday ? ' today' : ''}`} aria-label={`${day.label}${activeDates.includes(day.date) ? ', active' : ''}${day.isToday ? ', today' : ''}`} title={`${day.label}${day.isToday ? ' · Today' : ''}`}>{day.label.slice(0, 2)}</span>)}</div>
                <p>{learningStreak === 0 ? 'Complete an activity to start your streak.' : <><strong>Next milestone:</strong> {learningStreak < 7 ? '7-day streak' : '14-day streak'}</>}</p>
              </article>

              <article className="card focus-card">
                <div className="card-title"><div><span className="eyebrow">YOUR LEARNING LIBRARY</span><h3>Pick up where you left off</h3></div><span className="focus-icon">◉</span></div>
                {[
                  ['01', 'Continue your course', nextLearnLesson ? `${nextLearnLesson.courseLevel} · ${nextLearnLesson.title}` : 'All course lessons complete'],
                  ['02', 'Explore grammar', `${completedGrammarLessons.length} of ${activeGrammarLessons.length} lessons complete`],
                  ['03', 'Review vocabulary', `${activeVocabulary.length} phrases across Pre-A1–C2`],
                ].map(([number, title, detail], index) => <button className="focus-row" key={number} onClick={() => {
                  if (index === 0 && nextLearnLesson) startPlan(nextLearnLesson)
                  else navigate(index === 1 ? 'grammar' : index === 2 ? 'vocabulary' : 'learn')
                }}><span>{number}</span><div><strong>{title}</strong><small>{detail}</small></div><b>›</b></button>)}
              </article>
            </section>
          </div>
        )}

        {page === 'assessment' && (
          <div className="content">
            <div className="section-heading"><div><span className="eyebrow">CEFR ASSESSMENT</span><h2>Find your starting point</h2><p>Answer {activeAssessmentQuestions.length} questions across vocabulary, grammar, and comprehension. Your results guide your study plan.</p></div><span className="question-count">{questionIndex < activeAssessmentQuestions.length ? `Question ${questionIndex + 1} of ${activeAssessmentQuestions.length}` : 'Assessment complete'}</span></div>
            <div className="quiz-card">
              <div className="quiz-meta"><span>LEVEL CHECK</span><span>{Math.round(progress)}%</span></div>
              <div className="quiz-progress"><span style={{ width: `${progress}%` }} /></div>
              {questionIndex < activeAssessmentQuestions.length ? (
                <div className="question-view">
                  <h3>{currentQuestion.prompt}</h3>
                  <div className="answer-list">{currentQuestion.answers.map((answer, index) => <button key={answer} className={selectedAnswer === index ? 'answer selected' : 'answer'} onClick={() => chooseAnswer(index)}><span>{String.fromCharCode(65 + index)}</span>{answer}</button>)}</div>
                  <div className="quiz-actions"><button className="secondary-button" disabled={questionIndex === 0} onClick={() => { const previousIndex = Math.max(0, questionIndex - 1); setQuestionIndex(previousIndex); setSelectedAnswer(answers[previousIndex] ?? null) }}>← Previous</button><button className="primary-button" disabled={selectedAnswer === null} onClick={questionIndex === activeAssessmentQuestions.length - 1 ? finishAssessment : nextQuestion}>Next question →</button></div>
                </div>
              ) : (
                <div className="result-view">
                  <div className="result-badge">{level ?? '—'}</div>
                  <span className="eyebrow">ASSESSMENT COMPLETE</span>
                  <h3>{currentLevel?.title ?? 'Assessment complete'}</h3>
                  <p>{currentLevel?.description ?? 'Your results are ready.'} Your score was {score} out of {activeAssessmentQuestions.length}. Your study plan is now tailored to this starting point.</p>
                  <button className="primary-button" onClick={() => navigate('learn')}>View my plan →</button>
                </div>
              )}
            </div>
          </div>
        )}

        {page === 'learn' && (
          <div className="content">
            {selectedPlan ? (
              <div className="plan-lesson">
                <button className="back-button" onClick={() => setSelectedPlan(null)}>← Back to learning path</button>
                <div className="section-heading"><div><span className="eyebrow">{selectedPlan.courseLevel} · {selectedPlan.minutes.toUpperCase()} LESSON</span><h2>{selectedPlan.title}</h2><p>{selectedSupport?.objective ?? selectedPlan.detail}</p></div><span className="level-badge">{selectedPlan.courseLevel}</span></div>
                <div className="plan-lesson-grid">
                  <article className="learn-vocabulary">
                    <span className="eyebrow">VOCABULARY · LEARN THESE FIRST</span>
                    <div className="learn-vocabulary-grid">{selectedSupport?.vocabulary.map((word) => <div key={word.spanish}><strong lang={isItalian ? 'it' : 'es'}>{word.spanish}</strong><span>{word.english}</span><button className="audio-button" onClick={() => playActivityPhrase(word.spanish)} aria-label={`Listen to ${word.spanish}`}>▶ Listen</button></div>)}</div>
                  </article>
                  <article className="learn-grammar">
                    <span className="eyebrow">GRAMMAR · ONE STEP AT A TIME</span>
                    {selectedGrammarLesson ? (
                      <>
                        <h3>{selectedGrammarLesson.title}</h3>
                        <p className="learn-grammar-summary">{selectedGrammarLesson.summary}</p>
                        {selectedGrammarLesson.sections.map((section) => <section key={section.heading}><h4>{section.heading}</h4><p>{section.explanation}</p><ul>{section.examples.map((example) => <li key={example}>{example}</li>)}</ul></section>)}
                        {selectedSupport?.grammarNote && <p className="learn-grammar-note"><strong>In this passage:</strong> {selectedSupport.grammarNote}</p>}
                      </>
                    ) : selectedStarter ? (
                      <>
                        <h3>{selectedStarter.grammarFocus}</h3>
                        <p>{selectedStarter.grammarExplanation}</p>
                      </>
                    ) : null}
                  </article>
                  <article className="plan-material">
                    <div className="plan-material-heading"><span className="reading-label">{selectedLessonContent?.label}</span><button className="audio-button" onClick={() => selectedLessonContent && playActivityPhrase(selectedLessonContent.text)}><span aria-hidden="true">▶</span> Listen to passage</button></div>
                    <p className="learn-listening-prompt"><strong>Listening focus:</strong> {selectedSupport?.listeningPrompt}</p>
                    <p>{selectedLessonContent?.text}</p>
                  </article>
                  <article className="plan-comprehension">
                    <span className="eyebrow">READING · CHECK YOUR UNDERSTANDING</span>
                    <h3>Comprehension questions</h3>
                    {selectedLessonContent?.questions.map((question, questionIndex) => (
                      <div className="plan-question" key={question.prompt}>
                        <strong>{questionIndex + 1}. {question.prompt}</strong>
                        <div>{question.options.map((option, answerIndex) => {
                          const isCorrect = planAnswersChecked && answerIndex === question.answer
                          const isIncorrect = planAnswersChecked && planAnswers[questionIndex] === answerIndex && !isCorrect
                          return <button key={option} className={`${planAnswers[questionIndex] === answerIndex ? 'selected' : ''}${isCorrect ? ' correct' : ''}${isIncorrect ? ' incorrect' : ''}`} disabled={planAnswersChecked} onClick={() => choosePlanAnswer(questionIndex, answerIndex)}>{option}</button>
                        })}</div>
                      </div>
                    ))}
                    {!planAnswersChecked
                      ? <button className="primary-button" disabled={!selectedLessonContent || planAnswers.length !== selectedLessonContent.questions.length || planAnswers.some((answer) => answer === undefined)} onClick={checkPlanAnswers}>Check answers</button>
                      : <div className="plan-score" role="status">
                        <strong>{selectedLessonContent?.questions.filter((question, index) => planAnswers[index] === question.answer).length} of {selectedLessonContent?.questions.length} correct</strong>
                        <p>{completedLearnLessons.includes(selectedPlan.id) || selectedLessonContent?.questions.every((question, index) => planAnswers[index] === question.answer)
                          ? 'Lesson complete! Your progress is saved.'
                          : 'Review the passage and try again. Get every question right to complete this lesson.'}</p>
                        {!selectedLessonContent?.questions.every((question, index) => planAnswers[index] === question.answer) && <button className="secondary-button" onClick={() => { setPlanAnswers([]); setPlanAnswersChecked(false) }}>Try again</button>}
                      </div>}
                  </article>
                  <article className="speaking-practice">
                    <span className="eyebrow">SPEAKING PRACTICE</span>
                    <h3>Say it in {learningLanguage}</h3>
                    <p>{selectedSupport?.speakingPrompt}</p>
                    <div className="speaking-actions">
                      {speechPracticeStatus === 'listening'
                        ? <button className="primary-button" onClick={stopSpeakingPractice} aria-label="Stop recording">■ Stop recording</button>
                        : <button className="primary-button" onClick={startSpeakingPractice}><span aria-hidden="true">🎙</span> Start speaking</button>}
                      <span role="status" aria-live="polite">{speechPracticeStatus === 'listening' ? `Listening… speak your response in ${learningLanguage}.` : speechPracticeStatus === 'ready' ? 'Recording finished. You can try again.' : 'Your browser will ask for microphone access.'}</span>
                    </div>
                    {speechTranscript && <div className="speech-transcript"><strong>What we heard</strong><p lang={isItalian ? 'it' : 'es'}>{speechTranscript}</p><small>This transcript helps you review what was recognized; it does not score pronunciation.</small></div>}
                    {speechError && <p className="speech-error" role="alert">{speechError}</p>}
                  </article>
                </div>
              </div>
            ) : (
              <>
                <div className="section-heading learn-course-heading"><div><span className="eyebrow">A COMPLETE {learningLanguage.toLocaleUpperCase()} LEARNING PATH</span><h2>Start from zero. Grow to C2.</h2><p>No prior {learningLanguage} required. Work through vocabulary, grammar, reading, listening, and speaking in every lesson. Begin at Pre‑A1 or jump to any level for review.</p></div><span className="question-count">{completedLearnLessons.length} of {activeCoursePlans.length} lessons complete</span></div>
                <div className="learn-overall-progress" aria-label={`${completedLearnLessons.length} of ${activeCoursePlans.length} course lessons complete`}><span style={{ width: `${completedLearnLessons.length / activeCoursePlans.length * 100}%` }} /></div>
                {activeCourseLevels.map((courseLevel) => {
                  const levelLessons = activeCoursePlans.filter((plan) => plan.courseLevel === courseLevel)
                  const completedInLevel = levelLessons.filter((plan) => completedLearnLessons.includes(plan.id)).length
                  return <section className="learn-level" key={courseLevel}>
                    <div className="learn-level-heading">
                      <div><span className="level-badge">{courseLevel}</span><div><h3>{courseLevelInfo[courseLevel].title}</h3><p>{courseLevel === 'Pre-A1' ? `No ${learningLanguage} needed. Learn sounds, greetings, first words, and useful short sentences.` : courseLevelInfo[courseLevel].description}</p></div></div>
                      <small>{completedInLevel} / {levelLessons.length} complete</small>
                    </div>
                    <div className="course-plan-grid">{levelLessons.map((item, index) => {
                      const isComplete = completedLearnLessons.includes(item.id)
                      const isNext = nextLearnLesson?.id === item.id
                      return <article className={`course-plan-card${isComplete ? ' complete' : ''}${isNext ? ' next' : ''}`} key={item.id} onClick={() => startPlan(item)}>
                        <span>{isComplete ? '✓ COMPLETE' : isNext ? 'START HERE' : `LESSON ${String(index + 1).padStart(2, '0')}`}</span>
                        <h4>{item.title}</h4>
                        <p>{item.detail}</p>
                        <div className="course-skill-tags"><span>Vocabulary</span><span>Grammar</span><span>Reading</span><span>Listening</span><span>Speaking</span></div>
                        <div><small>{item.minutes}</small><button className="plan-start" onClick={(event) => { event.stopPropagation(); startPlan(item) }} aria-label={`${isComplete ? 'Review' : 'Start'} ${item.title}`}>{isComplete ? 'Review →' : isNext ? 'Start lesson →' : 'Open lesson →'}</button></div>
                      </article>
                    })}</div>
                  </section>
                })}
              </>
            )}
          </div>
        )}

        {page === 'grammar' && <GrammarTab key={`${grammarTabKey}-${learningLanguage}`} completedLessons={completedGrammarLessons} onComplete={completeGrammarLesson} lessons={activeGrammarLessons} levels={activeGrammarLevels} language={learningLanguage} />}

        {page === 'vocabulary' && <VocabularyTab entries={activeVocabulary} levels={activeCourseLevels} language={learningLanguage} />}

        {page === 'resources' && (
          <div className="content">
            {selectedResource ? (
              <div className="lesson-view">
                <button className="back-button" onClick={() => setSelectedResource(null)}>← Back to library</button>
                <div className="lesson-hero"><div><span className="eyebrow">{selectedResource.type === 'video' ? 'VIDEO RESOURCE' : 'READING RESOURCE'}</span><h2>{selectedResource.title}</h2><p>{selectedResource.description}</p></div><span className="level-badge">{selectedResource.level}</span></div>
                {selectedResource.type === 'video' ? (
                  <>
                    {selectedResource.embedUrl
                      ? <div className="video-frame"><iframe src={selectedResource.embedUrl} title={selectedResource.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
                      : <p>This video resource opens on its publisher’s site.</p>}
                    <a className="video-source" href={selectedResource.url} target="_blank" rel="noreferrer">{selectedResource.embedUrl ? 'Open original video ↗' : 'Browse videos ↗'}</a>
                  </>
                ) : (
                  <div className="reading-panel"><div className="reading-text"><span className="reading-label">{selectedResource.source} · {selectedResource.tag}</span><button className="audio-button" onClick={() => selectedResource.passage && playActivityPhrase(selectedResource.passage)}><span aria-hidden="true">▶</span> Listen to passage</button>{selectedResource.passage && <p>{selectedResource.passage}</p>}</div><div className="comprehension"><h3>Quick comprehension</h3>{selectedResource.comprehension?.map((question, questionIndex) => <div key={question.prompt}><strong>{question.prompt}</strong><div>{question.answers.map((answer, answerIndex) => <button key={answer} className={passageAnswers[questionIndex] === answerIndex ? 'selected' : ''} onClick={() => choosePassageAnswer(questionIndex, answerIndex)}>{answer}</button>)}</div></div>)}</div><button className="primary-button" onClick={checkPassage} disabled={!selectedResource.comprehension?.length || passageAnswers.length !== selectedResource.comprehension.length || passageAnswers.some((answer) => answer === undefined)}>Check answers ✓</button>{passageChecked && <p className="score-message" role="status">You scored {passageScore} out of {selectedResource.comprehension?.length}. {passageScore === selectedResource.comprehension?.length ? 'Excellent comprehension!' : 'Review the passage and try again.'}</p>}</div>
                )}
              </div>
            ) : (
              <>
                <div className="section-heading"><div><span className="eyebrow">STUDY LIBRARY</span><h2>{isItalian ? 'Read & listen' : 'Watch, listen & read'}</h2><p>Graded passages, comprehension practice, and learning resources for every stage of your {learningLanguage} journey.</p><span className="question-count">{visibleResources.length} of {activeResources.length} resources</span></div><div className="resource-filters"><div className="filters" aria-label="Filter resources by type">{resourceTypeFilters.map((filter) => <button key={filter} className={resourceFilter === filter ? 'active' : ''} onClick={() => setResourceFilter(filter)}>{filter === 'all' ? 'All types' : filter === 'video' ? 'Video' : 'Reading'}</button>)}</div><div className="filters" aria-label="Filter resources by CEFR level">{(['all', ...activeCourseLevels] as const).map((filter) => <button key={filter} className={resourceLevelFilter === filter ? 'active' : ''} onClick={() => setResourceLevelFilter(filter)}>{filter === 'all' ? 'All levels' : filter}</button>)}</div></div></div>
                <div className="resource-grid">{visibleResources.map((resource) => <article className="resource-card" key={resource.title}><div className={`resource-art ${resource.type}`}><span>{resource.type === 'video' ? '▶' : '↗'}</span></div><div><div className="resource-meta"><span>{resource.type}</span><span>{resource.level}</span></div><h3>{resource.title}</h3><p>{resource.description}</p><div className="resource-footer"><small>{resource.source} · {resource.tag}</small><button className="resource-open" onClick={() => openResource(resource)}>{resource.type === 'video' ? 'Watch video →' : 'Read & practice →'}</button></div></div></article>)}</div>
              </>
            )}
          </div>
        )}

        {page === 'play' && (
          <div className="content">
            <div className="section-heading"><div><span className="eyebrow">INTERACTIVE PRACTICE</span><h2>Play. Listen. Remember.</h2><p>Short, low-pressure activities designed for focused daily practice.</p></div><span className="question-count">{completedActivities.length} of {activeActivityCards.length} complete</span></div>
            <div className="practice-level-filter filters" aria-label="Filter activities by CEFR level">
              {(['all', ...activeCourseLevels] as const).map((filter) => <button key={filter} className={activityLevelFilter === filter ? 'active' : ''} onClick={() => {
                setActivityLevelFilter(filter)
                const firstMatchingIndex = activeActivityCards.findIndex((activity) => filter === 'all' || activity.level === filter)
                if (firstMatchingIndex >= 0) setActivityIndex(firstMatchingIndex)
                setActivityAnswer(null)
                setActivityFeedback('')
              }}>{filter === 'all' ? 'All levels' : filter}</button>)}
            </div>
            <div className="activity-layout">
              <article className="activity-card">
                <div className="activity-top"><span className="activity-icon">{activeActivityCards[activityIndex].icon}</span><div><small>{activeActivityCards[activityIndex].level} · ACTIVITY {activityPosition + 1} OF {visibleActivityIndices.length}</small><h3>{activeActivityCards[activityIndex].title}</h3></div></div>
                <p>{activeActivityCards[activityIndex].prompt}</p>
                <button className="audio-button" onClick={() => playActivityPhrase(activeActivityCards[activityIndex].audioPhrase)} aria-label={`Play ${learningLanguage} audio: ${activeActivityCards[activityIndex].audioPhrase}`}><span aria-hidden="true">▶</span> Play audio</button>
                <div className="activity-options">{activeActivityCards[activityIndex].options.map((option, index) => <button key={option} className={activityAnswer === index ? 'selected' : ''} onClick={() => { setActivityAnswer(index); setActivityFeedback('') }}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>
                <div className="activity-actions"><button className="secondary-button" disabled={activityPosition <= 0} onClick={() => changeActivity(-1)}>← Previous</button><div><button className="secondary-button" onClick={() => changeActivity(1)} disabled={activityPosition >= visibleActivityIndices.length - 1}>Next card</button><button className="primary-button" disabled={activityAnswer === null} onClick={completeActivity}>Complete activity ✓</button></div></div>
                {activityFeedback && <p className={`activity-feedback ${activityFeedback.startsWith('Correct') ? '' : 'error'}`} role="status">{activityFeedback}</p>}
              </article>
              <aside className="activity-side"><span className="eyebrow">YOUR MOMENTUM</span><div className="activity-score"><strong>{completedActivities.length}</strong><span>activities completed</span></div><div className="activity-progress">{activeActivityCards.map((card, index) => <span key={card.title} className={completedActivities.includes(index) ? 'done' : ''} />)}</div><h4>Quick tip</h4><p>Say the answer aloud before selecting it. Speaking the target phrase helps it stick.</p></aside>
            </div>
            {!isItalian && <section className="practice-video">
              <div><span className="eyebrow">SPANISH VIDEO</span><h2>A Very Special Dinner</h2><p>Watch a beginner-friendly Spanish story. Listen for familiar words and use the context to follow along.</p></div>
              <div className="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/wEO_8ghFM04" title="Learn Spanish with This Story: A Very Special Dinner (Beginner), Dreaming Spanish" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
              <a className="video-source" href="https://www.youtube.com/watch?v=wEO_8ghFM04" target="_blank" rel="noreferrer">Open video on YouTube ↗</a>
            </section>}
          </div>
        )}

        {page === 'feedback' && (
          <div className="content">
            <div className="section-heading">
              <div><span className="eyebrow">HELP US IMPROVE</span><h2>Send feedback</h2><p>Report a bug, tell us what is not working, or share an idea that could make Nomad Palabra better.</p></div>
            </div>
            <section className="feedback-card">
              {supabase ? (
                <form className="feedback-form" onSubmit={submitFeedback}>
                  <label>What would you like to share?
                    <select value={feedbackCategory} onChange={(event) => setFeedbackCategory(event.target.value === 'recommendation' ? 'recommendation' : event.target.value === 'other' ? 'other' : 'bug')}>
                      <option value="bug">Report a bug</option>
                      <option value="recommendation">Suggest an improvement</option>
                      <option value="other">Other feedback</option>
                    </select>
                  </label>
                  <label>Your feedback
                    <textarea value={feedbackMessage} onChange={(event) => { setFeedbackMessage(event.target.value); setFeedbackError(''); setFeedbackSubmitted(false) }} minLength={10} maxLength={5000} required rows={8} placeholder="What happened? What did you expect? What would you recommend?" />
                    <small>{feedbackMessage.length} / 5,000 characters · Please do not include passwords or other sensitive information.</small>
                  </label>
                  <div className="feedback-context">This submission includes the current page and learning language ({learningLanguage}). It does not include your email or account details.</div>
                  {feedbackError && <p className="account-error" role="alert">{feedbackError}</p>}
                  {feedbackSubmitted && <p className="account-message" role="status">Thank you—your feedback has been submitted.</p>}
                  <button className="primary-button" disabled={feedbackBusy || feedbackMessage.trim().length < 10}>{feedbackBusy ? 'Submitting…' : 'Submit feedback'}</button>
                </form>
              ) : (
                <div className="feedback-unavailable">
                  <h3>Feedback submissions are not configured yet</h3>
                  <p>To receive feedback, configure Supabase for this app and run the feedback setup SQL from <code>supabase/feedback.sql</code> in the Supabase SQL Editor.</p>
                  <p>Until then, no feedback will be sent or saved.</p>
                </div>
              )}
            </section>
          </div>
        )}

        {page === 'progress' && (
          <div className="content">
            <div className="section-heading"><div><span className="eyebrow">YOUR PROGRESS</span><h2>See your momentum</h2><p>Track completed lessons, grammar practice, activities, and the days you show up to learn.</p></div><span className="question-count">{completedLearnLessons.length + completedGrammarLessons.length + completedActivities.length} learning items complete</span></div>
            <div className="progress-grid">
              <article className="card"><span className="eyebrow">STUDY TIME</span><strong>{minutes}</strong><p>minutes recorded</p><div className="mini-chart">{weekDays.map((day) => <span key={day.date} title={`${day.label}${activeDates.includes(day.date) ? ' · learning day' : ''}`} style={{ height: `${activeDates.includes(day.date) ? 90 : 12}%` }} />)}</div><small className="progress-caption">{activeDates.filter((date) => weekDays.some((day) => day.date === date)).length} active day{activeDates.filter((date) => weekDays.some((day) => day.date === date)).length === 1 ? '' : 's'} this week</small></article>
              <article className="card progress-course-card"><span className="eyebrow">LEARN · PRE-A1 TO C2</span><h3>{completedLearnLessons.length} / {activeCoursePlans.length} lessons</h3><div className="progress-bar"><span style={{ width: `${learnCompletion}%` }} /></div><p>Reading passages, vocabulary, grammar, listening, and speaking.</p><button className="secondary-button" onClick={() => navigate('learn')}>Open learning path →</button></article>
              <article className="card progress-course-card"><span className="eyebrow">GRAMMAR COURSE</span><h3>{completedGrammarLessons.length} / {activeGrammarLessons.length} lessons</h3><div className="progress-bar"><span style={{ width: `${completedGrammarLessons.length / activeGrammarLessons.length * 100}%` }} /></div><p>Structured explanations and scored exercises from A1 to C2.</p><button className="secondary-button" onClick={() => navigate('grammar')}>Open grammar →</button></article>
              <article className="card"><span className="eyebrow">MILESTONES</span><h3>Achievements</h3>{[
                ['First lesson', 'Complete a lesson in the learning path', completedLearnLessons.length > 0],
                ['Grammar builder', 'Complete three grammar lessons', completedGrammarLessons.length >= 3],
                ['Practice streak', 'Complete five practice activities', completedActivities.length >= 5],
                ['Level explorer', 'Complete ten learning-path lessons', completedLearnLessons.length >= 10],
                ['CEFR check', 'Finish the placement assessment', assessmentCompleted],
              ].map(([title, detail, complete]) => <div className={`achievement ${complete ? 'complete' : ''}`} key={title as string}><span>{complete ? '✓' : '•'}</span><div><strong>{title}</strong><small>{detail}</small></div></div>)}</article>
              <article className="card"><span className="eyebrow">COMPLETED ITEMS</span><h3>Your learning history</h3><div className="history-list">{recentActivity.length ? recentActivity.map((item, index) => <div key={`${item.title}-${index}`}><strong>{item.title}</strong><small>{item.detail}</small><span>Done</span></div>) : <p className="history-empty">Completed lessons and practice will appear here as you learn.</p>}</div></article>
            </div>
          </div>
        )}

      </main>
      {accountOpen && <div className="account-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setAccountOpen(false) }}>
        <section className="account-dialog" role="dialog" aria-modal="true" aria-labelledby="account-title">
          <button className="account-close" onClick={() => setAccountOpen(false)} aria-label="Close account dialog">×</button>
          <span className="eyebrow">YOUR NOMAD PALABRA ACCOUNT</span>
          <h2 id="account-title">{user ? 'Your progress, wherever you learn' : 'Save your learning progress'}</h2>
          {user ? <>
            <p className="account-description">Signed in as <strong>{user.email}</strong>. Your lessons, level, streak, and practice activity sync to your account.</p>
            <p className={`account-sync-status ${cloudStatus === 'error' ? 'error' : ''}`} role="status">
              {cloudStatus === 'saving' ? 'Saving your latest progress…' : cloudStatus === 'loading' ? 'Loading saved progress…' : cloudStatus === 'error' ? cloudError || 'Cloud sync needs attention.' : 'Your progress is saved to the cloud.'}
            </p>
            {cloudError && <p className="account-error" role="alert">{cloudError}</p>}
            {accountError && <p className="account-error" role="alert">{accountError}</p>}
            <button className="secondary-button account-submit" disabled={accountBusy} onClick={signOut}>Sign out</button>
          </> : supabase ? <>
            <p className="account-description">Create an account or sign in to keep your progress private and available on other devices.</p>
            <div className="account-mode"><button className={accountMode === 'signIn' ? 'active' : ''} onClick={() => { setAccountMode('signIn'); setAccountError(''); setAccountMessage('') }}>Sign in</button><button className={accountMode === 'signUp' ? 'active' : ''} onClick={() => { setAccountMode('signUp'); setAccountError(''); setAccountMessage('') }}>Create account</button></div>
            <form className="account-form" onSubmit={submitAccountForm}>
              <label>Email<input type="email" autoComplete="email" required value={accountEmail} onChange={(event) => setAccountEmail(event.target.value)} /></label>
              <label>Password<input type="password" autoComplete={accountMode === 'signUp' ? 'new-password' : 'current-password'} minLength={6} required value={accountPassword} onChange={(event) => setAccountPassword(event.target.value)} /></label>
              {accountError && <p className="account-error" role="alert">{accountError}</p>}
              {accountMessage && <p className="account-message" role="status">{accountMessage}</p>}
              {cloudError && <p className="account-error" role="alert">{cloudError}</p>}
              <button className="primary-button account-submit" disabled={accountBusy}>{accountBusy ? 'Please wait…' : accountMode === 'signIn' ? 'Sign in and sync' : 'Create account'}</button>
            </form>
          </> : <>
            <p className="account-description">This copy currently saves progress only in this browser. Configure Supabase using the setup guide in README to enable sign-in and cloud sync.</p>
            {cloudError && <p className="account-error" role="alert">{cloudError}</p>}
            <p className="account-sync-status">Your local progress stays on this device.</p>
          </>}
          <p className="account-privacy">Each account can access only its own progress. Do not share your Supabase service-role key; the app only needs the public publishable/anon key.</p>
        </section>
      </div>}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  )
}

export default App
