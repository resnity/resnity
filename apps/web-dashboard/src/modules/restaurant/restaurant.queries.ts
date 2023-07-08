import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { SuccessHttpResponse } from '@resnity/web-common';

import {
  createRestaurant,
  getRestaurants,
} from '../../services/restaurant.services';
import {
  CreateRestaurantRequestDto,
  CreateRestaurantResponseDto,
  RestaurantResponseDto,
} from '../../services/restaurant.services.types';

const RESTAURANT_QUERY_KEY = 'RESTAURANT_QUERY_KEY';

export const useGetRestaurants = (
  options?: UseQueryOptions<
    SuccessHttpResponse<RestaurantResponseDto[]>,
    AxiosError<unknown>,
    RestaurantResponseDto[]
  >,
) =>
  useQuery({
    queryKey: [RESTAURANT_QUERY_KEY],
    queryFn: getRestaurants,
    select: (response) => response.data,
    ...options,
  });

export const useCreateRestaurant = (
  options?: Omit<
    UseMutationOptions<
      CreateRestaurantResponseDto,
      unknown,
      CreateRestaurantRequestDto
    >,
    'mutationFn'
  >,
) => useMutation({ mutationFn: createRestaurant, ...options });
