import { FastifyRequest } from 'fastify';

export interface AuthenticatedFastifyRequest extends FastifyRequest {
  user?: {
    userId: string;
    [key: string]: unknown;
  };
}
