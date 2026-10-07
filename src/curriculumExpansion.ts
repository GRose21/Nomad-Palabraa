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

const expandedArticles: Record<ExpansionLanguage, Record<GrammarLevel, string>> = {
  Spanish: {
    A1: 'En el barrio, las personas tienen rutinas sencillas. Por la mañana, una vecina abre la tienda y un estudiante camina a la escuela. Cerca hay una plaza con árboles y bancos. Los vecinos saludan, compran comida y hablan un poco antes de volver a casa.\n\nAl final del día, algunas familias pasean por la plaza. Los niños juegan y los adultos descansan. Un lugar cercano puede ser importante porque ayuda a las personas a encontrarse.',
    A2: 'En muchas ciudades, una biblioteca pequeña ofrece más que libros. Por la mañana, algunas personas leen el periódico o estudian para un examen. Por la tarde, los niños hacen sus deberes y las familias participan en actividades gratuitas. El personal también ayuda a los visitantes a encontrar información y a usar los ordenadores.\n\nSin embargo, no todos pueden llegar fácilmente. Algunas personas viven lejos y otras trabajan durante el horario de apertura. Por eso, el ayuntamiento estudia ampliar las horas y ofrecer actividades en distintos barrios. Antes de cambiar el servicio, quiere preguntar a los vecinos qué necesitan.',
    B1: 'Un grupo de vecinos propuso mejorar la plaza situada junto al mercado. En las reuniones, unas personas pidieron más sombra y bancos, mientras que otras señalaron que las aceras estrechas dificultan el paso. El ayuntamiento reunió estas propuestas y encargó un diseño que mantiene libre el acceso a las tiendas y añade árboles donde no bloquean la circulación.\n\nLa primera fase será temporal. Durante tres meses, el municipio medirá el uso de la plaza y hablará con comerciantes, residentes y visitantes. Si los cambios funcionan, algunos elementos permanecerán; si crean nuevos problemas, el diseño podrá ajustarse. La prueba no resolverá todas las necesidades del barrio, pero permitirá comparar observaciones reales con las expectativas iniciales.',
    B2: 'La propuesta de ampliar el transporte público se presenta como una respuesta al tráfico y a los largos desplazamientos. Aumentar la frecuencia puede reducir las esperas, aunque el beneficio dependerá de que los autobuses conecten con los trenes y lleguen a los barrios con menos servicios. La frecuencia, por sí sola, no garantiza que una persona pueda completar su trayecto.\n\nEl coste plantea otra dificultad. Comprar vehículos y contratar conductores requiere financiación estable, y las obras pueden alterar temporalmente las rutas existentes. Para evaluar el plan, el ayuntamiento debería publicar los criterios de decisión, comparar los resultados entre zonas y consultar a quienes dependen del servicio. Un programa piloto permitiría detectar consecuencias imprevistas antes de extender el cambio.',
    C1: 'El informe municipal relaciona una mayor frecuencia de autobuses con una reducción del tiempo medio de espera. No obstante, sus conclusiones requieren cautela: el estudio cubre pocas semanas, compara barrios con características distintas y no distingue todos los factores que afectan a la puntualidad. Una asociación observada en ese periodo no demuestra que el cambio sea la causa única de la diferencia.\n\nTambién importa qué se mide. Un promedio puede mejorar mientras algunos usuarios esperan más, especialmente en rutas periféricas o durante la noche. Los autores recomiendan ampliar la observación y desglosar los datos por ruta, horario y tipo de conexión. Una evaluación más completa debería combinar esas cifras con entrevistas, explicar qué limitaciones persisten y precisar a qué contextos pueden aplicarse los resultados.',
    C2: 'La comisión no rechazó la reforma; cuestionó que el diseño presentado permitiera cumplir sus objetivos sin trasladar los costes a otros grupos. Los primeros indicadores muestran una mejora en la velocidad media, pero esa cifra no refleja por sí sola la regularidad de las conexiones ni las diferencias entre el centro y la periferia. Además, parte de la mejora coincide con cambios de horario que ya estaban previstos.\n\nPor ello, el resultado admite más de una lectura. Puede indicar que la inversión produjo un beneficio real, aunque también que las condiciones de medición favorecieron ciertas rutas. La comisión solicita datos comparables durante un periodo más largo y una explicación de los efectos sobre trabajadores y usuarios con horarios menos flexibles. Hasta entonces, la conclusión más defendible es limitada: algunos trayectos mejoraron, pero no está demostrado que el sistema, en conjunto, sea más equitativo o sostenible.\n\nLa decisión final dependerá, por tanto, de qué resultados se consideren prioritarios y de cómo se distribuyan los beneficios. Publicar datos desglosados permitiría comprobar si las mejoras llegan también a los barrios menos atendidos. Sin esa comparación, una cifra global puede parecer concluyente y, a la vez, ocultar diferencias importantes. Una evaluación rigurosa debe explicar qué se sabe, qué permanece incierto y qué evidencia podría modificar la recomendación.',
  },
  Italian: {
    A1: 'Nel quartiere, le persone hanno abitudini semplici. Al mattino una vicina apre il negozio e uno studente cammina fino alla scuola. Vicino c’è una piazza con alberi e panchine. I vicini si salutano, comprano da mangiare e parlano un po’ prima di tornare a casa.\n\nAlla fine della giornata, alcune famiglie passeggiano nella piazza. I bambini giocano e gli adulti si riposano. Un luogo vicino può essere importante perché aiuta le persone a incontrarsi.',
    A2: 'In molte città, una piccola biblioteca offre più dei libri. Al mattino, alcune persone leggono il giornale o studiano per un esame. Nel pomeriggio, i bambini fanno i compiti e le famiglie partecipano ad attività gratuite. Il personale aiuta anche i visitatori a trovare informazioni e a usare i computer.\n\nNon tutti, però, possono arrivare facilmente. Alcune persone abitano lontano e altre lavorano durante gli orari di apertura. Per questo il comune valuta di prolungare l’orario e proporre attività in diversi quartieri. Prima di cambiare il servizio, vuole chiedere ai residenti di che cosa hanno bisogno.',
    B1: 'Un gruppo di residenti ha proposto di migliorare la piazza vicino al mercato. Durante gli incontri, alcuni hanno chiesto più ombra e panchine, mentre altri hanno osservato che i marciapiedi stretti rendono difficile passare. Il comune ha raccolto le proposte e ha commissionato un progetto che lascia libero l’accesso ai negozi e aggiunge alberi senza bloccare il passaggio.\n\nLa prima fase sarà temporanea. Per tre mesi, il comune osserverà l’uso della piazza e parlerà con commercianti, residenti e visitatori. Se le modifiche funzioneranno, alcuni elementi resteranno; se creeranno nuovi problemi, il progetto potrà essere rivisto. La prova non risolverà ogni necessità del quartiere, ma permetterà di confrontare le osservazioni con le aspettative iniziali.',
    B2: 'La proposta di potenziare il trasporto pubblico viene presentata come una risposta al traffico e ai lunghi spostamenti. Aumentare la frequenza può ridurre le attese, ma il vantaggio dipenderà dai collegamenti con i treni e dal servizio nei quartieri meno serviti. Una maggiore frequenza, da sola, non garantisce che una persona possa completare il proprio tragitto.\n\nAnche i costi rappresentano una difficoltà. Acquistare veicoli e assumere conducenti richiede finanziamenti stabili, mentre i lavori possono modificare temporaneamente i percorsi esistenti. Per valutare il piano, il comune dovrebbe rendere pubblici i criteri, confrontare i risultati tra le zone e consultare chi dipende dal servizio. Un progetto pilota aiuterebbe a individuare conseguenze impreviste prima di estendere il cambiamento.',
    C1: 'Il rapporto comunale collega una maggiore frequenza degli autobus alla riduzione dell’attesa media. Le conclusioni richiedono tuttavia cautela: lo studio copre poche settimane, confronta quartieri con caratteristiche diverse e non distingue tutti i fattori che influenzano la puntualità. Un’associazione osservata in quel periodo non dimostra che la modifica sia l’unica causa della differenza.\n\nÈ importante anche che cosa viene misurato. Una media può migliorare mentre alcuni utenti aspettano più a lungo, soprattutto sulle linee periferiche o di sera. Gli autori raccomandano di prolungare l’osservazione e suddividere i dati per linea, orario e tipo di collegamento. Una valutazione più completa dovrebbe affiancare ai numeri le interviste, spiegare quali limiti restano e precisare a quali contesti si possono applicare i risultati.',
    C2: 'La commissione non ha respinto la riforma; ha messo in dubbio che il progetto presentato consenta di raggiungerne gli obiettivi senza trasferire i costi su altri gruppi. I primi indicatori mostrano un aumento della velocità media, ma quel dato non rappresenta da solo la regolarità dei collegamenti né le differenze tra centro e periferia. Inoltre, parte del miglioramento coincide con variazioni d’orario già previste.\n\nIl risultato ammette quindi più interpretazioni. Potrebbe indicare un beneficio reale dell’investimento, ma anche riflettere condizioni di misurazione favorevoli ad alcune linee. La commissione chiede dati comparabili su un periodo più lungo e un’analisi degli effetti su lavoratori e utenti con orari meno flessibili. Fino ad allora, la conclusione più difendibile resta circoscritta: alcuni tragitti sono migliorati, ma non è dimostrato che il sistema, nel complesso, sia più equo o sostenibile.\n\nLa decisione finale dipenderà quindi dai risultati considerati prioritari e dalla distribuzione dei benefici. Pubblicare dati distinti per quartiere e fascia oraria permetterebbe di verificare se i miglioramenti raggiungono anche le zone meno servite. Senza questo confronto, una media complessiva può sembrare definitiva e allo stesso tempo nascondere differenze rilevanti. Una valutazione rigorosa deve chiarire che cosa è noto, che cosa resta incerto e quali prove potrebbero cambiare la raccomandazione.',
  },
}

export function getExpandedReadingArticle(language: ExpansionLanguage, level: GrammarLevel) {
  return expandedArticles[language][level]
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
      passage: `${seed.passage}\n\n${levelFrames[language][seed.level]}\n\n${expandedArticles[language][seed.level]}`,
      questions: [
        {
          prompt: `Key detail · ${seed.question.prompt}`,
          options: rotate(answers, answerIndex),
          answer: (3 - answerIndex) % 3,
        },
        {
          prompt: language === 'Spanish' ? 'Main idea · ¿Qué idea resume mejor el texto?' : 'Main idea · Quale idea riassume meglio il testo?',
          options: rotate(mainIdeaAnswers, (answerIndex + 1) % 3),
          answer: (2 - answerIndex) % 3,
        },
        {
          prompt: language === 'Spanish' ? 'Author’s purpose · ¿Cuál es el propósito principal del texto?' : 'Author’s purpose · Qual è lo scopo principale del testo?',
          options: [
            language === 'Spanish' ? `Explicar ${seed.objective} con detalles y contexto.` : `Spiegare ${seed.objective} con dettagli e contesto.`,
            language === 'Spanish' ? 'Enumerar hechos sin relación entre sí.' : 'Elencare fatti senza relazione tra loro.',
            language === 'Spanish' ? 'Defender una conclusión que el texto no presenta.' : 'Difendere una conclusione che il testo non presenta.',
          ],
          answer: 0,
        },
        {
          prompt: language === 'Spanish' ? 'Inference · ¿Qué afirmación NO está respaldada por el texto?' : 'Inference · Quale affermazione NON è sostenuta dal testo?',
          options: [seed.question.distractors[0], seed.question.correct, seed.mainIdea.correct],
          answer: 0,
        },
      ],
      speakingPrompt,
      listeningPrompt,
    }
  })
}
