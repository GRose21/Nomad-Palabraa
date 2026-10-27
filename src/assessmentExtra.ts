import type { AssessmentQuestion } from './assessment'

// Each extra block holds three questions per CEFR level (A1 → C2), matching the core bank layout.
export const spanishExtraAssessmentQuestions: AssessmentQuestion[] = [
  { prompt: 'What does “Buenos días” mean?', answers: ['Good morning', 'Good night', 'Goodbye', 'Thank you'], correctIndex: 0 },
  { prompt: 'Which word means “water”?', answers: ['Agua', 'Aire', 'Árbol', 'Arroz'], correctIndex: 0 },
  { prompt: 'What does “Tengo hambre” mean?', answers: ['I am hungry', 'I am tired', 'I am cold', 'I am late'], correctIndex: 0 },
  { prompt: 'Which sentence means “We are going to the beach tomorrow”?', answers: ['Mañana vamos a la playa', 'Ayer fuimos a la playa', 'Mañana fue la playa', 'Vamos de la playa ayer'], correctIndex: 0 },
  { prompt: 'What does “¿Cuánto cuesta esta camisa?” mean?', answers: ['How much does this shirt cost?', 'Where is this shirt?', 'Do you like this shirt?', 'When did you buy this shirt?'], correctIndex: 0 },
  { prompt: 'Complete: “Mi hermana ___ en un banco.” (works)', answers: ['trabaja', 'trabajo', 'trabajas', 'trabajan'], correctIndex: 0 },
  { prompt: 'Which sentence describes a habit in the past?', answers: ['Cuando era niño, jugaba al fútbol cada tarde', 'Ayer jugué al fútbol', 'Jugaré al fútbol mañana', 'Juego al fútbol ahora'], correctIndex: 0 },
  { prompt: 'What does “Me gustaría reservar una mesa para cuatro” mean?', answers: ['I would like to reserve a table for four', 'I reserved four tables', 'The table was for four yesterday', 'I am cooking for four'], correctIndex: 0 },
  { prompt: 'Complete: “Si tengo tiempo, ___ al cine.” (I will go)', answers: ['iré', 'fui', 'iba', 'habría ido'], correctIndex: 0 },
  { prompt: 'Which sentence is a correct passive construction?', answers: ['La ley fue aprobada por el parlamento', 'El parlamento aprobada la ley', 'La ley aprobó el parlamento por', 'Aprobado fue parlamento'], correctIndex: 0 },
  { prompt: 'Complete: “Es importante que tú ___ puntual.”', answers: ['seas', 'eres', 'serás', 'fuiste'], correctIndex: 0 },
  { prompt: 'What does “a pesar de que” introduce?', answers: ['A concession (“even though”)', 'A purpose (“in order to”)', 'A time (“as soon as”)', 'A condition (“unless”)'], correctIndex: 0 },
  { prompt: 'Choose the correct hypothetical about the past.', answers: ['Si hubiera estudiado más, habría aprobado', 'Si estudiaba más, aprobaré', 'Si estudié más, habría aprobar', 'Si estudiaría más, aprobé'], correctIndex: 0 },
  { prompt: 'Which phrase best means “to take into account”?', answers: ['tener en cuenta', 'tener ganas', 'tener lugar', 'tener razón'], correctIndex: 0 },
  { prompt: 'Which connector signals contrast in formal writing?', answers: ['No obstante', 'Por consiguiente', 'Asimismo', 'Debido a'], correctIndex: 0 },
  { prompt: 'Which sentence most precisely says “The proposal is, at best, unrealistic”?', answers: ['La propuesta es, en el mejor de los casos, poco realista', 'La propuesta es mejor que realista', 'La propuesta realista es mejor', 'En la propuesta mejor casos'], correctIndex: 0 },
  { prompt: 'Choose the idiom meaning “to beat around the bush.”', answers: ['andarse por las ramas', 'tirar la toalla', 'meter la pata', 'estar en las nubes'], correctIndex: 0 },
  { prompt: 'Which sentence correctly uses “por mucho que”?', answers: ['Por mucho que insistas, no cambiaré de opinión', 'Por mucho que insistes, no cambié de opinión', 'Por mucho insistir que, no cambio', 'Por mucho que insistirás, no cambiaría'], correctIndex: 0 },
]

export const italianExtraAssessmentQuestions: AssessmentQuestion[] = [
  { prompt: 'What does “Buongiorno” mean?', answers: ['Good morning', 'Good night', 'Goodbye', 'Thank you'], correctIndex: 0 },
  { prompt: 'Which word means “water”?', answers: ['l’acqua', 'il pane', 'la casa', 'il latte'], correctIndex: 0 },
  { prompt: 'What does “Ho fame” mean?', answers: ['I am hungry', 'I am tired', 'I am cold', 'I am late'], correctIndex: 0 },
  { prompt: 'Which sentence means “Tomorrow we are going to the sea”?', answers: ['Domani andiamo al mare', 'Ieri siamo andati al mare', 'Domani il mare va', 'Andiamo mare ieri'], correctIndex: 0 },
  { prompt: 'What does “Quanto costa questa camicia?” mean?', answers: ['How much does this shirt cost?', 'Where is this shirt?', 'Do you like this shirt?', 'When did you buy this shirt?'], correctIndex: 0 },
  { prompt: 'Complete: “Mia sorella ___ in banca.” (works)', answers: ['lavora', 'lavoro', 'lavori', 'lavorano'], correctIndex: 0 },
  { prompt: 'Which sentence describes a habit in the past?', answers: ['Da bambino giocavo a calcio ogni pomeriggio', 'Ieri ho giocato a calcio', 'Giocherò a calcio domani', 'Gioco a calcio adesso'], correctIndex: 0 },
  { prompt: 'What does “Vorrei prenotare un tavolo per quattro” mean?', answers: ['I would like to reserve a table for four', 'I reserved four tables', 'The table was for four yesterday', 'I am cooking for four'], correctIndex: 0 },
  { prompt: 'Complete: “Se ho tempo, ___ al cinema.” (I will go)', answers: ['andrò', 'sono andato', 'andavo', 'sarei andato'], correctIndex: 0 },
  { prompt: 'Which sentence is a correct passive construction?', answers: ['La legge è stata approvata dal parlamento', 'Il parlamento approvata la legge', 'La legge approvò il parlamento da', 'Approvato era parlamento'], correctIndex: 0 },
  { prompt: 'Complete: “È importante che tu ___ puntuale.”', answers: ['sia', 'sei', 'sarai', 'fosti'], correctIndex: 0 },
  { prompt: 'What does “nonostante” introduce?', answers: ['A concession (“despite”)', 'A purpose (“in order to”)', 'A time (“as soon as”)', 'A condition (“unless”)'], correctIndex: 0 },
  { prompt: 'Choose the correct hypothetical about the past.', answers: ['Se avessi studiato di più, avrei superato l’esame', 'Se studiavo di più, supererò', 'Se studiai di più, avrei superare', 'Se studierei di più, superai'], correctIndex: 0 },
  { prompt: 'Which phrase best means “to take into account”?', answers: ['tenere conto di', 'avere voglia di', 'aver luogo', 'avere ragione'], correctIndex: 0 },
  { prompt: 'Which connector signals contrast in formal writing?', answers: ['Tuttavia', 'Pertanto', 'Inoltre', 'A causa di'], correctIndex: 0 },
  { prompt: 'Which sentence most precisely says “The proposal is, at best, unrealistic”?', answers: ['La proposta è, nella migliore delle ipotesi, poco realistica', 'La proposta è migliore che realistica', 'La proposta realistica è migliore', 'Nella proposta migliori ipotesi'], correctIndex: 0 },
  { prompt: 'Choose the idiom meaning “to beat around the bush.”', answers: ['menare il can per l’aia', 'prendere due piccioni con una fava', 'avere le mani in pasta', 'dormire sugli allori'], correctIndex: 0 },
  { prompt: 'Which sentence correctly uses “per quanto”?', answers: ['Per quanto insista, non cambierò idea', 'Per quanto insiste, non cambiai idea', 'Per quanto insistere, non cambio', 'Per quanto insisterà, non cambierei'], correctIndex: 0 },
]
