import type { SxProps, Theme } from '@mui/material/styles'
import { colors } from '../theme/theme'

// footer בתחתית כל העמודים (ui/Footer)
export const styles = {
    bar: { bgcolor: '#fff', borderTop: `1px solid ${colors.border}`, mt: 'auto' },
    inner: {
        maxWidth: 1440,
        mx: 'auto',
        px: { xs: 2, sm: 6, lg: 14 },
        py: 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1.5,
    },
    brand: { display: 'flex', alignItems: 'center', gap: 1 },
    logo: { width: 22, height: 22 },
    name: { fontWeight: 800, fontSize: 15, color: 'secondary.main' },
    text: { fontSize: 14, color: 'text.secondary' },
} satisfies Record<string, SxProps<Theme>>
