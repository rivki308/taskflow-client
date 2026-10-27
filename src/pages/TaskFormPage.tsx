

import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTask, createTask, updateTask } from '../api/tasks'
import { getUsers } from '../api/users'
import { getProjects } from '../api/projects'
import TaskForm, { type TaskFormValues } from '../components/TaskForm'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { Paper } from '@mui/material'
import AddTaskIcon from '@mui/icons-material/AddTask'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import PageHeader from '../ui/PageHeader'
import { formStyles } from '../styles/form.styles'
export default function TaskFormPage() {
    const { id } = useParams()
    const isEdit = id !== undefined
    const taskId = Number(id)


    const { data: employees, isLoading: employeesLoading } = useQuery({
        queryKey: ['users', 'Employee'],
        queryFn: () => getUsers({ role: 'Employee' }),
    })
    const { data: projects, isLoading: projectsLoading } = useQuery({
        queryKey: ['projects', isEdit ? 'all' : 'Active'],
        queryFn: () => getProjects(isEdit ? {} : { status: 'Active' }),
    })
    const { data: task, isLoading: taskLoading, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTask(taskId),
        enabled: isEdit,
    })
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const saveMutation = useMutation({
        mutationFn: (values: TaskFormValues) => {
            const body = {
                title: values.title,
                description: values.description,
                assignedTo: Number(values.assignedTo),
                projectId: Number(values.projectId),
                priority: values.priority,
                dueDate: values.dueDate,
            }
            return isEdit ? updateTask(taskId, { ...body, status: values.status }) : createTask(body)
        },
        onSuccess: (savedTask) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({ queryKey: ['task', savedTask.id] })
            navigate(`/tasks/${savedTask.id}`)
        },

    })

    if (employeesLoading || projectsLoading || taskLoading) return <Loading />
    if (error) return <ErrorMessage error={error} />
    if (isEdit && !task) return null

    const defaultValues: TaskFormValues = task
        ? {
            title: task.title,
            description: task.description ?? '',
            assignedTo: String(task.assignedTo.id),
            projectId: String(task.project.id),
            priority: task.priority,
            dueDate: task.dueDate,
            status: task.status,
        }
        : {
            title: '',
            description: '',
            assignedTo: '',
            projectId: '',
            priority: 'Medium',
            dueDate: '',
            status: 'To Do',
        }
    return (
        <main>
            <PageHeader title={isEdit ? 'עריכת משימה' : 'משימה חדשה'} icon={isEdit ? <EditOutlinedIcon /> : <AddTaskIcon />} />
            <Paper sx={formStyles.card}>
            <TaskForm
                defaultValues={defaultValues}
                employees={employees ?? []}
                projects={projects ?? []}
                isEdit={isEdit}
                isSaving={saveMutation.isPending}
                onSave={(values) => saveMutation.mutate(values)}
            />
            {saveMutation.error && <ErrorMessage error={saveMutation.error} />}
            </Paper>
        </main>
    );
}
