export const courseAssessmentInterval = 5

export function getNextCourseAssessmentMilestone(completedLessons: number, completedMilestones: readonly number[]) {
  const eligibleMilestones = Array.from(
    { length: Math.floor(completedLessons / courseAssessmentInterval) },
    (_, index) => (index + 1) * courseAssessmentInterval,
  )
  const unfinishedMilestone = eligibleMilestones.find((milestone) => !completedMilestones.includes(milestone))
  return unfinishedMilestone ?? (eligibleMilestones.length + 1) * courseAssessmentInterval
}
