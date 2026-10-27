import type { SxProps, Theme } from '@mui/material/styles'
import { colors } from '../theme/theme'

// עמוד "לא נמצא" (pages/NotFoundPage)
export const styles = {
    page: { minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5, textAlign: 'center' },
    icon: { fontSize: 72, color: '#c3cbdb' },
    code: { fontSize: 72, fontWeight: 800, lineHeight: 1, color: colors.blue },
    title: { fontSize: 26, fontWeight: 800, color: 'secondary.main' },
    button: { mt: 1 },
} satisfies Record<string, SxProps<Theme>>
