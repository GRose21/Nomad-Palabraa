export type GrammarLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export type GrammarLesson = {
  id: string
  level: GrammarLevel
  title: string
  summary: string
  sections: Array<{ heading: string; explanation: string; examples: string[] }>
  exercises: Array<{ prompt: string; options: string[]; answer: number; explanation: string }>
}

export const grammarLevels: GrammarLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export const grammarLessons: GrammarLesson[] = [
  {
    id: 'sentence-building',
    level: 'A1',
    title: 'Build a basic sentence',
    summary: 'Learn Spanish word order, subject pronouns, and when subjects can be left out.',
    sections: [
      { heading: 'A flexible sentence pattern', explanation: 'A common Spanish statement uses subject + verb + object. Adjectives usually follow the noun. Spanish word order can change for emphasis, but the verb ending often makes the subject clear.', examples: ['María lee un libro. — María reads a book.', 'El coche rojo es nuevo. — The red car is new.'] },
      { heading: 'Pronouns are often optional', explanation: 'Verb endings identify the subject, so speakers often omit yo, tú, or nosotros. Keep the pronoun when you need contrast or clarity.', examples: ['(Yo) estudio español. — I study Spanish.', 'Ella trabaja, pero yo estudio. — She works, but I study.'] },
    ],
    exercises: [
      { prompt: 'Choose the natural Spanish word order for “Lucía drinks water.”', options: ['Lucía bebe agua.', 'Bebe Lucía agua la.', 'Agua Lucía bebe la.'], answer: 0, explanation: 'Subject + verb + object is a common neutral order.' },
      { prompt: 'Why can Spanish speakers omit yo in “(Yo) hablo español”?', options: ['The verb ending identifies the subject.', 'Spanish has no subject pronouns.', 'The sentence is a question.'], answer: 0, explanation: 'Hablo is the first-person singular form, so yo is understood.' },
    ],
  },
  {
    id: 'articles-nouns',
    level: 'A1',
    title: 'Nouns, gender, and articles',
    summary: 'Match nouns with masculine or feminine articles and make them singular or plural.',
    sections: [
      { heading: 'Gender and articles', explanation: 'Spanish nouns have grammatical gender. Many nouns ending in -o are masculine and many ending in -a are feminine, but there are exceptions. Learn each noun together with its article.', examples: ['el libro — the book; la casa — the house', 'el día — the day (masculine despite -a); la mano — the hand (feminine despite -o)'] },
      { heading: 'Make nouns plural', explanation: 'Add -s to a vowel ending and -es to most consonant endings. Articles and adjectives agree in gender and number with the noun.', examples: ['la mesa blanca → las mesas blancas', 'el papel importante → los papeles importantes'] },
    ],
    exercises: [
      { prompt: 'Choose the correct phrase for “the white houses.”', options: ['las casas blancas', 'los casas blancos', 'la casa blanca'], answer: 0, explanation: 'Casa is feminine; both article and adjective become feminine plural.' },
      { prompt: 'What is the plural of el papel?', options: ['los papels', 'los papeles', 'las papeles'], answer: 1, explanation: 'Nouns ending in most consonants add -es.' },
    ],
  },
  {
    id: 'ser-estar-hay',
    level: 'A1',
    title: 'Ser, estar, and hay',
    summary: 'Choose the right way to express identity, states, location, and existence.',
    sections: [
      { heading: 'Ser for identity and characteristics', explanation: 'Use ser for identity, origin, profession, dates, and characteristics viewed as defining. It is irregular: soy, eres, es, somos, sois, son.', examples: ['Soy profesora. — I am a teacher.', 'Somos de Chile. — We are from Chile.'] },
      { heading: 'Estar for states and location', explanation: 'Use estar for locations and many temporary states or conditions. Its present forms are estoy, estás, está, estamos, estáis, están.', examples: ['Madrid está en España. — Madrid is in Spain.', 'Estoy cansado. — I am tired.'] },
      { heading: 'Hay means “there is/are”', explanation: 'Hay introduces the existence or presence of something and does not change between singular and plural.', examples: ['Hay un libro en la mesa. — There is a book on the table.', 'Hay tres estudiantes aquí. — There are three students here.'] },
    ],
    exercises: [
      { prompt: 'Complete: “Mis amigos ___ en casa.”', options: ['son', 'están', 'hay'], answer: 1, explanation: 'Use estar for the location of specific people.' },
      { prompt: 'Complete: “En la clase ___ veinte estudiantes.”', options: ['están', 'son', 'hay'], answer: 2, explanation: 'Hay introduces the existence or presence of students.' },
    ],
  },
  {
    id: 'present-regular',
    level: 'A1',
    title: 'Present tense: regular verbs',
    summary: 'Conjugate -ar, -er, and -ir verbs in the present tense.',
    sections: [
      { heading: 'Find the stem', explanation: 'Remove the infinitive ending (-ar, -er, or -ir), then add the matching present-tense ending. The verb ending agrees with its subject.', examples: ['hablar → habl-; yo hablo, tú hablas, ella habla', 'comer → com-; yo como, tú comes, ellos comen', 'vivir → viv-; yo vivo, tú vives, nosotros vivimos'] },
      { heading: 'Present tense uses', explanation: 'The present describes habits, facts, and actions happening now. Context tells you which meaning is intended.', examples: ['Trabajo los lunes. — I work on Mondays.', 'Ahora vivimos en Lima. — We live in Lima now.'] },
    ],
    exercises: [
      { prompt: 'Complete: “Nosotros ___ español en casa.” (hablar)', options: ['hablamos', 'hablan', 'hablo'], answer: 0, explanation: 'The nosotros ending for -ar verbs is -amos.' },
      { prompt: 'Complete: “Tú ___ en una ciudad grande.” (vivir)', options: ['vivo', 'vives', 'vivimos'], answer: 1, explanation: 'The tú ending for -ir verbs is -es.' },
    ],
  },
  {
    id: 'adjectives-questions',
    level: 'A2',
    title: 'Agreement, questions, and negation',
    summary: 'Make adjectives agree and form clear Spanish questions and negative statements.',
    sections: [
      { heading: 'Adjective agreement', explanation: 'Adjectives match the noun in gender and number. Many adjectives ending in -o change to -a for feminine and add -s or -es for plural.', examples: ['un chico alto → una chica alta', 'unos libros interesantes → unas novelas interesantes'] },
      { heading: 'Ask questions', explanation: 'Spanish questions use opening and closing question marks. A question word carries an accent: qué, quién, cuándo, dónde, cómo, cuánto, cuál, por qué.', examples: ['¿Dónde vives? — Where do you live?', '¿Cuándo empieza la película? — When does the movie start?'] },
      { heading: 'Make a sentence negative', explanation: 'Place no directly before the conjugated verb. Other negative words commonly appear with no as well.', examples: ['No tengo tiempo. — I do not have time.', 'No conozco a nadie. — I do not know anyone.'] },
    ],
    exercises: [
      { prompt: 'Complete: “Las ventanas ___ son nuevas.”', options: ['pequeño', 'pequeñas', 'pequeña'], answer: 1, explanation: 'Ventanas is feminine plural, so the adjective is pequeñas.' },
      { prompt: 'Choose the correctly written question.', options: ['Donde vives?', '¿Dónde vives?', '¿Dónde vives.'], answer: 1, explanation: 'Spanish uses an opening question mark and an accent on dónde.' },
    ],
  },
  {
    id: 'present-irregular',
    level: 'A2',
    title: 'Present tense: irregular and stem-changing verbs',
    summary: 'Recognize common irregular forms and vowel changes in the present tense.',
    sections: [
      { heading: 'High-frequency irregular verbs', explanation: 'Some common verbs have special first-person forms or irregular forms throughout. Memorize these as complete patterns.', examples: ['tener: tengo, tienes, tiene, tenemos, tenéis, tienen', 'ir: voy, vas, va, vamos, vais, van; hacer: hago, haces, hace…'] },
      { heading: 'Stem changes', explanation: 'Many verbs change a vowel in the stem in most present-tense forms, but usually not in nosotros or vosotros. Common patterns include e→ie, o→ue, and e→i.', examples: ['pensar: pienso, piensas… pensamos', 'dormir: duermo, duermes… dormimos', 'pedir: pido, pides… pedimos'] },
    ],
    exercises: [
      { prompt: 'Complete: “Mi hermana ___ dos idiomas.” (hablar is regular; tener is irregular)', options: ['tene', 'tiene', 'tenemos'], answer: 1, explanation: 'Tener changes e→ie in the third-person singular: tiene.' },
      { prompt: 'Complete: “Nosotros ___ ocho horas.” (dormir)', options: ['duermimos', 'dormimos', 'duermen'], answer: 1, explanation: 'The stem change does not occur in nosotros: dormimos.' },
    ],
  },
  {
    id: 'gustar-pronouns',
    level: 'A2',
    title: 'Gustar and indirect object pronouns',
    summary: 'Express likes and reactions with gustar, encantar, and similar verbs.',
    sections: [
      { heading: 'The thing liked is the grammatical subject', explanation: 'Use me, te, le, nos, os, or les to show who experiences the feeling. Gustar agrees with the thing liked: gusta with a singular noun or infinitive, gustan with plural nouns.', examples: ['Me gusta el café. — I like coffee.', 'A Ana le gustan los libros. — Ana likes books.', 'Nos gusta viajar. — We like traveling.'] },
      { heading: 'Clarify or emphasize the person', explanation: 'Add a mí, a ti, a ella, etc. before the pronoun when needed. The extra phrase does not replace the required indirect object pronoun.', examples: ['A mí me encanta la música.', 'A mis padres les interesa la historia.'] },
    ],
    exercises: [
      { prompt: 'Complete: “A Laura ___ gustan las películas.”', options: ['le', 'les', 'la'], answer: 0, explanation: 'Laura is one person, so the indirect object pronoun is le.' },
      { prompt: 'Choose the correct sentence for “We like to dance.”', options: ['Nos gustan bailar.', 'Nos gusta bailar.', 'Me gusta bailar.'], answer: 1, explanation: 'An infinitive such as bailar takes singular gusta.' },
    ],
  },
  {
    id: 'reflexive-pronouns',
    level: 'A2',
    title: 'Reflexive verbs and daily routines',
    summary: 'Use reflexive pronouns with verbs describing actions done to oneself.',
    sections: [
      { heading: 'Match the pronoun to the subject', explanation: 'Reflexive infinitives end in -se. Before a conjugated verb, change se to me, te, se, nos, os, or se.', examples: ['levantarse → me levanto, te levantas, se levanta', 'Nos acostamos a las diez. — We go to bed at ten.'] },
      { heading: 'Pronoun placement', explanation: 'Place the reflexive pronoun before a conjugated verb. It can attach to an infinitive or a present participle; with two verbs, both placements are often possible.', examples: ['Me voy a duchar. = Voy a ducharme.', 'Está preparándose. = Se está preparando.'] },
    ],
    exercises: [
      { prompt: 'Complete: “Yo ___ despierto temprano.”', options: ['me', 'te', 'se'], answer: 0, explanation: 'The reflexive pronoun for yo is me.' },
      { prompt: 'Choose another correct way to say “I am going to get dressed.”', options: ['Voy vestir me.', 'Voy a vestirme.', 'Me voy vestirme.'], answer: 1, explanation: 'Attach the reflexive pronoun to the infinitive vestirme.' },
    ],
  },
  {
    id: 'preterite',
    level: 'A2',
    title: 'Preterite: completed past actions',
    summary: 'Talk about finished events with regular and common irregular preterite forms.',
    sections: [
      { heading: 'Regular preterite endings', explanation: 'Use the preterite for bounded events viewed as completed. -ar verbs use -é, -aste, -ó, -amos, -asteis, -aron; -er/-ir verbs share -í, -iste, -ió, -imos, -isteis, -ieron.', examples: ['hablar: hablé, hablaste, habló, hablamos, hablaron', 'comer: comí, comiste, comió, comimos, comieron'] },
      { heading: 'Common irregulars', explanation: 'Some frequent verbs have irregular stems or forms. Ir and ser share the same preterite forms; context tells you which verb is meant.', examples: ['ir/ser: fui, fuiste, fue, fuimos, fueron', 'tener: tuve; hacer: hice (but hizo in the third-person singular)'] },
    ],
    exercises: [
      { prompt: 'Complete: “Ayer Marta ___ una carta.” (escribir)', options: ['escribió', 'escribía', 'escribe'], answer: 0, explanation: 'Ayer signals a completed past event, so use the preterite escribió.' },
      { prompt: 'Complete: “El sábado nosotros ___ al museo.” (ir)', options: ['íbamos', 'fuimos', 'vamos'], answer: 1, explanation: 'The nosotros preterite form of ir is fuimos.' },
    ],
  },
  {
    id: 'imperfect',
    level: 'B1',
    title: 'Imperfect: habits and background',
    summary: 'Describe repeated past actions, ongoing situations, age, time, and background.',
    sections: [
      { heading: 'Regular forms', explanation: 'For -ar verbs use -aba, -abas, -aba, -ábamos, -abais, -aban. For -er/-ir verbs use -ía, -ías, -ía, -íamos, -íais, -ían.', examples: ['De niño jugaba en el parque. — As a child, I used to play in the park.', 'Vivíamos cerca del mar. — We lived near the sea.'] },
      { heading: 'Three important irregulars', explanation: 'The imperfect has only three irregular verbs: ser, ir, and ver. Use it for habitual actions, descriptions, time, age, and an action in progress in the past.', examples: ['ser: era, eras, era, éramos, erais, eran', 'ir: iba, ibas…; ver: veía, veías…', 'Eran las ocho y llovía. — It was eight o’clock and it was raining.'] },
    ],
    exercises: [
      { prompt: 'Complete: “Cuando era pequeña, Ana ___ al tenis todos los sábados.” (jugar)', options: ['jugó', 'jugaba', 'juega'], answer: 1, explanation: 'A repeated past habit uses the imperfect jugaba.' },
      { prompt: 'Complete: “Mi abuelo ___ muy amable.” (ser)', options: ['fue', 'era', 'es'], answer: 1, explanation: 'The imperfect describes a continuing past characteristic: era.' },
    ],
  },
  {
    id: 'preterite-imperfect',
    level: 'B1',
    title: 'Preterite vs. imperfect',
    summary: 'Choose between the event sequence and the ongoing background in a past narrative.',
    sections: [
      { heading: 'Event versus scene', explanation: 'The preterite presents an event as a completed whole. The imperfect sets the scene, describes a state, or shows what was happening. The choice depends on how the speaker frames the event, not simply on an English translation.', examples: ['Caminaba por el parque cuando empezó a llover. — I was walking in the park when it started to rain.', 'La película terminó a las diez. — The movie ended at ten.'] },
      { heading: 'Interruptions and simultaneous actions', explanation: 'An ongoing imperfect action can provide the background for a preterite event that interrupts it. Two ongoing actions can both use the imperfect.', examples: ['Dormíamos cuando sonó el teléfono. — We were sleeping when the phone rang.', 'Mientras yo cocinaba, ellos hablaban. — While I cooked, they were talking.'] },
    ],
    exercises: [
      { prompt: 'Complete: “Yo ___ cuando mi amiga ___.” (leer / llamar)', options: ['leí / llamaba', 'leía / llamó', 'leía / llamaba'], answer: 1, explanation: 'Reading is the background (imperfect); the call is the completed interruption (preterite).' },
      { prompt: 'Complete: “Ayer la tienda ___ a las nueve.” (cerrar)', options: ['cerraba', 'cerró', 'cierra'], answer: 1, explanation: 'A specific completed event yesterday uses the preterite cerró.' },
    ],
  },
  {
    id: 'future-conditional',
    level: 'B1',
    title: 'Future and conditional',
    summary: 'Form the simple future and conditional, including their uses for prediction and politeness.',
    sections: [
      { heading: 'Simple future', explanation: 'Add the future endings -é, -ás, -á, -emos, -éis, -án to the complete infinitive. The same endings work for all verb groups. Several common verbs use an irregular stem.', examples: ['hablaré, comerás, vivirán', 'tener → tendré; hacer → haré; poder → podré'] },
      { heading: 'Conditional', explanation: 'Add -ía, -ías, -ía, -íamos, -íais, -ían to the infinitive or irregular future stem. Use it for hypothetical outcomes and polite requests.', examples: ['Viajaríamos más con tiempo. — We would travel more if we had time.', '¿Podrías ayudarme? — Could you help me?'] },
    ],
    exercises: [
      { prompt: 'Complete: “Mañana nosotros ___ a la playa.” (ir)', options: ['iremos', 'íbamos', 'iríamos'], answer: 0, explanation: 'The simple future of ir for nosotros is iremos.' },
      { prompt: 'Choose a polite request.', options: ['¿Me traes agua?', '¿Me traerías agua, por favor?', '¿Me trajiste agua?'], answer: 1, explanation: 'The conditional traerías makes the request more courteous.' },
    ],
  },
  {
    id: 'object-pronouns',
    level: 'B1',
    title: 'Direct and indirect object pronouns',
    summary: 'Replace repeated nouns with object pronouns and place them naturally in a sentence.',
    sections: [
      { heading: 'Direct objects', explanation: 'Direct object pronouns are me, te, lo/la, nos, os, los/las. They replace the person or thing directly receiving the action and normally go before a conjugated verb.', examples: ['Veo la película. → La veo. — I watch it.', 'Conozco a Carlos. → Lo conozco. — I know him.'] },
      { heading: 'Indirect objects and combinations', explanation: 'Indirect object pronouns are me, te, le, nos, os, les. When le/les comes before lo/la/los/las, it changes to se. Attach pronouns to infinitives, affirmative commands, or gerunds.', examples: ['Doy el libro a Ana. → Se lo doy. — I give it to her.', 'Voy a explicártelo. — I am going to explain it to you.'] },
    ],
    exercises: [
      { prompt: 'Replace “las llaves” in “Busco las llaves.”', options: ['Los busco.', 'Las busco.', 'Les busco.'], answer: 1, explanation: 'Las llaves is feminine plural and a direct object, so use las.' },
      { prompt: 'Replace “el mapa” and “a ellos”: “Doy el mapa a ellos.”', options: ['Les lo doy.', 'Se lo doy.', 'Lo les doy.'], answer: 1, explanation: 'With two object pronouns, le/les changes to se before lo.' },
    ],
  },
  {
    id: 'present-subjunctive',
    level: 'B2',
    title: 'Present subjunctive',
    summary: 'Form and use the subjunctive after wishes, recommendations, doubt, emotion, and necessity.',
    sections: [
      { heading: 'Build the forms', explanation: 'Start from the yo form of the present indicative, drop -o, and add the opposite vowel endings: -ar verbs take e-endings; -er/-ir verbs take a-endings. Important irregulars include sea, vaya, haya, sepa, and esté.', examples: ['hablo → hable, hables…; como → coma, comas…', 'Quiero que vengas. — I want you to come.'] },
      { heading: 'Know when a new subject triggers it', explanation: 'A common pattern is a main clause expressing desire, emotion, doubt, recommendation, or importance + que + a different subject + subjunctive. If the subject is the same, use an infinitive instead.', examples: ['Espero que ellos lleguen pronto. — I hope they arrive soon.', 'Espero llegar pronto. — I hope to arrive soon.'] },
    ],
    exercises: [
      { prompt: 'Complete: “Es importante que tú ___ la verdad.” (decir)', options: ['dices', 'digas', 'dijiste'], answer: 1, explanation: 'An impersonal expression of importance followed by a new subject and que takes the subjunctive: digas.' },
      { prompt: 'Choose the correct sentence.', options: ['Quiero que venir temprano.', 'Quiero venir temprano.', 'Quiero que vengo temprano.'], answer: 1, explanation: 'With the same subject, use the infinitive without que.' },
    ],
  },
  {
    id: 'commands',
    level: 'B2',
    title: 'Commands and the imperative',
    summary: 'Give direct, negative, formal, and informal instructions with correct pronoun placement.',
    sections: [
      { heading: 'Affirmative tú commands', explanation: 'Many affirmative tú commands use the third-person singular present form: habla, come, escribe. A small set is irregular: di, haz, ve, pon, sal, sé, ten, ven.', examples: ['Habla más despacio. — Speak more slowly.', 'Haz la tarea. — Do the homework.'] },
      { heading: 'Negative and formal commands', explanation: 'Negative tú commands and most usted/ustedes commands use the present subjunctive. Attach pronouns to affirmative commands; place them before negative commands. Add an accent when needed to preserve stress.', examples: ['No abras la puerta. — Do not open the door.', 'Dígamelo, por favor. / No me lo diga.'] },
    ],
    exercises: [
      { prompt: 'Choose the affirmative tú command for hacer.', options: ['Haces', 'Haz', 'Haga'], answer: 1, explanation: 'Haz is the irregular affirmative tú command of hacer.' },
      { prompt: 'Complete: “No ___ aquí.” (fumar, tú)', options: ['fumas', 'fuma', 'fumes'], answer: 2, explanation: 'A negative tú command uses the present subjunctive: no fumes.' },
    ],
  },
  {
    id: 'por-para',
    level: 'B2',
    title: 'Por and para',
    summary: 'Distinguish cause, exchange, movement, purpose, destination, and deadlines.',
    sections: [
      { heading: 'Use por for cause, route, exchange, and duration', explanation: 'Por often answers why, through where, in exchange for what, or for how long. It also appears in common expressions and passive-agent phrases.', examples: ['Lo hice por ti. — I did it for your sake.', 'Paseamos por el centro durante una hora. — We walked through downtown for an hour.', 'Pagué diez euros por el libro. — I paid ten euros for the book.'] },
      { heading: 'Use para for destination, purpose, recipient, and deadlines', explanation: 'Para points toward a goal or endpoint. It often answers where to, for whom, for what purpose, or by when.', examples: ['Este tren sale para Sevilla. — This train leaves for Seville.', 'Estudio para aprender. — I study in order to learn.', 'El informe es para mañana. — The report is due tomorrow.'] },
    ],
    exercises: [
      { prompt: 'Complete: “Este regalo es ___ mi hermana.”', options: ['por', 'para', 'de'], answer: 1, explanation: 'Para marks the intended recipient.' },
      { prompt: 'Complete: “Caminamos ___ el parque.”', options: ['para', 'por', 'a'], answer: 1, explanation: 'Por commonly describes movement through or around a place.' },
    ],
  },
  {
    id: 'perfect-tenses',
    level: 'C1',
    title: 'Perfect tenses and the past participle',
    summary: 'Build compound tenses with haber and use the participle consistently.',
    sections: [
      { heading: 'Haber + past participle', explanation: 'Compound tenses use a form of haber plus an invariable past participle. Regular participles end in -ado or -ido. Common irregular forms include hecho, dicho, visto, escrito, puesto, and vuelto.', examples: ['He terminado el informe. — I have finished the report.', 'Cuando llegaste, ya habíamos comido. — When you arrived, we had already eaten.'] },
      { heading: 'Choose the right time frame', explanation: 'The present perfect links a past event to a present frame or result. The pluperfect places an event before another past reference point. Regional preferences for the present perfect vary.', examples: ['Esta semana he leído dos novelas. — I have read two novels this week.', 'Nunca habían visitado la ciudad. — They had never visited the city.'] },
    ],
    exercises: [
      { prompt: 'Complete: “Cuando llamé, ellos ya ___.” (salir)', options: ['han salido', 'habían salido', 'salieron'], answer: 1, explanation: 'The pluperfect habían salido marks an event before another past event.' },
      { prompt: 'Choose the correct participle of escribir.', options: ['escribido', 'escribiendo', 'escrito'], answer: 2, explanation: 'Escrito is the irregular past participle of escribir.' },
    ],
  },
  {
    id: 'past-subjunctive',
    level: 'C1',
    title: 'Past subjunctive and conditional sentences',
    summary: 'Use the imperfect subjunctive in hypothetical, reported, and past-triggered clauses.',
    sections: [
      { heading: 'Form the imperfect subjunctive', explanation: 'Take the third-person plural preterite, remove -ron, then add -ra, -ras, -ra, -ramos, -rais, -ran. The -se series is also correct and often interchangeable.', examples: ['hablaron → hablara; tuvieron → tuviera; fueron → fuera', 'Quería que me ayudaras. — I wanted you to help me.'] },
      { heading: 'Hypothetical si clauses', explanation: 'For an unlikely or unreal present condition, use si + imperfect subjunctive, followed by the conditional. Do not put the present subjunctive immediately after si in this pattern.', examples: ['Si tuviera más tiempo, viajaría. — If I had more time, I would travel.', 'Si lo hubiera sabido, te habría llamado. — If I had known, I would have called.'] },
    ],
    exercises: [
      { prompt: 'Complete: “Si ___ más dinero, compraría una casa.” (tener)', options: ['tengo', 'tuviera', 'tendré'], answer: 1, explanation: 'Unreal present conditions use si + imperfect subjunctive.' },
      { prompt: 'Complete: “La profesora pidió que nosotros ___ el texto.” (leer)', options: ['leemos', 'leyéramos', 'leeremos'], answer: 1, explanation: 'A past request followed by que takes the imperfect subjunctive.' },
    ],
  },
  {
    id: 'relative-clauses',
    level: 'C1',
    title: 'Relative clauses and mood choice',
    summary: 'Use relative pronouns and choose indicative or subjunctive based on how the antecedent is viewed.',
    sections: [
      { heading: 'Connect ideas with relative pronouns', explanation: 'Que is the most common relative pronoun. Quien/quienes generally refer to people and is often used after a preposition. El que, la que, and related forms can clarify or add emphasis.', examples: ['La persona que llamó dejó un mensaje. — The person who called left a message.', 'La autora con quien trabajo vive aquí. — The author I work with lives here.'] },
      { heading: 'Known versus sought or nonexistent', explanation: 'Use the indicative when the antecedent is identified or presented as real. Use the subjunctive when it is unknown, hypothetical, or not known to exist.', examples: ['Tengo un libro que explica el tema. — I have a book that explains it.', 'Busco un libro que explique el tema. — I am looking for a book that explains it.'] },
    ],
    exercises: [
      { prompt: 'Complete: “Necesitamos una sala que ___ más grande.” (ser)', options: ['es', 'sea', 'fue'], answer: 1, explanation: 'The room is sought but not yet identified, so use the subjunctive.' },
      { prompt: 'Complete: “Conozco a alguien que ___ japonés.” (hablar)', options: ['hable', 'habla', 'hablara'], answer: 1, explanation: 'The speaker presents a known person as real, so use the indicative.' },
    ],
  },
  {
    id: 'reported-speech',
    level: 'C2',
    title: 'Reported speech and sequence of tenses',
    summary: 'Report statements and questions while adjusting pronouns, time references, and verb tenses.',
    sections: [
      { heading: 'Report statements', explanation: 'Use decir que or explicar que to report content. When the reporting verb is in the past, Spanish often shifts the original present to the imperfect and the future to the conditional, especially when the reported event is viewed from that past point.', examples: ['«Estoy cansada» → Dijo que estaba cansada. — She said she was tired.', '«Llegaré mañana» → Dijo que llegaría al día siguiente. — She said she would arrive the next day.'] },
      { heading: 'Report questions and commands', explanation: 'Indirect questions use si for yes/no questions or the original question word, but no opening question mark. Reported commands often use pedir/ordenar que + subjunctive.', examples: ['«¿Dónde vive?» → Preguntó dónde vivía. — He asked where she lived.', '«Ven pronto» → Me pidió que fuera pronto. — She asked me to come soon.'] },
    ],
    exercises: [
      { prompt: 'Report «Tengo hambre» after “Dijo que…”', options: ['Dijo que tiene hambre.', 'Dijo que tenía hambre.', 'Dijo que tendrá hambre.'], answer: 1, explanation: 'With a past reporting verb, the present commonly shifts to the imperfect: tenía.' },
      { prompt: 'Choose the correct reported yes/no question.', options: ['Preguntó si teníamos tiempo.', 'Preguntó que teníamos tiempo?', 'Preguntó tenemos tiempo.'], answer: 0, explanation: 'Indirect yes/no questions use si and do not use question marks around the clause.' },
    ],
  },
  {
    id: 'discourse-structure',
    level: 'C2',
    title: 'Advanced clause and discourse structure',
    summary: 'Control connectors, emphasis, and clause relationships for precise formal communication.',
    sections: [
      { heading: 'Choose connectors by logical relationship', explanation: 'Use connectors precisely: aunque can introduce a fact (indicative) or a hypothetical concession (subjunctive); a pesar de que works similarly. Sin embargo marks contrast, mientras que comparison, and por consiguiente a consequence.', examples: ['Aunque llueve, saldré. — Although it is raining, I will go out. (known fact)', 'Aunque llueva, saldré. — Even if it rains, I will go out. (hypothesis)', 'Se retrasó; por consiguiente, perdió la conexión. — It was delayed; consequently, it missed the connection.'] },
      { heading: 'Use emphasis with care', explanation: 'Spanish can front a phrase for focus, but the sentence should still make the relationship clear. Cleft structures such as lo que…, quien…, and donde… identify the emphasized information.', examples: ['Lo que más me preocupa es el plazo. — What concerns me most is the deadline.', 'Fue en esta ciudad donde empezó el proyecto. — It was in this city that the project began.'] },
    ],
    exercises: [
      { prompt: 'The speaker accepts rain as a fact: “Aunque ___, iremos.”', options: ['llueva', 'llueve', 'llovería'], answer: 1, explanation: 'A factual concession takes the indicative: aunque llueve.' },
      { prompt: 'Choose a connector meaning “consequently.”', options: ['sin embargo', 'por consiguiente', 'mientras que'], answer: 1, explanation: 'Por consiguiente introduces a consequence.' },
    ],
  },
  {
    id: 'adjective-agreement',
    level: 'A1',
    title: 'Adjectives and agreement',
    summary: 'Describe people and things by matching adjectives to noun gender and number.',
    sections: [
      { heading: 'Match gender and number', explanation: 'Most -o adjectives change to -a with feminine nouns. Add -s after a vowel or -es after many consonants to form the plural. Adjectives usually follow the noun.', examples: ['un mercado pequeño — a small market', 'una calle pequeña — a small street', 'dos calles pequeñas — two small streets'] },
      { heading: 'Adjectives ending in -e or a consonant', explanation: 'Many adjectives ending in -e or a consonant have one form for masculine and feminine. They still change for number.', examples: ['un barrio interesante — an interesting neighborhood', 'unas clases interesantes — some interesting classes', 'un restaurante fácil — an easy restaurant'] },
    ],
    exercises: [
      { prompt: 'Complete: “Las casas ___ son bonitas.” (blanco)', options: ['blanco', 'blancas', 'blanca'], answer: 1, explanation: 'Casas is feminine plural, so the adjective is blancas.' },
      { prompt: 'Choose the correct phrase for “an interesting book.”', options: ['un libro interesante', 'una libro interesante', 'un libro interesantas'], answer: 0, explanation: 'Libro takes un; interesante has the same singular form for both genders.' },
    ],
  },
  {
    id: 'basic-questions-negation',
    level: 'A1',
    title: 'Ask questions and say no',
    summary: 'Form everyday yes/no and information questions, then make simple negative sentences.',
    sections: [
      { heading: 'Build a question', explanation: 'A yes/no question can use the same word order as a statement with question intonation. Spanish writing uses opening and closing question marks. Question words carry written accents.', examples: ['¿Vives aquí? — Do you live here?', '¿Dónde está el baño? — Where is the bathroom?', '¿Cuánto cuesta? — How much does it cost?'] },
      { heading: 'Place no before the verb', explanation: 'Put no directly before the conjugated verb. In a negative sentence, words such as nadie and nunca commonly appear with no as well.', examples: ['No tengo efectivo. — I do not have cash.', 'No conozco a nadie aquí. — I do not know anyone here.', 'Nunca llegamos tarde. — We never arrive late.'] },
    ],
    exercises: [
      { prompt: 'Choose the correctly written question.', options: ['¿Cuándo sale el tren?', 'Cuándo sale el tren?', '¿Cuándo sale el tren.'], answer: 0, explanation: 'Spanish questions need both opening and closing question marks.' },
      { prompt: 'Complete: “Yo ___ entiendo la pregunta.”', options: ['entiendo no', 'no entiendo', 'nunca no entiendo'], answer: 1, explanation: 'Place no directly before the conjugated verb.' },
    ],
  },
  {
    id: 'present-progressive',
    level: 'A2',
    title: 'Actions in progress',
    summary: 'Use estar plus a gerund to describe an action happening at the moment.',
    sections: [
      { heading: 'Form the gerund', explanation: 'Remove -ar and add -ando, or remove -er/-ir and add -iendo. A few common forms are irregular, including leyendo, durmiendo, and diciendo.', examples: ['hablar → hablando — speaking', 'comer → comiendo — eating', 'vivir → viviendo — living'] },
      { heading: 'Use estar + gerund', explanation: 'Conjugate estar and follow it with the gerund to focus on an action underway now. Spanish often uses the simple present where English uses “am doing,” so use the progressive when the ongoing action itself matters.', examples: ['Estoy leyendo el menú. — I am reading the menu.', 'Los niños están jugando en el patio. — The children are playing in the yard.', '¿Qué estás haciendo? — What are you doing?'] },
    ],
    exercises: [
      { prompt: 'Complete: “Ahora nosotros ___ español.” (estudiar)', options: ['estudiamos', 'estamos estudiando', 'somos estudiando'], answer: 1, explanation: 'Use estar + the -ando gerund for an action currently underway.' },
      { prompt: 'Choose the gerund of dormir.', options: ['dormiendo', 'durmiendo', 'dormando'], answer: 1, explanation: 'Dormir has the irregular gerund durmiendo.' },
    ],
  },
  {
    id: 'comparisons-superlatives',
    level: 'A2',
    title: 'Compare people and places',
    summary: 'Make comparisons of equality, superiority, and the highest degree.',
    sections: [
      { heading: 'Compare two things', explanation: 'Use más/menos + adjective + que for “more/less … than.” Use tan + adjective + como to compare equal qualities. Mejor and peor are common irregular comparison forms.', examples: ['El tren es más rápido que el autobús. — The train is faster than the bus.', 'La plaza es tan tranquila como el parque. — The square is as quiet as the park.', 'Este mapa es mejor que el anterior. — This map is better than the previous one.'] },
      { heading: 'Say “the most” or “the least”', explanation: 'Use el/la/los/las más or menos + adjective + de to identify the highest or lowest degree within a group.', examples: ['Es el barrio más antiguo de la ciudad. — It is the oldest neighborhood in the city.', 'Son las rutas menos concurridas del parque. — They are the least crowded routes in the park.'] },
    ],
    exercises: [
      { prompt: 'Complete: “Este café es ___ caro que el otro.”', options: ['más', 'tan', 'mejor'], answer: 0, explanation: 'Más + adjective + que expresses “more … than.”' },
      { prompt: 'Choose “as comfortable as.”', options: ['más cómodo que', 'tan cómodo como', 'el más cómodo de'], answer: 1, explanation: 'Tan … como expresses equality.' },
    ],
  },
  {
    id: 'object-pronoun-order',
    level: 'B1',
    title: 'Put object pronouns in the right place',
    summary: 'Place direct and indirect object pronouns with conjugated verbs and infinitives.',
    sections: [
      { heading: 'Pronoun order and placement', explanation: 'When both indirect and direct object pronouns occur, the indirect object comes first. Pronouns usually go before a conjugated verb; with an infinitive they may attach to the end. Le/les changes to se before lo/la/los/las.', examples: ['Se lo expliqué. — I explained it to him/her.', 'Voy a comprártelo. — I am going to buy it for you.', 'Te la estoy enviando. — I am sending it to you.'] },
      { heading: 'Keep the referent clear', explanation: 'Context identifies the person referred to by le or se. Add a mí, a ella, or another clarification when the listener may not know who benefits from the action.', examples: ['A Marta se lo envié ayer. — I sent it to Marta yesterday.', 'Les vamos a explicar el cambio. — We are going to explain the change to them.'] },
    ],
    exercises: [
      { prompt: 'Replace “el informe” in “Entregué el informe a Luis.”', options: ['Le lo entregué.', 'Se lo entregué.', 'Lo se entregué.'], answer: 1, explanation: 'Le changes to se before the direct-object pronoun lo.' },
      { prompt: 'Choose a correct placement with an infinitive.', options: ['Te quiero llamar.', 'Quiero te llamar.', 'Quiero llamarte a ti te.'], answer: 0, explanation: 'The pronoun can precede the conjugated verb or attach to the infinitive.' },
    ],
  },
  {
    id: 'past-time-sequencing',
    level: 'B1',
    title: 'Sequence events in a story',
    summary: 'Connect completed actions, background, and the event that interrupted them.',
    sections: [
      { heading: 'Mark the order of events', explanation: 'Use first/then/finally connectors to guide the listener. A completed main event often uses the preterite; an ongoing background action often uses the imperfect.', examples: ['Primero compramos los billetes; después subimos al tren. — First we bought the tickets; then we got on the train.', 'Mientras esperábamos, empezó a llover. — While we were waiting, it began to rain.'] },
      { heading: 'Explain cause and result', explanation: 'Use porque to give a reason, así que to introduce a result, and aunque to introduce a contrast. Make sure the time frame stays clear as the story develops.', examples: ['Perdimos el autobús, así que tomamos un taxi. — We missed the bus, so we took a taxi.', 'Aunque estaba cansada, terminó el recorrido. — Although she was tired, she finished the route.'] },
    ],
    exercises: [
      { prompt: 'Choose the best connector: “___ caminábamos, vimos un zorro.”', options: ['Mientras', 'Por eso', 'Finalmente'], answer: 0, explanation: 'Mientras introduces two actions occurring at the same time.' },
      { prompt: 'Complete the result: “Se hizo tarde, ___ volvimos a casa.”', options: ['aunque', 'así que', 'mientras'], answer: 1, explanation: 'Así que introduces a consequence.' },
    ],
  },
  {
    id: 'passive-and-se-forms',
    level: 'B2',
    title: 'Passive voice and impersonal se',
    summary: 'Choose between a passive construction and an impersonal statement with se.',
    sections: [
      { heading: 'Ser + participle', explanation: 'The passive with ser emphasizes the action or result and agrees with the affected noun. Add por + agent when who performed the action matters.', examples: ['La exposición fue organizada por el museo. — The exhibition was organized by the museum.', 'Los resultados serán publicados mañana. — The results will be published tomorrow.'] },
      { heading: 'Impersonal and passive se', explanation: 'Use se + third-person singular for a general or impersonal action. With a plural patient, the verb agrees in plural in the passive-se construction.', examples: ['Se vive bien en esta zona. — People live well in this area.', 'Se venden entradas en la taquilla. — Tickets are sold at the box office.', 'Se busca una solución. — A solution is being sought.'] },
    ],
    exercises: [
      { prompt: 'Complete: “En esta tienda ___ productos locales.”', options: ['se vende', 'se venden', 'es vendido'], answer: 1, explanation: 'The verb agrees with plural productos in the passive-se construction.' },
      { prompt: 'Which sentence names the agent with a passive construction?', options: ['El premio fue entregado por la directora.', 'Se entregan premios.', 'La directora entrega premios.'], answer: 0, explanation: 'Ser + participle + por names the agent.' },
    ],
  },
  {
    id: 'conditional-connectors',
    level: 'B2',
    title: 'Build complex sentences with connectors',
    summary: 'Express contrast, concession, consequence, and conditions precisely.',
    sections: [
      { heading: 'Concession and contrast', explanation: 'Aunque introduces a concession. Use the indicative when the information is presented as known; use the subjunctive for a hypothetical or not-yet-confirmed concession. Sin embargo connects contrasting statements.', examples: ['Aunque el plan es costoso, ya está aprobado. — Although the plan is expensive, it is already approved.', 'Aunque sea costoso, vale la pena estudiarlo. — Even if it is expensive, it is worth studying.', 'El plan es costoso; sin embargo, ya está aprobado. — The plan is expensive; however, it is already approved.'] },
      { heading: 'Conditions and consequences', explanation: 'Use si + present for open conditions. Use si + imperfect subjunctive + conditional for hypothetical situations. Por tanto and por consiguiente make a formal consequence explicit.', examples: ['Si tenemos tiempo, visitaremos el archivo. — If we have time, we will visit the archive.', 'Si tuviéramos tiempo, visitaríamos el archivo. — If we had time, we would visit the archive.'] },
    ],
    exercises: [
      { prompt: 'The cost is a hypothetical possibility: “Aunque ___ caro, lo consideraríamos.”', options: ['es', 'sea', 'fue'], answer: 1, explanation: 'A hypothetical concession commonly uses the subjunctive.' },
      { prompt: 'Complete the hypothetical: “Si hubiera más fondos, el equipo ___ el estudio.”', options: ['amplía', 'ampliaría', 'amplió'], answer: 1, explanation: 'Pair the imperfect subjunctive condition with the conditional result.' },
    ],
  },
  {
    id: 'future-perfect-probability',
    level: 'C1',
    title: 'Future perfect and probability',
    summary: 'Use compound future forms for completed future events and conjectures about the present or past.',
    sections: [
      { heading: 'Form the future perfect', explanation: 'Combine the future of haber (habré, habrás, habrá, habremos, habréis, habrán) with an invariable past participle. It places an action before a future reference point.', examples: ['Para junio habremos terminado el proyecto. — By June we will have finished the project.', 'Cuando llegues, ya habrán cerrado. — When you arrive, they will already have closed.'] },
      { heading: 'Express conjecture', explanation: 'The future can express probability about the present; the future perfect can make a guess about a completed past event. Context distinguishes prediction from conjecture.', examples: ['Estará en una reunión. — She is probably in a meeting.', 'No contestó; habrá salido. — He did not answer; he has probably gone out.'] },
    ],
    exercises: [
      { prompt: 'Complete: “A finales de año ya ___ el edificio.” (terminar, nosotros)', options: ['terminamos', 'habremos terminado', 'habríamos terminado'], answer: 1, explanation: 'The future perfect describes completion by a future deadline.' },
      { prompt: 'A colleague is not answering; make a conjecture about a completed action.', options: ['Habrá salido.', 'Saldrá mañana.', 'Salía temprano.'], answer: 0, explanation: 'The future perfect can express a conjecture about the past.' },
    ],
  },
  {
    id: 'subjunctive-concession',
    level: 'C1',
    title: 'Concessive clauses and stance',
    summary: 'Use concessive clauses to acknowledge information while maintaining a nuanced position.',
    sections: [
      { heading: 'Choose mood by how you present the information', explanation: 'Although + indicative presents a fact the speaker accepts. Aunque + subjunctive treats the detail as hypothetical, unknown, or less central. Even with known facts, the subjunctive can frame the concession as secondary to the main point.', examples: ['Aunque los datos son limitados, el patrón es claro. — Although the data are limited, the pattern is clear.', 'Aunque los datos sean limitados, conviene analizarlos. — Even if the data are limited, it is worth analyzing them.', 'Por mucho que insista, no cambiará el resultado. — No matter how much he insists, the result will not change.'] },
      { heading: 'Balance concession and main claim', explanation: 'The main clause carries the author’s central stance. Concessive clauses acknowledge a counterpoint without necessarily accepting its conclusion.', examples: ['Si bien el coste inicial es alto, el ahorro posterior compensa. — While the initial cost is high, the later savings offset it.', 'Aun cuando existan dudas, habrá que decidir. — Even if doubts remain, a decision will have to be made.'] },
    ],
    exercises: [
      { prompt: 'The speaker does not know whether the report is complete: “Aunque ___ completo, faltan datos.”', options: ['es', 'sea', 'fue'], answer: 1, explanation: 'An uncertain or hypothetical concession uses the subjunctive.' },
      { prompt: 'Choose a connector closest to “while / although” in formal argument.', options: ['si bien', 'por eso', 'a fin de que'], answer: 0, explanation: 'Si bien introduces a concessive point.' },
    ],
  },
  {
    id: 'focus-and-cleft-structures',
    level: 'C2',
    title: 'Focus, clefting, and information structure',
    summary: 'Use marked word order and cleft constructions to control contrast and emphasis.',
    sections: [
      { heading: 'Cleft constructions', explanation: 'Clefts such as fue…quien, es…lo que, and es…donde isolate the information in focus. They help correct an assumption or highlight one part of a complex message.', examples: ['Fue la directora quien propuso el cambio. — It was the director who proposed the change.', 'Es en la segunda fase donde surge el problema. — It is in the second phase that the problem arises.', 'Lo que necesitamos es más tiempo. — What we need is more time.'] },
      { heading: 'Fronting and contrast', explanation: 'A fronted phrase can establish a topic or contrast it with alternatives. Pronouns may be retained for contrast even when the verb already identifies the subject.', examples: ['Ese informe, todavía no lo he revisado. — That report, I have not reviewed it yet.', 'A Marta sí la invitaron; a Diego, en cambio, no. — Marta was invited; Diego, by contrast, was not.'] },
    ],
    exercises: [
      { prompt: 'Emphasize that the committee, not another group, made the decision.', options: ['Fue el comité quien tomó la decisión.', 'El comité tomó la decisión ayer.', 'La decisión fue importante.'], answer: 0, explanation: 'Fue…quien identifies the focused agent.' },
      { prompt: 'Choose the natural fronted-topic construction.', options: ['Ese asunto, ya lo resolveremos mañana.', 'Ese asunto, ya resolveremos lo mañana.', 'Ese asunto ya mañana lo resolver.'], answer: 0, explanation: 'A fronted topic can be resumed by an object pronoun before the verb.' },
    ],
  },
  {
    id: 'idiomatic-register-choices',
    level: 'C2',
    title: 'Idiomatic choices and register',
    summary: 'Select idiomatic constructions that suit context, emphasis, and degree of formality.',
    sections: [
      { heading: 'Choose natural collocations', explanation: 'Fluent expression depends on conventional word partnerships, not just grammatical possibility. Learn verbs together with typical nouns and prepositions, and notice regional variation.', examples: ['plantear una duda — to raise a concern', 'sacar una conclusión — to draw a conclusion', 'asumir una responsabilidad — to take on a responsibility'] },
      { heading: 'Calibrate directness and formality', explanation: 'Conditional questions can soften requests, while direct imperatives may be appropriate when roles and context make the instruction clear. A softer phrase should not hide a deadline or responsibility.', examples: ['¿Podrías enviarlo hoy? — Could you send it today? (polite request)', 'Te agradecería que lo enviaras hoy. — I would appreciate your sending it today.', 'Envíalo antes de las cinco, por favor. — Send it before five, please.'] },
    ],
    exercises: [
      { prompt: 'Choose the natural collocation for “draw a conclusion.”', options: ['sacar una conclusión', 'hacer una conclusión', 'tomar una conclusión'], answer: 0, explanation: 'Sacar una conclusión is the conventional Spanish collocation.' },
      { prompt: 'Choose a polite but clear request with a deadline.', options: ['¿Podrías enviarlo antes de las cinco?', 'Quizá algún día se podría enviar.', 'Envíalo cuando sea.'], answer: 0, explanation: 'The conditional softens the request while preserving the deadline.' },
    ],
  },
]
