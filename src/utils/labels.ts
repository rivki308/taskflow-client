import type { Task, Project } from '../types'

export const taskStatusLabels: Record<Task['status'], string> = {
    'To Do': 'לביצוע',
    'In Progress': 'בתהליך',
    Done: 'הושלמה',
}

export const taskPriorityLabels: Record<Task['priority'], string> = {
    Low: 'נמוכה',
    Medium: 'בינונית',
    High: 'גבוהה',
}

export const projectStatusLabels: Record<Project['status'], string> = {
    Active: 'פעיל',
    'On Hold': 'מושהה',
    Completed: 'הושלם',
}