import type { SxProps, Theme } from '@mui/material/styles'

// עיצוב משותף לכל הטפסים (משימה, פרויקט, עובד, הערה)
export const formStyles = {
    card: { p: { xs: 2.5, md: 3.5 }, maxWidth: 760 },
    space: { mb: 2.5 },
    side: { p: { xs: 2.5, md: 3 } },
    title: { fontWeight: 700, fontSize: 20, color: 'secondary.main', mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 },
    form: { display: 'flex', flexDirection: 'column', gap: 2.25 },
    grid: { display: 'grid', gap: 2.25, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } },
    full: { gridColumn: '1 / -1' },
    actions: { display: 'flex', gap: 1.5, mt: 1, flexWrap: 'wrap' },
} satisfies Record<string, SxProps<Theme>>

// הגדרות לשדה בחירה (select) ולשדה תאריך
export const selectProps = { select: { native: true }, inputLabel: { shrink: true } }
export const dateProps = { inputLabel: { shrink: true } }
