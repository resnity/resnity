export const Permission = {
  READ_RESTAURANT: 'read:restaurant',
  WRITE_RESTAURANT: 'write:restaurant',
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];

export const RequiredPermissionsStrategy = {
  ALL: 'ALL',
  AT_LEAST_ONE: 'AT_LEAST_ONE',
};

export type RequiredPermissionsStrategy =
  (typeof RequiredPermissionsStrategy)[keyof typeof RequiredPermissionsStrategy];
