import { Route, Routes } from 'react-router';

import { LoginPage, LogoutPage } from '@resnity/web-auth';

import { DashboardLayout } from './components/DashboardLayout';
import { NoPermissionPage } from './components/NoPermissionPage';
import { MenusOverviewPage } from './modules/menu/menus-overview/MenusOverviewPage';
import { RedirectSetupRestaurantPage } from './modules/restaurant/components/RedirectSetupRestaurantPage';
import { DashboardProvider } from './providers/dashboard.provider';

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route
        path="/restaurants/initial-setup"
        element={<RedirectSetupRestaurantPage />}
      />
      <Route path="/no-permission" element={<NoPermissionPage />} />
      <Route
        path="/"
        element={
          <DashboardProvider>
            <DashboardLayout />
          </DashboardProvider>
        }
      >
        <Route path="menus" element={<MenusOverviewPage />} />
      </Route>
    </Routes>
  );
};
