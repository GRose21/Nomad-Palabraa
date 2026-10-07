import type { Resource } from './resourceCatalog'

type VideoSeed = {
  level: string
  title: string
  topic: string
  passage: string
  question: string
  correct: string
  distractors: [string, string]
  summary: string
}

function makeLevelVideos(language: 'Spanish' | 'Italian', seeds: VideoSeed[]): Resource[] {
  return seeds.map((seed) => {
    const topic = `${language} ${seed.level} ${seed.topic} listening practice`
    const answerIndex = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(seed.level) % 3
    const answers = [seed.correct, ...seed.distractors]
    const rotate = <T,>(items: T[], offset: number) => [...items.slice(offset), ...items.slice(0, offset)]

    return {
      type: 'video',
      title: `${seed.level} video: ${seed.title}`,
      description: `Find level-matched ${language} video practice about ${seed.topic.toLocaleLowerCase()}.`,
      source: 'YouTube video search',
      level: seed.level,
      tag: `Video practice · ${seed.level}`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`,
      embedUrl: '',
      passage: seed.passage,
      comprehension: [
        {
          prompt: seed.question,
          answers: rotate(answers, answerIndex),
          correctIndex: (3 - answerIndex) % 3,
        },
        {
          prompt: language === 'Spanish' ? 'Which statement best summarizes the companion text?' : 'Quale frase riassume meglio il testo di supporto?',
          answers: [seed.summary, 'It recommends ignoring the situation.', 'It describes an unrelated event.'],
          correctIndex: 0,
        },
      ],
    }
  })
}

export const spanishLevelVideoResources = makeLevelVideos('Spanish', [
  { level: 'A1', title: 'First greetings', topic: 'greetings and introductions', passage: '—Hola, me llamo Inés. ¿Cómo te llamas?\n—Soy Tomás. Mucho gusto.\n—¿Eres de aquí?\n—No, soy de Chile.', question: 'Where is Tomás from?', correct: 'Chile', distractors: ['Spain', 'Mexico'], summary: 'Two people introduce themselves and share where they are from.' },
  { level: 'A2', title: 'At the café', topic: 'ordering food and asking prices', passage: '—Buenas tardes. ¿Qué te pongo?\n—Un bocadillo de queso y un zumo, por favor.\n—¿Algo más?\n—No, gracias. ¿Cuánto es?\n—Son seis euros.', question: 'What does the customer order?', correct: 'A cheese sandwich and a juice', distractors: ['A coffee and a cake', 'A soup and water'], summary: 'A customer orders a snack and checks the total.' },
  { level: 'B1', title: 'A weekend trip', topic: 'telling a story about a journey', passage: 'El sábado salimos temprano para evitar el tráfico. Cuando llegamos al pueblo, la lluvia había terminado y pudimos recorrer el mercado. Por la tarde, tomamos el tren de regreso porque el coche necesitaba una reparación.', question: 'Why do the travelers return by train?', correct: 'The car needs a repair', distractors: ['The market closes late', 'They miss the morning bus'], summary: 'Travelers describe a day trip and explain a change in their return plan.' },
  { level: 'B2', title: 'Designing better city streets', topic: 'city planning and public space', passage: 'Una calle funciona mejor cuando permite desplazarse con seguridad y también ofrece lugares para detenerse. Ampliar las aceras puede favorecer los comercios locales, aunque el resultado depende de conservar rutas accesibles y organizar las entregas. Por eso, el diseño debe evaluarse con quienes usan la calle a distintas horas.', question: 'What condition does the text add to wider sidewalks?', correct: 'Accessible routes and organized deliveries should remain', distractors: ['All deliveries should end', 'Shops should close during the day'], summary: 'Street design should balance movement, access, and local activity.' },
  { level: 'C1', title: 'Interpreting research findings', topic: 'research evidence and limitations', passage: 'El informe detecta una asociación entre los espacios verdes y una menor temperatura en las zonas estudiadas. Sin embargo, los autores advierten que las mediciones cubren una sola estación y no aíslan todos los factores urbanos. El resultado respalda una hipótesis, pero no permite atribuir cada diferencia exclusivamente a la vegetación.', question: 'What limitation do the authors note?', correct: 'The measurements cover only one season', distractors: ['No green spaces were observed', 'The report contains no temperature data'], summary: 'The findings support a possibility while leaving causal limits unresolved.' },
  { level: 'C2', title: 'Nuance in a polite disagreement', topic: 'implicit disagreement and register', passage: '«La propuesta resuelve, al menos sobre el papel, la cuestión inmediata», señaló la directora. Su interlocutor aceptó el alcance de esa precisión, no la conclusión: añadió que el coste recurrente podía desplazar el problema a otro departamento. La cortesía mantiene el intercambio abierto, pero los matices delimitan una discrepancia sustancial.', question: 'What does the second speaker challenge?', correct: 'The broader conclusion, citing recurring costs', distractors: ['The fact that a proposal exists', 'The use of a formal greeting'], summary: 'A courteous exchange can preserve a significant disagreement through careful qualifications.' },
])

export const italianLevelVideoResources = makeLevelVideos('Italian', [
  { level: 'A1', title: 'Saluti e presentazioni', topic: 'greetings and introductions', passage: '—Ciao, mi chiamo Elena. Come ti chiami?\n—Sono Marco. Piacere.\n—Di dove sei?\n—Sono di Torino.', question: 'Di dov’è Marco?', correct: 'Di Torino', distractors: ['Di Roma', 'Di Milano'], summary: 'Due persone si presentano e dicono da dove vengono.' },
  { level: 'A2', title: 'Al mercato', topic: 'shopping and simple requests', passage: '—Buongiorno, vorrei due mele e un chilo di pere.\n—Desidera altro?\n—No, grazie. Quanto costa?\n—Quattro euro e cinquanta.', question: 'Che cosa compra il cliente?', correct: 'Due mele e un chilo di pere', distractors: ['Un chilo di mele e del pane', 'Due pere e un formaggio'], summary: 'Un cliente compra della frutta e chiede il prezzo.' },
  { level: 'B1', title: 'Un imprevisto in viaggio', topic: 'travel stories and problem solving', passage: 'Il treno è arrivato con quaranta minuti di ritardo e Giulia ha perso la coincidenza. Ha chiesto informazioni al banco e ha scoperto che poteva prendere un autobus per raggiungere l’albergo. Ha avvisato i compagni e ha scelto la soluzione più rapida.', question: 'Come raggiunge l’albergo Giulia?', correct: 'In autobus', distractors: ['A piedi', 'Con un altro treno la mattina dopo'], summary: 'Giulia reagisce a un ritardo e sceglie un percorso alternativo.' },
  { level: 'B2', title: 'Ripensare gli spazi urbani', topic: 'city planning and public space', passage: 'Una piazza può favorire gli incontri senza rinunciare all’accessibilità. Aggiungere alberi e panchine migliora l’uso quotidiano, ma il progetto deve lasciare passaggi liberi e considerare le attività commerciali. Un periodo di prova, accompagnato da osservazioni dei residenti, aiuterebbe a capire quali modifiche funzionano.', question: 'Che cosa dovrebbe accompagnare il periodo di prova?', correct: 'Osservazioni dei residenti', distractors: ['La chiusura definitiva dei negozi', 'L’eliminazione dei passaggi accessibili'], summary: 'La progettazione degli spazi pubblici può essere verificata coinvolgendo chi li usa.' },
  { level: 'C1', title: 'Valutare una ricerca', topic: 'research methods and evidence', passage: 'I dati suggeriscono che il programma abbia migliorato la partecipazione, ma il confronto coinvolge gruppi selezionati in modo diverso. Gli autori invitano quindi a non interpretare il risultato come prova causale definitiva. Un monitoraggio più lungo, con criteri comparabili, chiarirebbe se il cambiamento dipende dall’intervento o da altri fattori.', question: 'Perché gli autori evitano una conclusione causale definitiva?', correct: 'I gruppi confrontati sono stati selezionati in modo diverso', distractors: ['Il programma non è stato monitorato', 'La partecipazione non è stata misurata'], summary: 'I dati sono promettenti, ma il metodo lascia aperte spiegazioni alternative.' },
  { level: 'C2', title: 'Sfumature in una trattativa', topic: 'negotiation and implied meaning', passage: '«La tempistica è ambiziosa», osservò la consulente, «soprattutto se consideriamo le dipendenze che non abbiamo ancora verificato». La formula non respinge il progetto, ma sospende un assenso pieno finché quelle condizioni restano irrisolte. La risposta successiva riconosce il rischio e propone una verifica intermedia, trasformando una riserva implicita in un criterio negoziabile.', question: 'Che cosa comunica la consulente con “ambiziosa”?', correct: 'Una riserva sui tempi legata a condizioni non verificate', distractors: ['Un rifiuto completo del progetto', 'La certezza che il progetto finirà prima'], summary: 'Un’espressione attenuata può segnalare una riserva concreta e aprire una negoziazione.' },
])
