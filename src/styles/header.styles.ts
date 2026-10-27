import type { SxProps, Theme } from '@mui/material/styles'
import { colors } from '../theme/theme'

// הפס העליון (components/Header)
export const styles = {
    bar: { gap: { xs: 1, md: 3 }, minHeight: { xs: 60, md: 68 }, px: { xs: 1.5, md: 3 } },

    brand: { display: 'flex', alignItems: 'center', gap: 1.25, flex: 'none' },
    logoBox: { bgcolor: '#fff', borderRadius: 1.5, p: 0.5, display: 'flex' },
    logo: { width: 28, height: 28 },
    brandName: { fontWeight: 800, fontSize: 19, display: { xs: 'none', md: 'inline' } },
    brandPro: { color: '#60a5fa', fontWeight: 600 },

    nav: { display: 'flex', gap: 0.5, flexGrow: 1, overflowX: 'auto' },
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 1.75,
        py: 1,
        borderRadius: 1.5,
        color: colors.navText,
        textDecoration: 'none',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        transition: 'background-color .15s, color .15s',
        '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', color: '#fff' },
        '&.active': { bgcolor: 'secondary.light', color: '#fff' },
        '& svg': { fontSize: 20 },
    },
    linkText: { display: { xs: 'none', sm: 'inline' } },

    user: { display: 'flex', alignItems: 'center', gap: 1.25, flex: 'none' },
    avatar: { width: 36, height: 36, bgcolor: 'primary.main', fontWeight: 700, fontSize: 16 },
    userText: { display: { xs: 'none', md: 'block' } },
    userName: { fontWeight: 600, fontSize: 14, lineHeight: 1.3 },
    userRole: { fontSize: 12, color: colors.navText },
    logout: { color: colors.navText, '&:hover': { color: '#fff' } },
    logoutIcon: { transform: 'scaleX(-1)' },
} satisfies Record<string, SxProps<Theme>>
