import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@resnity/web-auth';

import { RootRoutes } from './RootRoutes';
import { auth0Client } from './libs/auth0-client';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider client={auth0Client}>
        <ConfigProvider>
          <RootRoutes />
        </ConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
