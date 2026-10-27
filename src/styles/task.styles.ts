import type { SxProps, Theme } from '@mui/material/styles'
import { colors } from '../theme/theme'

// פרטי משימה (pages/TaskDetailsPage)
export const styles = {
    actions: { display: 'flex', gap: 1 },
    layout: { display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', lg: '3fr 2fr' }, alignItems: 'start' },
    card: { p: 3, borderTop: `3px solid ${colors.blue}` },

    label: { display: 'flex', alignItems: 'center', gap: 0.75, fontSize: 14, color: 'text.secondary', fontWeight: 600, mb: 0.5, '& svg': { fontSize: 18 } },
    description: { whiteSpace: 'pre-wrap', mb: 3, lineHeight: 1.7 },

    info: { display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } },
    value: { fontWeight: 600 },

    divider: { my: 3 },
    statusSelect: { minWidth: 220 },

    side: { display: 'flex', flexDirection: 'column', gap: 2 },
    sideTitle: { fontWeight: 700, fontSize: 18, color: 'secondary.main', display: 'flex', alignItems: 'center', gap: 1, '& svg': { color: 'primary.main' } },
} satisfies Record<string, SxProps<Theme>>

// רשימת הערות וטופס הערה (components/CommentList, CommentForm)
export const comments = {
    list: { listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.25 },
    item: { p: 2, display: 'flex', gap: 1.5 },
    top: { display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap', mb: 0.5 },
    name: { fontWeight: 700, color: 'secondary.main' },
    date: { fontSize: 13, color: 'text.secondary' },
    text: { whiteSpace: 'pre-wrap' },
    form: { p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 },
    send: { alignSelf: 'flex-start' },
    sendIcon: { transform: 'scaleX(-1)' },
} satisfies Record<string, SxProps<Theme>>
