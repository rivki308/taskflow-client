import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Paper, TextField, Button, InputAdornment, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Box } from '@mui/material'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'
import { getTasks, type TaskFilters } from '../api/tasks'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import StatusBadge from '../components/StatusBadge'
import PriorityBadge from '../components/PriorityBadge'
import Pagination from '../components/Pagination'
import { taskStatusLabels, taskPriorityLabels } from '../utils/labels'
import PageHeader from '../ui/PageHeader'
import Empty from '../ui/Empty'
import { common } from '../styles/common.styles'
import { selectProps } from '../styles/form.styles'

export default function TasksPage() {
    const [filters, setFilters] = useState<TaskFilters>({ sortBy: 'dueDate', sortOrder: 'asc' })
    const [page, setPage] = useState(1)
    const { user } = useAuth()

    const { data, isLoading, error } = useQuery({
        queryKey: ['tasks', filters, page],
        queryFn: () => getTasks({ ...filters, page }),
    })

    function updateFilters(changes: Partial<TaskFilters>) {
        setFilters({ ...filters, ...changes })
        setPage(1)
    }

    return (
        <main>
            <PageHeader
                title="רשימת משימות"
                icon={<AssignmentOutlinedIcon />}
                action={user?.role === 'Admin' && <Button component={Link} to="/tasks/new" variant="contained" startIcon={<AddIcon />}>משימה חדשה</Button>}
            />
            <Paper className="filters" sx={common.filters}>
                <TextField
                    size="small"
                    placeholder="חיפוש משימה..."
                    value={filters.search ?? ''}
                    onChange={(e) => updateFilters({ search: e.target.value })}
                    sx={common.search}
                    slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> } }}
                />

                <TextField
                    select size="small" slotProps={selectProps} sx={common.select}
                    value={filters.status ?? ''}
                    onChange={(e) => updateFilters({ status: (e.target.value || undefined) as TaskFilters['status'] })}
                >
                    <option value="">כל הסטטוסים</option>
                    {Object.entries(taskStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </TextField>


                <TextField
                    select size="small" slotProps={selectProps} sx={common.select}
                    value={filters.priority ?? ''}
                    onChange={(e) => updateFilters({ priority: (e.target.value || undefined) as TaskFilters['priority'] })}
                >
                    <option value="">כל העדיפויות</option>
                    {Object.entries(taskPriorityLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}

                </TextField>

                <TextField
                    select size="small" slotProps={selectProps} sx={common.select}
                    value={`${filters.sortBy}-${filters.sortOrder}`}
                    onChange={(e) => {
                        const [sortBy, sortOrder] = e.target.value.split('-') as [TaskFilters['sortBy'], TaskFilters['sortOrder']]
                        updateFilters({ sortBy, sortOrder })
                    }}
                >
                    <option value="dueDate-asc">תאריך יעד: הקרוב קודם</option>
                    <option value="dueDate-desc">תאריך יעד: הרחוק קודם</option>
                    <option value="createdAt-desc">החדשות קודם</option>
                    <option value="title-asc">כותרת: א–ת</option>
                </TextField>
            </Paper>

            {isLoading && <Loading />}
            {error && <ErrorMessage error={error} />}

            {data && data.data.length === 0 && <Paper><Empty>לא נמצאו משימות</Empty></Paper>}
            {data && data.data.length > 0 && (
                <>
                    <TableContainer component={Paper} sx={common.table}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>כותרת</TableCell>
                                <TableCell>סטטוס</TableCell>
                                <TableCell>עדיפות</TableCell>
                                <TableCell>תאריך יעד</TableCell>
                                <TableCell>משויכת ל</TableCell>
                                <TableCell>פרויקט</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data.map((task) => (
                                <TableRow hover key={task.id} className={task.isOverdue ? 'overdue' : undefined} sx={task.isOverdue ? common.rowLate : common.row}>
                                    <TableCell><Box component={Link} to={`/tasks/${task.id}`} sx={common.link}>{task.title}</Box></TableCell>
                                    <TableCell><StatusBadge status={task.status} /></TableCell>
                                    <TableCell><PriorityBadge priority={task.priority} /></TableCell>
                                    <TableCell><Box sx={[common.cellIcon, task.isOverdue && common.late]}><EventOutlinedIcon />{new Date(task.dueDate).toLocaleDateString('he-IL')}{task.isOverdue && ' (באיחור)'}</Box></TableCell>
                                    <TableCell><Box sx={common.cellIcon}><PersonOutlinedIcon />{task.assignedTo.name}</Box></TableCell>
                                    <TableCell><Box sx={common.cellIcon}><FolderOutlinedIcon />{task.project.name}</Box></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <Pagination page={page} totalPages={data.pagination.totalPages} onPageChange={setPage} />
                </>
            )}
        </main>
    )
}
