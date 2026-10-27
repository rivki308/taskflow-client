import { Chip } from '@mui/material'
import type { Task } from '../types'
import { taskStatusLabels } from '../utils/labels'
import { statusChip } from '../styles/ui.styles'

export default function StatusBadge({ status }: { status: Task['status'] }) {
    return <Chip size="small" className="badge" label={taskStatusLabels[status]} sx={statusChip[status]} />
}
