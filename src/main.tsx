
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/assistant/400.css';
import '@fontsource/assistant/500.css';
import '@fontsource/assistant/600.css';
import '@fontsource/assistant/700.css';
import '@fontsource/assistant/800.css';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext'
import { theme, rtlCache } from './theme/theme';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CacheProvider value={rtlCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <QueryClientProvider client={queryClient}>
                        <AuthProvider>
                            <App />
                        </AuthProvider>
                    </QueryClientProvider>
                </BrowserRouter>
            </ThemeProvider>
        </CacheProvider>
    </StrictMode>,
);
