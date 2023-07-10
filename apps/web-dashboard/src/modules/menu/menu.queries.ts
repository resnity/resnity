import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { SuccessHttpResponse } from '@resnity/web-common';

import {
  createCategory,
  createMenu,
  deleteMenuById,
  getMenuById,
  getMenus,
} from '../../services/menu.services';
import {
  CreateCategoryRequestDto,
  CreateCategoryResponseDto,
  CreateMenuRequestDto,
  CreateMenuResponseDto,
  MenuResponseDto,
  WithMenuId,
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

export const useGetMenuById = (
  menuId: string,
  options?: UseQueryOptions<
    SuccessHttpResponse<MenuResponseDto>,
    AxiosError<unknown>,
    MenuResponseDto
  >,
) =>
  useQuery({
    queryKey: [MENUS_QUERY_KEY, menuId],
    queryFn: () => getMenuById(menuId),
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

export const useCreateCategory = (
  options?: UseMutationOptions<
    SuccessHttpResponse<CreateCategoryResponseDto>,
    AxiosError<unknown>,
    WithMenuId<CreateCategoryRequestDto>
  >,
) =>
  useMutation({
    mutationFn: createCategory,
    ...options,
  });
