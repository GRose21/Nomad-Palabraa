import type { Level } from './learning'
import { grammarLessons } from './grammar.ts'
import { buildExpandedLessons } from './curriculumExpansion.ts'
import { expandedSpanishSeeds } from './curriculumSpanish.ts'

export type CourseLevel = 'Pre-A1' | Level
export type CourseVocabulary = { spanish: string; english: string }
export type LessonSupport = {
  objective: string
  vocabulary: CourseVocabulary[]
  grammarLessonId: string
  grammarNote?: string
  speakingPrompt: string
  listeningPrompt: string
}
export type StarterLesson = {
  title: string
  detail: string
  minutes: string
  speakingPrompt: string
  vocabulary: CourseVocabulary[]
  grammarFocus: string
  grammarExplanation: string
  passage: string
  questions: Array<{ prompt: string; options: string[]; answer: number }>
  listeningPrompt: string
}
export type SupplementalLesson = {
  id: string
  level: Level
  title: string
  detail: string
  minutes: string
  objective: string
  vocabulary: CourseVocabulary[]
  grammarLessonId: string
  grammarNote: string
  label: string
  passage: string
  questions: Array<{ prompt: string; options: string[]; answer: number }>
  speakingPrompt: string
  listeningPrompt: string
}

export const courseLevels: CourseLevel[] = ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export const courseLevelInfo: Record<CourseLevel, { title: string; description: string }> = {
  'Pre-A1': {
    title: 'Start from zero',
    description: 'No Spanish needed. Learn sounds, greetings, first words, and tiny useful sentences.',
  },
  A1: {
    title: 'Beginner',
    description: 'Understand and use familiar everyday expressions and introduce yourself.',
  },
  A2: {
    title: 'Elementary',
    description: 'Talk about routine tasks, familiar topics, plans, and simple past events.',
  },
  B1: {
    title: 'Intermediate',
    description: 'Follow clear speech, tell stories, and explain opinions about familiar subjects.',
  },
  B2: {
    title: 'Upper intermediate',
    description: 'Understand extended ideas, evaluate arguments, and communicate with detail.',
  },
  C1: {
    title: 'Advanced',
    description: 'Work confidently with demanding texts, implied meaning, and nuanced arguments.',
  },
  C2: {
    title: 'Proficient',
    description: 'Refine natural, precise expression across complex, abstract, and subtle contexts.',
  },
}

export const starterLessons: StarterLesson[] = [
  {
    title: 'First words: hola and gracias',
    detail: 'Begin with greetings, polite words, and Spanish sound practice. You do not need any prior Spanish.',
    minutes: '8 min',
    vocabulary: [
      { spanish: 'hola', english: 'hello' },
      { spanish: 'adiós', english: 'goodbye' },
      { spanish: 'por favor', english: 'please' },
      { spanish: 'gracias', english: 'thank you' },
    ],
    grammarFocus: 'A first exchange',
    grammarExplanation: 'Start with complete expressions. Hola is a greeting; gracias and por favor make everyday exchanges polite. Spanish vowels are short and steady: a, e, i, o, u.',
    passage: '—Hola.\n—Hola. Gracias.\n—Adiós.',
    questions: [
      { prompt: 'Which word means “thank you”?', options: ['hola', 'gracias', 'adiós'], answer: 1 },
      { prompt: 'Which word is a greeting?', options: ['hola', 'por favor', 'gracias'], answer: 0 },
    ],
    speakingPrompt: 'Say hola, gracias, por favor, and adiós slowly. Then greet someone and say goodbye.',
    listeningPrompt: 'Listen for the greeting, the polite response, and the goodbye. Repeat each word after the audio.',
  },
  {
    title: 'Say your name and where you are from',
    detail: 'Use a simple model to introduce yourself and recognize a friendly introduction.',
    minutes: '10 min',
    vocabulary: [
      { spanish: 'me llamo', english: 'my name is' },
      { spanish: 'soy', english: 'I am' },
      { spanish: '¿cómo te llamas?', english: 'what is your name?' },
      { spanish: 'mucho gusto', english: 'nice to meet you' },
    ],
    grammarFocus: 'Me llamo and soy',
    grammarExplanation: 'Use me llamo + name to give your name. Soy + place tells where you are from: Soy de México. A short sentence can be a complete thought; you do not need to add yo.',
    passage: '—Hola. Me llamo Ana. ¿Cómo te llamas?\n—Soy Leo. Mucho gusto.\n—Soy de Perú.',
    questions: [
      { prompt: 'What is the speaker’s name?', options: ['Ana', 'Leo', 'Perú'], answer: 0 },
      { prompt: 'Which phrase means “nice to meet you”?', options: ['me llamo', 'mucho gusto', 'soy de'], answer: 1 },
    ],
    speakingPrompt: 'Introduce yourself with “Hola, me llamo…” and say “Soy de…” with a country or city.',
    listeningPrompt: 'Listen for each person’s name and the phrase they use to introduce themselves.',
  },
  {
    title: 'Name things: el libro, la casa',
    detail: 'Recognize a few everyday objects, use el and la, and describe what you see.',
    minutes: '12 min',
    vocabulary: [
      { spanish: 'el libro', english: 'the book' },
      { spanish: 'la casa', english: 'the house' },
      { spanish: 'el café', english: 'the coffee' },
      { spanish: 'la mesa', english: 'the table' },
    ],
    grammarFocus: 'Nouns with el and la',
    grammarExplanation: 'Most Spanish nouns are learned with el or la. These words mean “the” and help you learn a noun’s grammatical gender. Es means “is”: Es un libro.',
    passage: 'Es una casa. La casa es pequeña. Hay una mesa. El libro está en la mesa.',
    questions: [
      { prompt: 'Where is the book?', options: ['In the house', 'On the table', 'In the café'], answer: 1 },
      { prompt: 'Which article goes with libro in the passage?', options: ['la', 'el', 'una'], answer: 1 },
    ],
    speakingPrompt: 'Name an object near you using el or la, then say “Es…” to describe or identify it.',
    listeningPrompt: 'Listen for el and la before the nouns. Notice where the book is.',
  },
]

export const lessonSupport: Record<string, LessonSupport> = {
  'Everyday phrases': {
    objective: 'Greet someone, exchange names, and say where you are from.',
    vocabulary: [{ spanish: '¿de dónde eres?', english: 'where are you from?' }, { spanish: 'soy de', english: 'I am from' }, { spanish: 'mucho gusto', english: 'nice to meet you' }, { spanish: 'ahora vivo en', english: 'I live in now' }],
    grammarLessonId: 'ser-estar-hay',
    speakingPrompt: 'Greet a new classmate, exchange names, ask where they are from, and answer with your own city or country.',
    listeningPrompt: 'Listen for the names, the question about origin, and the place where Daniel lives now.',
  },
  'Listen to simple stories': {
    objective: 'Follow a short everyday story and identify who does what and where.',
    vocabulary: [{ spanish: 'cada mañana', english: 'every morning' }, { spanish: 'pasear al perro', english: 'to walk the dog' }, { spanish: 'detrás de', english: 'behind' }, { spanish: 'junto a', english: 'next to' }],
    grammarLessonId: 'present-regular',
    speakingPrompt: 'Describe a simple morning routine using “cada mañana” and two present-tense verbs.',
    listeningPrompt: 'Listen for what Ana does first, what Sol chases, and where Ana buys bread.',
  },
  'Describe yourself': {
    objective: 'Introduce yourself and share your age, studies, and interests.',
    vocabulary: [{ spanish: 'me llamo', english: 'my name is' }, { spanish: 'tengo diecinueve años', english: 'I am nineteen years old' }, { spanish: 'en mi tiempo libre', english: 'in my free time' }, { spanish: 'me gusta dibujar', english: 'I like drawing' }],
    grammarLessonId: 'sentence-building',
    speakingPrompt: 'Introduce yourself with your name, age, home, work or studies, and one thing you enjoy.',
    listeningPrompt: 'Listen for Pablo’s age, what he studies, and two things he likes doing.',
  },
  'Daily routines': {
    objective: 'Describe a weekday routine and say when common activities happen.',
    vocabulary: [{ spanish: 'despertarse', english: 'to wake up' }, { spanish: 'desayunar', english: 'to have breakfast' }, { spanish: 'al volver a casa', english: 'when returning home' }, { spanish: 'durante media hora', english: 'for half an hour' }],
    grammarLessonId: 'reflexive-pronouns',
    speakingPrompt: 'Describe a usual weekday from waking up to the evening, using at least three routine verbs.',
    listeningPrompt: 'Listen for the time Marta wakes up, how she travels, and how long she studies.',
  },
  'Read a short update': {
    objective: 'Find key details such as dates, places, and services in a short announcement.',
    vocabulary: [{ spanish: 'el ayuntamiento', english: 'the town council' }, { spanish: 'el próximo lunes', english: 'next Monday' }, { spanish: 'sala infantil', english: 'children’s room' }, { spanish: 'inscribirse gratis', english: 'to sign up for free' }],
    grammarLessonId: 'adjectives-questions',
    speakingPrompt: 'Give a short announcement about a new place opening. Say where it is, when it opens, and what people can do there.',
    listeningPrompt: 'Listen for the opening date and the free activity available to neighbors.',
  },
  'Order at a café': {
    objective: 'Order food and drink politely, ask the price, and understand a total.',
    vocabulary: [{ spanish: 'un café con leche', english: 'a coffee with milk' }, { spanish: 'una tostada', english: 'a piece of toast' }, { spanish: '¿cuánto es?', english: 'how much is it?' }, { spanish: 'son cuatro euros', english: 'that is four euros' }],
    grammarLessonId: 'present-irregular',
    speakingPrompt: 'Role-play ordering a drink and a snack, asking the price, and thanking the server.',
    listeningPrompt: 'Listen for the customer’s order and the total price.',
  },
  'Listen to a news summary': {
    objective: 'Identify a report’s main change, location, timeline, and an additional detail.',
    vocabulary: [{ spanish: 'ampliar la red', english: 'to expand the network' }, { spanish: 'carril bici', english: 'bike lane' }, { spanish: 'durante los próximos seis meses', english: 'over the next six months' }, { spanish: 'a lo largo de', english: 'along' }],
    grammarLessonId: 'preterite-imperfect',
    speakingPrompt: 'Summarize a local project. Explain what is changing, who it helps, and one expected benefit.',
    listeningPrompt: 'Listen for what Valencia is expanding, which places it will connect, and what else will be added.',
  },
  'Read a local story': {
    objective: 'Follow a short narrative, track a change over time, and infer why people value a place.',
    vocabulary: [{ spanish: 'quedar vacío', english: 'to remain empty' }, { spanish: 'convencer', english: 'to persuade' }, { spanish: 'convertir en', english: 'to turn into' }, { spanish: 'reunirse', english: 'to gather' }],
    grammarLessonId: 'imperfect',
    speakingPrompt: 'Retell a short story about a place that changed. Explain what it was before and what people do there now.',
    listeningPrompt: 'Listen for what the old bakery became and what the children do there on Saturdays.',
  },
  'Speak about your weekend': {
    objective: 'Tell a connected story about a past outing and explain why events happened.',
    vocabulary: [{ spanish: 'el sábado pasado', english: 'last Saturday' }, { spanish: 'salimos temprano', english: 'we left early' }, { spanish: 'evitar el tráfico', english: 'to avoid traffic' }, { spanish: 'aunque', english: 'although' }],
    grammarLessonId: 'preterite',
    speakingPrompt: 'Tell a short story about a recent outing: where you went, who joined you, what happened, and how you felt.',
    listeningPrompt: 'Listen for why the friends left early and what they ate after it began to rain.',
  },
  'Analyze a video': {
    objective: 'Distinguish a speaker’s main claim from supporting examples and contrast.',
    vocabulary: [{ spanish: 'priorizar', english: 'to prioritize' }, { spanish: 'corredor de tráfico', english: 'traffic corridor' }, { spanish: 'espacios seguros', english: 'safe spaces' }, { spanish: 'habitable', english: 'livable' }],
    grammarLessonId: 'present-subjunctive',
    speakingPrompt: 'Present a view about how a city should use its streets. Give two reasons and respond to one possible objection.',
    listeningPrompt: 'Listen for the contrast between moving quickly and treating a street as a place to meet.',
  },
  'Read an opinion piece': {
    objective: 'Separate an author’s concession from their central argument and evidence.',
    vocabulary: [{ spanish: 'prestar', english: 'to lend' }, { spanish: 'no cuenta toda la historia', english: 'does not tell the whole story' }, { spanish: 'búsqueda de empleo', english: 'job search' }, { spanish: 'ampliar las oportunidades', english: 'to broaden opportunities' }],
    grammarLessonId: 'por-para',
    speakingPrompt: 'State an opinion about a public service, support it with two reasons, and acknowledge a limitation.',
    listeningPrompt: 'Listen for what measure the author accepts and why they consider it incomplete.',
  },
  'Write a structured response': {
    objective: 'Recognize a clear argument structure: problem, practical proposal, and example.',
    vocabulary: [{ spanish: 'patrimonio', english: 'heritage' }, { spanish: 'adaptar', english: 'to adapt' }, { spanish: 'siempre que', english: 'provided that' }, { spanish: 'respaldar una propuesta', english: 'to support a proposal' }],
    grammarLessonId: 'commands',
    speakingPrompt: 'Make a short structured argument: explain a problem, suggest a practical solution, and support it with an example.',
    listeningPrompt: 'Listen for the condition that makes adapting a historic building acceptable and the structure suggested for an argument.',
  },
  'Review complex media': {
    objective: 'Track a nuanced argument and notice the move from individual responses to structural causes.',
    vocabulary: [{ spanish: 'ola de calor', english: 'heat wave' }, { spanish: 'insuficiente', english: 'insufficient' }, { spanish: 'registrar temperaturas', english: 'to record temperatures' }, { spanish: 'desigualdad urbana', english: 'urban inequality' }],
    grammarLessonId: 'perfect-tenses',
    speakingPrompt: 'Explain a complex public issue, distinguish an individual response from a structural one, and support your view.',
    listeningPrompt: 'Listen for why individual actions are understandable but insufficient, and identify the broader issue.',
  },
  'Practice academic reading': {
    objective: 'Understand a dense explanatory passage, its condition, and the policy example.',
    vocabulary: [{ spanish: 'polinizadores', english: 'pollinators' }, { spanish: 'continuidad', english: 'continuity' }, { spanish: 'refugio', english: 'shelter' }, { spanish: 'autóctono', english: 'native' }],
    grammarLessonId: 'relative-clauses',
    speakingPrompt: 'Explain how several small habitats could support pollinators across a city and propose one practical step.',
    listeningPrompt: 'Listen for why connected small habitats matter and what change some municipalities are making.',
  },
  'Build an argument': {
    objective: 'Evaluate a position, its qualification, and the practical recommendation that follows.',
    vocabulary: [{ spanish: 'formación continua', english: 'continuing education' }, { spanish: 'automatización', english: 'automation' }, { spanish: 'tiempo remunerado', english: 'paid time' }, { spanish: 'existir solo sobre el papel', english: 'to exist only on paper' }],
    grammarLessonId: 'past-subjunctive',
    speakingPrompt: 'Argue for or against ongoing training at work. Give evidence, qualify your view, and address an objection.',
    listeningPrompt: 'Listen for the author’s position on training and the two kinds of practical support they recommend.',
  },
  'Master natural expression': {
    objective: 'Interpret tact, ambiguity, register, and intended meaning beyond literal words.',
    vocabulary: [{ spanish: 'ya veremos', english: 'we will see' }, { spanish: 'aplazar una decisión', english: 'to postpone a decision' }, { spanish: 'sonar ambiguo', english: 'to sound ambiguous' }, { spanish: 'compromiso preciso', english: 'clear commitment' }],
    grammarLessonId: 'reported-speech',
    speakingPrompt: 'Respond naturally to a colleague’s urgent request: set a polite boundary, suggest an alternative, and agree on a next step.',
    listeningPrompt: 'Listen for how the same expression changes tone between an informal conversation and a professional email.',
  },
  'Read at native pace': {
    objective: 'Infer emotion and subtext from precise details in a compact literary passage.',
    vocabulary: [{ spanish: 'desvaído', english: 'faded' }, { spanish: 'detenido', english: 'stopped' }, { spanish: 'sin mirar la carta', english: 'without looking at the menu' }, { spanish: 'sobrevivir', english: 'to survive' }],
    grammarLessonId: 'discourse-structure',
    speakingPrompt: 'Describe a small detail that brings back a memory. Explain what it suggests without stating the feeling too directly.',
    listeningPrompt: 'Listen for the visual details at the station and the meaning Inés gives to ordering a familiar coffee.',
  },
  'Speak with precision': {
    objective: 'Express a complex distinction naturally and choose precise language for a recommendation.',
    vocabulary: [{ spanish: 'cumplir un objetivo', english: 'to meet a goal' }, { spanish: 'el problema de fondo', english: 'the underlying problem' }, { spanish: 'matizar', english: 'to qualify or nuance' }, { spanish: 'dar el siguiente paso', english: 'to take the next step' }],
    grammarLessonId: 'discourse-structure',
    speakingPrompt: 'Explain a project that met its immediate goal without solving the underlying problem; distinguish the two and recommend what should happen next.',
    listeningPrompt: 'Listen for the speaker’s distinction between an immediate result and a deeper problem, then note the proposed next step.',
  },
}

const baseSupplementalLessons: SupplementalLesson[] = [
  {
    id: 'a1-at-the-market',
    level: 'A1',
    title: 'Choose fruit at the market',
    detail: 'Name familiar foods, ask for quantities, and understand a short market exchange.',
    minutes: '12 min',
    objective: 'Ask for simple items and understand quantities and prices.',
    vocabulary: [{ spanish: 'las manzanas', english: 'the apples' }, { spanish: 'medio kilo', english: 'half a kilo' }, { spanish: '¿algo más?', english: 'anything else?' }, { spanish: 'cuesta', english: 'it costs' }, { spanish: 'fresco', english: 'fresh' }],
    grammarLessonId: 'articles-nouns',
    grammarNote: 'Use un/una for one item and unos/unas for more than one. Quantity phrases such as medio kilo de are followed by the food you want.',
    label: 'DIÁLOGO · AT THE MARKET',
    passage: '—Buenos días. ¿Qué desea?\n—Quiero medio kilo de manzanas y una naranja, por favor.\n—¿Algo más?\n—No, gracias. ¿Cuánto cuesta?\n—Tres euros.',
    questions: [{ prompt: 'How many apples does the customer want?', options: ['A kilo', 'Half a kilo', 'Two kilos'], answer: 1 }, { prompt: 'How much does the order cost?', options: ['Two euros', 'Three euros', 'Four euros'], answer: 1 }],
    speakingPrompt: 'Role-play a market purchase: greet the seller, ask for two foods with quantities, and ask the price.',
    listeningPrompt: 'Listen for the fruit, the amount requested, and the total price.',
  },
  {
    id: 'a1-find-the-station',
    level: 'A1',
    title: 'Find the station',
    detail: 'Ask where familiar places are and follow short, clear directions.',
    minutes: '12 min',
    objective: 'Ask for a location and understand two simple directions.',
    vocabulary: [{ spanish: 'la estación', english: 'the station' }, { spanish: 'a la derecha', english: 'to the right' }, { spanish: 'todo recto', english: 'straight ahead' }, { spanish: 'cerca de', english: 'near' }, { spanish: 'la plaza', english: 'the square' }],
    grammarLessonId: 'ser-estar-hay',
    grammarNote: 'Use está to locate a known place. Está cerca means “it is nearby”; está a la derecha means “it is on the right.”',
    label: 'DIÁLOGO · ASKING THE WAY',
    passage: '—Perdone, ¿dónde está la estación?\n—Siga todo recto hasta la plaza. La estación está a la derecha, cerca del banco.\n—Muchas gracias.\n—De nada.',
    questions: [{ prompt: 'Where should the visitor go straight ahead?', options: ['To the station', 'To the square', 'To the bank'], answer: 1 }, { prompt: 'Where is the station?', options: ['Near the bank, on the right', 'Behind the square', 'On the left of the café'], answer: 0 }],
    speakingPrompt: 'Ask where a place is, then give simple directions using todo recto and a la derecha.',
    listeningPrompt: 'Listen for the landmark the visitor reaches first and which side the station is on.',
  },
  {
    id: 'a2-make-weekend-plans',
    level: 'A2',
    title: 'Make weekend plans',
    detail: 'Invite a friend, agree on a time, and discuss a simple plan.',
    minutes: '15 min',
    objective: 'Understand invitations and make a plan with a time and place.',
    vocabulary: [{ spanish: '¿te apetece?', english: 'do you feel like?' }, { spanish: 'quedar', english: 'to meet up' }, { spanish: 'el sábado por la tarde', english: 'Saturday afternoon' }, { spanish: '¿a qué hora?', english: 'at what time?' }, { spanish: 'me parece bien', english: 'that sounds good' }],
    grammarLessonId: 'future-conditional',
    grammarNote: 'Use ir a + infinitive to talk about a planned future action: Vamos a visitar el museo. The present tense can also set a scheduled meeting time.',
    label: 'DIÁLOGO · WEEKEND PLANS',
    passage: '—¿Te apetece visitar el museo el sábado?\n—Sí, me parece bien. ¿A qué hora quedamos?\n—A las once, delante de la entrada.\n—Perfecto. Después podemos comer cerca.',
    questions: [{ prompt: 'What are they planning to visit?', options: ['A museum', 'A market', 'A beach'], answer: 0 }, { prompt: 'Where will they meet?', options: ['Inside a restaurant', 'In front of the entrance', 'At the station'], answer: 1 }],
    speakingPrompt: 'Invite a friend to do something this weekend. Agree on a time and a place, then suggest what to do afterward.',
    listeningPrompt: 'Listen for the activity, meeting time, and meeting place.',
  },
  {
    id: 'a2-tell-what-happened',
    level: 'A2',
    title: 'Tell what happened yesterday',
    detail: 'Use common past-tense forms to describe a simple day out.',
    minutes: '16 min',
    objective: 'Sequence three completed events and understand a short past-tense account.',
    vocabulary: [{ spanish: 'ayer', english: 'yesterday' }, { spanish: 'fuimos', english: 'we went' }, { spanish: 'compré', english: 'I bought' }, { spanish: 'luego', english: 'then' }, { spanish: 'lo pasamos bien', english: 'we had a good time' }],
    grammarLessonId: 'preterite',
    grammarNote: 'The preterite presents a completed past event. Common high-frequency forms include fui (I went), fuimos (we went), and hice (I did/made).',
    label: 'RELATO · A DAY OUT',
    passage: 'Ayer fui al centro con mi prima. Primero visitamos una exposición y luego compré un libro. Almorzamos en una terraza porque hacía buen tiempo. Volvimos a casa en autobús y lo pasamos muy bien.',
    questions: [{ prompt: 'Who went to the city center?', options: ['The narrator and a cousin', 'The narrator and a teacher', 'The cousin alone'], answer: 0 }, { prompt: 'How did they return home?', options: ['By train', 'By bus', 'On foot'], answer: 1 }],
    speakingPrompt: 'Tell someone three things you did yesterday. Put them in order with primero and luego.',
    listeningPrompt: 'Listen for who went out, what was bought, and how they travelled home.',
  },
  {
    id: 'b1-solve-a-travel-problem',
    level: 'B1',
    title: 'Solve a travel problem',
    detail: 'Follow a service conversation and explain a problem and its solution.',
    minutes: '18 min',
    objective: 'Identify a travel disruption, its cause, and the alternative offered.',
    vocabulary: [{ spanish: 'se ha cancelado', english: 'has been cancelled' }, { spanish: 'la conexión', english: 'the connection' }, { spanish: 'reclamar', english: 'to make a claim' }, { spanish: 'un billete alternativo', english: 'an alternative ticket' }, { spanish: 'por lo tanto', english: 'therefore' }],
    grammarLessonId: 'perfect-tenses',
    grammarNote: 'The present perfect (haber + participle) often connects a recent event to the present: El tren se ha cancelado. Use por eso or por lo tanto to mark a consequence.',
    label: 'DIÁLOGO · AT THE STATION',
    passage: '—Disculpe, el tren de las ocho se ha cancelado y tengo una conexión en Zaragoza.\n—Lo siento. Hay un servicio a las ocho y cuarenta que llega a tiempo.\n—¿Tengo que cambiar el billete?\n—No hace falta; puede usar el mismo. Por lo tanto, llegará con veinte minutos de margen.',
    questions: [{ prompt: 'Why is the passenger concerned?', options: ['They have a connection in Zaragoza', 'They lost their suitcase', 'They missed the first train'], answer: 0 }, { prompt: 'What should the passenger do with the ticket?', options: ['Buy another one', 'Use the same ticket', 'Ask for a refund'], answer: 1 }],
    speakingPrompt: 'Explain a travel problem, how it affected your plan, and what solution you requested.',
    listeningPrompt: 'Listen for the original problem, the replacement service, and whether a new ticket is needed.',
  },
  {
    id: 'b1-recommend-a-neighborhood',
    level: 'B1',
    title: 'Recommend a neighborhood',
    detail: 'Compare local options and support a recommendation with reasons.',
    minutes: '18 min',
    objective: 'Understand a recommendation and connect advantages to a traveller’s needs.',
    vocabulary: [{ spanish: 'merece la pena', english: 'it is worth it' }, { spanish: 'bien comunicado', english: 'well connected' }, { spanish: 'el alojamiento', english: 'accommodation' }, { spanish: 'sin embargo', english: 'however' }, { spanish: 'tener en cuenta', english: 'to take into account' }],
    grammarLessonId: 'future-conditional',
    grammarNote: 'Use the conditional to make a polite recommendation: Te recomendaría el barrio antiguo. Use porque to give a reason and sin embargo to introduce a contrast.',
    label: 'LECTURA · A LOCAL RECOMMENDATION',
    passage: 'Si visitas Sevilla por primera vez, te recomendaría alojarte cerca del centro histórico. Desde allí puedes ir a pie a muchos lugares y el transporte público está bien conectado. El barrio es animado por la noche; sin embargo, algunas calles pueden ser ruidosas. Si prefieres tranquilidad, merece la pena buscar alojamiento junto a los jardines del río.',
    questions: [{ prompt: 'Why is the historic center recommended?', options: ['Many places are within walking distance', 'It is always quiet', 'It has the cheapest hotels'], answer: 0 }, { prompt: 'Who might prefer the river gardens?', options: ['Someone looking for a quieter area', 'Someone avoiding all parks', 'Someone who wants nightlife'], answer: 0 }],
    speakingPrompt: 'Recommend a place to a visitor. Give two reasons and one limitation they should consider.',
    listeningPrompt: 'Listen for the main advantage of the historic center and the trade-off mentioned.',
  },
  {
    id: 'b2-compare-work-models',
    level: 'B2',
    title: 'Compare two ways of working',
    detail: 'Evaluate a balanced argument about remote and in-person work.',
    minutes: '22 min',
    objective: 'Distinguish evidence, qualification, and a proposed compromise.',
    vocabulary: [{ spanish: 'la flexibilidad', english: 'flexibility' }, { spanish: 'la coordinación', english: 'coordination' }, { spanish: 'a largo plazo', english: 'in the long term' }, { spanish: 'un inconveniente', english: 'a drawback' }, { spanish: 'siempre y cuando', english: 'as long as' }],
    grammarLessonId: 'present-subjunctive',
    grammarNote: 'A condition introduced by siempre y cuando typically takes the subjunctive when the condition is not stated as a guaranteed fact.',
    label: 'ARTÍCULO · HYBRID WORK',
    passage: 'El debate entre el trabajo presencial y el remoto suele plantearse como una elección excluyente. No obstante, los datos de muchas organizaciones apuntan a que la productividad depende menos del lugar que de la claridad de los objetivos. La flexibilidad reduce los desplazamientos y facilita la concentración; a cambio, la colaboración espontánea puede debilitarse. Un modelo híbrido puede combinar ambas ventajas, siempre y cuando los días presenciales respondan a necesidades reales de coordinación y no a una rutina impuesta.',
    questions: [{ prompt: 'What does the passage say productivity depends on more than location?', options: ['Clear objectives', 'Longer office hours', 'More frequent meetings'], answer: 0 }, { prompt: 'What condition is proposed for hybrid office days?', options: ['They should meet genuine coordination needs', 'They should happen every day', 'They should be chosen randomly'], answer: 0 }],
    speakingPrompt: 'Compare two work or study arrangements, weigh one benefit and drawback of each, then recommend a compromise.',
    listeningPrompt: 'Listen for the author’s central reframing of the debate and the condition attached to the hybrid solution.',
  },
  {
    id: 'b2-evaluate-a-proposal',
    level: 'B2',
    title: 'Evaluate a public proposal',
    detail: 'Read a proposal, separate intended benefits from concerns, and state a qualified view.',
    minutes: '22 min',
    objective: 'Identify a proposal’s goal, its possible unintended effect, and a safeguard.',
    vocabulary: [{ spanish: 'la medida', english: 'the measure' }, { spanish: 'el efecto secundario', english: 'the side effect' }, { spanish: 'la recaudación', english: 'revenue collection' }, { spanish: 'a menos que', english: 'unless' }, { spanish: 'mitigar', english: 'to mitigate' }],
    grammarLessonId: 'por-para',
    grammarNote: 'Use a menos que + subjunctive for a condition that could prevent an outcome. Use para to name the intended purpose of a policy.',
    label: 'LECTURA · A CITY POLICY',
    passage: 'El ayuntamiento propone cobrar una tarifa a los vehículos que entren en el centro durante las horas punta. La medida pretende reducir la congestión y destinar la recaudación al transporte público. Aunque la propuesta podría mejorar la calidad del aire, también existe el riesgo de que afecte más a quienes no tienen alternativas de transporte. Para mitigar ese efecto, la tarifa debería acompañarse de conexiones periféricas frecuentes y descuentos para trabajadores con bajos ingresos.',
    questions: [{ prompt: 'What is the revenue intended to support?', options: ['Public transport', 'More central parking', 'Road construction outside the city'], answer: 0 }, { prompt: 'What safeguard does the writer suggest?', options: ['Frequent outer connections and discounts', 'Higher fees for all workers', 'Fewer buses at peak time'], answer: 0 }],
    speakingPrompt: 'Evaluate a proposed rule or policy. Explain its goal, who might be affected differently, and one safeguard.',
    listeningPrompt: 'Listen for the policy’s intended benefit, who may be disadvantaged, and the proposed safeguard.',
  },
  {
    id: 'c1-read-between-the-lines',
    level: 'C1',
    title: 'Read between the lines',
    detail: 'Infer an author’s position from qualification, contrast, and carefully chosen detail.',
    minutes: '25 min',
    objective: 'Infer what the author implies about measurement and institutional priorities.',
    vocabulary: [{ spanish: 'el indicador', english: 'the indicator' }, { spanish: 'dar cuenta de', english: 'to account for' }, { spanish: 'sesgar', english: 'to bias' }, { spanish: 'en detrimento de', english: 'at the expense of' }, { spanish: 'matizar', english: 'to qualify' }],
    grammarLessonId: 'relative-clauses',
    grammarNote: 'Relative clauses can define a group or add commentary; the choice between indicative and subjunctive can signal whether the group is known, hypothetical, or sought.',
    label: 'ENSAYO · WHAT METRICS MISS',
    passage: 'Toda institución necesita indicadores; prescindir de ellos no elimina la evaluación, sino que la vuelve menos visible. El problema aparece cuando una medida provisional adquiere la autoridad de un objetivo. En educación, por ejemplo, lo que resulta fácil de contar puede acabar desplazando aquello que pretendía representar: la curiosidad, la autonomía o la capacidad de revisar una idea. No se trata de renunciar a los datos, sino de reconocer qué dimensiones dejan fuera y quién soporta el coste de esa omisión.',
    questions: [{ prompt: 'What shift does the author warn about?', options: ['A temporary measure becoming an objective', 'An institution collecting no information', 'Students refusing to revise ideas'], answer: 0 }, { prompt: 'What does the author ultimately advocate?', options: ['Using data while acknowledging its limits', 'Replacing all data with opinion', 'Measuring only what is easy to count'], answer: 0 }],
    speakingPrompt: 'Explain how a useful measurement can become misleading. Give an example and qualify your conclusion.',
    listeningPrompt: 'Listen for the contrast between using indicators and letting indicators replace the goal they represent.',
  },
  {
    id: 'c1-weigh-competing-evidence',
    level: 'C1',
    title: 'Weigh competing evidence',
    detail: 'Synthesize two explanations without treating correlation as proof of cause.',
    minutes: '25 min',
    objective: 'Distinguish correlation, plausible mechanisms, and the limits of a conclusion.',
    vocabulary: [{ spanish: 'la correlación', english: 'correlation' }, { spanish: 'el mecanismo causal', english: 'causal mechanism' }, { spanish: 'la muestra', english: 'the sample' }, { spanish: 'una salvedad', english: 'a qualification' }, { spanish: 'por sí solo', english: 'by itself' }],
    grammarLessonId: 'perfect-tenses',
    grammarNote: 'Use concessive clauses to acknowledge evidence that complicates your claim: aunque los datos muestran…, no permiten concluir…',
    label: 'ANÁLISIS · INTERPRETING EVIDENCE',
    passage: 'Dos ciudades introdujeron horarios escolares distintos y, meses después, una registró menos ausencias. Sería tentador atribuir la diferencia al nuevo horario. Sin embargo, la muestra era pequeña y la ciudad también había ampliado el transporte gratuito. El resultado es compatible con la hipótesis de que empezar más tarde ayuda, pero no la demuestra por sí solo. Para aislar el efecto habría que comparar cohortes semejantes y controlar los cambios simultáneos. Esta cautela no invalida la observación; delimita con mayor rigor lo que puede afirmarse.',
    questions: [{ prompt: 'Why can the observed result not establish the effect of the new schedule?', options: ['Another policy changed at the same time and the sample was small', 'There were no attendance records', 'The two cities used identical policies'], answer: 0 }, { prompt: 'What does the author say about caution?', options: ['It defines the limits of a claim without dismissing the observation', 'It proves that the schedule failed', 'It makes further comparison unnecessary'], answer: 0 }],
    speakingPrompt: 'Present a conclusion from evidence, then identify a confounding factor and state what further comparison would help.',
    listeningPrompt: 'Listen for the two reasons the result is inconclusive and the next research step suggested.',
  },
  {
    id: 'c2-adapt-your-register',
    level: 'C2',
    title: 'Adapt your register',
    detail: 'Rephrase the same request for a close colleague, a client, and a formal written exchange.',
    minutes: '28 min',
    objective: 'Interpret how wording, context, and relationship change the force of a request.',
    vocabulary: [{ spanish: 'el matiz', english: 'the nuance' }, { spanish: 'la cortesía estratégica', english: 'strategic politeness' }, { spanish: 'dar por sentado', english: 'to take for granted' }, { spanish: 'dejar margen', english: 'to leave room' }, { spanish: 'el grado de compromiso', english: 'the degree of commitment' }],
    grammarLessonId: 'reported-speech',
    grammarNote: 'Indirect questions and conditional forms can soften a request, but excessive hedging may obscure the action or commitment being requested.',
    label: 'DIÁLOGO · ONE REQUEST, THREE REGISTERS',
    passage: 'A un compañero de confianza: «¿Me pasas el informe cuando puedas?» A un cliente: «¿Sería posible recibir el informe antes del jueves? Así podremos revisar los datos con tiempo». En un acta formal: «Se solicita la entrega del informe antes del jueves». Ninguna fórmula es cortés en abstracto: el matiz depende de la relación, de la urgencia y de si el plazo se presenta como negociable. Suavizar una petición puede mostrar consideración; también puede dejar poco claro quién se ha comprometido a qué.',
    questions: [{ prompt: 'What determines whether a formula is appropriate?', options: ['The relationship, urgency, and negotiability of the deadline', 'The number of words alone', 'Whether it uses a question mark'], answer: 0 }, { prompt: 'What risk can excessive softening create?', options: ['It may obscure responsibility or commitment', 'It always sounds rude', 'It removes the deadline'], answer: 0 }],
    speakingPrompt: 'Make one request in three registers: to a friend, to a client, and in a formal record. Explain the nuance each version adds.',
    listeningPrompt: 'Listen for what changes between the three formulations and why a softened request might become unclear.',
  },
  {
    id: 'c2-interpret-ambiguity',
    level: 'C2',
    title: 'Interpret deliberate ambiguity',
    detail: 'Analyze how speakers hedge, imply disagreement, and manage face in a nuanced discussion.',
    minutes: '28 min',
    objective: 'Infer the disagreement beneath a polite exchange and distinguish uncertainty from tact.',
    vocabulary: [{ spanish: 'conceder', english: 'to concede' }, { spanish: 'el subtexto', english: 'subtext' }, { spanish: 'con reservas', english: 'with reservations' }, { spanish: 'dar por zanjado', english: 'to consider settled' }, { spanish: 'en principio', english: 'in principle' }],
    grammarLessonId: 'discourse-structure',
    grammarNote: 'Discourse markers such as en principio, dicho esto, and ahora bien can limit, qualify, or redirect a claim; their meaning depends on what follows.',
    label: 'TRANSCRIPCIÓN · A POLITE DISAGREEMENT',
    passage: '—Entonces, ¿damos por zanjado el diseño?\n—En principio, sí. La propuesta recoge lo esencial.\n—¿Y las fechas?\n—Ahí quizá convenga dejar algo de margen. No diría que sean inviables; sencillamente, dependen de dos decisiones que todavía no se han tomado.\n—Entiendo. ¿Lo presentamos así?\n—Con esas reservas, me parece razonable.',
    questions: [{ prompt: 'What is the speaker’s real position on the dates?', options: ['They are uncertain because two decisions are pending', 'They are definitely impossible', 'They have already been approved'], answer: 0 }, { prompt: 'What does “con esas reservas” signal?', options: ['Agreement with explicit qualifications', 'Complete rejection', 'A change of subject'], answer: 0 }],
    speakingPrompt: 'Disagree tactfully with a proposal. Acknowledge one strength, state a reservation, and explain what remains unresolved.',
    listeningPrompt: 'Listen for where the speaker agrees, where they qualify that agreement, and which decisions are still pending.',
  },
]

export const supplementalLessons: SupplementalLesson[] = [
  ...baseSupplementalLessons,
  ...buildExpandedLessons('Spanish', expandedSpanishSeeds, grammarLessons),
]
