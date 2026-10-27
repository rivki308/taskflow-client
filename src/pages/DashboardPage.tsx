import { useQuery } from '@tanstack/react-query'
import { Box, Paper, Typography, LinearProgress, CircularProgress } from '@mui/material'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import { getDashboardSummary } from '../api/dashboard'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import StatCard from '../components/StatCard'
import PageHeader from '../ui/PageHeader'
import { taskStatusLabels } from '../utils/labels'
import { colors } from '../theme/theme'
import { styles, bar, statusColors } from '../styles/dashboard.styles'

export default function DashboardPage() {
    const { user } = useAuth()
    const { data, isLoading, error } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboardSummary,
    })

    if (isLoading) return <Loading />
    if (error) return <ErrorMessage error={error} />
    if (!data) return null

    const total = data.tasks.total
    const percentOf = (n: number) => (total ? Math.round((n / total) * 100) : 0)
    const donePercent = percentOf(data.tasks.byStatus['Done'])

    return (
        <main>
            <PageHeader
                title="לוח הבקרה"
                icon={<DashboardOutlinedIcon />}
                subtitle={`שלום ${user?.name ?? ''}, ${data.scope === 'all' ? 'זו תמונת המצב של כל המשימות במערכת' : 'זו תמונת המצב של המשימות שלך'}`}
            />

            <Box sx={styles.stats}>
                <StatCard title="סך הכול משימות" value={total} icon={<AssignmentOutlinedIcon />} color={colors.blue} />
                <StatCard title="משימות פתוחות" value={data.tasks.open} icon={<PendingActionsOutlinedIcon />} color={colors.orange} />
                <StatCard title="הושלמו" value={data.tasks.byStatus['Done']} icon={<TaskAltIcon />} color={colors.green} />
                <StatCard title="באיחור" value={data.tasks.overdue} icon={<WarningAmberRoundedIcon />} color={colors.red} />
            </Box>

            <Box sx={styles.grid}>
                <Paper sx={styles.panel}>
                    <Typography component="h2" sx={styles.panelTitle}>משימות לפי סטטוס</Typography>
                    {(['To Do', 'In Progress', 'Done'] as const).map((status) => (
                        <Box key={status} sx={styles.barRow}>
                            <Box sx={styles.barTop}>
                                <Typography sx={styles.barLabel}>{taskStatusLabels[status]}</Typography>
                                <Typography sx={styles.barValue}>
                                    {data.tasks.byStatus[status]} משימות · {percentOf(data.tasks.byStatus[status])}%
                                </Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={percentOf(data.tasks.byStatus[status])} sx={bar(statusColors[status])} />
                        </Box>
                    ))}
                </Paper>

                <Paper sx={styles.donePanel}>
                    <Typography component="h2" sx={styles.doneTitle}>אחוז השלמה</Typography>
                    <Box sx={styles.ring}>
                        <CircularProgress variant="determinate" value={100} size={140} thickness={5} sx={styles.ringBg} />
                        <CircularProgress variant="determinate" value={donePercent} size={140} thickness={5} sx={styles.ringValue} />
                        <Box sx={styles.ringCenter}><Typography sx={styles.ringText}>{donePercent}%</Typography></Box>
                    </Box>
                    <Typography sx={styles.doneText}>{data.tasks.byStatus['Done']} מתוך {total} משימות הושלמו</Typography>

                    {(data.projects || data.employees !== undefined) && (
                        <Box sx={styles.extras}>
                            {data.projects && (
                                <Box sx={styles.extra}>
                                    <FolderOutlinedIcon sx={styles.extraIcon} />
                                    <Typography sx={styles.extraValue}>{data.projects.active}</Typography>
                                    <Typography sx={styles.extraLabel}>פרויקטים פעילים</Typography>
                                </Box>
                            )}
                            {data.employees !== undefined && (
                                <Box sx={styles.extra}>
                                    <PeopleOutlinedIcon sx={styles.extraIcon} />
                                    <Typography sx={styles.extraValue}>{data.employees}</Typography>
                                    <Typography sx={styles.extraLabel}>עובדים</Typography>
                                </Box>
                            )}
                        </Box>
                    )}
                </Paper>
            </Box>
        </main>
    )
}
