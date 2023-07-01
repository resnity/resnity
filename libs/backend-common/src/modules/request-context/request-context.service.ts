import { Request } from 'express';
import { ClientSession } from 'mongodb';

import { RequestContext } from './request-context';

type ExtendedRequestContext = {
  transactionSession?: ClientSession;
} & Request;

export class RequestContextService {
  static getContext(): ExtendedRequestContext {
    return RequestContext.context;
  }

  static getTransactionSession() {
    const ctx = RequestContextService.getContext();
    return ctx.transactionSession;
  }

  static setTransactionSession(session: ClientSession) {
    const ctx = RequestContextService.getContext();
    ctx.transactionSession = session;
  }

  static async clearTransactionSession() {
    const ctx = RequestContextService.getContext();
    if (ctx.transactionSession) await ctx.transactionSession.endSession();
    ctx.transactionSession = undefined;
  }
}
