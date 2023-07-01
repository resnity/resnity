import { AsyncLocalStorage } from 'async_hooks';
import { Request } from 'express';

export class RequestContext {
  static als = new AsyncLocalStorage<RequestContext>();

  constructor(readonly req: Request) {}

  static get context() {
    const store = RequestContext.als.getStore();
    if (store === undefined)
      throw new Error('Current request context store is missing');
    return store.req;
  }
}
