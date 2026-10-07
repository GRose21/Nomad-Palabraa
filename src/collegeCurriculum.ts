import type { CourseLevel } from './learnCourse'
import type { GrammarLesson } from './grammar'
import type { AddedLanguage } from './extraLanguages'

export type CollegeCourse = {
  year: string
  course: string
  focus: string
  outcomes: string[]
  signatureTask: string
  grammarFocus: string
  grammarTask: string
  studyPractice: string
}

export const collegeCourses: Record<CourseLevel, CollegeCourse> = {
  'Pre-A1': {
    year: 'Preparatory bridge',
    course: 'Language foundations',
    focus: 'Build sound awareness, high-frequency phrases, and confidence with the writing system.',
    outcomes: ['Recognize core sounds and script patterns', 'Use greetings and essential classroom language'],
    signatureTask: 'Create a personal phrasebook and deliver a short greeting exchange.',
    grammarFocus: 'Sound-to-script patterns, word boundaries, basic expressions, and polite forms.',
    grammarTask: 'Annotate a short phrase exchange for sound, word, and politeness patterns.',
    studyPractice: 'Short daily retrieval practice, read aloud, and spaced vocabulary review.',
  },
  A1: {
    year: 'College year 1 · Semester 1',
    course: 'Elementary Language I',
    focus: 'Establish accurate beginner communication in familiar personal and campus situations.',
    outcomes: ['Exchange personal information and ask follow-up questions', 'Understand short, clearly stated messages'],
    signatureTask: 'Give a short self-introduction and write a connected paragraph about daily life.',
    grammarFocus: 'Basic sentence patterns, core inflections, question formation, and present-time reference.',
    grammarTask: 'Edit a personal paragraph for sentence formation, agreement, and accurate questions.',
    studyPractice: 'Frequent low-stakes quizzes, pronunciation practice, and short guided compositions.',
  },
  A2: {
    year: 'College year 1 · Semester 2',
    course: 'Elementary Language II',
    focus: 'Expand familiar communication to routines, plans, services, and simple past events.',
    outcomes: ['Narrate a short sequence with time and place details', 'Handle routine transactions and describe preferences'],
    signatureTask: 'Prepare a paired role-play and a short illustrated account of a past experience.',
    grammarFocus: 'Past and future reference, agreement, common complements, and connected clauses.',
    grammarTask: 'Revise a short narrative to make its time sequence and clause connections clear.',
    studyPractice: 'Weekly listening logs, vocabulary in context, and paragraph revision.',
  },
  B1: {
    year: 'College year 2',
    course: 'Intermediate Language',
    focus: 'Develop independent communication and interpret connected texts on familiar public topics.',
    outcomes: ['Summarize the main claim and supporting details', 'Support an opinion with reasons and examples'],
    signatureTask: 'Deliver a brief researched presentation and write a structured response to a source.',
    grammarFocus: 'Narrative aspect, subordination, reference across sentences, and cohesive devices.',
    grammarTask: 'Combine related claims into a cohesive paragraph using accurate subordination and reference.',
    studyPractice: 'Authentic-media summaries, peer discussion, and multi-paragraph writing.',
  },
  B2: {
    year: 'College year 3',
    course: 'Advanced Language I',
    focus: 'Work across formal and informal registers and evaluate arguments in varied media.',
    outcomes: ['Compare perspectives and qualify conclusions', 'Produce organized academic and professional communication'],
    signatureTask: 'Synthesize two sources in an oral briefing and a short evidence-based essay.',
    grammarFocus: 'Complex clause structure, voice, information structure, and register-sensitive choices.',
    grammarTask: 'Edit an evidence-based argument for clause control, register, and information focus.',
    studyPractice: 'Source annotation, seminar discussion, editing for audience, and timed listening.',
  },
  C1: {
    year: 'College year 4 · Semester 1',
    course: 'Advanced Language II',
    focus: 'Interpret demanding authentic material, implicit stance, and discipline-related discourse.',
    outcomes: ['Distinguish a source’s claim, evidence, and limitations', 'Present a nuanced argument with appropriate attribution'],
    signatureTask: 'Lead a seminar discussion and submit an annotated source-based analysis.',
    grammarFocus: 'Academic cohesion, reporting structures, modality, hedging, and precise reference.',
    grammarTask: 'Integrate and qualify source claims without confusing attribution and interpretation.',
    studyPractice: 'Long-form reading, lecture notes, source synthesis, and iterative feedback.',
  },
  C2: {
    year: 'College year 4 · Semester 2',
    course: 'Honors Seminar and Capstone',
    focus: 'Use the language with precision, flexibility, and cultural awareness in complex contexts.',
    outcomes: ['Synthesize conflicting evidence while preserving nuance', 'Adapt style and register to purpose, audience, and genre'],
    signatureTask: 'Complete a capstone presentation and extended written project grounded in authentic sources.',
    grammarFocus: 'Rhetorical structure, pragmatic nuance, idiomatic precision, and stylistic control.',
    grammarTask: 'Revise a capstone excerpt for rhetorical balance, audience, and stylistic precision.',
    studyPractice: 'Independent research, seminar debate, substantial revision, and reflective self-assessment.',
  },
}

type Extension = {
  title: string
  summary: string
  explanation: string
  examples: [string, string]
  applicationHeading: string
  application: string
  applicationExamples: [string, string]
  exercises: Array<{ prompt: string; options: string[]; answer: number; explanation: string }>
}

type LevelExtensions = Record<Exclude<CourseLevel, 'Pre-A1'>, Extension>

const extensions: Record<AddedLanguage, LevelExtensions> = {
  'Mandarin Chinese': {
    A1: {
      title: 'Measure words and noun phrases',
      summary: 'Choose common measure words and keep modifiers in a clear noun phrase.',
      explanation: 'Mandarin count nouns commonly require a measure word between a number or demonstrative and the noun. The measure word classifies the item; it is learned with the noun rather than translated mechanically.',
      examples: ['一本书 (yì běn shū) — one book', '这两张票 (zhè liǎng zhāng piào) — these two tickets'],
      applicationHeading: 'Build phrases with 的',
      application: '的 links a modifier to a noun. It can mark possession or describe which person or thing is meant.',
      applicationExamples: ['我的老师 (wǒ de lǎoshī) — my teacher', '安娜买的书 (Ānnà mǎi de shū) — the book Anna bought'],
      exercises: [
        { prompt: 'Choose the natural phrase for “three books.”', options: ['三个书', '三本书', '三书个'], answer: 1, explanation: '本 is the common measure word for books.' },
        { prompt: 'Which phrase means “these two tickets”?', options: ['这两张票', '这两个票', '两票这张'], answer: 0, explanation: '张 is commonly used with flat items such as tickets.' },
        { prompt: 'What does 我的老师 mean?', options: ['My teacher', 'The teacher teaches me', 'A teacher and a book'], answer: 0, explanation: '我的 uses 的 to mark possession.' },
      ],
    },
    A2: {
      title: 'Comparisons and result complements',
      summary: 'Compare people or things and express the result of an action.',
      explanation: '比 introduces the standard of comparison, followed by the quality being compared. Result complements such as 完 describe whether an action reached its intended endpoint.',
      examples: ['今天比昨天暖和。— Today is warmer than yesterday.', '我做完了作业。— I finished the homework.'],
      applicationHeading: 'Strengthen the comparison',
      application: 'Use 没有 for “not as … as” and 得 with a verb to introduce an evaluation of how an action is performed.',
      applicationExamples: ['这家店没有那家便宜。— This shop is not as inexpensive as that one.', '她说得很清楚。— She speaks very clearly.'],
      exercises: [
        { prompt: 'Complete “This room is bigger than that one.”', options: ['房间比那个大。', '房间大比那个。', '比房间那个大。'], answer: 0, explanation: 'The compared item precedes 比; the standard follows it.' },
        { prompt: 'Which sentence says the work is finished?', options: ['我做作业。', '我做完了作业。', '我在做作业。'], answer: 1, explanation: '完 marks the completed result.' },
        { prompt: 'Which sentence means “She speaks very clearly”?', options: ['她很清楚说。', '她说得很清楚。', '她得说清楚很。'], answer: 1, explanation: '得 introduces the complement describing the manner of speaking.' },
      ],
    },
    B1: {
      title: 'Aspect, 把, and connected clauses',
      summary: 'Use aspect and clause links to make event sequences and explanations precise.',
      explanation: '了, 过, and 着 present different perspectives on events and states; they are not simple equivalents of English past tense. 把 places an affected object before a result or change.',
      examples: ['我去过那座博物馆。— I have been to that museum.', '请把报告交给老师。— Please hand the report to the teacher.'],
      applicationHeading: 'Make relations explicit',
      application: 'Because 因为 and although 虽然 clauses help speakers connect evidence, causes, and qualifications. A contrastive clause commonly pairs 虽然 with 但是.',
      applicationExamples: ['因为下雨，比赛改期了。— Because it rained, the match was rescheduled.', '虽然时间不多，但是我们完成了调查。— Although time was limited, we completed the survey.'],
      exercises: [
        { prompt: 'Which sentence says the speaker has the experience of visiting?', options: ['我去过那座博物馆。', '我正在去博物馆。', '我把博物馆去了。'], answer: 0, explanation: '过 marks experience at some time before now.' },
        { prompt: 'Choose the natural request to submit the report.', options: ['请把报告交给老师。', '请报告把老师交。', '请交把给报告老师。'], answer: 0, explanation: '把 introduces the affected object before the action and recipient.' },
        { prompt: 'Which connector introduces a reason?', options: ['因为', '虽然', '但是'], answer: 0, explanation: '因为 introduces a cause or reason.' },
      ],
    },
    B2: {
      title: 'Relative clauses and information focus',
      summary: 'Build embedded descriptions and manage what a sentence foregrounds.',
      explanation: 'A clause placed before 的 can identify or describe a noun. 把 and 被 constructions alter information focus: one foregrounds an affected object, while the other foregrounds an event or affected subject.',
      examples: ['昨天发表的报告很重要。— The report published yesterday is important.', '这项建议被委员会接受了。— This proposal was accepted by the committee.'],
      applicationHeading: 'Organize contrast and consequence',
      application: 'Formal discussion often uses 因此, 此外, and 然而 to signal inference, addition, and contrast. Choose a connector that accurately reflects the logical relation.',
      applicationExamples: ['样本数量有限，因此结论需要谨慎。— The sample is limited; therefore, the conclusion requires caution.', '然而，第二项研究得出了不同结果。— However, the second study reached a different result.'],
      exercises: [
        { prompt: 'Which phrase means “the report published yesterday”?', options: ['昨天发表的报告', '报告昨天发表的', '发表报告昨天的'], answer: 0, explanation: 'The modifying clause precedes 的 and the noun.' },
        { prompt: 'Which sentence foregrounds the proposal as the affected subject?', options: ['委员会接受了建议。', '这项建议被委员会接受了。', '委员会把建议被接受。'], answer: 1, explanation: '被 frames the proposal as the subject affected by the action.' },
        { prompt: 'Which word most directly signals a conclusion from prior evidence?', options: ['此外', '然而', '因此'], answer: 2, explanation: '因此 signals a consequence or inference.' },
      ],
    },
    C1: {
      title: 'Academic attribution and qualified claims',
      summary: 'Attribute evidence clearly and distinguish observation from interpretation.',
      explanation: 'Academic Chinese uses source phrases such as 根据研究 and 报告指出 to identify where a claim comes from. Qualifiers including 可能, 倾向于, and 在一定程度上 prevent a claim from exceeding its evidence.',
      examples: ['根据调查，参与人数有所增加。— According to the survey, participation increased somewhat.', '这些结果可能与季节变化有关。— These results may be related to seasonal change.'],
      applicationHeading: 'Synthesize without overstating',
      application: 'Contrastive frames such as 一方面……另一方面…… make competing considerations visible; 因此 should be reserved for a supported inference, not mere sequence.',
      applicationExamples: ['一方面，成本有所下降；另一方面，服务范围仍然有限。— On one hand, costs fell; on the other, coverage remains limited.', '现有数据不足以证明两者之间存在因果关系。— Current data are insufficient to prove a causal relationship.'],
      exercises: [
        { prompt: 'Which opening attributes a statement to a source?', options: ['根据研究，', '我希望，', '虽然如此，'], answer: 0, explanation: '根据研究 explicitly attributes the claim to research.' },
        { prompt: 'Which sentence appropriately qualifies the result?', options: ['结果证明所有情况都相同。', '结果可能与季节变化有关。', '结果不需要任何数据。'], answer: 1, explanation: '可能 marks an appropriately cautious interpretation.' },
        { prompt: 'Which frame presents two sides of an issue?', options: ['一方面……另一方面……', '先……然后……', '因为……所以……'], answer: 0, explanation: 'The paired frame organizes contrasting considerations.' },
      ],
    },
    C2: {
      title: 'Rhetorical precision and register',
      summary: 'Control concession, emphasis, and style in extended formal communication.',
      explanation: 'Advanced writing uses structures such as 与其……不如…… to reframe alternatives, and 即使……也…… to maintain a conclusion despite a concession. Their effect depends on the scope of each clause.',
      examples: ['与其扩大规模，不如先评估现有方案。— Rather than expand the scale, it would be better to evaluate the current plan first.', '即使成本下降，也不能忽视服务质量。— Even if costs fall, service quality cannot be ignored.'],
      applicationHeading: 'Edit for evidential scope',
      application: 'Parallel phrasing can emphasize a balanced argument, but repetition should clarify structure rather than inflate certainty. Match formal vocabulary to the audience and genre.',
      applicationExamples: ['关键不在于变化是否发生，而在于变化影响了哪些群体。— The issue is not whether change occurred, but which groups it affected.', '这项发现值得重视，但仍需在不同地区验证。— This finding merits attention, but still needs testing in different regions.'],
      exercises: [
        { prompt: 'Which sentence recommends evaluating before expanding?', options: ['与其扩大规模，不如先评估现有方案。', '因为扩大规模，所以不评估。', '扩大规模的时候评估已经结束。'], answer: 0, explanation: '与其……不如…… contrasts a less suitable choice with a preferred alternative.' },
        { prompt: 'Which sentence maintains the main point despite a concession?', options: ['即使成本下降，也不能忽视服务质量。', '成本下降，所以服务质量相同。', '如果成本下降，服务质量昨天。'], answer: 0, explanation: '即使……也…… expresses concession while preserving the main clause.' },
        { prompt: 'Which conclusion is appropriately bounded?', options: ['This proves the plan works everywhere.', 'The finding merits attention but needs validation in other regions.', 'No evidence could change this result.'], answer: 1, explanation: 'It recognizes a result while limiting how far it can be generalized.' },
      ],
    },
  },
  'Modern Standard Arabic': {
    A1: {
      title: 'Agreement and nominal sentences',
      summary: 'Build clear noun phrases and simple present-time statements.',
      explanation: 'Adjectives follow nouns and agree in definiteness, gender, and number. A basic present-tense nominal sentence generally has no written present-tense equivalent of “am/is/are.”',
      examples: ['الطَّالِبَةُ الْجَدِيدَةُ — the new female student', 'الْمَكْتَبَةُ قَرِيبَةٌ — the library is nearby'],
      applicationHeading: 'Match demonstratives and nouns',
      application: 'Demonstratives such as هذا and هذه agree with the noun’s gender. Learn common nouns with their article because gender cannot always be predicted from spelling.',
      applicationExamples: ['هَذَا كِتَابٌ جَدِيدٌ — this is a new book', 'هَذِهِ مَدْرَسَةٌ كَبِيرَةٌ — this is a large school'],
      exercises: [
        { prompt: 'Choose the correct feminine phrase for “the new student.”', options: ['الطَّالِبَةُ الْجَدِيدَةُ', 'الطَّالِبَةُ الْجَدِيدُ', 'الطَّالِبُ الْجَدِيدَةُ'], answer: 0, explanation: 'Both the feminine noun and adjective use feminine agreement.' },
        { prompt: 'Which sentence means “The library is nearby”?', options: ['الْمَكْتَبَةُ قَرِيبَةٌ', 'الْمَكْتَبَةُ قَرِيبٌ', 'قَرِيبَةٌ الْمَكْتَبَةُ هِيَ'], answer: 0, explanation: 'The adjective agrees with the feminine noun.' },
        { prompt: 'Choose the correct demonstrative for مدرسة.', options: ['هَذَا مَدْرَسَةٌ', 'هَذِهِ مَدْرَسَةٌ', 'هَذِهِ مَدْرَسَةٍ'], answer: 1, explanation: 'هذه is the feminine singular demonstrative.' },
      ],
    },
    A2: {
      title: 'Idafa and attached pronouns',
      summary: 'Express possession and relations between nouns with linked noun phrases.',
      explanation: 'In an iḍāfa construction, the first noun is followed directly by a definite or identifying second noun. The first noun normally has no tanwīn or ال; the second noun determines definiteness.',
      examples: ['مَكْتَبَةُ الْجَامِعَةِ — the university library', 'بَيْتُهَا — her house'],
      applicationHeading: 'Use common prepositions and cases',
      application: 'Prepositions such as في and إلى govern the genitive. Attached pronouns join nouns and prepositions, so recognize them as part of the word.',
      applicationExamples: ['فِي مَكْتَبَةِ الْجَامِعَةِ — in the university library', 'إِلَيْهِ — to him / to it'],
      exercises: [
        { prompt: 'Choose “the university library.”', options: ['مَكْتَبَةُ الْجَامِعَةِ', 'الْمَكْتَبَةُ جَامِعَةٌ', 'مَكْتَبَةٌ الْجَامِعَةُ'], answer: 0, explanation: 'The linked nouns form an iḍāfa; the first noun takes no tanwīn.' },
        { prompt: 'Which phrase means “in the library”?', options: ['فِي الْمَكْتَبَةِ', 'إِلَى الْمَكْتَبَةُ', 'مِنَ الْمَكْتَبَةَ'], answer: 0, explanation: 'في is followed by a noun in the genitive.' },
        { prompt: 'What does بيتها mean?', options: ['her house', 'their houses', 'the house is far'], answer: 0, explanation: 'The attached pronoun ـها means “her.”' },
      ],
    },
    B1: {
      title: 'Subjunctive, jussive, and clause links',
      summary: 'Interpret mood after common particles and connect reasons, aims, and conditions.',
      explanation: 'Particles such as أنْ and لَنْ govern the subjunctive; لَمْ governs the jussive and refers to a negated past event. Recognizing the particle helps interpret the following verb.',
      examples: ['أُرِيدُ أَنْ أَتَعَلَّمَ — I want to learn', 'لَمْ يَصِلْ الْقِطَارُ — the train did not arrive'],
      applicationHeading: 'Build complex clauses',
      application: 'Use لأنّ to introduce a reason, لكي to express purpose, and إذا for a condition. A clear connector makes the relationship between events explicit.',
      applicationExamples: ['غَادَرْنَا مُبَكِّرًا لِكَيْ نَصِلَ فِي الْوَقْتِ — We left early so that we would arrive on time.', 'إِذَا تَوَفَّرَتِ الْبَيَانَاتُ، سَنَنْشُرُ التَّقْرِيرَ — If the data are available, we will publish the report.'],
      exercises: [
        { prompt: 'Choose the verb form after أَنْ in “I want to learn.”', options: ['أَتَعَلَّمَ', 'أَتَعَلَّمُ', 'أَتَعَلَّمْ'], answer: 0, explanation: 'أنْ governs the subjunctive form.' },
        { prompt: 'Which particle negates a past event and governs the jussive?', options: ['لَمْ', 'لَنْ', 'إِنَّ'], answer: 0, explanation: 'لم negates a past event and is followed by a jussive verb.' },
        { prompt: 'Which connector introduces a purpose?', options: ['لِكَيْ', 'لَكِنَّ', 'مُنْذُ'], answer: 0, explanation: 'لكي introduces the intended purpose.' },
      ],
    },
    B2: {
      title: 'Relative clauses and passive voice',
      summary: 'Identify embedded descriptions and shift attention between agents and events.',
      explanation: 'Relative pronouns such as الذي and التي connect a noun to a clause. The passive voice foregrounds an action or its affected participant when the agent is unknown or secondary.',
      examples: ['التَّقْرِيرُ الَّذِي نُشِرَ أَمْسِ — the report that was published yesterday', 'أُعْلِنَتِ النَّتَائِجُ — the results were announced'],
      applicationHeading: 'Use participles and formal connectors',
      application: 'Active and passive participles condense information; connectors such as مع ذلك and بالإضافة إلى ذلك clarify contrast and addition in formal argument.',
      applicationExamples: ['الْبَاحِثُونَ الْمُشَارِكُونَ فِي الدِّرَاسَةِ — the researchers participating in the study', 'وَمَعَ ذَلِكَ، تَحْتَاجُ النَّتَائِجُ إِلَى مُرَاجَعَةٍ — nevertheless, the results need review'],
      exercises: [
        { prompt: 'Which phrase means “the report that was published yesterday”?', options: ['التَّقْرِيرُ الَّذِي نُشِرَ أَمْسِ', 'أَمْسِ التَّقْرِيرُ الَّذِي نَشَرَ', 'نَشَرَ التَّقْرِيرُ أَمْسِ الَّذِي'], answer: 0, explanation: 'The relative pronoun links the noun to its describing clause.' },
        { prompt: 'Which sentence foregrounds the announced results?', options: ['أَعْلَنَتِ اللَّجْنَةُ النَّتَائِجَ', 'أُعْلِنَتِ النَّتَائِجُ', 'اللَّجْنَةُ النَّتَائِجُ أَعْلَنَ'], answer: 1, explanation: 'The passive form foregrounds the results rather than the agent.' },
        { prompt: 'Which connector means “nevertheless”?', options: ['مَعَ ذَلِكَ', 'لِكَيْ', 'مُنْذُ'], answer: 0, explanation: 'مع ذلك signals a contrast or concession.' },
      ],
    },
    C1: {
      title: 'Nominalization and source attribution',
      summary: 'Interpret dense academic phrasing and distinguish a source’s finding from analysis.',
      explanation: 'Formal Arabic often uses verbal nouns (maṣdar) to package processes as concepts. Source phrases such as وفقًا للتقرير and أشار الباحثون إلى separate attributed findings from the writer’s own interpretation.',
      examples: ['أَدَّى تَحْسِينُ النَّقْلِ إِلَى زِيَادَةِ الْمُشَارَكَةِ — improving transport led to increased participation', 'وَفْقًا لِلتَّقْرِيرِ، انْخَفَضَتِ التَّكَالِيفُ — according to the report, costs decreased'],
      applicationHeading: 'Qualify the strength of evidence',
      application: 'Use قد, ربما, and يبدو أنّ to mark degrees of confidence. Explicitly distinguish a reported association from a demonstrated causal link.',
      applicationExamples: ['قَدْ تُفَسِّرُ عَوَامِلُ أُخْرَى هَذِهِ النَّتِيجَةَ — other factors may explain this result', 'لَا تُثْبِتُ الْبَيَانَاتُ وَحْدَهَا وُجُودَ عِلَاقَةٍ سَبَبِيَّةٍ — the data alone do not establish a causal relation'],
      exercises: [
        { prompt: 'Which phrase attributes a claim to a report?', options: ['وَفْقًا لِلتَّقْرِيرِ', 'عَلَى الرَّغْمِ مِنْ ذَلِكَ', 'مِنْ أَجْلِ ذَلِكَ'], answer: 0, explanation: 'وفقًا للتقرير marks the report as the source.' },
        { prompt: 'Which statement appropriately limits a causal claim?', options: ['The data alone do not establish causation.', 'The finding proves every outcome.', 'No other factor could matter.'], answer: 0, explanation: 'It explicitly separates evidence from a stronger causal inference.' },
        { prompt: 'Which form packages “improvement” as a concept?', options: ['تَحْسِينُ', 'حَسَّنَ', 'يُحَسِّنُ'], answer: 0, explanation: 'تحسين is the verbal noun (maṣdar) of the form-II verb.' },
      ],
    },
    C2: {
      title: 'Rhetorical parallelism and register',
      summary: 'Use balanced constructions, concession, and precise formality in complex arguments.',
      explanation: 'Parallel constructions such as ليس الهدف... بل... distinguish a rejected interpretation from the intended claim. Concessive frames recognize a point without surrendering the main argument.',
      examples: ['لَيْسَ الْهَدَفُ زِيَادَةَ الْعَدَدِ، بَلْ تَحْسِينَ الْجَوْدَةِ — the aim is not to increase the number, but to improve quality', 'وَإِنْ كَانَتِ النَّتَائِجُ مُشَجِّعَةً، فَإِنَّهَا تَحْتَاجُ إِلَى تَأْكِيدٍ — although the results are encouraging, they need confirmation'],
      applicationHeading: 'Control emphasis without overstatement',
      application: 'Nominal clauses, fronting, and lexical choice can shift emphasis. In formal work, use this flexibility to clarify scope and acknowledge counterevidence rather than to imply certainty.',
      applicationExamples: ['أَمَّا الْمَرْحَلَةُ الثَّانِيَةُ فَتَحْتَاجُ إِلَى تَقْيِيمٍ مُسْتَقِلٍّ — as for the second phase, it needs independent evaluation', 'تَدْعَمُ النَّتَائِجُ هَذَا التَّفْسِيرَ جُزْئِيًّا، لَا كُلِّيًّا — the results support this interpretation in part, not entirely'],
      exercises: [
        { prompt: 'Which construction corrects one interpretation with another?', options: ['ليس الهدف... بل...', 'لأن... لذلك...', 'إذا... فسوف...'], answer: 0, explanation: 'ليس... بل... rejects one formulation and replaces it with a more accurate one.' },
        { prompt: 'Which statement appropriately limits the claim?', options: ['The results support the interpretation in part, not entirely.', 'The results prove every claim beyond doubt.', 'No evaluation is necessary.'], answer: 0, explanation: 'It explicitly limits the scope of the support.' },
        { prompt: 'What does أما المرحلة الثانية فتحتاج إلى تقييم مستقل do?', options: ['Foregrounds the second phase as a topic', 'Reports a completed election', 'Expresses a direct prohibition'], answer: 0, explanation: 'أما... فـ is a topic-fronting frame that focuses the following point.' },
      ],
    },
  },
  Russian: {
    A1: {
      title: 'Case roles and noun agreement',
      summary: 'Use common case forms and match adjectives to the nouns they describe.',
      explanation: 'Russian noun endings mark grammatical roles. A subject commonly appears in the nominative, while a direct object often takes the accusative; adjective endings agree with noun gender and number.',
      examples: ['новая книга — a new book (nominative feminine)', 'Я читаю новую книгу. — I am reading a new book (accusative feminine)'],
      applicationHeading: 'Learn prepositions with case',
      application: 'Prepositions govern particular cases. Memorize the preposition together with its case and a useful phrase rather than as an isolated translation.',
      applicationExamples: ['в университете — at/in the university (prepositional)', 'к преподавателю — to the instructor (dative)'],
      exercises: [
        { prompt: 'Choose “I am reading a new book.”', options: ['Я читаю новую книгу.', 'Я читаю новая книга.', 'Я читаю новой книге.'], answer: 0, explanation: 'The direct object and adjective take the feminine accusative form.' },
        { prompt: 'Which phrase means “at the university”?', options: ['в университете', 'к университету', 'из университет'], answer: 0, explanation: 'В with location takes the prepositional case.' },
        { prompt: 'Choose the feminine nominative phrase.', options: ['новая книга', 'новый книга', 'новую книга'], answer: 0, explanation: 'The adjective agrees with the feminine nominative noun.' },
      ],
    },
    A2: {
      title: 'Motion verbs and aspect in context',
      summary: 'Distinguish direction from repeated movement and choose a suitable aspect.',
      explanation: 'Common unidirectional and multidirectional motion verbs describe movement in different patterns. Perfective and imperfective pairs distinguish bounded outcomes from processes or repeated actions.',
      examples: ['Сейчас я иду в библиотеку. — I am walking to the library now.', 'Каждую неделю я хожу в библиотеку. — I go to the library every week.'],
      applicationHeading: 'Form future and past meanings',
      application: 'Imperfective verbs form the future with a form of быть plus the infinitive; perfective verbs use a simple future form. Past verbs agree in gender and number.',
      applicationExamples: ['Я буду читать вечером. — I will be reading this evening.', 'Она прочитала статью. — She read/finished the article.'],
      exercises: [
        { prompt: 'Choose the verb for “I go there every week.”', options: ['я хожу', 'я иду', 'я пошёл'], answer: 0, explanation: 'Repeated or habitual movement uses ходить.' },
        { prompt: 'Choose the imperfective future “I will be reading.”', options: ['Я буду читать.', 'Я прочитаю.', 'Я читал.'], answer: 0, explanation: 'The imperfective future uses буду plus the infinitive.' },
        { prompt: 'Which form means she completed reading the article?', options: ['Она читала статью.', 'Она прочитала статью.', 'Она будет читать статью.'], answer: 1, explanation: 'The perfective прочитала presents a completed result.' },
      ],
    },
    B1: {
      title: 'Aspectual pairs and subordinate clauses',
      summary: 'Select aspect for narrative viewpoint and connect causes, conditions, and contrasts.',
      explanation: 'Aspectual choice can distinguish background or repeated activity from a bounded event. Subordinating conjunctions establish relations between clauses, and tense/aspect should fit the intended timeline.',
      examples: ['Пока я читал, позвонил коллега. — While I was reading, a colleague called.', 'Когда мы закончим работу, отправим отчёт. — When we finish the work, we will send the report.'],
      applicationHeading: 'Express conditions and concessions',
      application: 'Если introduces a condition; хотя introduces a concession. Use the conjunction to make the relationship between claims explicit.',
      applicationExamples: ['Если появятся новые данные, мы пересмотрим вывод. — If new data appear, we will reconsider the conclusion.', 'Хотя времени было мало, группа проверила источники. — Although time was limited, the group checked the sources.'],
      exercises: [
        { prompt: 'Which sentence sets an ongoing background action interrupted by a call?', options: ['Пока я читал, позвонил коллега.', 'Я прочитал, пока коллега позвонит.', 'Я буду читать коллегу.'], answer: 0, explanation: 'The imperfective читал provides the background; the perfective позвонил marks the event.' },
        { prompt: 'Which word introduces a condition?', options: ['если', 'хотя', 'потому что'], answer: 0, explanation: 'Если means “if” and introduces a condition.' },
        { prompt: 'Which word introduces a concession?', options: ['хотя', 'поэтому', 'сначала'], answer: 0, explanation: 'Хотя means “although.”' },
      ],
    },
    B2: {
      title: 'Participles, passive voice, and reported claims',
      summary: 'Interpret compressed written clauses and attribute statements accurately.',
      explanation: 'Participles condense relative-clause information and agree with the noun. Passive and impersonal constructions focus on processes or results rather than an agent.',
      examples: ['опубликованный отчёт — the published report', 'Результаты были проверены независимой группой. — The results were checked by an independent group.'],
      applicationHeading: 'Separate quotation from paraphrase',
      application: 'According to-source phrases such as по данным отчёта mark attribution. Reported clauses should preserve the original degree of certainty and distinguish a claim from established fact.',
      applicationExamples: ['По данным отчёта, расходы снизились. — According to the report, expenses decreased.', 'Автор отмечает, что вывод требует проверки. — The author notes that the conclusion needs verification.'],
      exercises: [
        { prompt: 'Which phrase means “the published report”?', options: ['опубликованный отчёт', 'публикующий отчёт', 'отчёта опубликована'], answer: 0, explanation: 'The past passive participle describes a report that has been published.' },
        { prompt: 'Which sentence foregrounds the results rather than the checking group?', options: ['Группа проверила результаты.', 'Результаты были проверены независимой группой.', 'Независимая группа результатов.'], answer: 1, explanation: 'The passive construction places the results in subject position.' },
        { prompt: 'Which phrase attributes information to a report?', options: ['По данным отчёта', 'Несмотря на это', 'В следующий раз'], answer: 0, explanation: 'По данным отчёта explicitly identifies the source.' },
      ],
    },
    C1: {
      title: 'Academic attribution and nominal style',
      summary: 'Organize source-based claims and interpret compact academic syntax.',
      explanation: 'Formal Russian often uses verbal nouns to package processes as concepts. Attribution phrases distinguish a source’s results from the writer’s interpretation, while modality signals evidential strength.',
      examples: ['проведение исследования — conducting a study / the conduct of a study', 'Согласно данным, показатель постепенно вырос. — According to the data, the measure gradually increased.'],
      applicationHeading: 'Qualify inference and causation',
      application: 'Use по-видимому, вероятно, and может быть связано с to mark inference or possibility. An association alone does not establish a cause.',
      applicationExamples: ['Наблюдаемая связь может быть связана с сезонностью. — The observed association may be related to seasonality.', 'Данные сами по себе не доказывают причинную связь. — The data alone do not prove a causal relationship.'],
      exercises: [
        { prompt: 'Which expression attributes a claim to data?', options: ['Согласно данным', 'Несмотря на данные', 'Вместо данных'], answer: 0, explanation: 'Согласно данным means “according to the data.”' },
        { prompt: 'Which statement properly qualifies causation?', options: ['The data prove the cause in all cases.', 'The association may be related to seasonality.', 'No other explanation is possible.'], answer: 1, explanation: 'Может быть связано с expresses a possible relation rather than certainty.' },
        { prompt: 'Which form is a verbal noun meaning “conduct of a study”?', options: ['проведение исследования', 'исследовал', 'исследуемый'], answer: 0, explanation: 'Проведение is a verbal noun that packages the process.' },
      ],
    },
    C2: {
      title: 'Information structure and stylistic control',
      summary: 'Use word order, particles, and concession to express subtle stance.',
      explanation: 'Russian word order can foreground a contrast or establish a topic without changing the basic proposition. Particles such as именно and лишь add focus or restriction and must be interpreted in context.',
      examples: ['Именно этот вывод требует дополнительной проверки. — It is precisely this conclusion that needs further checking.', 'Лишь часть участников поддержала предложение. — Only some of the participants supported the proposal.'],
      applicationHeading: 'Manage concession and register',
      application: 'Хотя and пусть даже recognize a counterpoint; the main clause states what still follows. Select formal or conversational vocabulary according to audience and genre.',
      applicationExamples: ['Хотя оценка предварительная, она выявляет важное ограничение. — Although the assessment is preliminary, it identifies an important limitation.', 'Не столько объём данных, сколько их сопоставимость влияет на вывод. — The conclusion depends not so much on the volume of data as on their comparability.'],
      exercises: [
        { prompt: 'What does именно emphasize in the example?', options: ['This particular conclusion', 'Every conclusion equally', 'No conclusion at all'], answer: 0, explanation: 'Именно focuses attention on the specified conclusion.' },
        { prompt: 'Which sentence limits the claim to some participants?', options: ['Лишь часть участников поддержала предложение.', 'Все участники поддержали предложение.', 'Участники могли поддержать предложение завтра.'], answer: 0, explanation: 'Лишь means “only” and restricts the scope.' },
        { prompt: 'Which sentence compares relative importance rather than quantity alone?', options: ['Не столько объём данных, сколько их сопоставимость влияет на вывод.', 'Данных много.', 'Вывод был вчера.'], answer: 0, explanation: 'The paired construction contrasts volume with comparability.' },
      ],
    },
  },
}

export function buildCollegeGrammarLessons(language: AddedLanguage): GrammarLesson[] {
  return (Object.entries(extensions[language]) as Array<[Exclude<CourseLevel, 'Pre-A1'>, Extension]>).map(([level, unit]) => ({
    id: `${language === 'Mandarin Chinese' ? 'zh' : language === 'Modern Standard Arabic' ? 'ar' : 'ru'}-college-grammar-${level.toLowerCase()}`,
    level,
    title: unit.title,
    summary: unit.summary,
    sections: [
      { heading: 'Core form and meaning', explanation: unit.explanation, examples: unit.examples },
      { heading: unit.applicationHeading, explanation: unit.application, examples: unit.applicationExamples },
    ],
    exercises: unit.exercises,
  }))
}
