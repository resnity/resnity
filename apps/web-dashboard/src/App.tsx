import { CssBaseline, ThemeProvider } from '@mui/material';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@resnity/web-auth';

import { RootRoutes } from './RootRoutes';
import { auth0Client } from './libs/auth0-client';
import { theme } from './theme';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider client={auth0Client}>
        <ConfigProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RootRoutes />
          </ThemeProvider>
        </ConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
