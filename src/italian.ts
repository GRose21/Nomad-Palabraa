import type { AssessmentQuestion } from './assessment'
import type { PracticeActivity } from './practice'
import type { GrammarLesson } from './grammar'
import { buildExpandedLessons } from './curriculumExpansion.ts'
import { expandedItalianSeeds } from './curriculumItalian.ts'
import type { CourseLevel, LessonSupport, StarterLesson, SupplementalLesson } from './learnCourse'

export const italianGrammarLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
export type ItalianGrammarLevel = typeof italianGrammarLevels[number]

const grammarTopics: Array<{
  level: ItalianGrammarLevel
  title: string
  summary: string
  explanation: string
  examples: string[]
  prompt: string
  options: string[]
  answer: number
}> = [
  { level: 'A1', title: 'Build a simple sentence', summary: 'Use Italian subject–verb–object order and understand when subject pronouns are optional.', explanation: 'A common Italian sentence follows subject + verb + object. Verb endings often identify the subject, so a pronoun is usually optional.', examples: ['(Io) studio italiano. — I study Italian.', 'Maria legge un libro. — Maria reads a book.'], prompt: 'Choose the natural translation of “I speak Italian.”', options: ['Parlo italiano.', 'Parla italiano.', 'Parlano italiano.'], answer: 0 },
  { level: 'A1', title: 'Nouns, gender, and articles', summary: 'Pair Italian nouns with the right definite article and recognize grammatical gender.', explanation: 'Italian nouns are masculine or feminine. Learn each noun together with its article; endings are useful clues but have exceptions.', examples: ['il libro — the book; la casa — the house', 'lo studente — the student; l’amica — the friend'], prompt: 'Choose the correct article: ___ casa', options: ['il', 'la', 'lo'], answer: 1 },
  { level: 'A1', title: 'Present tense: regular verbs', summary: 'Conjugate common -are, -ere, and -ire verbs in the present.', explanation: 'Remove the infinitive ending and add the present ending for the subject. The ending communicates who is doing the action.', examples: ['parlare → parlo, parli, parla — to speak', 'vivere → vivo, vivi, vive — to live'], prompt: 'Complete: “Noi ___ a Roma.” (vivere)', options: ['vivete', 'viviamo', 'vive'], answer: 1 },
  { level: 'A1', title: 'Adjectives and agreement', summary: 'Match common adjectives to the gender and number of the noun.', explanation: 'Many adjectives change their ending to agree with the noun. Adjectives ending in -o have feminine -a and plural -i/-e forms.', examples: ['un ragazzo italiano — an Italian boy', 'due case italiane — two Italian houses'], prompt: 'Choose the feminine plural form of “italiano.”', options: ['italiani', 'italiana', 'italiane'], answer: 2 },
  { level: 'A1', title: 'Avere and age expressions', summary: 'Use avere for possession, age, and common everyday expressions.', explanation: 'Avere means “to have,” and Italian uses it to express age and many physical states. Conjugate it to match the subject.', examples: ['Ho vent’anni. — I am twenty years old.', 'Abbiamo fame. — We are hungry.'], prompt: 'Choose the natural way to say “I am eighteen years old.”', options: ['Sono diciotto anni.', 'Ho diciotto anni.', 'Sto diciotto anni.'], answer: 1 },
  { level: 'A1', title: 'C’è and ci sono', summary: 'Say that one or more people or things exist or are present.', explanation: 'Use c’è for a singular item and ci sono for plural items. The forms do not change according to the speaker.', examples: ['C’è un bar vicino. — There is a café nearby.', 'Ci sono due sedie. — There are two chairs.'], prompt: 'Complete: “In piazza ___ molti negozi.”', options: ['c’è', 'ci sono', 'sono c’è'], answer: 1 },
  { level: 'A2', title: 'Questions and negation', summary: 'Ask everyday questions and make clear negative statements.', explanation: 'Use question words such as dove, quando, perché, and quanto. Put non directly before the conjugated verb to make a sentence negative.', examples: ['Dove abiti? — Where do you live?', 'Non capisco. — I do not understand.'], prompt: 'Choose “I don’t understand.”', options: ['Capisco non.', 'Non capisco.', 'No capisco.'], answer: 1 },
  { level: 'A2', title: 'Essere and stare', summary: 'Use essere and stare for identity, characteristics, conditions, and location.', explanation: 'Essere expresses identity and many characteristics. Stare is used for wellbeing and in expressions such as stare bene; use essere for ordinary location.', examples: ['Sono studentessa. — I am a student.', 'Sto bene. — I am well.'], prompt: 'Complete: “Come ___?” (How are you?)', options: ['stai', 'sei', 'hai'], answer: 0 },
  { level: 'A2', title: 'Reflexive verbs and routines', summary: 'Describe daily routines with reflexive verbs.', explanation: 'Reflexive infinitives end in -si. The reflexive pronoun changes with the subject and usually appears before the conjugated verb.', examples: ['Mi sveglio alle sette. — I wake up at seven.', 'Ci prepariamo in fretta. — We get ready quickly.'], prompt: 'Complete: “Ogni mattina ___ alzo presto.”', options: ['mi', 'ti', 'si'], answer: 0 },
  { level: 'A2', title: 'The passato prossimo', summary: 'Talk about completed past events with an auxiliary and past participle.', explanation: 'Form the passato prossimo with avere or essere plus a past participle. With essere, the participle agrees with the subject.', examples: ['Ho mangiato una pizza. — I ate a pizza.', 'Siamo arrivate ieri. — We arrived yesterday.'], prompt: 'Complete: “Ieri ___ visitato il museo.”', options: ['ho', 'sono', 'sto'], answer: 0 },
  { level: 'A2', title: 'Comparisons and superlatives', summary: 'Compare people, objects, and places using common adjective patterns.', explanation: 'Use più or meno + adjective + di/che to compare. Add il più or la più to express “the most”; migliore and peggiore are common irregular forms.', examples: ['Roma è più grande di Siena. — Rome is larger than Siena.', 'È il giorno più bello. — It is the most beautiful day.'], prompt: 'Complete: “Questo treno è ___ veloce di quello.”', options: ['più', 'molto', 'meglio'], answer: 0 },
  { level: 'A2', title: 'Adverbs and frequency', summary: 'Say how often and how something happens.', explanation: 'Many adverbs are formed with -mente, while common frequency words include sempre, spesso, qualche volta, and mai. Mai normally follows non in a negative sentence.', examples: ['Parla lentamente. — She speaks slowly.', 'Non mangio mai qui. — I never eat here.'], prompt: 'Which word means “often”?', options: ['mai', 'spesso', 'ieri'], answer: 1 },
  { level: 'A2', title: 'Direct object pronouns', summary: 'Replace a repeated direct object with lo, la, li, or le.', explanation: 'Direct object pronouns usually precede a conjugated verb. They can attach to an infinitive, and their form agrees with the object’s gender and number.', examples: ['La conosco. — I know her.', 'Voglio comprarlo. — I want to buy it.'], prompt: 'Replace “il biglietto”: “Compro ___.”', options: ['lo', 'la', 'gli'], answer: 0 },
  { level: 'B1', title: 'Imperfetto and background', summary: 'Set a scene and describe habitual or ongoing past situations.', explanation: 'The imperfetto describes repeated actions, conditions, and background. Use the passato prossimo for completed events that move a story forward.', examples: ['Da bambino giocavo qui. — As a child I used to play here.', 'Pioveva quando siamo usciti. — It was raining when we went out.'], prompt: 'Choose the habitual past: “Da piccola ___ spesso.”', options: ['giocavo', 'ho giocato', 'giocherò'], answer: 0 },
  { level: 'B1', title: 'Direct and indirect pronouns', summary: 'Replace objects with direct and indirect pronouns in natural sentences.', explanation: 'Direct pronouns replace the thing directly affected; indirect pronouns identify the recipient. With a conjugated verb they normally come before it.', examples: ['Lo conosco. — I know him/it.', 'Le telefono stasera. — I will call her tonight.'], prompt: 'Replace “il libro”: “Leggo ___.”', options: ['lo', 'gli', 'le'], answer: 0 },
  { level: 'B1', title: 'Future and conditional', summary: 'Talk about future events and make polite requests or hypothetical statements.', explanation: 'The future uses endings attached to the infinitive stem. The conditional is useful for polite requests and imagined outcomes.', examples: ['Domani partirò. — Tomorrow I will leave.', 'Vorrei un caffè. — I would like a coffee.'], prompt: 'Choose a polite request for a coffee.', options: ['Vorrei un caffè.', 'Voglio ieri un caffè.', 'Sono un caffè.'], answer: 0 },
  { level: 'B1', title: 'Prepositions in context', summary: 'Choose common simple prepositions for places, movement, and time.', explanation: 'Italian prepositions depend on the relationship and the expression. Learn common combinations as phrases, such as andare a Roma and venire da Milano.', examples: ['Vado a Firenze. — I am going to Florence.', 'Il treno parte da Napoli. — The train leaves from Naples.'], prompt: 'Complete: “Vado ___ Italia.”', options: ['in', 'da', 'su'], answer: 0 },
  { level: 'B1', title: 'Passato prossimo or imperfetto', summary: 'Choose between completed events and background or habitual past actions.', explanation: 'Use the passato prossimo for bounded events and the imperfetto for setting, ongoing circumstances, and repeated past habits.', examples: ['Mentre leggevo, è suonato il telefono. — While I was reading, the phone rang.', 'Ogni estate andavamo al mare. — Every summer we used to go to the seaside.'], prompt: 'Complete: “Mentre ___, è arrivato Marco.”', options: ['cenavamo', 'abbiamo cenato', 'ceniamo'], answer: 0 },
  { level: 'B1', title: 'The impersonal si', summary: 'Describe general actions and customs without naming a specific person.', explanation: 'Si impersonale uses si with a third-person verb to express “one,” “people,” or a general “you.” With a plural noun, the verb is commonly plural.', examples: ['In Italia si cena tardi. — In Italy people eat dinner late.', 'Qui si vendono libri usati. — Used books are sold here.'], prompt: 'Choose the natural general statement “People speak Italian here.”', options: ['Qui si parla italiano.', 'Qui parla si italiano.', 'Qui sono parla italiano.'], answer: 0 },
  { level: 'B2', title: 'The subjunctive mood', summary: 'Use the congiuntivo after expressions of opinion, doubt, emotion, and necessity.', explanation: 'The present subjunctive often follows che when the main clause expresses a wish, doubt, emotion, or judgment.', examples: ['Spero che tu venga. — I hope you come.', 'È importante che siano puntuali. — It is important that they are on time.'], prompt: 'Complete: “Spero che lui ___.”', options: ['viene', 'venga', 'veniva'], answer: 1 },
  { level: 'B2', title: 'Conditional periods', summary: 'Describe real and hypothetical conditions with appropriate verb forms.', explanation: 'For an unreal present condition, use the imperfect subjunctive in the if-clause and the conditional in the result.', examples: ['Se avessi tempo, viaggerei. — If I had time, I would travel.', 'Se fosse possibile, resterei. — If it were possible, I would stay.'], prompt: 'Complete: “Se avessi tempo, ___ di più.”', options: ['viaggio', 'viaggerei', 'viaggiavo'], answer: 1 },
  { level: 'B2', title: 'Combined pronouns', summary: 'Combine direct and indirect object pronouns and place them correctly.', explanation: 'Combined pronouns put the indirect pronoun first. Mi, ti, ci, and vi change to me, te, ce, and ve before a direct pronoun.', examples: ['Me lo spieghi? — Can you explain it to me?', 'Gliel’ho mandato. — I sent it to him/her.'], prompt: 'Choose “Can you explain it to me?”', options: ['Mi lo spieghi?', 'Me lo spieghi?', 'Lo me spieghi?'], answer: 1 },
  { level: 'B2', title: 'Relative clauses', summary: 'Connect ideas with che, cui, and prepositional relative forms.', explanation: 'Che is a common subject or object relative pronoun. Use preposition + cui when the relative clause requires a preposition.', examples: ['La città in cui vivo è antica. — The city I live in is old.', 'Il libro che leggo è interessante. — The book I am reading is interesting.'], prompt: 'Complete: “La persona con ___ lavoro è gentile.”', options: ['che', 'cui', 'chi'], answer: 1 },
  { level: 'B2', title: 'Concessive clauses', summary: 'Express contrast and concession with indicative and subjunctive forms.', explanation: 'Benché, sebbene, and nonostante che commonly introduce a subjunctive clause. Anche se often takes the indicative when the situation is presented as a fact.', examples: ['Benché sia tardi, restiamo. — Although it is late, we are staying.', 'Anche se piove, usciamo. — Even though it is raining, we are going out.'], prompt: 'Complete: “Sebbene ___ stanco, ha continuato.”', options: ['era', 'fosse', 'è'], answer: 1 },
  { level: 'C1', title: 'Past subjunctive forms', summary: 'Use compound subjunctive forms to locate events in the past.', explanation: 'The congiuntivo passato combines the present subjunctive of avere or essere with a past participle.', examples: ['Penso che abbia capito. — I think that he understood.', 'Spero che siano arrivati. — I hope they have arrived.'], prompt: 'Complete: “Credo che Maria ___ già partito.”', options: ['sia', 'è', 'ha'], answer: 0 },
  { level: 'C1', title: 'Sequence of tenses', summary: 'Keep tense relationships consistent across reported and dependent clauses.', explanation: 'The tense of the main clause influences the form of a dependent subjunctive clause. Match the time relationship, not just the tense label.', examples: ['Pensavo che fosse pronto. — I thought it was ready.', 'Credevo che avessero già deciso. — I thought they had already decided.'], prompt: 'Complete: “Pensavo che ___ già.”', options: ['è arrivato', 'fosse arrivato', 'arriva'], answer: 1 },
  { level: 'C1', title: 'Passive and impersonal forms', summary: 'Present information without foregrounding the agent.', explanation: 'The passive uses essere plus a agreeing past participle. Si impersonale presents a general or unspecified subject.', examples: ['La proposta è stata approvata. — The proposal was approved.', 'In Italia si cena tardi. — In Italy people eat dinner late.'], prompt: 'Choose the impersonal sentence.', options: ['Si parla italiano qui.', 'Parlo italiano qui.', 'Parliamo italiano qui.'], answer: 0 },
  { level: 'C1', title: 'Register and discourse markers', summary: 'Choose connectors and phrasing appropriate to formal and informal contexts.', explanation: 'Discourse markers signal contrast, consequence, or qualification. Match their register and meaning to the relationship between ideas.', examples: ['Tuttavia, occorre valutare i costi. — However, the costs need to be assessed.', 'Inoltre, la misura riduce i tempi. — Furthermore, the measure reduces delays.'], prompt: 'Choose the connector meaning “nevertheless.”', options: ['Inoltre', 'Tuttavia', 'Perciò'], answer: 1 },
  { level: 'C1', title: 'Nominalization and concise style', summary: 'Turn clauses into precise noun phrases in formal writing.', explanation: 'Nominalization can make formal prose concise, but overuse hides the agent. Prefer a verb when it makes responsibility clearer.', examples: ['Dopo aver analizzato i dati… — After analyzing the data…', 'La riduzione dei costi è significativa. — The reduction in costs is significant.'], prompt: 'Which phrase means “after reviewing the proposal”?', options: ['Dopo aver esaminato la proposta', 'Prima la proposta esamina', 'La proposta è esaminando'], answer: 0 },
  { level: 'C2', title: 'Nuance in the subjunctive', summary: 'Interpret how mood and context shape nuance in complex clauses.', explanation: 'Mood selection can frame a clause as asserted, hypothetical, or evaluated. Context and discourse stance guide the choice.', examples: ['Benché sia tardi, continuiamo. — Although it is late, we continue.', 'Qualunque cosa accada, chiamami. — Whatever happens, call me.'], prompt: 'Complete: “Benché ___ tardi, continuiamo.”', options: ['è', 'sia', 'sarà'], answer: 1 },
  { level: 'C2', title: 'Idioms and pragmatic meaning', summary: 'Interpret common idioms and choose language that fits the social context.', explanation: 'Idiomatic expressions often cannot be understood literally. Register, relationship, and situation determine whether an expression sounds natural.', examples: ['Non vedo l’ora. — I can’t wait.', 'Mi sa che ha ragione. — I have a feeling they are right.'], prompt: 'What does “Non vedo l’ora” mean?', options: ['I cannot see the clock.', 'I can’t wait.', 'I am looking for an hour.'], answer: 1 },
  { level: 'C2', title: 'Rhetorical emphasis', summary: 'Use marked word order and cleft structures to focus information.', explanation: 'Italian can front or repeat elements for contrast and emphasis. Use marked structures deliberately because they change information focus.', examples: ['È proprio questo che intendo. — This is exactly what I mean.', 'A me, la decisione non convince. — As for me, the decision is not convincing.'], prompt: 'Which phrase means “This is exactly what I mean”?', options: ['È proprio questo che intendo.', 'Intendo proprio questo è.', 'Questo intendo proprio che.'], answer: 0 },
  { level: 'C2', title: 'Irony and conversational implication', summary: 'Recognize when a speaker’s intended meaning differs from the literal wording.', explanation: 'Irony depends on shared context, tone, and expectations. Interpret a phrase in its conversational setting rather than translating each word in isolation.', examples: ['Che bella giornata! (said during a storm) — What a lovely day!', 'Non c’è che dire, un capolavoro. — One has to admit, a masterpiece.'], prompt: 'A speaker says “Che tempismo perfetto!” after someone arrives very late. What is likely meant?', options: ['A sincere compliment about punctuality', 'An ironic criticism of the delay', 'A request to leave'], answer: 1 },
]

export const italianGrammarLessons: GrammarLesson[] = grammarTopics.map((topic) => ({
  id: `it-${topic.level.toLowerCase()}-${topic.title.toLocaleLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`,
  level: topic.level,
  title: topic.title,
  summary: topic.summary,
  sections: [
    { heading: 'How it works', explanation: topic.explanation, examples: topic.examples },
    { heading: 'Notice the pattern', explanation: 'Read each example aloud, identify the form that carries the meaning, and compare it with the English translation.', examples: topic.examples },
  ],
  exercises: [
    { prompt: topic.prompt, options: topic.options, answer: topic.answer, explanation: topic.explanation },
    { prompt: 'Which statement about this lesson is accurate?', options: [topic.explanation, 'Italian word order and verb forms never change.', 'The form is chosen without considering meaning or context.'], answer: 0, explanation: topic.explanation },
  ],
}))

export const italianStarters: StarterLesson[] = [
  {
    title: 'Prime parole: ciao e grazie', detail: 'Impara saluti e parole di cortesia, senza bisogno di conoscere già l’italiano.', minutes: '8 min',
    vocabulary: [{ spanish: 'ciao', english: 'hello / goodbye' }, { spanish: 'arrivederci', english: 'goodbye' }, { spanish: 'per favore', english: 'please' }, { spanish: 'grazie', english: 'thank you' }],
    grammarFocus: 'Un primo scambio', grammarExplanation: 'Inizia con espressioni complete. Ciao è informale; grazie e per favore rendono cortese una conversazione. Le vocali italiane sono chiare e brevi.',
    passage: '—Ciao.\n—Ciao. Grazie.\n—Arrivederci.', questions: [
      { prompt: 'Which word means “thank you”?', options: ['ciao', 'grazie', 'arrivederci'], answer: 1 },
      { prompt: 'Which phrase means “please”?', options: ['per favore', 'grazie', 'ciao'], answer: 0 },
    ],
    speakingPrompt: 'Say ciao, grazie, per favore, and arrivederci slowly. Then greet someone and say goodbye.',
    listeningPrompt: 'Listen for the greeting, the polite response, and the goodbye.',
  },
  {
    title: 'Dire il proprio nome', detail: 'Presentati con una frase semplice e riconosci un’introduzione amichevole.', minutes: '10 min',
    vocabulary: [{ spanish: 'mi chiamo', english: 'my name is' }, { spanish: 'sono', english: 'I am' }, { spanish: 'come ti chiami?', english: 'what is your name?' }, { spanish: 'piacere', english: 'nice to meet you' }],
    grammarFocus: 'Mi chiamo e sono', grammarExplanation: 'Usa mi chiamo + nome per dire come ti chiami. Usa sono di + luogo per dire da dove vieni: Sono di Roma.',
    passage: '—Ciao. Mi chiamo Anna. Come ti chiami?\n—Sono Leo. Piacere.\n—Sono di Roma.', questions: [
      { prompt: 'What is the first speaker’s name?', options: ['Anna', 'Leo', 'Roma'], answer: 0 },
      { prompt: 'Which phrase means “nice to meet you”?', options: ['mi chiamo', 'piacere', 'sono di'], answer: 1 },
    ],
    speakingPrompt: 'Introduce yourself with “Ciao, mi chiamo…” and say “Sono di…” with a city or country.',
    listeningPrompt: 'Listen for each person’s name and the phrase used to introduce themselves.',
  },
  {
    title: 'Oggetti: il libro, la casa', detail: 'Riconosci oggetti comuni e usa gli articoli il e la.', minutes: '12 min',
    vocabulary: [{ spanish: 'il libro', english: 'the book' }, { spanish: 'la casa', english: 'the house' }, { spanish: 'il caffè', english: 'the coffee' }, { spanish: 'il tavolo', english: 'the table' }],
    grammarFocus: 'I nomi con il e la', grammarExplanation: 'Impara ogni nome insieme all’articolo il o la. È il modo più semplice per ricordare il genere grammaticale.',
    passage: 'È una casa. La casa è piccola. C’è un tavolo. Il libro è sul tavolo.', questions: [
      { prompt: 'Where is the book?', options: ['In the house', 'On the table', 'In the café'], answer: 1 },
      { prompt: 'Which article goes with libro?', options: ['la', 'il', 'una'], answer: 1 },
    ],
    speakingPrompt: 'Name an object near you using il or la, then identify it with “È…”.',
    listeningPrompt: 'Listen for il and la before the nouns and notice where the book is.',
  },
]

const supportSpecs: Array<{
  title: string; objective: string; words: string[]; grammar: string; speak: string; listen: string
}> = [
  { title: 'Saluti e presentazioni', objective: 'Salutare qualcuno, scambiare i nomi e dire da dove si viene.', words: ['buongiorno|good morning', 'mi chiamo|my name is', 'piacere|nice to meet you', 'sono di|I am from'], grammar: 'it-a1-build-a-simple-sentence', speak: 'Greet someone, exchange names, ask where they are from, and answer in Italian.', listen: 'Listen for names, the question about origin, and the city each person lives in.' },
  { title: 'Ascoltare una storia semplice', objective: 'Seguire una breve storia quotidiana e capire chi fa cosa.', words: ['ogni mattina|every morning', 'passeggiare|to take a walk', 'dietro a|behind', 'accanto a|next to'], grammar: 'it-a1-present-tense-regular-verbs', speak: 'Describe a simple morning routine using ogni mattina and two present-tense verbs.', listen: 'Listen for what the person does first, what the dog chases, and where they buy bread.' },
  { title: 'Descrivere se stessi', objective: 'Presentarsi e parlare di età, studi e interessi.', words: ['ho diciannove anni|I am nineteen', 'studio|I study', 'nel tempo libero|in my free time', 'mi piace disegnare|I like drawing'], grammar: 'it-a1-build-a-simple-sentence', speak: 'Introduce yourself, say what you study or do, and mention something you enjoy.', listen: 'Listen for the speaker’s age, studies, and interests.' },
  { title: 'La routine quotidiana', objective: 'Descrivere una giornata tipica e indicare quando si svolgono le attività.', words: ['svegliarsi|to wake up', 'fare colazione|to have breakfast', 'tornare a casa|to return home', 'per mezz’ora|for half an hour'], grammar: 'it-a2-reflexive-verbs-and-routines', speak: 'Describe a weekday from morning to evening using three routine verbs.', listen: 'Listen for the time the speaker wakes up, how they travel, and how long they study.' },
  { title: 'Leggere un breve avviso', objective: 'Trovare date, luoghi e servizi in un breve annuncio.', words: ['il municipio|town hall', 'lunedì prossimo|next Monday', 'sala per bambini|children’s room', 'iscriversi gratis|to register for free'], grammar: 'it-a2-questions-and-negation', speak: 'Announce the opening of a new local place and say when and what it offers.', listen: 'Listen for the opening date and the free activity available.' },
  { title: 'Ordinare al bar', objective: 'Ordinare cibo e bevande con cortesia e chiedere il prezzo.', words: ['un cappuccino|a cappuccino', 'un cornetto|a croissant', 'quanto costa?|how much is it?', 'per favore|please'], grammar: 'it-a2-essere-and-stare', speak: 'Role-play ordering a drink and snack, asking the price, and thanking the server.', listen: 'Listen for the order and the total price.' },
  { title: 'Ascoltare una notizia', objective: 'Individuare il tema principale, il luogo e i dettagli di una notizia.', words: ['ampliare la rete|to expand the network', 'pista ciclabile|bike lane', 'nei prossimi mesi|in the coming months', 'lungo il percorso|along the route'], grammar: 'it-b1-imperfetto-and-background', speak: 'Summarize a local project, who it helps, and one expected benefit.', listen: 'Listen for what the city is expanding and what else will be added.' },
  { title: 'Leggere una storia locale', objective: 'Seguire una narrazione e capire come cambia un luogo.', words: ['rimanere vuoto|to remain empty', 'convincere|to persuade', 'trasformare in|to turn into', 'riunirsi|to gather'], grammar: 'it-b1-imperfetto-and-background', speak: 'Retell a story about a place that changed and what people do there now.', listen: 'Listen for what the old bakery became and what children do there.' },
  { title: 'Raccontare il fine settimana', objective: 'Raccontare un’esperienza passata e spiegare perché gli eventi sono accaduti.', words: ['sabato scorso|last Saturday', 'siamo partiti presto|we left early', 'evitare il traffico|to avoid traffic', 'anche se|although'], grammar: 'it-a2-the-passato-prossimo', speak: 'Describe a recent outing: where you went, who joined you, and what happened.', listen: 'Listen for why the friends left early and what they ate.' },
  { title: 'Analizzare un video', objective: 'Distinguere l’argomento principale dagli esempi e dai contrasti.', words: ['dare priorità|to prioritize', 'spazio pubblico|public space', 'zona pedonale|pedestrian area', 'vivibile|livable'], grammar: 'it-b2-the-subjunctive-mood', speak: 'Present an opinion about city streets, give reasons, and address an objection.', listen: 'Listen for the contrast between moving quickly and meeting in public spaces.' },
  { title: 'Leggere un’opinione', objective: 'Individuare la tesi e gli argomenti che la sostengono.', words: ['secondo l’autore|according to the author', 'tuttavia|however', 'la tesi|the claim', 'le prove|the evidence'], grammar: 'it-b2-relative-clauses', speak: 'Summarize an opinion and distinguish evidence from the author’s conclusion.', listen: 'Listen for the author’s main claim and the qualification.' },
  { title: 'Scrivere una risposta strutturata', objective: 'Organizzare un paragrafo con una tesi, esempi e una conclusione.', words: ['in primo luogo|firstly', 'ad esempio|for example', 'di conseguenza|as a result', 'in conclusione|in conclusion'], grammar: 'it-b1-future-and-conditional', speak: 'Present a brief argument with a claim, two examples, and a conclusion.', listen: 'Listen for the order of the argument and the examples.' },
  { title: 'Esaminare media complessi', objective: 'Analizzare opinioni, sfumature e significati impliciti.', words: ['la premessa|the premise', 'sottintendere|to imply', 'la sfumatura|the nuance', 'in contrasto|in contrast'], grammar: 'it-c1-register-and-discourse-markers', speak: 'Explain an implied position and distinguish it from what is stated directly.', listen: 'Listen for qualifications and shifts in the speaker’s stance.' },
  { title: 'Leggere un testo accademico', objective: 'Riassumere un testo articolato con precisione.', words: ['la ricerca|the research', 'il campione|the sample', 'i risultati|the findings', 'la limitazione|the limitation'], grammar: 'it-c1-sequence-of-tenses', speak: 'Summarize a finding and state one limitation of the evidence.', listen: 'Listen for the research question, result, and limitation.' },
  { title: 'Costruire un’argomentazione', objective: 'Sostenere una posizione con prove e riconoscere un’obiezione.', words: ['sostenere|to argue', 'un’obiezione|an objection', 'la controprova|counterevidence', 'in definitiva|ultimately'], grammar: 'it-c1-passive-and-impersonal-forms', speak: 'Make a nuanced argument, acknowledge an opposing view, and respond to it.', listen: 'Listen for the claim, counterargument, and response.' },
  { title: 'Esprimersi con naturalezza', objective: 'Scegliere espressioni idiomatiche e un registro adatto.', words: ['non vedo l’ora|I can’t wait', 'figurati|no problem', 'a dire il vero|to tell the truth', 'dipende|it depends'], grammar: 'it-c2-idioms-and-pragmatic-meaning', speak: 'Respond naturally to a colleague and suggest a realistic alternative.', listen: 'Listen for tone, implied meaning, and the suggested next step.' },
  { title: 'Leggere a ritmo naturale', objective: 'Leggere un testo denso e distinguere le idee centrali dai dettagli.', words: ['la premessa|the premise', 'ne consegue|it follows', 'a prescindere da|regardless of', 'in misura significativa|to a significant extent'], grammar: 'it-c2-nuance-in-the-subjunctive', speak: 'Summarize a complex argument without losing its qualifications.', listen: 'Listen for the main conclusion and the conditions attached to it.' },
  { title: 'Parlare con precisione', objective: 'Spiegare un problema complesso con chiarezza e precisione.', words: ['il risultato|the outcome', 'la causa sottostante|the underlying cause', 'la misura|the measure', 'in questo senso|in this sense'], grammar: 'it-c2-rhetorical-emphasis', speak: 'Explain why a project met its immediate goal but not its underlying objective.', listen: 'Listen for the distinction between an immediate result and a lasting solution.' },
]

const planTitles = supportSpecs.map((item) => item.title)
const vocabularyFor = (words: string[]) => words.map((word) => {
  const [spanish, english] = word.split('|')
  return { spanish, english }
})

export const italianLessonSupport: Record<string, LessonSupport> = Object.fromEntries(supportSpecs.map((item) => [
  item.title,
  {
    objective: item.objective,
    vocabulary: vocabularyFor(item.words),
    grammarLessonId: item.grammar,
    speakingPrompt: item.speak,
    listeningPrompt: item.listen,
  },
]))

export const italianPlans: Record<Exclude<CourseLevel, 'Pre-A1'>, Array<{ title: string; detail: string; minutes: string; speakingPrompt?: string }>> = {
  A1: [
    { title: planTitles[0], detail: 'Impara saluti, presentazioni e nomi con brevi dialoghi.', minutes: '10 min' },
    { title: planTitles[1], detail: 'Segui una storia breve e riconosci le parole dal contesto.', minutes: '15 min' },
    { title: planTitles[2], detail: 'Usa frasi semplici per presentarti.', minutes: '10 min' },
  ],
  A2: [
    { title: planTitles[3], detail: 'Parla dei tuoi orari e delle attività quotidiane.', minutes: '15 min' },
    { title: planTitles[4], detail: 'Trova informazioni essenziali in un breve avviso.', minutes: '15 min' },
    { title: planTitles[5], detail: 'Pratica il lessico utile per cibo, bevande e negozi.', minutes: '10 min' },
  ],
  B1: [
    { title: planTitles[6], detail: 'Individua le idee principali e i dettagli di una notizia.', minutes: '20 min' },
    { title: planTitles[7], detail: 'Pratica inferenze, lessico e riassunto.', minutes: '20 min' },
    { title: planTitles[8], detail: 'Usa il passato per raccontare un’esperienza recente.', minutes: '15 min' },
  ],
  B2: [
    { title: planTitles[9], detail: 'Confronta argomento, tono e dettagli di supporto.', minutes: '25 min' },
    { title: planTitles[10], detail: 'Individua la posizione dell’autore e i suoi argomenti.', minutes: '20 min' },
    { title: planTitles[11], detail: 'Scrivi un paragrafo chiaro con esempi e conclusione.', minutes: '20 min' },
  ],
  C1: [
    { title: planTitles[12], detail: 'Analizza opinione, sfumature e significati impliciti.', minutes: '25 min' },
    { title: planTitles[13], detail: 'Riassumi un testo articolato con parole tue.', minutes: '25 min' },
    { title: planTitles[14], detail: 'Prepara una risposta dettagliata e sfumata.', minutes: '30 min' },
  ],
  C2: [
    { title: planTitles[15], detail: 'Affina le espressioni idiomatiche e il registro.', minutes: '30 min' },
    { title: planTitles[16], detail: 'Sviluppa precisione e lessico con testi complessi.', minutes: '30 min' },
    { title: planTitles[17], detail: 'Pratica un’esposizione naturale e articolata.', minutes: '30 min' },
  ],
}

const passageTexts = [
  'Ogni mattina, Anna porta il cane Luna al parco. Luna corre dietro a una palla rossa e saluta gli altri cani. Dopo, Anna compra il pane nel negozio vicino a casa.',
  'Lunedì, il comune aprirà una nuova biblioteca nel quartiere. Ci sarà una sala per bambini e uno spazio per studiare. Durante la prima settimana, i residenti potranno iscriversi gratuitamente.',
  'Quando ha chiuso la vecchia panetteria, molti pensavano che il negozio sarebbe rimasto vuoto. Clara ha convinto suo nonno a trasformarlo in una piccola libreria. Ora, ogni sabato, i bambini si incontrano lì per ascoltare storie.',
  'La città amplierà la rete di piste ciclabili nei prossimi sei mesi. Il progetto collegherà diversi quartieri con l’università e la stazione centrale. Lungo i nuovi percorsi saranno piantati anche degli alberi.',
  'Il viaggio attraverso le colline cambia a ogni curva. I piccoli paesi conservano tradizioni diverse, mentre le piazze diventano luoghi d’incontro. Ogni tappa offre una storia nuova e un’occasione per ascoltare chi vive nella regione.',
  'La proposta è stata discussa a lungo: da una parte promette servizi più accessibili, dall’altra richiede investimenti continui. I dati iniziali sono incoraggianti, ma non bastano per valutare gli effetti a lungo termine.',
]

const baseItalianSupplementalLessons: SupplementalLesson[] = italianGrammarLevels.flatMap((level, index) =>
  [0, 1].map((variant) => {
    const passage = passageTexts[(index + variant) % passageTexts.length]
    const title = [
      ['Una mattina al parco', 'Una presentazione in classe'],
      ['Un nuovo servizio in città', 'Una giornata ben organizzata'],
      ['La libreria del quartiere', 'Un fine settimana in viaggio'],
      ['Una città più vivibile', 'Il valore delle biblioteche'],
      ['Leggere i dati con attenzione', 'Una decisione ben motivata'],
      ['Le parole e il contesto', 'Una conclusione sfumata'],
    ][index][variant]
    return {
      id: `it-extra-${level.toLowerCase()}-${variant + 1}`,
      level,
      title,
      detail: `Leggi un testo ${level} in italiano e verifica la comprensione.`,
      minutes: '15 min',
      objective: 'Leggere un testo autentico graduato, individuare le idee principali e rispondere con precisione.',
      vocabulary: vocabularyFor(['il quartiere|the neighborhood', 'la proposta|the proposal', 'inoltre|furthermore', 'tuttavia|however', 'la ricerca|the research']),
      grammarLessonId: italianGrammarLessons.find((lesson) => lesson.level === level)!.id,
      grammarNote: 'Osserva come le forme verbali e i connettivi organizzano il testo.',
      label: 'LETTURA · ITALIANO',
      passage,
      questions: [
        { prompt: 'What is the passage mainly about?', options: ['A local change or experience', 'A sports competition', 'A family recipe', 'A weather forecast'], answer: 0 },
        { prompt: 'What should the reader identify?', options: ['The main idea and supporting details', 'Only the title', 'The author’s home address', 'A list of unrelated words'], answer: 0 },
      ],
      speakingPrompt: `Riassumi in italiano il testo “${title}” e spiega quale dettaglio ti sembra più importante.`,
      listeningPrompt: 'Ascolta il testo e individua il tema, i dettagli e i connettivi.',
    }
  }),
)

export const italianSupplementalLessons: SupplementalLesson[] = [
  ...baseItalianSupplementalLessons,
  ...buildExpandedLessons('Italian', expandedItalianSeeds, italianGrammarLessons),
]

export const italianLessonContent: Record<string, { label: string; text: string; questions: Array<{ prompt: string; options: string[]; answer: number }> }> = Object.fromEntries([
  ...italianStarters.map((lesson) => [lesson.title, { label: 'LETTURA · PRIMI PASSI', text: lesson.passage, questions: lesson.questions }]),
  ...supportSpecs.map((spec, index) => {
    const text = index < 3
      ? [
        '—Ciao, mi chiamo Lucia. Come ti chiami?\n—Sono Daniel. Piacere.\n—Di dove sei?\n—Sono di Roma.',
        passageTexts[0],
        'Mi chiamo Paolo e ho diciannove anni. Studio design all’università. Nel tempo libero mi piace disegnare e giocare a calcio con gli amici.',
      ][index]
      : passageTexts[(index - 3) % passageTexts.length]
    return [spec.title, {
      label: `LETTURA · ${spec.title.toLocaleUpperCase()}`,
      text,
      questions: [
        { prompt: 'What is the passage mainly about?', options: ['A daily activity or local story', 'A sports score', 'A recipe', 'A weather report'], answer: 0 },
        { prompt: 'What should you listen for?', options: ['The main idea and a supporting detail', 'Only the speaker’s name', 'A list of numbers', 'An unrelated event'], answer: 0 },
      ],
    }]
  }),
  ...italianSupplementalLessons.map((lesson) => [lesson.title, {
    label: lesson.label, text: lesson.passage, questions: lesson.questions,
  }]),
])

export const italianAssessmentQuestions: AssessmentQuestion[] = [
  { prompt: 'What does “Mi chiamo Anna” mean?', answers: ['My name is Anna', 'I am from Anna', 'I have Anna', 'Anna is here'], correctIndex: 0 },
  { prompt: 'Which phrase means “the book”?', answers: ['il libro', 'la casa', 'una strada', 'un tavolo'], correctIndex: 0 },
  { prompt: 'How do you say “I am learning Italian”?', answers: ['Sto imparando l’italiano', 'Sono italiano', 'Imparo ieri', 'Ho italiano'], correctIndex: 0 },
  { prompt: 'What does “oggi” mean?', answers: ['today', 'tomorrow', 'yesterday', 'always'], correctIndex: 0 },
  { prompt: 'Which phrase means “I would like a coffee”?', answers: ['Vorrei un caffè', 'Sono un caffè', 'Ho un caffè ieri', 'Caffè è'], correctIndex: 0 },
  { prompt: 'What does “Il mercato è aperto” mean?', answers: ['The market is open', 'The market is closed', 'The market is new', 'The market is big'], correctIndex: 0 },
  { prompt: 'Which word means “train station”?', answers: ['la stazione', 'la cucina', 'il giardino', 'la finestra'], correctIndex: 0 },
  { prompt: 'Choose “I have lived here for two years.”', answers: ['Abito qui da due anni', 'Abitavo qui domani', 'Sono qui da due anni fa', 'Abiterò qui ieri'], correctIndex: 0 },
  { prompt: 'What does “Non capisco il video” mean?', answers: ['I do not understand the video', 'I do not want the video', 'I am making the video', 'I watched the video'], correctIndex: 0 },
  { prompt: 'Which option expresses an opinion?', answers: ['Penso che il piano sia migliore', 'Il treno parte alle otto', 'Sono stanco', 'La riunione è domani'], correctIndex: 0 },
  { prompt: 'Which sentence uses the subjunctive?', answers: ['Spero che venga', 'So che viene', 'È venuto ieri', 'Verrà domani'], correctIndex: 0 },
  { prompt: 'How do you say “The speaker’s argument was persuasive”?', answers: ['L’argomento di chi parlava era convincente', 'La stazione era lontana', 'Il pubblico è arrivato', 'La conversazione era breve'], correctIndex: 0 },
  { prompt: 'Complete: “Le strade sono ___.” (quiet)', answers: ['tranquillo', 'tranquille', 'tranquilla', 'tranquilli'], correctIndex: 1 },
  { prompt: 'Complete naturally: “Ieri sono arrivata tardi, quindi…”', answers: ['ho perso l’autobus', 'perdo l’autobus domani', 'perderei ieri', 'sto perdendo ieri'], correctIndex: 0 },
  { prompt: 'What does “Si vendono i biglietti alla cassa” mean?', answers: ['Tickets are sold at the ticket office', 'The cashier lost the tickets', 'Tickets sold yesterday', 'The office is closed'], correctIndex: 0 },
  { prompt: 'Choose a conjecture about a completed past event.', answers: ['Sarà già partito', 'Partirà domani', 'Partiva ogni giorno', 'Parte adesso'], correctIndex: 0 },
  { prompt: 'Choose “Although the evidence is limited, the pattern is clear.”', answers: ['Benché le prove siano limitate, il quadro è chiaro', 'Se le prove erano limitate, il quadro era', 'Le prove per il quadro', 'Benché le prove limitate'], correctIndex: 0 },
  { prompt: 'Choose the natural emphatic sentence.', answers: ['È il comitato ad aver preso la decisione', 'Il comitato è la decisione presa', 'Chi la decisione comitato'], correctIndex: 0 },
]

export const italianActivityCards: PracticeActivity[] = [
  { level: 'A1', icon: '◉', title: 'Choose the correct phrase', prompt: 'How do you say “I am from Italy” in Italian?', audioPhrase: 'Sono italiano', options: ['Sono italiano', 'Sto italiano', 'Vivo Italia', 'Ho italiano'], answer: 0 },
  { level: 'A1', icon: '⌁', title: 'Listen and repeat', prompt: 'Listen to the phrase, then repeat it aloud.', audioPhrase: 'Vorrei un caffè', options: ['Vorrei un caffè', 'Mi chiamo Anna', 'Sto imparando', 'Grazie per l’aiuto'], answer: 0 },
  { level: 'A1', icon: '✦', title: 'Fill in the gap', prompt: 'Complete: “Lui ___ mio fratello.”', audioPhrase: 'Lui è mio fratello', options: ['io', 'è', 'lei', 'qui'], answer: 1 },
  { level: 'A1', icon: '♫', title: 'Listen for meaning', prompt: 'What does “Dov’è la stazione?” mean?', audioPhrase: 'Dov’è la stazione?', options: ['Where is the station?', 'When does the station open?', 'Who is at the station?', 'How far is the station?'], answer: 0 },
  { level: 'A1', icon: '↔', title: 'Choose a natural reply', prompt: 'Someone asks “Come stai?” Choose a natural reply.', audioPhrase: 'Sto molto bene, grazie', options: ['Sto molto bene, grazie', 'Mi chiamo Anna', 'Ho vent’anni', 'Abito a Roma'], answer: 0 },
  { level: 'A2', icon: '◷', title: 'Practice the past tense', prompt: 'Complete: “Ieri noi ___ al museo.”', audioPhrase: 'Ieri siamo andati al museo', options: ['siamo andati', 'andiamo', 'andremo', 'andare'], answer: 0 },
  { level: 'A2', icon: '⌂', title: 'Learn a useful phrase', prompt: 'How do you say “I need a table for two”?', audioPhrase: 'Mi serve un tavolo per due', options: ['Mi serve un tavolo per due', 'Voglio due grandi tavoli', 'Il tavolo è per due', 'Sono un tavolo'], answer: 0 },
  { level: 'A2', icon: '▤', title: 'Understand the sentence', prompt: 'Where does the speaker’s sister work?', audioPhrase: 'Mia sorella lavora in una scuola', options: ['At a school', 'At a hospital', 'At a restaurant', 'At a library'], answer: 0 },
  { level: 'Pre-A1', icon: '👋', title: 'Match your first greeting', prompt: 'Which Italian word means “hello”?', audioPhrase: 'Ciao', options: ['Ciao', 'Arrivederci', 'Grazie'], answer: 0 },
  { level: 'Pre-A1', icon: '♫', title: 'Hear a polite phrase', prompt: 'Which phrase means “please”?', audioPhrase: 'Per favore', options: ['Per favore', 'Buongiorno', 'A presto'], answer: 0 },
  { level: 'A1', icon: '▧', title: 'Choose the right article', prompt: 'Complete: “___ casa è piccola.”', audioPhrase: 'La casa è piccola', options: ['Il', 'La', 'Lo'], answer: 1 },
  { level: 'A1', icon: '⌖', title: 'Follow simple directions', prompt: 'Where should you turn?', audioPhrase: 'Gira a destra', options: ['To the right', 'To the left', 'Go straight'], answer: 0 },
  { level: 'A2', icon: '☕', title: 'Order politely', prompt: 'Choose a polite way to ask for water.', audioPhrase: 'Vorrei un bicchiere d’acqua, per favore', options: ['Vorrei un bicchiere d’acqua, per favore', 'Sono acqua domani', 'Ho un tavolo'], answer: 0 },
  { level: 'A2', icon: '◷', title: 'Put the day in order', prompt: 'What happened first?', audioPhrase: 'Prima ho fatto colazione e poi sono andato al lavoro', options: ['I had breakfast', 'I went to work', 'I arrived home'], answer: 0 },
  { level: 'B1', icon: '↪', title: 'Choose the story connector', prompt: 'Complete: “___ aspettavamo, ha iniziato a piovere.”', audioPhrase: 'Mentre aspettavamo, ha iniziato a piovere', options: ['Mentre', 'Di conseguenza', 'Anche domani'], answer: 0 },
  { level: 'B1', icon: '▣', title: 'Understand a travel update', prompt: 'Why was the passenger concerned?', audioPhrase: 'Il treno è stato cancellato e ho una coincidenza a Bologna', options: ['They had a connection', 'They lost a bag', 'They missed a meeting'], answer: 0 },
  { level: 'B2', icon: '⚖', title: 'Choose a concession', prompt: 'The speaker accepts this as fact: “Benché ___ costoso, il piano è approvato.”', audioPhrase: 'Benché sia costoso, il piano è approvato', options: ['è', 'sia', 'sarebbe'], answer: 1 },
  { level: 'B2', icon: '⇄', title: 'Identify a balanced proposal', prompt: 'Which option combines a benefit and a safeguard?', audioPhrase: 'Il modello funziona purché risponda a esigenze reali', options: ['A plan with a benefit and a clear condition', 'More changes without a purpose', 'No coordination at all'], answer: 0 },
  { level: 'C1', icon: '⌁', title: 'Interpret the qualification', prompt: 'What does “di per sé” mean?', audioPhrase: 'Il risultato non dimostra di per sé la causa', options: ['By itself', 'At the same time', 'For this reason'], answer: 0 },
  { level: 'C1', icon: '◉', title: 'Spot the inference', prompt: 'A result fits a hypothesis but does not prove it. What should you do?', audioPhrase: 'La correlazione è compatibile con l’ipotesi, ma non dimostra la causalità', options: ['Look for other explanations and evidence', 'Treat correlation as proof', 'Ignore the result'], answer: 0 },
  { level: 'C2', icon: '❝', title: 'Read the implied reservation', prompt: 'What does “con queste riserve” signal?', audioPhrase: 'Con queste riserve, mi sembra ragionevole', options: ['Agreement with qualifications', 'Complete rejection', 'A change of subject'], answer: 0 },
  { level: 'C2', icon: '↔', title: 'Choose a precise request', prompt: 'Which is polite and gives a clear deadline?', audioPhrase: 'Potresti inviarmelo entro le cinque?', options: ['Potresti inviarmelo entro le cinque?', 'Forse un giorno si potrebbe inviare', 'Invialo quando vuoi'], answer: 0 },
]

export const italianCourseLevels = ['Pre-A1', ...italianGrammarLevels] as const
