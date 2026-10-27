import type { SxProps, Theme } from '@mui/material/styles'
import { colors } from '../theme/theme'

// כותרת עמוד (ui/PageHeader)
export const pageHeader = {
    box: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mb: 3 },
    start: { display: 'flex', alignItems: 'center', gap: 1.75 },
    icon: { width: 48, height: 48, borderRadius: 2, display: 'grid', placeItems: 'center', flex: 'none', bgcolor: colors.blueSoft, color: 'primary.main', '& svg': { fontSize: 26 } },
    title: { fontSize: { xs: 24, md: 30 }, fontWeight: 800, color: 'secondary.main', lineHeight: 1.25 },
    subtitle: { color: 'text.secondary', mt: 0.25 },
} satisfies Record<string, SxProps<Theme>>

// הודעה כשאין תוצאות (ui/Empty)
export const empty = {
    box: { py: 6, px: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, textAlign: 'center' },
    icon: { fontSize: 48, color: '#c3cbdb' },
    text: { color: 'text.secondary', fontWeight: 600 },
} satisfies Record<string, SxProps<Theme>>

// טעינה, שגיאה ועימוד
export const loading = {
    box: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, py: 6 },
    text: { color: 'text.secondary' },
} satisfies Record<string, SxProps<Theme>>

export const errorBox = { my: 1.5 } satisfies SxProps<Theme>

export const pager = {
    box: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt: 3 },
    text: { color: 'text.secondary', fontSize: 14 },
} satisfies Record<string, SxProps<Theme>>

// צבעי תגיות סטטוס ועדיפות
const chip = (bg: string, color: string) => ({ bgcolor: bg, color, fontWeight: 700, border: 0 })

export const statusChip = {
    'To Do': chip('#eef0f4', '#4b5563'),
    'In Progress': chip('#fff4e0', '#b26a00'),
    Done: chip('#e7f4e8', '#2e7d32'),
} satisfies Record<string, SxProps<Theme>>

export const priorityChip = {
    Low: chip('#e7f4e8', '#2e7d32'),
    Medium: chip('#fff4e0', '#b26a00'),
    High: chip('#fdecec', '#c62828'),
} satisfies Record<string, SxProps<Theme>>

export const projectChip = {
    Active: chip('#e7f4e8', '#2e7d32'),
    'On Hold': chip('#fff4e0', '#b26a00'),
    Completed: chip('#e8f0fe', colors.blue),
} satisfies Record<string, SxProps<Theme>>

export const roleChip = {
    Admin: chip('#ede9fe', '#6d28d9'),
    Employee: chip('#eef0f4', '#4b5563'),
} satisfies Record<string, SxProps<Theme>>
