import type { SxProps, Theme } from '@mui/material/styles'
import { colors } from '../theme/theme'

// עמוד התחברות (pages/LoginPage) – עיצוב 6: טופס נקי + כרטיס ציטוט בגרדיאנט
export const styles = {
    page: {
        maxWidth: 'none',
        minHeight: '100vh',
        m: 0,
        p: 0,
        display: 'grid',
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: '1fr 1fr' },
        bgcolor: '#fff',
    },

    // ---------- צד הטופס ----------
    side: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 3, sm: 6, lg: 10 },
        py: 6,
    },
    inner: { width: '100%', maxWidth: 420, mx: 'auto' },

    brand: { display: 'flex', alignItems: 'center', gap: 1.25, mb: { xs: 5, md: 7 } },
    logo: { width: 38, height: 38 },
    brandName: { fontWeight: 800, fontSize: 22, color: 'secondary.main' },
    brandPro: { color: 'primary.main', fontWeight: 600 },

    title: { fontSize: { xs: 28, sm: 32 }, fontWeight: 800, color: 'secondary.main', lineHeight: 1.2, mb: 0.75 },
    subtitle: { color: 'text.secondary', fontSize: 16, mb: 4 },

    form: { display: 'flex', flexDirection: 'column', gap: 2.5 },
    field: { display: 'flex', flexDirection: 'column', gap: 0.75 },
    label: { fontWeight: 700, fontSize: 14, color: 'secondary.main' },
    fieldIcon: { color: colors.muted },
    button: { py: 1.5, mt: 1, fontSize: 16 },

    help: { fontSize: 15, color: 'text.secondary', textAlign: 'center', mt: 2.5 },
    secure: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75, mt: 1.5, fontSize: 13, color: 'text.secondary', '& svg': { fontSize: 18, color: colors.green } },
    footer: { fontSize: 13, color: 'text.secondary', mt: 6 },

    // ---------- כרטיס הציטוט (כחול) ----------
    quote: {
        position: 'relative',
        overflow: 'hidden',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'flex-end',
        m: 2.5,
        p: { md: 6, lg: 8 },
        borderRadius: 6,
        color: '#fff',
        background: `linear-gradient(160deg, ${colors.blue} 0%, ${colors.navyLight} 70%, ${colors.navy} 100%)`,
        // מירכאות גדולות ברקע
        '&::before': {
            content: '"\\201D"',
            position: 'absolute',
            top: 0,
            insetInlineStart: 48,
            fontSize: 280,
            lineHeight: 1,
            fontFamily: 'Georgia, serif',
            color: 'rgba(255,255,255,0.12)',
        },
        // עיגול דקורטיבי
        '&::after': {
            content: '""',
            position: 'absolute',
            width: 420,
            height: 420,
            borderRadius: '50%',
            top: -160,
            insetInlineEnd: -160,
            border: '1px solid rgba(255,255,255,0.14)',
        },
    },
    quoteInner: { position: 'relative', zIndex: 1, maxWidth: 560 },
    quoteText: { fontSize: { md: 24, lg: 28 }, fontWeight: 700, lineHeight: 1.5, mb: 4 },

    who: { display: 'flex', alignItems: 'center', gap: 1.5 },
    whoIcon: { width: 48, height: 48, borderRadius: '50%', bgcolor: '#fff', color: 'primary.main', display: 'grid', placeItems: 'center', flex: 'none', fontWeight: 800 },
    whoName: { fontWeight: 700, fontSize: 16 },
    whoRole: { fontSize: 14, color: colors.navText },

    stats: { display: 'flex', gap: 5, mt: 5, pt: 3, borderTop: '1px solid rgba(255,255,255,0.2)' },
    statNum: { fontSize: 30, fontWeight: 800, lineHeight: 1.2 },
    statText: { fontSize: 14, color: colors.navText },
} satisfies Record<string, SxProps<Theme>>
