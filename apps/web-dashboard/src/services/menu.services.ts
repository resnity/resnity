import { SuccessHttpResponse } from '@resnity/web-common';

import { axiosWithAuth } from '../libs/axios';
import {
  CreateCategoryRequestDto,
  CreateCategoryResponseDto,
  CreateMenuRequestDto,
  CreateMenuResponseDto,
  MenuResponseDto,
  WithMenuId,
} from './menu.services.types';

const BASE_PATH = '/menus';

export const getMenus = () =>
  axiosWithAuth.get<SuccessHttpResponse<MenuResponseDto[]>>(BASE_PATH);

export const getMenuById = (menuId: string) =>
  axiosWithAuth.get<SuccessHttpResponse<MenuResponseDto>>(
    `${BASE_PATH}/${menuId}`,
  );

export const createMenu = (data: CreateMenuRequestDto) =>
  axiosWithAuth.post<SuccessHttpResponse<CreateMenuResponseDto>>(
    BASE_PATH,
    data,
  );

export const deleteMenuById = (menuId: string) =>
  axiosWithAuth.delete<SuccessHttpResponse<unknown>>(`${BASE_PATH}/${menuId}`);

export const createCategory = (data: WithMenuId<CreateCategoryRequestDto>) =>
  axiosWithAuth.post<SuccessHttpResponse<CreateCategoryResponseDto>>(
    `${BASE_PATH}/${data.menuId}/categories`,
    data,
  );
