import { axiosWithAuth } from '../libs/axios';
import {
  CreateMenuRequestDto,
  CreateMenuResponseDto,
} from './menu.services.types';

const BASE_PATH = '/menus';

export const createMenu = (data: CreateMenuRequestDto) =>
  axiosWithAuth.post<CreateMenuResponseDto>(BASE_PATH, data);
