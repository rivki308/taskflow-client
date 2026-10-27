import type { SxProps, Theme } from '@mui/material/styles'

// עמוד עובדים (pages/EmployeesPage)
export const styles = {
    layout: { display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, alignItems: 'start' },
    list: { minWidth: 0 },
    search: { mb: 2 },
    person: { display: 'flex', alignItems: 'center', gap: 1.25, fontWeight: 600 },
} satisfies Record<string, SxProps<Theme>>
