
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Paper, TextField, Button, Chip, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Box } from '@mui/material'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import AddIcon from '@mui/icons-material/Add'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { getProjects } from '../api/projects'
import type { Project } from '../types'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import ProjectForm from '../components/ProjectForm'
import { projectStatusLabels } from '../utils/labels'
import PageHeader from '../ui/PageHeader'
import Empty from '../ui/Empty'
import { common } from '../styles/common.styles'
import { selectProps } from '../styles/form.styles'
import { projectChip } from '../styles/ui.styles'


export default function ProjectsPage() {
    const { user } = useAuth()
    const isAdmin = user?.role === 'Admin'
    const [status, setStatus] = useState<Project['status'] | ''>('')
    const [showForm, setShowForm] = useState(false)
    const [editingProject, setEditingProject] = useState<Project | null>(null)

    const { data: projects, isLoading, error } = useQuery({
        queryKey: ['projects', 'list', status],
        queryFn: () => getProjects(status ? { status } : {}),
    })

    function openCreate() {
        setEditingProject(null)
        setShowForm(true)
    }

    function openEdit(project: Project) {
        setEditingProject(project)
        setShowForm(true)
    }

    function closeForm() {
        setShowForm(false)
        setEditingProject(null)
    }

    return (
        <main>
            <PageHeader
                title="פרויקטים"
                icon={<FolderOutlinedIcon />}
                action={isAdmin && !showForm && <Button type="button" variant="contained" startIcon={<AddIcon />} onClick={openCreate}>פרויקט חדש</Button>}
            />

            <Paper className="filters" sx={common.filters}>
            <TextField select size="small" slotProps={selectProps} sx={common.select} value={status} onChange={(e) => setStatus(e.target.value as Project['status'] | '')}>
                <option value="">כל הסטטוסים</option>
                {Object.entries(projectStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}

            </TextField>
            </Paper>

            {showForm && (
                <ProjectForm key={editingProject?.id ?? 'new'} project={editingProject} onDone={closeForm} />
            )}

            {isLoading && <Loading />}
            {error && <ErrorMessage error={error} />}
            {projects && projects.length === 0 && <Paper><Empty>לא נמצאו פרויקטים</Empty></Paper>}
            {projects && projects.length > 0 && (
                <TableContainer component={Paper} sx={common.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>שם</TableCell>
                            <TableCell>סטטוס</TableCell>
                            <TableCell>תאריך התחלה</TableCell>
                            <TableCell>תאריך סיום</TableCell>
                            <TableCell>משימות</TableCell>
                            {isAdmin && <TableCell></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow hover key={project.id} sx={common.row}>
                                <TableCell><Box sx={[common.cellIcon, common.link]}><FolderOutlinedIcon />{project.name}</Box></TableCell>
                                <TableCell><Chip size="small" label={projectStatusLabels[project.status]} sx={projectChip[project.status]} /></TableCell>
                                <TableCell><Box sx={common.cellIcon}><EventOutlinedIcon />{new Date(project.startDate).toLocaleDateString('he-IL')}</Box></TableCell>
                                <TableCell><Box sx={common.cellIcon}><EventOutlinedIcon />{project.endDate ? new Date(project.endDate).toLocaleDateString('he-IL') : '—'}</Box></TableCell>
                                <TableCell><Box sx={common.cellIcon}><AssignmentOutlinedIcon />{project.taskCount}</Box></TableCell>
                                {isAdmin && (
                                    <TableCell>
                                        <Button type="button" size="small" variant="outlined" className="secondary" startIcon={<EditOutlinedIcon />} onClick={() => openEdit(project)}>עריכה</Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
            )}
        </main>
    )
}
