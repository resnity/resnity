import { axiosWithAuth } from '../libs/axios';
import {
  CreateRestaurantRequestDto,
  CreateRestaurantResponseDto,
} from './restaurant.services.types';

const BASE_PATH = '/restaurants';

export const createRestaurant = async (data: CreateRestaurantRequestDto) =>
  await axiosWithAuth.post<CreateRestaurantResponseDto>(BASE_PATH, data);
