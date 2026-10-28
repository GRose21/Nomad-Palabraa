const glossEmoji: Array<[RegExp, string]> = [
  [/\b(hello|hi|greeting|good morning|welcome)\b/i, '👋'], [/\b(goodbye|see you|bye)\b/i, '🙋'], [/\b(thank|please|sorry)\b/i, '🙏'],
  [/\b(water)\b/i, '💧'], [/\b(coffee|café)\b/i, '☕'], [/\b(tea)\b/i, '🍵'], [/\b(bread)\b/i, '🍞'], [/\b(milk)\b/i, '🥛'], [/\b(apple)\b/i, '🍎'],
  [/\b(food|eat|meal|lunch|dinner|breakfast|hungry|restaurant|menu)\b/i, '🍽️'], [/\b(drink)\b/i, '🥤'], [/\b(rice)\b/i, '🍚'], [/\b(fish)\b/i, '🐟'], [/\b(meat|chicken)\b/i, '🍗'],
  [/\b(book|read|reading|library|novel)\b/i, '📖'], [/\b(write|writing|letter|pen)\b/i, '✍️'], [/\b(newspaper|news)\b/i, '📰'], [/\b(school|class|student|study|teacher|university|college|exam)\b/i, '🎓'],
  [/\b(house|home|apartment|room|kitchen)\b/i, '🏠'], [/\b(family|mother|father|parents|sister|brother|child|children|son|daughter)\b/i, '👨‍👩‍👧'],
  [/\b(friend|friends)\b/i, '🧑‍🤝‍🧑'], [/\b(car|drive|traffic)\b/i, '🚗'], [/\b(train|station|railway)\b/i, '🚆'], [/\b(bus)\b/i, '🚌'], [/\b(plane|airport|flight|fly)\b/i, '✈️'], [/\b(bicycle|bike)\b/i, '🚲'],
  [/\b(city|town|street|neighbou?rhood|square)\b/i, '🏙️'], [/\b(market|shop|store|buy|sell|shopping|price|cost|money|pay)\b/i, '🛒'], [/\b(bank)\b/i, '🏦'],
  [/\b(work|job|office|company|employee|business|meeting)\b/i, '💼'], [/\b(doctor|hospital|health|medicine|sick|pain)\b/i, '🏥'], [/\b(phone|call|telephone)\b/i, '📞'], [/\b(computer|internet|email|online)\b/i, '💻'],
  [/\b(weather|rain|raining|storm)\b/i, '🌧️'], [/\b(sun|sunny|hot|summer)\b/i, '☀️'], [/\b(cold|snow|winter)\b/i, '❄️'], [/\b(sea|beach|ocean)\b/i, '🏖️'], [/\b(mountain|hike)\b/i, '⛰️'], [/\b(tree|garden|park|forest|nature)\b/i, '🌳'],
  [/\b(dog)\b/i, '🐶'], [/\b(cat)\b/i, '🐱'], [/\b(music|song|sing|concert)\b/i, '🎵'], [/\b(film|movie|cinema|video|theat(?:er|re))\b/i, '🎬'], [/\b(football|soccer|sport|game|play|team)\b/i, '⚽'],
  [/\b(time|clock|hour|late|early|schedule|o'clock)\b/i, '⏰'], [/\b(today|tomorrow|yesterday|week|month|year|calendar|day)\b/i, '📅'], [/\b(morning)\b/i, '🌅'], [/\b(night|evening|sleep|bed)\b/i, '🌙'],
  [/\b(love|heart|like)\b/i, '❤️'], [/\b(happy|joy|laugh)\b/i, '😊'], [/\b(sad|cry)\b/i, '😢'], [/\b(tired)\b/i, '😴'], [/\b(idea|think|opinion|believe|know)\b/i, '💡'],
  [/\b(government|law|court|election|minister|president|policy|rule|committee)\b/i, '🏛️'], [/\b(science|research|study|experiment|data|evidence|report)\b/i, '🔬'], [/\b(map|travel|trip|tourist|hotel|ticket|passport)\b/i, '🗺️'],
  [/\b(color|colour|red|blue|green|yellow|black|white)\b/i, '🎨'], [/\b(number|one|two|three|count)\b/i, '🔢'], [/\b(language|word|speak|talk|say|conversation)\b/i, '💬'], [/\b(question|ask|answer)\b/i, '❓'],
]

export function emojiForGloss(english: string): string | null {
  for (const [pattern, emoji] of glossEmoji) if (pattern.test(english)) return emoji
  return null
}

const scenes: Array<[RegExp, string[]]> = [
  [/greet|hello|introduc|name|first words|polite|goodbye|meet/i, ['👋', '🧑‍🤝‍🧑', '💬']],
  [/family|friend|people|person/i, ['👨‍👩‍👧', '🏠', '❤️']],
  [/food|eat|restaurant|cafe|café|order|meal|market|shop|buy/i, ['🍽️', '☕', '🛒']],
  [/travel|train|station|airport|direction|city|street|transport|hotel/i, ['🚆', '🗺️', '🏙️']],
  [/school|class|study|univers|college|book|read|library/i, ['🎓', '📖', '✏️']],
  [/work|job|office|business|meeting|career/i, ['💼', '🖥️', '📊']],
  [/health|doctor|body|hospital/i, ['🏥', '🩺', '💊']],
  [/weather|season|nature|garden|park/i, ['🌦️', '🌳', '🏔️']],
  [/past|story|narrat|history|yesterday|preterite|imperfect|sequence/i, ['📜', '⏳', '📖']],
  [/future|plan|tomorrow|conditional/i, ['🔭', '📅', '🚀']],
  [/news|report|argument|debate|policy|law|government|research|evidence|formal|academic|discourse|register/i, ['📰', '🏛️', '🔬']],
  [/subjunctive|opinion|wish|doubt|emotion/i, ['💭', '🌈', '🤔']],
  [/home|house|room|routine|daily/i, ['🏠', '⏰', '🪥']],
]
const levelScenes: Record<string, string[]> = {
  'Pre-A1': ['🌱', '🔤', '👋'], A1: ['🌱', '📝', '🗣️'], A2: ['🌿', '🧭', '🗣️'], B1: ['🌳', '🎧', '📚'], B2: ['🏔️', '📰', '🎙️'], C1: ['🎓', '🔍', '✒️'], C2: ['🏆', '🖋️', '🌍'],
}

export function sceneForLesson(title: string, level: string): string[] {
  const match = scenes.find(([pattern]) => pattern.test(title))
  return match ? match[1] : levelScenes[level] ?? ['📚', '🗣️', '🌍']
}

export const cultureNotes: Record<string, string[]> = {
  Spanish: [
    'Spanish is the official language of 20 countries. Greetings often include a kiss on the cheek in Spain and much of Latin America.',
    'In Spain lunch (el almuerzo) is the main meal and is eaten around 2 p.m.; dinner is often after 9 p.m.',
    'Spanish speakers use tú for friends and usted for respect. In parts of Latin America vos replaces tú.',
    'Many Spanish cities hold a paseo, an evening stroll in the main square, to chat with neighbours.',
    'La Tomatina in Buñol, Spain, is a festival where thousands of people throw tomatoes at each other.',
    'Spanish has two words for “to be”, ser and estar, because identity and state are treated differently.',
  ],
  Italian: [
    'Italian cafés serve cappuccino at breakfast only; ordering one after dinner is considered unusual.',
    'Italians traditionally use Lei (formal) with strangers and tu with friends and family.',
    'Italy has hundreds of dialects, and standard Italian grew largely from the Tuscan of Dante.',
    'Meals have courses: antipasto, primo, secondo, contorno, dolce. Each has its own place at the table.',
    'The evening passeggiata is a cherished custom of walking with friends and family before dinner.',
    'Gestures are part of Italian communication; hand movements can express whole phrases.',
  ],
  'Mandarin Chinese': [
    'Mandarin is spoken by more people than any other language. Characters are read left to right and top to bottom today, though older texts run in columns.',
    'Mandarin has four main tones, and a tone can change meaning: mā (mother) versus mǎ (horse).',
    'Chinese characters combine meaning parts (radicals) and sound parts. Learning radicals helps you guess new words.',
    'Red is a lucky colour in Chinese culture. Money is given in red envelopes at New Year.',
    'Sharing food from central dishes is the norm at Chinese meals, and tea is poured for others before yourself.',
    'Chinese has no verb conjugations. Time words such as 昨天 (yesterday) show when something happened.',
  ],
  'Modern Standard Arabic': [
    'Arabic is written from right to left, and short vowels are usually left out of everyday writing.',
    'Modern Standard Arabic is used in news and writing across the Arab world, while people speak regional dialects at home.',
    'Greeting with السلام عليكم (peace be upon you) is common, and the standard reply is وعليكم السلام.',
    'Arabic words are built from roots of usually three consonants, so one root gives a whole family of related words.',
    'Hospitality is central; guests are often offered tea or coffee and dates.',
    'Calligraphy is one of the great Arabic art forms, and many styles are used to write the same letters.',
  ],
  Russian: [
    'Russian uses the Cyrillic alphabet with 33 letters. Once you know it, most words can be read aloud.',
    'Russians use ты for friends and вы for strangers or respect. Using the wrong form can sound rude or cold.',
    'Full names have three parts: first name, patronymic (from the father’s name), and surname, like Анна Ивановна Петрова.',
    'Tea (чай) is served with dessert and conversation, and guests are rarely allowed to leave hungry.',
    'Russian has no articles (“a” or “the”) and often leaves out the verb “to be” in the present tense.',
    'Many Russians celebrate Name Days, the feast day of the saint they are named for, along with birthdays.',
  ],
}
