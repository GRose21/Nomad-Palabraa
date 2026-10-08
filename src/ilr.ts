import type { CourseLevel } from './learnCourse'

export const ilrReference: Record<CourseLevel, string> = {
  'Pre-A1': 'ILR 0–0+',
  A1: 'ILR 0+–1',
  A2: 'ILR 1',
  B1: 'ILR 1+–2',
  B2: 'ILR 2–2+',
  C1: 'ILR 3',
  C2: 'ILR 3+–4',
}

export const ilrDisclaimer = 'ILR and CEFR are distinct frameworks. These approximate level references are a study guide only; they do not predict or certify a DLPT score.'

export function stripCefrPrefix(title: string, level: CourseLevel) {
  return title.startsWith(`${level} `) ? title.slice(level.length + 1) : title
}

export function formatCourseLevel(level: CourseLevel) {
  return `${level} · ${ilrReference[level]}`
}
