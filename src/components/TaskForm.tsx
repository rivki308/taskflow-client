import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import type { Task, TaskStatus, User, Project } from '../types'
import { taskStatusLabels, taskPriorityLabels } from '../utils/labels'
import { muiRegister } from '../ui/muiRegister'
import { formStyles, selectProps, dateProps } from '../styles/form.styles'

export interface TaskFormValues {
    title: string
    description: string
    assignedTo: string
    projectId: string
    dueDate: string
    priority: Task['priority']
    status: TaskStatus
}


interface TaskFormProps {
    defaultValues: TaskFormValues
    employees: User[]
    projects: Project[]
    isEdit: boolean
    isSaving: boolean
    onSave: (values: TaskFormValues) => void
}
export default function TaskForm({ defaultValues,
    employees,
    projects,
    isEdit,
    isSaving,
    onSave }: TaskFormProps) {



    const { register, handleSubmit, formState: { errors } } = useForm<TaskFormValues>({ defaultValues })
    const navigate = useNavigate()
    return (
        <Box component="form" onSubmit={handleSubmit(onSave)} noValidate sx={formStyles.form}>
            <Box sx={formStyles.grid}>

            <TextField label="כותרת" id="title" fullWidth sx={formStyles.full}
                {...muiRegister(register('title', { required: 'יש להזין כותרת', maxLength: { value: 200, message: 'עד 200 תווים' }, validate: (v) => v.trim() !== '' || 'הכותרת לא יכולה להיות רק רווחים' }))}
                error={!!errors.title} helperText={errors.title && <> {errors.title.message}</>} />
            <TextField label="תיאור" id="description" multiline minRows={4} fullWidth sx={formStyles.full}
                {...muiRegister(register('description', { maxLength: { value: 5000, message: 'עד 5000 תווים' } }))}
                error={!!errors.description} helperText={errors.description && errors.description.message} />
            <TextField select label="משויכת ל" id="assignedTo" fullWidth slotProps={selectProps}
                {...muiRegister(register('assignedTo', { required: 'יש לבחור עובד' }))}
                error={!!errors.assignedTo} helperText={errors.assignedTo && errors.assignedTo.message}>
                <option value="">בחרי עובד</option>
                {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                ))}
            </TextField>

            <TextField select label=" פרויקט" id="projectId" fullWidth slotProps={selectProps}
                {...muiRegister(register('projectId', { required: 'יש לבחור פרויקט' }))}
                error={!!errors.projectId} helperText={errors.projectId && errors.projectId.message}>
                <option value="">בחרי פרויקט</option>
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                ))}
            </TextField>



            <TextField select label=" עדיפות" id="priority" fullWidth slotProps={selectProps}
                {...muiRegister(register('priority', { required: 'יש לבחור עדיפות' }))}
                error={!!errors.priority} helperText={errors.priority && errors.priority.message}>
                {Object.entries(taskPriorityLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}

            </TextField>

            <TextField type="date" label="תאריך יעד" id="dueDate" fullWidth slotProps={dateProps}
                {...muiRegister(register('dueDate', { required: 'יש לבחור תאריך יעד' }))}
                error={!!errors.dueDate} helperText={errors.dueDate && <> {errors.dueDate.message}</>} />
            {isEdit && (<>
                <TextField select label=" סטטוס" id="status" fullWidth slotProps={selectProps}
                    {...muiRegister(register('status', { required: 'יש לבחור סטטוס' }))}
                    error={!!errors.status} helperText={errors.status && errors.status.message}>
                    {Object.entries(taskStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}

                </TextField>
            </>)}
            </Box>

            <Box sx={formStyles.actions}>
            <Button type="submit" variant="contained" startIcon={<SaveOutlinedIcon />} disabled={isSaving}>{isSaving ? 'שומרת...' : 'שמירה'}</Button>
            <Button type="button" variant="outlined" color="inherit" className="secondary" onClick={() => navigate(-1)}>ביטול</Button>
            </Box>
        </Box>

    );
}
