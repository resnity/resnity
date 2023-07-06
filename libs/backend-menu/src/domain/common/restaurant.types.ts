import { z } from 'zod';

import {
  EntityId,
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

const restaurantIdSchema = EntityId.brand<'RestaurantId'>();

export const assertRestaurantIdValid: Validate<typeof restaurantIdSchema> =
  domainSchemaValidatorBuilder(restaurantIdSchema);

export type RestaurantId = z.infer<typeof restaurantIdSchema>;
