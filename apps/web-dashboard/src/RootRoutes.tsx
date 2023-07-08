import { Route, Routes } from 'react-router';

import { LoginPage, LogoutPage } from '@resnity/web-auth';

import { DashboardLayout } from './components/DashboardLayout';
import { MenusOverviewPage } from './modules/menu/menus-overview/MenusOverviewPage';
import { SetupRestaurantPage } from './modules/restaurant/components/SetupRestaurantPage';

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/setup-restaurant" element={<SetupRestaurantPage />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route path="menus" element={<MenusOverviewPage />} />
      </Route>
    </Routes>
  );
};
