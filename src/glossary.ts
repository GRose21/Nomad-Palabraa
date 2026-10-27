export type GlossaryTerm = {
  term: string
  pattern: RegExp
  definition: string
  example: string
  examples?: Partial<Record<string, string>>
}

const t = (term: string, pattern: RegExp, definition: string, example: string, examples?: Partial<Record<string, string>>): GlossaryTerm => ({ term, pattern, definition, example, examples })

export const glossaryTerms: GlossaryTerm[] = [
  t('Noun', /\bnouns?\b/i, 'A word that names a person, place, thing, or idea.', 'teacher, city, book, freedom'),
  t('Verb', /\bverbs?\b/i, 'A word that describes an action or a state of being.', 'run, think, is'),
  t('Adjective', /\badjectives?\b/i, 'A word that describes a noun. In many languages it must match the noun.', 'a red car, an interesting book'),
  t('Adverb', /\badverbs?\b/i, 'A word that describes a verb, an adjective, or another adverb: how, when, where, or how much.', 'quickly, very, tomorrow'),
  t('Pronoun', /\bpronouns?\b/i, 'A short word that replaces a noun so you do not have to repeat it.', 'she, them, this, who'),
  t('Article', /\barticles?\b/i, 'A small word placed before a noun to show whether it is specific (definite) or not (indefinite).', 'the book (definite), a book (indefinite)'),
  t('Preposition', /\bprepositions?\b|\bpor and para\b/i, 'A word that links a noun to the rest of the sentence, often showing place, time, or purpose.', 'in the house, for you, after class'),
  t('Conjunction / connector', /\bconjunctions?\b|\bconnectors?\b/i, 'A word or phrase that joins words, clauses, or ideas and shows how they relate.', 'and, but, because, however'),
  t('Subject', /\bsubjects?\b/i, 'The person or thing that does the action of the verb.', '“Maria” in “Maria reads.”'),
  t('Object', /\bobjects?\b(?! pronouns?)/i, 'The person or thing that receives the action of the verb.', '“a letter” in “She wrote a letter.”'),
  t('Direct object pronoun', /\bdirect object\b|\bobject pronouns?\b/i, 'A pronoun that replaces the thing or person directly receiving the action.', 'I see the book → I see it.', { Spanish: 'Veo el libro → Lo veo.', Italian: 'Vedo il libro → Lo vedo.' }),
  t('Indirect object pronoun', /\bindirect object\b/i, 'A pronoun that shows to whom or for whom something is done.', 'I give the gift to her → I give her the gift.', { Spanish: 'Le doy el regalo a ella.', Italian: 'Le do il regalo.' }),
  t('Gender', /\bgender\b|\bmasculine\b|\bfeminine\b/i, 'A grammatical category that sorts nouns (and the words that agree with them) into groups such as masculine and feminine. It is often unrelated to biology.', 'In Spanish a table is feminine and a book is masculine.', { Spanish: 'la mesa (f.), el libro (m.)', Italian: 'la tavola (f.), il libro (m.)' }),
  t('Agreement', /\bagree(?:ment|s)?\b/i, 'Words in a phrase must match in gender, number, or case.', 'these red books (all plural)', { Spanish: 'los libros rojos (all masculine plural)', Italian: 'i libri rossi (all masculine plural)' }),
  t('Conjugation', /\bconjugat\w*|\bregular verbs\b|\birregular\b|\bstem-changing\b/i, 'Changing the ending (or inside) of a verb to show who does it and when.', 'I walk, she walks, they walked', { Spanish: 'hablo, hablas, habla…', Italian: 'parlo, parli, parla…' }),
  t('Infinitive', /\binfinitives?\b/i, 'The basic, unconjugated form of a verb: the form you find in a dictionary.', 'to speak, to eat, to live', { Spanish: 'hablar, comer, vivir', Italian: 'parlare, mangiare, vivere' }),
  t('Tense', /\btenses?\b/i, 'The form of a verb that shows when an action happens: past, present, or future.', 'I eat (present), I ate (past), I will eat (future)'),
  t('Present tense', /\bpresent tense\b|\bpresent\b(?= (?:indicative|forms?))/i, 'The verb form for what is true now, happens regularly, or is happening at this moment.', 'She works downtown.', { Spanish: 'Ella trabaja en el centro.', Italian: 'Lei lavora in centro.' }),
  t('Preterite (simple past)', /\bpreterite\b|\bpassato remoto\b|\bpassato prossimo\b/i, 'A past tense for actions that were completed at a definite time. Think of it as a snapshot of a finished event.', 'Yesterday I called my mother.', { Spanish: 'Ayer llamé a mi madre.', Italian: 'Ieri ho chiamato mia madre.' }),
  t('Imperfect', /\bimperfect\b|\bimperfetto\b/i, 'A past tense for habits, descriptions, and background: what used to happen or was going on, with no clear start or end.', 'When I was little, I used to play outside.', { Spanish: 'De niño jugaba afuera.', Italian: 'Da bambino giocavo fuori.' }),
  t('Future tense', /\bfuture\b/i, 'The verb form for things that have not happened yet.', 'Tomorrow I will travel.', { Spanish: 'Mañana viajaré.', Italian: 'Domani viaggerò.' }),
  t('Conditional', /\bconditional\b/i, 'A verb form that says what would happen under certain conditions. It is also used for polite requests.', 'I would go if I had time.', { Spanish: 'Iría si tuviera tiempo.', Italian: 'Andrei se avessi tempo.' }),
  t('Perfect tenses', /\bperfect tenses?\b|\bpresent perfect\b|\bpluperfect\b|\bfuture perfect\b/i, 'Tenses built with a helper verb (“have”) plus a past participle. They connect one time to another.', 'I have eaten. / I had eaten.', { Spanish: 'He comido. / Había comido.', Italian: 'Ho mangiato. / Avevo mangiato.' }),
  t('Past participle', /\bpast participle\b|\bparticiple\b/i, 'A verb form used after “have” to build perfect tenses, or as an adjective.', 'eaten, written, closed', { Spanish: 'comido, escrito, cerrado', Italian: 'mangiato, scritto, chiuso' }),
  t('Gerund / progressive', /\bgerunds?\b|\bprogressive\b|\bactions in progress\b|\bin progress\b/i, 'The “-ing” form of a verb, used to show an action that is happening right now.', 'She is reading.', { Spanish: 'Ella está leyendo.', Italian: 'Lei sta leggendo.' }),
  t('Mood', /\bmoods?\b/i, 'The attitude a verb shows toward the action: a fact (indicative), a wish or doubt (subjunctive), or an order (imperative).', 'It is raining. / I hope it rains. / Close the door!'),
  t('Indicative', /\bindicative\b/i, 'The ordinary mood used to state facts and ask questions about real things.', 'He studies every day.', { Spanish: 'Estudia todos los días.', Italian: 'Studia ogni giorno.' }),
  t('Subjunctive', /\bsubjunctive\b|\bcongiuntivo\b/i, 'A mood used for things that are not simple facts: wishes, doubts, emotions, opinions, and hypotheticals. It usually appears in a clause after words like “that”.', 'I wish he were here. / It is important that she be on time.', { Spanish: 'Quiero que vengas.', Italian: 'Voglio che tu venga.' }),
  t('Imperative (command)', /\bimperative\b|\bcommands?\b/i, 'The verb form used to give orders, directions, or invitations.', 'Sit down! Please come in.', { Spanish: '¡Siéntate! Pasa, por favor.', Italian: 'Siediti! Entra, per favore.' }),
  t('Reflexive verb', /\breflexive\b/i, 'A verb whose action returns to the subject, so it is used with a pronoun like “myself.”', 'I wash myself. / She gets dressed.', { Spanish: 'Me levanto a las siete.', Italian: 'Mi alzo alle sette.' }),
  t('Clause', /\bclauses?\b/i, 'A group of words with its own subject and verb. A main clause can stand alone; a subordinate clause cannot.', '“Because it was late,” (subordinate) “we left.” (main)'),
  t('Relative clause', /\brelative clauses?\b|\brelative pronouns?\b/i, 'A clause that describes a noun, often starting with “who”, “which”, or “that”.', 'The book that I bought is long.', { Spanish: 'El libro que compré es largo.', Italian: 'Il libro che ho comprato è lungo.' }),
  t('Passive voice', /\bpassive\b/i, 'A sentence structure where the subject receives the action instead of doing it.', 'The letter was written by Ana.', { Spanish: 'La carta fue escrita por Ana.', Italian: 'La lettera è stata scritta da Ana.' }),
  t('Impersonal “se”', /\bimpersonal\b/i, 'A construction that talks about people in general rather than a specific person, like “one” or “people” in English.', 'Spanish is spoken here.', { Spanish: 'Aquí se habla español.', Italian: 'Qui si parla italiano.' }),
  t('Comparative / superlative', /\bcompar(?:e|ative|ison)\b|\bsuperlative\b/i, 'Forms used to compare two things (taller than) or to say something is the most or least (the tallest).', 'bigger than, the biggest'),
  t('Possessive', /\bpossessive\b/i, 'A word that shows ownership or relationship.', 'my house, her sister'),
  t('Demonstrative', /\bdemonstrative\b/i, 'A word that points to something: this, that, these, those.', 'this book, that house'),
  t('Negation', /\bnegat\w*/i, 'Words or endings that make a sentence mean “no” or “not”.', 'I do not know.'),
  t('Interrogative', /\binterrogative\b|\bquestions?\b/i, 'A question word or question structure: who, what, where, when, why, how.', 'Where do you live?'),
  t('Reported speech', /\breported speech\b|\bindirect speech\b/i, 'Telling someone what another person said without quoting them exactly.', 'She said that she was tired.'),
  t('Concessive clause', /\bconcessive\b|\bconcession\b/i, 'A clause that admits a contrast but still holds the main point: “although”, “even though”.', 'Although it was raining, we went out.'),
  t('Cleft sentence', /\bcleft\w*/i, 'A sentence rearranged to put focus on one piece of information.', 'It was Maria who made the decision.'),
  t('Register', /\bregister\b|\bformal\b/i, 'How formal or informal your language is, chosen to suit the situation.', '“Could you please assist me?” (formal) vs. “Can you help?” (informal)'),
  t('Case', /\bcases?\b(?! of)/i, 'Endings on nouns, pronouns, and adjectives that show their job in the sentence (subject, object, possession…). Russian has six.', 'who (subject) vs. whom (object)', { Russian: 'Анна читает книгу. (книга → книгу: object)' }),
  t('Aspect (perfective / imperfective)', /\baspect\b|\bperfective\b/i, 'Many Russian verbs come in pairs: imperfective for ongoing or repeated actions, perfective for single completed ones.', 'was reading (ongoing) vs. read it through (completed)', { Russian: 'читать (ongoing) / прочитать (completed)' }),
  t('Measure word (classifier)', /\bmeasure words?\b|\bclassifiers?\b/i, 'A small word required between a number and a noun in Chinese, depending on the noun’s type.', 'a “piece” of paper, a “head” of cattle', { 'Mandarin Chinese': '一本书 (yì běn shū) — 本 is the measure word for books' }),
  t('Particle', /\bparticles?\b/i, 'A small word that does not change form and adds meaning or grammar, such as marking tense or a question.', 'In Chinese, 吗 turns a statement into a question.', { 'Mandarin Chinese': '你好吗？ — 吗 marks a question' }),
  t('Tone', /\btones?\b/i, 'The pitch pattern of a syllable. In Mandarin the tone changes the meaning of a word.', 'mā (mother) vs. mǎ (horse)', { 'Mandarin Chinese': 'mā 妈 / má 麻 / mǎ 马 / mà 骂' }),
  t('Root and pattern', /\broots?\b|\bpatterns?\b|\bform [ivx]+\b/i, 'Arabic words are built from a root of usually three consonants placed into patterns that give related meanings.', 'k-t-b → kitāb (book), kātib (writer), maktab (office)', { 'Modern Standard Arabic': 'ك-ت-ب → كِتَاب، كَاتِب، مَكْتَب' }),
  t('Iḍāfa (possessive construction)', /\bi[dḍ]āfa\b|\bidafa\b/i, 'An Arabic noun-noun phrase meaning “X of Y”; the first noun drops its “the” and endings.', 'the door of the house', { 'Modern Standard Arabic': 'بَابُ الْبَيْتِ — the door of the house' }),
  t('Tanwīn', /\btanw[iī]n\b/i, 'Arabic noun endings (-un, -an, -in) that mark a noun as indefinite.', 'a book (indefinite) vs. the book (definite)', { 'Modern Standard Arabic': 'كِتَابٌ (a book) / الْكِتَابُ (the book)' }),
  t('Dual', /\bdual\b/i, 'A grammatical number for exactly two things, found in Arabic, in addition to singular and plural.', 'one, two, many', { 'Modern Standard Arabic': 'كِتَابٌ، كِتَابَانِ، كُتُبٌ' }),
  t('Verbal noun (maṣdar)', /\bverbal noun\b|\bma[sṣ]dar\b/i, 'A noun made from a verb that names the action itself.', 'to improve → improvement'),
  t('Modal verb', /\bmodal\b/i, 'A helper verb that shows ability, permission, necessity, or possibility.', 'can, must, should'),
  t('Hypothetical (if-clause)', /\bhypothetical\b|\bconditional sentences\b|\bif-clauses?\b/i, 'A sentence that imagines a situation and its result, real or unreal.', 'If I had known, I would have called.', { Spanish: 'Si hubiera sabido, habría llamado.', Italian: 'Se avessi saputo, avrei chiamato.' }),
  t('Discourse marker', /\bdiscourse\b|\btransitions?\b/i, 'A word or phrase that organises what you say and guides the listener.', 'first, however, in conclusion'),
]

export function findGlossaryTerms(text: string, limit = 8): GlossaryTerm[] {
  return glossaryTerms.filter((entry) => entry.pattern.test(text)).slice(0, limit)
}

export function glossaryExample(entry: GlossaryTerm, language: string) {
  return entry.examples?.[language] ?? entry.example
}
