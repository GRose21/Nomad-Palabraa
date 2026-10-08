import type { CourseLevel } from './learnCourse'
import { ilrReference } from './ilr'

type CourseLevelBadgeProps = {
  level: CourseLevel
  primary?: 'cefr' | 'ilr'
}

function CourseLevelBadge({ level, primary = 'cefr' }: CourseLevelBadgeProps) {
  return (
    <span className="course-level-badge" aria-label={primary === 'ilr' ? `${ilrReference[level]}; approximate CEFR equivalent ${level}` : `CEFR ${level}; approximate reading reference ${ilrReference[level]}`}>
      <strong>{primary === 'ilr' ? ilrReference[level] : level}</strong>
      <small>{primary === 'ilr' ? `CEFR ${level}` : ilrReference[level]}</small>
    </span>
  )
}

export default CourseLevelBadge
