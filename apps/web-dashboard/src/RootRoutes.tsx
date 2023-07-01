import { Route, Routes } from 'react-router';

import { LoginPage, LogoutPage } from '@resnity/web-auth';

import { PageContainer } from './components/PageContainer';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ViewMenusPage } from './modules/menu/ViewMenusPage';
import RestaurantRegistrationForm from './modules/restaurant/RestaurantRegistrationForm';

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="menus" element={<ViewMenusPage />} />
        <Route
          path="restaurants"
          element={
            <PageContainer title="Restaurants">
              <RestaurantRegistrationForm />
            </PageContainer>
          }
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
    </Routes>
  );
};
