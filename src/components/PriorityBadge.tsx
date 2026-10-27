import { Chip } from '@mui/material'
import type { Task } from '../types'
import { taskPriorityLabels } from '../utils/labels'
import { priorityChip } from '../styles/ui.styles'

export default function PriorityBadge({ priority }: { priority: Task['priority'] }) {
    return <Chip size="small" className="badge" label={taskPriorityLabels[priority]} sx={priorityChip[priority]} />
}
