import { isAxiosError } from 'axios';
import { PropsWithChildren, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAuth } from '@resnity/web-auth';

import { FullScreenLoader } from '../components/FullScreenLoader';
import { isForbiddenStatus, isNotFoundStatus } from '../libs/axios';
import { useCurrentGetRestaurants } from '../modules/restaurant/restaurant.queries';
import { RestaurantProvider } from './restaurant.provider';

export const DashboardProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth();

  const {
    data,
    error,
    isLoading: isGetCurrentRestaurantLoading,
    isSuccess,
    isError,
  } = useCurrentGetRestaurants({
    enabled: isAuthenticated,
  });

  useLayoutEffect(() => {
    if (!isAuthLoading && !isAuthenticated) loginWithRedirect();
  }, [isAuthenticated, isAuthLoading, loginWithRedirect]);

  useLayoutEffect(() => {
    if (!isError) return;

    if (isAxiosError(error) && isForbiddenStatus(error))
      navigate('/no-permission');
    else if (isAxiosError(error) && isNotFoundStatus(error))
      navigate('/restaurants/initial-setup');
  }, [error, isError, navigate]);

  if (isAuthLoading || isGetCurrentRestaurantLoading)
    return <FullScreenLoader />;

  if (isSuccess)
    return (
      <RestaurantProvider value={{ restaurant: data }}>
        {children}
      </RestaurantProvider>
    );

  return null;
};
