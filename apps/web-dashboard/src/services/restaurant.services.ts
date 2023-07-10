import { SuccessHttpResponse } from '@resnity/web-common';

import { axiosWithAuth } from '../libs/axios';
import {
  CreateRestaurantRequestDto,
  CreateRestaurantResponseDto,
  RestaurantResponseDto,
  SetupRestaurantResponseDto,
} from './restaurant.services.types';

const BASE_PATH = '/restaurants';

export const getRestaurants = async () =>
  await axiosWithAuth.get<SuccessHttpResponse<RestaurantResponseDto[]>>(
    BASE_PATH,
  );

export const getCurrentRestaurant = async () =>
  await axiosWithAuth.get<SuccessHttpResponse<RestaurantResponseDto>>(
    `${BASE_PATH}/current`,
  );

export const setupRestaurant = async () =>
  await axiosWithAuth.post<SuccessHttpResponse<SetupRestaurantResponseDto>>(
    `${BASE_PATH}/setup`,
    {},
  );

export const createRestaurant = async (data: CreateRestaurantRequestDto) =>
  await axiosWithAuth.post<SuccessHttpResponse<CreateRestaurantResponseDto>>(
    BASE_PATH,
    data,
  );
