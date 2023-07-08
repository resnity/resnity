import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { createMenu } from '../../services/menu.services';
import {
  CreateMenuRequestDto,
  CreateMenuResponseDto,
} from '../../services/menu.services.types';

export const useCreateMenu = (
  options?: UseMutationOptions<
    CreateMenuResponseDto,
    unknown,
    CreateMenuRequestDto
  >,
) =>
  useMutation({
    mutationFn: createMenu,
    ...options,
  });
