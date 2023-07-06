import { ClsService } from 'nestjs-cls';

import { AppClsStore } from './app-cls.types';

export class AppClsService<TUser = unknown> extends ClsService<
  AppClsStore<TUser>
> {}
