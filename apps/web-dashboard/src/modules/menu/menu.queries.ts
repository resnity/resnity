import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { SuccessHttpResponse } from '@resnity/web-common';

import {
  createMenu,
  deleteMenuById,
  getMenus,
} from '../../services/menu.services';
import {
  CreateMenuRequestDto,
  CreateMenuResponseDto,
  DeleteMenuByIdParam,
  MenuResponseDto,
} from '../../services/menu.services.types';

export const MENUS_QUERY_KEY = 'MENUS_QUERY_KEY';

export const useGetMenus = (
  options?: UseQueryOptions<
    SuccessHttpResponse<MenuResponseDto[]>,
    AxiosError<unknown>,
    MenuResponseDto[]
  >,
) =>
  useQuery({
    queryKey: [MENUS_QUERY_KEY],
    queryFn: getMenus,
    select: (response) => response.data,
    ...options,
  });

export const useCreateMenu = (
  options?: UseMutationOptions<
    SuccessHttpResponse<CreateMenuResponseDto>,
    AxiosError<unknown>,
    CreateMenuRequestDto
  >,
) =>
  useMutation({
    mutationFn: createMenu,
    ...options,
  });

export const useDeleteMenuById = (
  options?: UseMutationOptions<
    SuccessHttpResponse<unknown>,
    AxiosError<unknown>,
    string
  >,
) =>
  useMutation({
    mutationFn: deleteMenuById,
    ...options,
  });
