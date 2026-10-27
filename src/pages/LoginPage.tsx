import { useForm } from 'react-hook-form'
import { type LoginData } from '../api/auth'
import ErrorMessage from '../components/ErrorMessage'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Box, Typography, TextField, Button, InputAdornment } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import logo from '../assets/logo.svg'
import { muiRegister } from '../ui/muiRegister'
import { styles } from '../styles/login.styles'

export default function LoginPage() {
    const { login, user } = useAuth();
    const navigate = useNavigate()
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: () => navigate('/'),
    })


    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>()
    if (user) {
        return <Navigate to="/" replace />
    }
    function onSubmit(data: LoginData) {
        loginMutation.mutate(data)
    }
    return (
        <Box component="main" dir="rtl" sx={styles.page}>
            <Box sx={styles.side}>
                <Box sx={styles.inner}>
                    <Box sx={styles.brand}>
                        <Box component="img" src={logo} alt="TaskFlow Pro" sx={styles.logo} />
                        <Typography sx={styles.brandName}>TaskFlow <Box component="span" sx={styles.brandPro}>Pro</Box></Typography>
                    </Box>

                    <Typography component="h1" sx={styles.title}>התחברות</Typography>
                    <Typography sx={styles.subtitle}>הזינו אימייל וסיסמה כדי להיכנס למערכת</Typography>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={styles.form}>
                        <Box sx={styles.field}>
                            <Typography component="label" htmlFor="email" sx={styles.label}>אימייל</Typography>
                            <TextField type="email" id="email" fullWidth placeholder="name@company.com"
                                {...muiRegister(register('email', { required: 'יש להזין אימייל', pattern: { value: /^\S+@\S+\.\S+$/, message: 'כתובת המייל אינה תקינה' } }))}
                                error={!!errors.email} helperText={errors.email && <> {errors.email.message}</>}
                                slotProps={{ input: { startAdornment: <InputAdornment position="start"><EmailOutlinedIcon sx={styles.fieldIcon} /></InputAdornment> } }} />
                        </Box>
                        <Box sx={styles.field}>
                            <Typography component="label" htmlFor="password" sx={styles.label}>סיסמה</Typography>
                            <TextField type="password" id="password" fullWidth placeholder="••••••••"
                                {...muiRegister(register('password', { required: 'יש להזין סיסמה' }))}
                                error={!!errors.password} helperText={errors.password && <> {errors.password.message}</>}
                                slotProps={{ input: { startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={styles.fieldIcon} /></InputAdornment> } }} />
                        </Box>
                        {loginMutation.error && <ErrorMessage error={loginMutation.error} />}
                        <Button type="submit" variant="contained" size="large" sx={styles.button} disabled={loginMutation.isPending}>  {loginMutation.isPending ? 'מתחבר...' : 'התחברות'}</Button>
                    </Box>

                    <Typography sx={styles.help}>אין לך חשבון? פנו למנהלת המערכת כדי לקבל גישה</Typography>
                    <Typography sx={styles.secure}><VerifiedUserOutlinedIcon />החיבור שלך מאובטח</Typography>
                    <Typography sx={styles.footer}>© {new Date().getFullYear()} TaskFlow Pro · כל הזכויות שמורות</Typography>
                </Box>
            </Box>

            <Box sx={styles.quote}>
                <Box sx={styles.quoteInner}>
                    <Typography component="blockquote" sx={styles.quoteText}>
                        "מאז שעברנו ל־TaskFlow Pro, כל הצוות יודע בדיוק מה צריך לעשות – ושום משימה לא נופלת בין הכיסאות."
                    </Typography>

                    <Box sx={styles.who}>
                        <Box sx={styles.whoIcon}>TF</Box>
                        <Box>
                            <Typography sx={styles.whoName}>צוות TaskFlow Pro</Typography>
                            <Typography sx={styles.whoRole}>ניהול משימות לצוותים</Typography>
                        </Box>
                    </Box>

                    <Box sx={styles.stats}>
                        <Box><Typography sx={styles.statNum}>100%</Typography><Typography sx={styles.statText}>שקיפות בצוות</Typography></Box>
                        <Box><Typography sx={styles.statNum}>24/6</Typography><Typography sx={styles.statText}>גישה מכל מקום</Typography></Box>
                        <Box><Typography sx={styles.statNum}>3</Typography><Typography sx={styles.statText}>קליקים למשימה חדשה</Typography></Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}
