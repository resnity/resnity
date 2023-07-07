import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@resnity/web-auth';

import { RootRoutes } from './RootRoutes';
import { auth0Client } from './libs/auth0-client';
import { queryClient } from './libs/query-client';
import { theme } from './theme';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider client={auth0Client}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RootRoutes />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
