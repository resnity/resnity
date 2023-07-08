import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { createRestaurant } from '../../services/restaurant.services';
import {
  CreateRestaurantRequestDto,
  CreateRestaurantResponseDto,
} from '../../services/restaurant.services.types';

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
