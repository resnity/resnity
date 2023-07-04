import { z } from 'zod';

import {
  EntityId,
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

const orderIdSchema = EntityId.brand<'OrderId'>();
const orderIdsSchema = orderIdSchema.array();

export const assertOrderIdValid: Validate<typeof orderIdSchema> =
  domainSchemaValidatorBuilder(orderIdSchema);
export const assertOrderIdsValid: Validate<typeof orderIdsSchema> =
  domainSchemaValidatorBuilder(orderIdsSchema);

export type OrderId = z.infer<typeof orderIdSchema>;
