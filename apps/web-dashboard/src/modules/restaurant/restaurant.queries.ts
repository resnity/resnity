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
  options?: UseMutationOptions<
    SuccessHttpResponse<SetupRestaurantResponseDto>,
    AxiosError<unknown>
  >,
) => useMutation({ mutationFn: setupRestaurant, ...options });

export const useCreateRestaurant = (
  options?: UseMutationOptions<
    SuccessHttpResponse<CreateRestaurantResponseDto>,
    AxiosError<unknown>,
    CreateRestaurantRequestDto
  >,
) => useMutation({ ...options, mutationFn: createRestaurant });
