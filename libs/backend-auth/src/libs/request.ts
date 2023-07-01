import { Request } from 'express';
import { z } from 'zod';

import { UnauthorizedError } from '@resnity/backend-common';

import { User } from '../services/auth.types';

const WithUser = z.object({
  user: User,
});

export const extractUserFromRequest = async (request: Request) => {
  const validationResult = await WithUser.safeParseAsync(request);
  if (!validationResult.success) throw new UnauthorizedError();
  return validationResult.data.user;
};
