import { z } from 'zod';

export const MenuCreatedEventHandlerPayload = z.object({
  menuId: z.string(),
  restaurantId: z.string(),
});
export type MenuCreatedEventHandlerPayload = z.infer<
  typeof MenuCreatedEventHandlerPayload
>;
