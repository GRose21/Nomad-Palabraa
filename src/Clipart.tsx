import type { ReactElement } from 'react'

export type ClipTheme = 'greet' | 'family' | 'food' | 'travel' | 'school' | 'work' | 'health' | 'weather' | 'past' | 'future' | 'news' | 'opinion' | 'home' | 'default'

const themePatterns: Array<[RegExp, ClipTheme]> = [
  [/greet|hello|introduc|name|first words|polite|goodbye|meet/i, 'greet'],
  [/family|friend|people|person/i, 'family'],
  [/food|eat|restaurant|cafe|café|order|meal|market|shop|buy/i, 'food'],
  [/travel|train|station|airport|direction|city|street|transport|hotel/i, 'travel'],
  [/school|class|study|univers|college|book|read|library/i, 'school'],
  [/work|job|office|business|meeting|career/i, 'work'],
  [/health|doctor|body|hospital/i, 'health'],
  [/weather|season|nature|garden|park/i, 'weather'],
  [/past|story|narrat|history|yesterday|preterite|imperfect|sequence/i, 'past'],
  [/future|plan|tomorrow|conditional/i, 'future'],
  [/news|report|argument|debate|policy|law|government|research|evidence|formal|academic|discourse|register/i, 'news'],
  [/subjunctive|opinion|wish|doubt|emotion/i, 'opinion'],
  [/home|house|room|routine|daily/i, 'home'],
]

export function clipThemeForLesson(title: string): ClipTheme {
  return themePatterns.find(([pattern]) => pattern.test(title))?.[1] ?? 'default'
}

const ink = '#26413c'
const skins = ['#f6c9a0', '#d9a066', '#8d5a3b', '#fbd9b8']

function Person({ x, y, shirt, skin = skins[0], hair = '#3b2a20', scale = 1, arm = 'down' }: { x: number; y: number; shirt: string; skin?: string; hair?: string; scale?: number; arm?: 'down' | 'wave' }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
    <path d="M-22 60 Q-22 28 0 28 Q22 28 22 60 Z" fill={shirt} />
    {arm === 'wave' ? <path d="M18 40 Q36 30 34 10" fill="none" strokeWidth="7" stroke={skin} /> : <path d="M-18 42 Q-24 54 -20 60" fill="none" strokeWidth="6" stroke={skin} />}
    <circle cx="0" cy="12" r="17" fill={skin} />
    <path d="M-17 8 Q-14 -8 0 -6 Q15 -8 17 8 Q8 0 -2 2 Q-10 2 -17 8Z" fill={hair} />
    <circle cx="-6" cy="14" r="1.8" fill={ink} stroke="none" /><circle cx="6" cy="14" r="1.8" fill={ink} stroke="none" />
    <path d="M-5 21 Q0 25 5 21" fill="none" strokeWidth="2" />
  </g>
}

function Bubble({ x, y, text, w = 56 }: { x: number; y: number; text: string; w?: number }) {
  return <g stroke={ink} strokeWidth="2.5" strokeLinejoin="round">
    <path d={`M${x} ${y} h${w} a8 8 0 0 1 8 8 v16 a8 8 0 0 1 -8 8 h-${w - 34} l-10 10 l2 -10 h-${w - 36}a8 8 0 0 1 -8 -8 v-16 a8 8 0 0 1 8 -8z`} fill="#fff" />
    <text x={x + (w + 8) / 2 - 4} y={y + 25} textAnchor="middle" fontSize="15" fontWeight="800" fill={ink} stroke="none" fontFamily="Georgia, serif">{text}</text>
  </g>
}

const scenesArt: Record<ClipTheme, (word: string) => ReactElement> = {
  greet: (word) => <><Person x={70} y={52} shirt="#ef8354" arm="wave" /><Person x={170} y={52} shirt="#4f9d8c" skin={skins[2]} hair="#1b1410" arm="wave" /><Bubble x={28} y={8} text={word} /></>,
  family: () => <><Person x={60} y={58} shirt="#e85d75" skin={skins[1]} /><Person x={120} y={58} shirt="#3b6fc4" /><Person x={178} y={84} shirt="#f2b134" scale={0.65} skin={skins[3]} /><path d="M120 24 q-8 -10 -16 0 q0 9 16 18 q16 -9 16 -18 q-8 -10 -16 0z" fill="#e85d75" stroke={ink} strokeWidth="2.5" transform="translate(-10 -6) scale(.8)" /></>,
  food: () => <><ellipse cx="120" cy="116" rx="86" ry="10" fill="#cfd8d4" /><rect x="58" y="70" width="124" height="10" rx="4" fill="#b9814b" stroke={ink} strokeWidth="2.5" /><path d="M72 80 v34 M168 80 v34" stroke={ink} strokeWidth="4" /><path d="M82 70 q0 -26 28 -26 q28 0 28 26z" fill="#fff" stroke={ink} strokeWidth="2.5" /><circle cx="110" cy="44" r="4" fill="#f2b134" stroke={ink} strokeWidth="2" /><rect x="146" y="46" width="24" height="24" rx="5" fill="#fff" stroke={ink} strokeWidth="2.5" /><path d="M170 52 q12 0 12 9 q0 9 -12 9" fill="none" stroke={ink} strokeWidth="2.5" /><path d="M152 38 q-4 -6 0 -10 M162 38 q-4 -6 0 -10" stroke="#8aa" strokeWidth="2.5" fill="none" strokeLinecap="round" /></>,
  travel: () => <><path d="M0 112 H240" stroke={ink} strokeWidth="3" /><rect x="22" y="58" width="150" height="46" rx="14" fill="#3b6fc4" stroke={ink} strokeWidth="2.5" />{[40, 76, 112].map((x) => <rect key={x} x={x} y="68" width="26" height="18" rx="3" fill="#dff1ff" stroke={ink} strokeWidth="2" />)}<rect x="146" y="68" width="16" height="30" rx="3" fill="#f2b134" stroke={ink} strokeWidth="2" /><circle cx="52" cy="108" r="9" fill="#fff" stroke={ink} strokeWidth="3" /><circle cx="140" cy="108" r="9" fill="#fff" stroke={ink} strokeWidth="3" /><path d="M200 112 V50 M200 54 h28 l-8 9 l8 9 h-28" fill="#e85d75" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" /></>,
  school: () => <><rect x="24" y="14" width="130" height="80" rx="6" fill="#2f6f5e" stroke="#8a5a2b" strokeWidth="6" /><path d="M42 40 h60 M42 58 h86 M42 76 h40" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".85" /><g stroke={ink} strokeWidth="2.5" strokeLinejoin="round"><rect x="168" y="70" width="52" height="40" rx="3" fill="#ef8354" /><path d="M194 70 v40" /><path d="M158 60 l30 -14 l30 14 l-30 14z" fill="#26413c" /><path d="M172 66 v12 q16 8 32 0 v-12" fill="#3a5a54" /></g></>,
  work: () => <><rect x="30" y="72" width="170" height="10" rx="4" fill="#b9814b" stroke={ink} strokeWidth="2.5" /><path d="M46 82 v32 M184 82 v32" stroke={ink} strokeWidth="4" /><rect x="80" y="28" width="76" height="46" rx="5" fill="#dff1ff" stroke={ink} strokeWidth="2.5" /><path d="M118 74 v-0" /><path d="M92 62 l16 -14 l12 8 l22 -18" fill="none" stroke="#e85d75" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /><rect x="164" y="48" width="34" height="24" rx="4" fill="#f2b134" stroke={ink} strokeWidth="2.5" /><path d="M174 48 v-6 h14 v6" fill="none" stroke={ink} strokeWidth="2.5" /></>,
  health: () => <><Person x={72} y={52} shirt="#fff" /><path d="M64 80 q-14 20 8 28 q14 0 14 -14" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" /><circle cx="86" cy="96" r="5" fill="#8aa" stroke={ink} strokeWidth="2.5" /><rect x="136" y="34" width="70" height="70" rx="14" fill="#fff" stroke={ink} strokeWidth="2.5" /><path d="M171 50 v38 M152 69 h38" stroke="#e85d75" strokeWidth="11" strokeLinecap="round" /></>,
  weather: () => <><circle cx="70" cy="46" r="24" fill="#f6c453" stroke={ink} strokeWidth="2.5" />{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <path key={a} d="M70 10 v8" stroke={ink} strokeWidth="3" strokeLinecap="round" transform={`rotate(${a} 70 46)`} />)}<path d="M112 84 q-18 0 -18 -14 q0 -14 18 -14 q6 -16 26 -12 q14 -6 28 6 q16 2 16 18 q0 16 -16 16z" fill="#fff" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" /><path d="M120 98 l-4 12 M140 98 l-4 12 M160 98 l-4 12" stroke="#3b6fc4" strokeWidth="3.5" strokeLinecap="round" /></>,
  past: () => <><rect x="46" y="24" width="86" height="92" rx="6" fill="#fff3d6" stroke={ink} strokeWidth="2.5" /><path d="M62 48 h54 M62 64 h54 M62 80 h36" stroke="#b9814b" strokeWidth="4" strokeLinecap="round" /><circle cx="176" cy="68" r="34" fill="#fff" stroke={ink} strokeWidth="3" /><path d="M176 68 v-20 M176 68 l14 8" stroke={ink} strokeWidth="4" strokeLinecap="round" /><path d="M150 40 q-12 8 -14 22 m0 0 l-4 -10 m4 10 l10 -4" fill="none" stroke="#e85d75" strokeWidth="3.5" strokeLinecap="round" /></>,
  future: () => <><path d="M120 12 q22 24 14 62 h-28 q-8 -38 14 -62z" fill="#fff" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" /><circle cx="120" cy="44" r="9" fill="#3b6fc4" stroke={ink} strokeWidth="2.5" /><path d="M106 70 l-16 18 l8 -34 M134 70 l16 18 l-8 -34" fill="#e85d75" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" /><path d="M112 76 q8 30 8 34 q0 -4 8 -34z" fill="#f6c453" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" /><path d="M40 30 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3z M196 60 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3z" fill="#f6c453" stroke={ink} strokeWidth="2" /></>,
  news: () => <><rect x="40" y="22" width="120" height="92" rx="5" fill="#fff" stroke={ink} strokeWidth="2.5" /><rect x="52" y="34" width="50" height="8" fill={ink} /><rect x="52" y="50" width="34" height="28" fill="#9ccbd0" stroke={ink} strokeWidth="2" /><path d="M94 52 h54 M94 62 h54 M94 72 h40 M52 88 h96 M52 98 h96" stroke="#8a9a96" strokeWidth="3" strokeLinecap="round" /><circle cx="196" cy="58" r="20" fill="#dff1ff" stroke={ink} strokeWidth="3" /><path d="M210 72 l16 18" stroke={ink} strokeWidth="6" strokeLinecap="round" /></>,
  opinion: () => <><Person x={80} y={58} shirt="#8a52c4" skin={skins[3]} /><g stroke={ink} strokeWidth="2.5"><circle cx="150" cy="38" r="16" fill="#fff" /><circle cx="140" cy="62" r="7" fill="#fff" /><circle cx="134" cy="76" r="4" fill="#fff" /><path d="M146 32 q0 -8 8 -4 q6 6 -4 12 v4" fill="none" strokeLinecap="round" /><circle cx="150" cy="48" r="1.5" fill={ink} /></g><path d="M178 24 q10 -10 20 0 M190 14 l2 -8 M204 22 l8 -4" stroke="#f2b134" strokeWidth="3.5" fill="none" strokeLinecap="round" /></>,
  home: () => <><path d="M44 66 L120 14 L196 66 V112 H44z" fill="#ffe8c2" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" /><path d="M32 68 L120 8 L208 68" fill="none" stroke="#c44b3b" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" /><rect x="104" y="72" width="32" height="40" rx="4" fill="#8a5a2b" stroke={ink} strokeWidth="2.5" /><rect x="58" y="72" width="30" height="26" rx="3" fill="#dff1ff" stroke={ink} strokeWidth="2.5" /><rect x="152" y="72" width="30" height="26" rx="3" fill="#dff1ff" stroke={ink} strokeWidth="2.5" /></>,
  default: () => <><path d="M40 36 q40 -16 80 4 q40 -20 80 -4 v70 q-40 -16 -80 4 q-40 -20 -80 -4z" fill="#fff" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" /><path d="M120 40 v70" stroke={ink} strokeWidth="2.5" /><path d="M56 56 q22 -6 46 2 M56 72 q22 -6 46 2 M138 58 q24 -8 46 -2 M138 74 q24 -8 46 -2" stroke="#4f9d8c" strokeWidth="3.5" fill="none" strokeLinecap="round" /><path d="M170 16 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4z" fill="#f6c453" stroke={ink} strokeWidth="2" /></>,
}

export function LessonClipart({ theme, word = '¡Hola!', className = '' }: { theme: ClipTheme; word?: string; className?: string }) {
  return <svg className={`clipart ${className}`} viewBox="0 0 240 124" role="img" aria-label={`Cartoon illustration: ${theme}`} focusable="false">
    <rect width="240" height="124" rx="14" fill="#fff8e6" />
    <circle cx="214" cy="16" r="8" fill="#f6c453" opacity=".5" /><circle cx="22" cy="104" r="12" fill="#9ccbd0" opacity=".4" />
    {scenesArt[theme](word)}
  </svg>
}

export const greetingWord: Record<string, string> = { Spanish: '¡Hola!', Italian: 'Ciao!', 'Mandarin Chinese': '你好!', 'Modern Standard Arabic': 'مرحبا', Russian: 'Привет!' }
