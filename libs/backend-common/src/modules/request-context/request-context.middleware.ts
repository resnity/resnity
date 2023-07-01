import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import { RequestContext } from './request-context';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: (error?: unknown) => void) {
    RequestContext.als.run(new RequestContext(req), next);
  }
}
