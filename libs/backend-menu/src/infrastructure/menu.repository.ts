import { Repository, RepositoryImpl } from '@resnity/backend-common';

import { Menu } from '../domain/menu.aggregate-root';
import { MenuModel } from './menu.models';

export const MENU_REPOSITORY_TOKEN = Symbol('MENU_REPOSITORY_TOKEN');

export interface MenuRepository extends Repository<Menu, MenuModel> {}

export class MenuRepositoryImpl
  extends RepositoryImpl<Menu, MenuModel>
  implements MenuRepository {}
