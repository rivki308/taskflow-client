import type { SxProps, Theme } from '@mui/material/styles'
import { colors } from '../theme/theme'

// לוח הבקרה (pages/DashboardPage)
export const styles = {
    stats: { display: 'grid', gap: 2, mb: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' } },
    grid: { display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1.6fr 1fr' } },
    panel: { p: 3 },
    panelTitle: { fontWeight: 700, fontSize: 18, color: 'secondary.main', mb: 2.5 },

    barRow: { mb: 2.5 },
    barTop: { display: 'flex', justifyContent: 'space-between', mb: 0.75 },
    barLabel: { fontWeight: 600 },
    barValue: { color: 'text.secondary' },

    donePanel: { p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 },
    doneTitle: { fontWeight: 700, fontSize: 18, color: 'secondary.main', alignSelf: 'stretch' },
    ring: { position: 'relative', display: 'inline-flex' },
    ringBg: { color: '#eef1f6' },
    ringValue: { color: 'success.main', position: 'absolute', insetInlineStart: 0, '& circle': { strokeLinecap: 'round' } },
    ringCenter: { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' },
    ringText: { fontSize: 30, fontWeight: 800 },
    doneText: { color: 'text.secondary' },

    extras: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, alignSelf: 'stretch', mt: 1 },
    extra: { bgcolor: colors.bg, borderRadius: 1.5, p: 1.5, textAlign: 'center' },
    extraIcon: { color: 'primary.main' },
    extraValue: { fontWeight: 800, fontSize: 22 },
    extraLabel: { fontSize: 13, color: 'text.secondary' },
} satisfies Record<string, SxProps<Theme>>

// פס התקדמות בצבע לפי סטטוס
export const bar = (color: string) => ({
    height: 10,
    borderRadius: 5,
    bgcolor: '#eef1f6',
    '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 5 },
})

export const statusColors = { 'To Do': colors.muted, 'In Progress': colors.orange, Done: colors.green }

// כרטיס מספר (components/StatCard)
export const card = {
    box: { p: 2.5, display: 'flex', alignItems: 'center', gap: 2 },
    icon: { width: 48, height: 48, borderRadius: 2, display: 'grid', placeItems: 'center', flex: 'none' },
    title: { fontSize: 14, color: 'text.secondary', fontWeight: 600 },
    value: { fontSize: 30, fontWeight: 800, lineHeight: 1.2, color: 'text.primary' },
} satisfies Record<string, SxProps<Theme>>

export const cardColor = (color: string) => ({ borderTop: `3px solid ${color}` })
export const iconColor = (color: string) => ({ color, bgcolor: `${color}1a` })
