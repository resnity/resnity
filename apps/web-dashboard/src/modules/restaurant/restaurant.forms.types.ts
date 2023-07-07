import { z } from 'zod';

import { createRestaurantFormSchema } from './restaurant.forms';

export type CreateRestaurantFormData = z.infer<
  typeof createRestaurantFormSchema
>;
