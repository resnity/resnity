import { AuthProvider } from '@resnity/web-auth';

import { RootRoutes } from './RootRoutes';
import { auth0Client } from './libs/auth0-client';

export const App = () => {
  return (
    <AuthProvider client={auth0Client}>
      <RootRoutes />
    </AuthProvider>
  );
};
