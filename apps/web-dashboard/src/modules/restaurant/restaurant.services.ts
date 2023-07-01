import { axiosWithAuth } from '../../libs/axios';
import { CreateRestaurantPayload } from './restaurant.types';

export const createRestaurant = async (payload: CreateRestaurantPayload) =>
  await axiosWithAuth.post<string>('http://localhost:8000/api/restaurants', {
    name: payload.name,
  });
