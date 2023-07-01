import { ClientSession } from 'mongodb';
import { ClsService } from 'nestjs-cls';

import { AppClsStore } from './app-cls.types';

export class AppClsService<TUser = unknown> extends ClsService<
  AppClsStore<TUser>
> {
  async clearTransactionSession() {
    const session = this.getTransactionSession();
    if (session) await session.endSession();
    this.set('transactionSession', undefined);
  }
  getTransactionSession() {
    return this.get('transactionSession');
  }
  setTransactionSession(transactionSession: ClientSession) {
    this.set('transactionSession', transactionSession);
  }

  getTenantId() {
    return this.get('tenantId');
  }
  setTenantId(tenantId: string) {
    this.set('tenantId', tenantId);
  }

  getUser() {
    return this.get('user');
  }
  setUser(user: TUser) {
    this.set('user', user);
  }
}
