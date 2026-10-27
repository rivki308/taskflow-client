import { Box, Typography } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.svg'
import { styles } from '../styles/footer.styles'

// footer בתחתית העמודים (לא מוצג בעמוד ההתחברות, שיש לו footer משלו)
export default function Footer() {
    const { user } = useAuth()
    if (!user) return null

    return (
        <Box component="footer" sx={styles.bar}>
            <Box sx={styles.inner}>
                <Box sx={styles.brand}>
                    <Box component="img" src={logo} alt="" sx={styles.logo} />
                    <Typography sx={styles.name}>TaskFlow Pro</Typography>
                </Box>
                <Typography sx={styles.text}>© {new Date().getFullYear()} TaskFlow Pro. כל הזכויות שמורות.</Typography>
            </Box>
        </Box>
    )
}
