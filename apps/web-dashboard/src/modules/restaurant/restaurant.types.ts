import { z } from 'zod';

const RestaurantRegistrationFormData = z.object({
  name: z.string().min(3).max(255),
});
type RestaurantRegistrationFormData = z.infer<
  typeof RestaurantRegistrationFormData
>;

type CreateRestaurantPayload = {
  name: string;
};

export { RestaurantRegistrationFormData };
export type { CreateRestaurantPayload };
