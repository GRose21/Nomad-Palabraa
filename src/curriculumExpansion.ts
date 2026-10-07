import type { GrammarLevel } from './grammar'
import type { SupplementalLesson, CourseVocabulary } from './learnCourse'

export type ExpansionSeed = {
  level: GrammarLevel
  title: string
  objective: string
  vocabulary: CourseVocabulary[]
  passage: string
  question: { prompt: string; correct: string; distractors: [string, string] }
  mainIdea: { correct: string; distractors: [string, string] }
}

export type ExpansionLanguage = 'Spanish' | 'Italian'

const lessonMinutes: Record<GrammarLevel, number> = {
  A1: 12,
  A2: 16,
  B1: 20,
  B2: 24,
  C1: 28,
  C2: 32,
}

const levelFrames: Record<ExpansionLanguage, Record<GrammarLevel, string>> = {
  Spanish: {
    A1: 'Lee cada frase en voz alta. Reconoce las palabras nuevas y relaciona cada acción con una persona, un objeto y un lugar. Al terminar, cuenta la idea principal con una oración sencilla.',
    A2: 'Después, identifica cuándo ocurre cada acción y qué información ayuda a entenderla. Compara los detalles con el objetivo de la lectura y explica una decisión usando conectores sencillos. Repite el texto y resume lo ocurrido en tus propias palabras.',
    B1: 'Ahora distingue los hechos principales de los detalles que los explican. Observa cómo el orden temporal, las causas y las consecuencias organizan el relato. Formula una conclusión apoyada en el texto y señala qué información necesitarías para comprender mejor la situación.',
    B2: 'Examina la relación entre la afirmación central y los ejemplos que la desarrollan. Considera quién se beneficia, qué dificultad permanece y qué alternativa sería viable. Una lectura crítica no consiste en aceptar cada opinión: requiere separar la evidencia disponible de las suposiciones y valorar ambas antes de proponer una respuesta razonada.',
    C1: 'Interpreta también las condiciones y limitaciones que el texto deja implícitas. Pregúntate qué perspectiva está representada, qué voces no aparecen y cómo cambiaría la conclusión con otros datos. Contrasta la propuesta con sus posibles efectos secundarios; después, sintetiza la postura con precisión, preservando las reservas que modifican su alcance.',
    C2: 'Por último, evalúa no solo lo que se afirma, sino la manera en que se delimita la afirmación. Distingue una concesión de una refutación, una correlación de una explicación causal y una incertidumbre genuina de una estrategia retórica. Expón una interpretación alternativa, identifica qué indicios la respaldan y decide cuál explica mejor el conjunto sin borrar sus ambigüedades. Al sintetizar, conserva las condiciones, excepciones y cambios de perspectiva: simplificar demasiado puede invertir el argumento. Defiende tu lectura con evidencias concretas y reconoce qué información adicional podría obligarte a revisarla.',
  },
  Italian: {
    A1: 'Leggi ogni frase ad alta voce. Riconosci le parole nuove e collega ogni azione a una persona, a un oggetto e a un luogo. Alla fine, racconta l’idea principale con una frase semplice.',
    A2: 'Poi individua quando avviene ogni azione e quali informazioni aiutano a capirla. Confronta i dettagli con lo scopo della lettura e spiega una scelta usando connettivi semplici. Rileggi il testo e riassumi gli eventi con parole tue.',
    B1: 'Ora distingui i fatti principali dai dettagli che li spiegano. Osserva come l’ordine temporale, le cause e le conseguenze organizzano il racconto. Formula una conclusione sostenuta dal testo e indica quali informazioni ti servirebbero per capire meglio la situazione.',
    B2: 'Esamina il rapporto tra l’affermazione centrale e gli esempi che la sviluppano. Considera chi ne trae beneficio, quale difficoltà rimane e quale alternativa sarebbe realizzabile. Una lettura critica non significa accettare ogni opinione: richiede di separare le prove disponibili dalle supposizioni e valutarle prima di proporre una risposta ragionata.',
    C1: 'Interpreta anche le condizioni e i limiti che il testo lascia impliciti. Chiediti quale prospettiva è rappresentata, quali voci mancano e come cambierebbe la conclusione con dati diversi. Confronta la proposta con i suoi possibili effetti secondari; poi sintetizza la posizione con precisione, mantenendo le riserve che ne modificano la portata.',
    C2: 'Infine, valuta non solo ciò che viene affermato, ma il modo in cui l’affermazione viene delimitata. Distingui una concessione da una confutazione, una correlazione da una spiegazione causale e una vera incertezza da una strategia retorica. Esponi un’interpretazione alternativa, individua gli indizi che la sostengono e decidi quale spiega meglio l’insieme senza cancellarne le ambiguità. Nella sintesi, conserva condizioni, eccezioni e cambi di prospettiva: semplificare troppo può capovolgere l’argomento. Difendi la tua lettura con prove concrete e riconosci quali informazioni aggiuntive potrebbero costringerti a rivederla.',
  },
}

export function buildExpandedLessons(
  language: ExpansionLanguage,
  seeds: ExpansionSeed[],
  grammarLessons: Array<{ id: string; level: GrammarLevel }>,
): SupplementalLesson[] {
  const lessonIndexByLevel = new Map<GrammarLevel, number>()

  return seeds.map((seed) => {
    const index = lessonIndexByLevel.get(seed.level) ?? 0
    lessonIndexByLevel.set(seed.level, index + 1)
    const grammarLesson = grammarLessons.find((lesson) => lesson.level === seed.level)
    if (!grammarLesson) {
      throw new Error(`Cannot build ${language} ${seed.level} lesson without a matching grammar lesson.`)
    }
    const answerIndex = index % 3
    const answers = [seed.question.correct, ...seed.question.distractors]
    const mainIdeaAnswers = [seed.mainIdea.correct, ...seed.mainIdea.distractors]
    const rotate = <T,>(items: T[], offset: number) => [...items.slice(offset), ...items.slice(0, offset)]
    const duration = lessonMinutes[seed.level]
    const languagePrefix = language === 'Spanish' ? 'Lee, escucha y practica' : 'Leggi, ascolta e fai pratica'
    const speakingPrompt = language === 'Spanish'
      ? `Resume “${seed.title}” en ${language} y explica qué detalle apoya mejor la idea principal.`
      : `Riassumi “${seed.title}” in ${language} e spiega quale dettaglio sostiene meglio l’idea principale.`
    const listeningPrompt = language === 'Spanish'
      ? 'Escucha el texto e identifica la idea principal, los detalles que la apoyan y una condición importante.'
      : 'Ascolta il testo e individua l’idea principale, i dettagli che la sostengono e una condizione importante.'

    return {
      id: `${language.toLocaleLowerCase()}-expanded-${seed.level.toLocaleLowerCase()}-${String(index + 1).padStart(2, '0')}`,
      level: seed.level,
      title: seed.title,
      detail: `${languagePrefix}: ${seed.objective}`,
      minutes: `${duration} min`,
      objective: seed.objective,
      vocabulary: seed.vocabulary,
      grammarLessonId: grammarLesson.id,
      grammarNote: language === 'Spanish'
        ? 'Observa cómo las formas verbales y los conectores expresan el orden, la causa y los matices del texto.'
        : 'Osserva come le forme verbali e i connettivi esprimono ordine, causa e sfumature del testo.',
      label: `${language === 'Spanish' ? 'LECTURA' : 'LETTURA'} · ${seed.level} · ${seed.title.toLocaleUpperCase()}`,
      passage: `${seed.passage} ${levelFrames[language][seed.level]}`,
      questions: [
        {
          prompt: seed.question.prompt,
          options: rotate(answers, answerIndex),
          answer: (3 - answerIndex) % 3,
        },
        {
          prompt: language === 'Spanish' ? '¿Qué idea resume mejor el texto?' : 'Quale idea riassume meglio il testo?',
          options: rotate(mainIdeaAnswers, (answerIndex + 1) % 3),
          answer: (2 - answerIndex) % 3,
        },
      ],
      speakingPrompt,
      listeningPrompt,
    }
  })
}
