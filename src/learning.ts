export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export function getActivityScore(answers: number[], correctAnswers: number[]): number {
  return answers.reduce((score, answer, index) => score + (answer === correctAnswers[index] ? 1 : 0), 0)
}

export function getLevelFromScore(score: number): Level {
  if (score >= 15) return 'C2'
  if (score >= 12) return 'C1'
  if (score >= 9) return 'B2'
  if (score >= 6) return 'B1'
  if (score >= 3) return 'A2'
  return 'A1'
}

export function getDailyMinutes(
  stored: { minutes?: number; lastActivityDate?: string },
  today: string,
  addedMinutes = 0,
) {
  if (stored.lastActivityDate !== today) {
    return { minutes: addedMinutes, lastActivityDate: today }
  }
  return { minutes: (stored.minutes || 0) + addedMinutes, lastActivityDate: today }
}

function formatLocalDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getWeekDays(date: Date) {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const daysSinceMonday = (monday.getDay() + 6) % 7
  monday.setDate(monday.getDate() - daysSinceMonday)
  const today = formatLocalDate(date)

  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + index)
    return {
      date: formatLocalDate(day),
      label: new Intl.DateTimeFormat('en', { weekday: 'short' }).format(day),
      isToday: formatLocalDate(day) === today,
    }
  })
}

export function getStreak(activeDates: string[], today: string): number {
  const activeDateSet = new Set(activeDates)
  const current = new Date(`${today}T12:00:00`)
  if (Number.isNaN(current.getTime())) return 0

  if (!activeDateSet.has(today)) current.setDate(current.getDate() - 1)

  let streak = 0
  while (activeDateSet.has(formatLocalDate(current))) {
    streak += 1
    current.setDate(current.getDate() - 1)
  }
  return streak
}
