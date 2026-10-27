import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Box, Paper, Typography, TextField, Button } from '@mui/material'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { createProject, updateProject } from '../api/projects'
import type { Project } from '../types'
import ErrorMessage from './ErrorMessage'
import { projectStatusLabels } from '../utils/labels'
import { muiRegister } from '../ui/muiRegister'
import { formStyles, selectProps, dateProps } from '../styles/form.styles'

interface ProjectFormValues {
    name: string
    description: string
    startDate: string
    endDate: string
    status: Project['status']
}

interface ProjectFormProps {
    project: Project | null
    onDone: () => void
}

export default function ProjectForm({ project, onDone }: ProjectFormProps) {
    const queryClient = useQueryClient()
    const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormValues>({
        defaultValues: {
            name: project?.name ?? '',
            description: project?.description ?? '',
            startDate: project?.startDate ?? '',
            endDate: project?.endDate ?? '',
            status: project?.status ?? 'Active',
        },
    })

    const saveMutation = useMutation({
        mutationFn: (values: ProjectFormValues) => {
            const body = {
                name: values.name,
                description: values.description || null,
                startDate: values.startDate,
                endDate: values.endDate || null,
                status: values.status,
            }
            return project ? updateProject(project.id, body) : createProject(body)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
            onDone()
        },
    })

    return (
        <Paper sx={[formStyles.card, formStyles.space]}>
        <Box component="form" onSubmit={handleSubmit((values) => saveMutation.mutate(values))} noValidate sx={formStyles.form}>
            <Typography component="h2" sx={formStyles.title}><CreateNewFolderOutlinedIcon color="primary" />{project ? 'עריכת פרויקט' : 'פרויקט חדש'}</Typography>

            <Box sx={formStyles.grid}>
            <TextField
                label="שם הפרויקט"
                id="name"
                fullWidth
                sx={formStyles.full}
                {...muiRegister(register('name', {
                    required: 'יש להזין שם',
                    maxLength: { value: 150, message: 'עד 150 תווים' },
                    validate: (value) => value.trim() !== '' || 'השם לא יכול להיות רק רווחים',
                }))}
                error={!!errors.name}
                helperText={errors.name && errors.name.message}
            />

            <TextField label="תיאור" id="description" multiline minRows={3} fullWidth sx={formStyles.full}
                {...muiRegister(register('description', { maxLength: { value: 5000, message: 'עד 5000 תווים' } }))}
                error={!!errors.description} helperText={errors.description && errors.description.message} />

            <TextField type="date" label="תאריך התחלה" id="startDate" fullWidth slotProps={dateProps}
                {...muiRegister(register('startDate', { required: 'יש לבחור תאריך התחלה' }))}
                error={!!errors.startDate} helperText={errors.startDate && errors.startDate.message} />

            <TextField
                type="date"
                label="תאריך סיום"
                id="endDate"
                fullWidth
                slotProps={dateProps}
                {...muiRegister(register('endDate', {
                    validate: (value, formValues) =>
                        !value || !formValues.startDate || value >= formValues.startDate || 'תאריך הסיום לא יכול להיות לפני תאריך ההתחלה',
                }))}
                error={!!errors.endDate}
                helperText={errors.endDate && errors.endDate.message}
            />

            <TextField select label="סטטוס" id="status" fullWidth slotProps={selectProps} {...muiRegister(register('status'))}>
       {Object.entries(projectStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}

            </TextField>
            </Box>

            {saveMutation.error && <ErrorMessage error={saveMutation.error} />}
            <Box sx={formStyles.actions}>
            <Button type="submit" variant="contained" startIcon={<SaveOutlinedIcon />} disabled={saveMutation.isPending}>
                {saveMutation.isPending ? 'שומרת...' : 'שמירה'}
            </Button>
            <Button type="button" variant="outlined" color="inherit" className="secondary" onClick={onDone}>ביטול</Button>
            </Box>
        </Box>
        </Paper>
    )
}
