import { Route, Routes } from 'react-router';

import { LoginPage } from '@resnity/web-auth';

import { PlatformLayout } from './layouts/PlatformLayout';

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PlatformLayout />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
