import type { CourseLevel } from './learnCourse'
import { collegeCourses } from './collegeCurriculum'

type CollegeCourseCardProps = {
  level: CourseLevel
  mode: 'learn' | 'grammar'
}

function CollegeCourseCard({ level, mode }: CollegeCourseCardProps) {
  const course = collegeCourses[level]

  return (
    <aside className="college-course-card">
      <div className="college-course-heading">
        <span className="eyebrow">{course.year}</span>
        <strong>{course.course}</strong>
      </div>
      <p>{mode === 'learn' ? course.focus : course.grammarFocus}</p>
      <ul>{(mode === 'learn' ? course.outcomes : [course.grammarFocus, course.studyPractice]).map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
      <p className="college-signature-task"><strong>{mode === 'learn' ? 'Signature work:' : 'Grammar application:'}</strong> {mode === 'learn' ? course.signatureTask : course.grammarTask}</p>
    </aside>
  )
}

export default CollegeCourseCard
