const UserRole = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
  RESTAURANT_OWNER: 'RESTAURANT_OWNER',
  RESTAURANT_MANAGER: 'RESTAURANT_MANAGER',
  RESTAURANT_STAFF: 'RESTAURANT_STAFF',
} as const;
type UserRole = (typeof UserRole)[keyof typeof UserRole];

export { UserRole };
