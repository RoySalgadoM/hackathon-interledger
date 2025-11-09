import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserDataMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKeyData = req.headers['api-key-data'] as string;

    if (apiKeyData) {
      const userData = JSON.parse(apiKeyData);
      (req as any).user = userData;
    }

    next();
  }
}
