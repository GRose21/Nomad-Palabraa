import type { CourseLevel } from './learnCourse'
import { ilrReference } from './ilr'

type CourseLevelBadgeProps = {
  level: CourseLevel
}

function CourseLevelBadge({ level }: CourseLevelBadgeProps) {
  return (
    <span className="course-level-badge" aria-label={`CEFR ${level}; approximate reading reference ${ilrReference[level]}`}>
      <strong>{level}</strong>
      <small>{ilrReference[level]}</small>
    </span>
  )
}

export default CourseLevelBadge
