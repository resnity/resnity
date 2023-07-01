import { ClientSession } from 'mongodb';
import { ClsStore, Terminal } from 'nestjs-cls';

export type AppClsStore<TUser> = ClsStore & {
  tenantId?: string;
  transactionSession?: Terminal<ClientSession>;
  user?: TUser;
};
