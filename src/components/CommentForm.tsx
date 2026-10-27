import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Paper, TextField, Button } from '@mui/material'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { createTaskComment } from '../api/comments'
import ErrorMessage from './ErrorMessage'
import { muiRegister } from '../ui/muiRegister'
import { comments as styles } from '../styles/task.styles'

interface CommentFormProps {
    taskId: number
}

interface CommentFormValues {
    content: string
}

export default function CommentForm({ taskId }: CommentFormProps) {
    const queryClient = useQueryClient()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormValues>()

    const commentMutation = useMutation({
        mutationFn: (values: CommentFormValues) => createTaskComment(taskId, values.content),
        onSuccess: () => {
            reset()
            queryClient.invalidateQueries({ queryKey: ['comments', taskId] })
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
        },
    })

    return (
        <Paper component="form" onSubmit={handleSubmit((values) => commentMutation.mutate(values))} noValidate sx={styles.form}>
            <TextField
                label="הערה חדשה"
                id="content"
                multiline
                minRows={3}
                fullWidth
                {...muiRegister(register('content', {
                    required: 'יש לכתוב הערה',
                    maxLength: { value: 2000, message: 'עד 2000 תווים' },
                    validate: (value) => value.trim() !== '' || 'ההערה לא יכולה להיות רק רווחים',
                }))}
                error={!!errors.content}
                helperText={errors.content && errors.content.message}
            />
            {commentMutation.error && <ErrorMessage error={commentMutation.error} />}
            <Button type="submit" variant="contained" startIcon={<SendOutlinedIcon sx={styles.sendIcon} />} sx={styles.send} disabled={commentMutation.isPending}>
                {commentMutation.isPending ? 'שולחת...' : 'הוספת הערה'}
            </Button>
        </Paper>
    )
}
