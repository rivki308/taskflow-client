import { createTheme } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

// צבעי העיצוב ("ארגוני") – משמשים גם בקבצי styles
export const colors = {
    navy: '#0f2350',
    navyLight: '#1d3a7a',
    blue: '#1f6feb',
    blueSoft: '#e8f0fe',
    bg: '#f4f6fa',
    border: '#e0e5ef',
    text: '#0f1b33',
    muted: '#6a7896',
    navText: '#b7c3dd',
    green: '#22c55e',
    orange: '#f59e0b',
    red: '#ef4444',
};

// עיצוב כללי של MUI לכל האתר
export const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: { main: colors.blue, dark: '#1858c4' },
        secondary: { main: colors.navy, light: colors.navyLight },
        error: { main: '#c62828' },
        warning: { main: '#b26a00' },
        success: { main: '#2e7d32' },
        background: { default: colors.bg, paper: '#ffffff' },
        text: { primary: colors.text, secondary: colors.muted },
        divider: colors.border,
    },
    typography: {
        fontFamily: "'Assistant', system-ui, Arial, sans-serif",
        button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 6 },
    components: {
        MuiPaper: {
            defaultProps: { elevation: 0 },
            styleOverrides: {
                root: { border: `1px solid ${colors.border}`, boxShadow: '0 1px 2px rgba(15,35,80,0.06)' },
            },
        },
        MuiAppBar: {
            styleOverrides: { root: { border: 0, boxShadow: '0 2px 8px rgba(15,35,80,0.25)' } },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    paddingInline: 18,
                    variants: [
                        { props: { variant: 'contained', color: 'primary' }, style: { boxShadow: '0 2px 6px rgba(31,111,235,0.3)' } },
                    ],
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: { root: { backgroundColor: '#fff' } },
        },
        MuiTableCell: {
            styleOverrides: {
                root: { borderColor: colors.border, padding: '14px 16px' },
                head: { backgroundColor: '#f8fafc', color: colors.muted, fontWeight: 700, fontSize: 14 },
            },
        },
    },
});

// הופך את כל העיצובים של MUI לימין-לשמאל
export const rtlCache = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});
