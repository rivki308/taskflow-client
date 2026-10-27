import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Box, Paper, Typography, Button, TextField, Divider } from '@mui/material'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import { getTask, updateTask, deleteTask } from '../api/tasks'
import type { TaskStatus } from '../types'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import { taskStatusLabels } from '../utils/labels'
import StatusBadge from '../components/StatusBadge'
import PriorityBadge from '../components/PriorityBadge'
import PageHeader from '../ui/PageHeader'
import { styles } from '../styles/task.styles'
import { selectProps } from '../styles/form.styles'

export default function TaskDetailsPage() {
    const { id } = useParams()
    const taskId = Number(id)
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { data: task, isLoading, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTask(taskId),
    })

    const statusMutation = useMutation({
        mutationFn: (newStatus: TaskStatus) => updateTask(taskId, { status: newStatus }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })

    const deleteMutation = useMutation({
        mutationFn: () => deleteTask(taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            navigate('/tasks')
        },
    })

    function handleDelete() {
        if (window.confirm('למחוק את המשימה?')) {
            deleteMutation.mutate()
        }
    }

    if (isLoading) return <Loading />
    if (error) return <ErrorMessage error={error} />
    if (!task) return null

    const isAdmin = user?.role === 'Admin'

    return (
        <main>
            <PageHeader
                title={task.title}
                icon={<AssignmentOutlinedIcon />}
                action={isAdmin && (
                    <Box sx={styles.actions}>
                        <Button component={Link} to={`/tasks/${task.id}/edit`} variant="contained" startIcon={<EditOutlinedIcon />}>עריכת משימה</Button>
                        <Button variant="outlined" color="error" startIcon={<DeleteOutlinedIcon />} onClick={handleDelete} disabled={deleteMutation.isPending}>
                            {deleteMutation.isPending ? 'מוחקת...' : 'מחיקה'}
                        </Button>
                    </Box>
                )}
            />
            {deleteMutation.error && <ErrorMessage error={deleteMutation.error} />}
            <Box sx={styles.layout}>
                <Paper className="card" sx={styles.card}>
                    <Typography sx={styles.label}><DescriptionOutlinedIcon />תיאור:</Typography>
                    <Typography sx={styles.description}>{task.description ?? 'אין תיאור'}</Typography>
                    <Box sx={styles.info}>
                        <Box><Typography sx={styles.label}><LoopOutlinedIcon />סטטוס:</Typography><StatusBadge status={task.status} /></Box>
                        <Box><Typography sx={styles.label}><FlagOutlinedIcon />עדיפות:</Typography><PriorityBadge priority={task.priority} /></Box>
                        <Box><Typography sx={styles.label}><EventOutlinedIcon />תאריך יעד:</Typography><Typography sx={styles.value}>{new Date(task.dueDate).toLocaleDateString('he-IL')}</Typography></Box>
                        <Box><Typography sx={styles.label}><PersonOutlinedIcon />משויכת ל:</Typography><Typography sx={styles.value}>{task.assignedTo.name}</Typography></Box>
                        <Box><Typography sx={styles.label}><FolderOutlinedIcon />פרויקט:</Typography><Typography sx={styles.value}>{task.project.name}</Typography></Box>
                        <Box><Typography sx={styles.label}><BadgeOutlinedIcon />נוצרה על ידי:</Typography><Typography sx={styles.value}>{task.createdBy.name}</Typography></Box>
                    </Box>
                    <Divider sx={styles.divider} />
                    <TextField
                        select size="small" label="שינוי סטטוס:" slotProps={selectProps} sx={styles.statusSelect}
                        value={task.status}
                        onChange={(e) => statusMutation.mutate(e.target.value as TaskStatus)}
                        disabled={statusMutation.isPending}
                    >
                        {Object.entries(taskStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}

                    </TextField>
                    {statusMutation.error && <ErrorMessage error={statusMutation.error} />}
                </Paper>
                <Box sx={styles.side}>
                    <Typography component="h2" sx={styles.sideTitle}><ChatBubbleOutlineOutlinedIcon />הערות</Typography>
                    <CommentList taskId={task.id} />
                    <CommentForm taskId={task.id} />
                </Box>
            </Box>
        </main>
    )
}
