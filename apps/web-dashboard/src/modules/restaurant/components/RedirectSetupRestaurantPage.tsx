import { useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { FullScreenLoader } from '../../../components/FullScreenLoader';
import { useSetupRestaurant } from '../restaurant.queries';

export const RedirectSetupRestaurantPage = () => {
  const navigate = useNavigate();
  const didInitialize = useRef(false);
  const { mutate, isSuccess } = useSetupRestaurant();

  useEffect(() => {
    if (!didInitialize.current) {
      didInitialize.current = true;
      return;
    }
    mutate();
  }, [isSuccess, mutate]);

  useLayoutEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  return <FullScreenLoader />;
};
