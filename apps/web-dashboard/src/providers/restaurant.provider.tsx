import { PropsWithChildren, createContext, useContext } from 'react';

import { RestaurantResponseDto } from '../services/restaurant.services.types';

type RestaurantContextValue = {
  restaurant?: RestaurantResponseDto;
};

const RestaurantContext = createContext<RestaurantContextValue>({});

type RestaurantProviderProps = {
  value: RestaurantContextValue;
};

export const RestaurantProvider = ({
  value,
  children,
}: PropsWithChildren<RestaurantProviderProps>) => {
  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined)
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  return context;
};
