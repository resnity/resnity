import { isAxiosError } from 'axios';
import { PropsWithChildren, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAuth } from '@resnity/web-auth';

import { FullScreenLoader } from '../components/FullScreenLoader';
import { isForbiddenStatus } from '../libs/axios';
import { useGetRestaurants } from '../modules/restaurant/restaurant.queries';
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
    isLoading: isGetRestaurantsLoading,
    isSuccess,
    isError,
  } = useGetRestaurants({
    enabled: isAuthenticated,
  });

  useLayoutEffect(() => {
    if (!isAuthLoading && !isAuthenticated) loginWithRedirect();
  }, [isAuthenticated, isAuthLoading, loginWithRedirect]);

  useLayoutEffect(() => {
    if (isSuccess && data.length === 0) navigate('/setup-restaurant');
  }, [data, isSuccess, navigate]);

  useLayoutEffect(() => {
    if (isError && isAxiosError(error) && isForbiddenStatus(error))
      navigate('/no-permission');
  }, [error, isError, navigate]);

  if (isAuthLoading || isGetRestaurantsLoading) return <FullScreenLoader />;

  if (isSuccess)
    return (
      <RestaurantProvider value={{ restaurant: data[0] }}>
        {children}
      </RestaurantProvider>
    );

  return null;
};
