import { Route, Routes } from 'react-router';

import { LoginPage, LogoutPage } from '@resnity/web-auth';

import { DashboardLayout } from './components/DashboardLayout';
import { PageContainer } from './components/PageContainer';
import { ViewMenusPage } from './modules/menu/components/ViewMenusPage';
import RestaurantRegistrationForm from './modules/restaurant/RestaurantRegistrationForm';

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route
          path="outlets"
          element={
            <PageContainer title="Outlets">
              <RestaurantRegistrationForm />
            </PageContainer>
          }
        />
        <Route path="menus" element={<ViewMenusPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
    </Routes>
  );
};
