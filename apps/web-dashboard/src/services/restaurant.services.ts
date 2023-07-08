import { SuccessHttpResponse } from '@resnity/web-common';

import { axiosWithAuth } from '../libs/axios';
import {
  CreateRestaurantRequestDto,
  CreateRestaurantResponseDto,
  RestaurantResponseDto,
} from './restaurant.services.types';

const BASE_PATH = '/restaurants';

export const getRestaurants = async () =>
  await axiosWithAuth.get<SuccessHttpResponse<RestaurantResponseDto[]>>(
    BASE_PATH,
  );

export const createRestaurant = async (data: CreateRestaurantRequestDto) =>
  await axiosWithAuth.post<SuccessHttpResponse<CreateRestaurantResponseDto>>(
    BASE_PATH,
    data,
  );
