import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Box, TextField, Button } from '@mui/material'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import { createUser, type CreateUserData } from '../api/users'
import { ApiRequestError } from '../api/client'
import ErrorMessage from './ErrorMessage'
import { muiRegister } from '../ui/muiRegister'
import { formStyles, selectProps } from '../styles/form.styles'

export default function EmployeeForm() {
    const queryClient = useQueryClient()
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<CreateUserData>({
        defaultValues: { name: '', email: '', password: '', role: 'Employee' },
    })

    const createMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            reset()
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: (error) => {
            if (error instanceof ApiRequestError && error.code === 'CONFLICT') {
                setError('email', { message: 'האימייל כבר קיים במערכת' })
            }
        },
    })

    const isConflict = createMutation.error instanceof ApiRequestError && createMutation.error.code === 'CONFLICT'

    return (
        <Box component="form" onSubmit={handleSubmit((values) => createMutation.mutate(values))} noValidate sx={formStyles.form}>
            <TextField
                label="שם"
                type="text"
                id="name"
                fullWidth
                {...muiRegister(register('name', {
                    required: 'יש להזין שם',
                    maxLength: { value: 100, message: 'עד 100 תווים' },
                }))}
                error={!!errors.name}
                helperText={errors.name && errors.name.message}
            />

            <TextField
                label="אימייל"
                type="email"
                id="email"
                fullWidth
                {...muiRegister(register('email', {
                    required: 'יש להזין אימייל',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'כתובת המייל אינה תקינה' },
                }))}
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
            />

            <TextField
                label="סיסמה"
                type="password"
                id="password"
                fullWidth
                {...muiRegister(register('password', {
                    required: 'יש להזין סיסמה',
                    minLength: { value: 8, message: 'לפחות 8 תווים' },
                    maxLength: { value: 128, message: 'עד 128 תווים' },
                    validate: (value) => (/[A-Za-z]/.test(value) && /\d/.test(value)) || 'הסיסמה חייבת לכלול לפחות אות אחת באנגלית וספרה אחת',
                }))}
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
            />

            <TextField select label="תפקיד" id="role" fullWidth slotProps={selectProps} {...muiRegister(register('role'))}>
                <option value="Employee">עובדת</option>
                <option value="Admin">מנהלת</option>
            </TextField>

            {createMutation.error && !isConflict && <ErrorMessage error={createMutation.error} />}
            <Button type="submit" variant="contained" startIcon={<PersonAddAlt1OutlinedIcon />} disabled={createMutation.isPending}>
                {createMutation.isPending ? 'שומרת...' : 'הוספת עובד'}
            </Button>
        </Box>
    )
}
