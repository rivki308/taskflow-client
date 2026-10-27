import type { SxProps, Theme } from '@mui/material/styles'
import { colors } from '../theme/theme'

// עיצובים שחוזרים בכמה עמודים
export const common = {
    // כרטיס לבן (פאנל)
    panel: { p: 3 },

    // כותרת בתוך כרטיס
    panelTitle: { fontWeight: 700, fontSize: 18, color: 'secondary.main', mb: 2, display: 'flex', alignItems: 'center', gap: 1 },

    // שורת סינון מעל רשימה
    filters: { p: 2, mb: 2.5, display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' },
    search: { flex: 1, minWidth: 220 },
    select: { minWidth: 180 },

    // טבלה
    table: { overflowX: 'auto' },
    row: { '&:last-child td': { borderBottom: 0 } },
    rowLate: { '&:last-child td': { borderBottom: 0 }, '& td:first-of-type': { boxShadow: `inset -4px 0 0 ${colors.red}` } },
    late: { color: 'error.main', fontWeight: 700 },
    link: { fontWeight: 700, color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },

    // אייקון קטן ליד טקסט בטבלה
    cellIcon: { display: 'flex', alignItems: 'center', gap: 1, '& svg': { fontSize: 18, color: colors.muted } },

    // עיגול עם אות ראשונה של שם
    avatar: { width: 32, height: 32, fontSize: 14, fontWeight: 700, bgcolor: colors.blueSoft, color: 'primary.main' },
} satisfies Record<string, SxProps<Theme>>
