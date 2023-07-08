import { QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { isForbiddenStatus, isUnauthorizedStatus } from './axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (
          isAxiosError(error) &&
          !(isUnauthorizedStatus(error) || isForbiddenStatus(error))
        )
          return failureCount < 2;
        return false;
      },
    },
  },
});
