import { Route, Routes } from 'react-router';

import { DashboardPageContainer } from './components/dashboard/DashboardPageContainer';
import { DashboardLayout } from './layouts/DashboardLayout';
import { StoreFrontLayout } from './layouts/StoreFrontLayout';
import { LoginPage } from './modules/auth/LoginPage';
import { ViewMenusPage } from './modules/dashboard/menu/ViewMenusPage';
import RestaurantRegistrationForm from './modules/restaurant/RestaurantRegistrationForm';
import { Menu } from './modules/store-front/ordering/Menu';

const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StoreFrontLayout />}>
        <Route path="ordering" element={<Menu />} />
        <Route path="cart" />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="menus" element={<ViewMenusPage />} />
        <Route
          path="restaurants"
          element={
            <DashboardPageContainer title="Restaurants">
              <RestaurantRegistrationForm />
            </DashboardPageContainer>
          }
        />
      </Route>
    </Routes>
  );
};

export default RootRoutes;
