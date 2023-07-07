import { axiosWithAuth } from '../../libs/axios';
import { CreateMenuRequestDto, CreateMenuResponseDto } from './menu.apis.types';

const BASE_URL = '/api/menus';

export const createMenuApi = (data: CreateMenuRequestDto) =>
  axiosWithAuth.post<CreateMenuResponseDto>(BASE_URL, data);
