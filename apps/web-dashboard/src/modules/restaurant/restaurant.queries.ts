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
  getCurrentRestaurant,
  getRestaurants,
  setupRestaurant,
} from '../../services/restaurant.services';
import {
  CreateRestaurantRequestDto,
  CreateRestaurantResponseDto,
  RestaurantResponseDto,
  SetupRestaurantResponseDto,
} from '../../services/restaurant.services.types';

const RESTAURANT_QUERY_KEY = 'RESTAURANT_QUERY_KEY';
const CURRENT_RESTAURANT_QUERY_KEY = 'CURRENT_RESTAURANT_QUERY_KEY';

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

export const useCurrentGetRestaurants = (
  options?: UseQueryOptions<
    SuccessHttpResponse<RestaurantResponseDto>,
    AxiosError<unknown>,
    RestaurantResponseDto
  >,
) =>
  useQuery({
    queryKey: [CURRENT_RESTAURANT_QUERY_KEY],
    queryFn: getCurrentRestaurant,
    select: (response) => response.data,
    ...options,
  });

export const useSetupRestaurant = (
  options?: Omit<
    UseMutationOptions<SetupRestaurantResponseDto, AxiosError<unknown>>,
    'mutationFn'
  >,
) => useMutation({ mutationFn: setupRestaurant, ...options });

export const useCreateRestaurant = (
  options?: Omit<
    UseMutationOptions<
      CreateRestaurantResponseDto,
      AxiosError<unknown>,
      CreateRestaurantRequestDto
    >,
    'mutationFn'
  >,
) => useMutation({ mutationFn: createRestaurant, ...options });
