import type { FastifyRequest as BaseFastifyRequest } from 'fastify/types/request';

export interface AuthenticatedFastifyRequest extends BaseFastifyRequest {
  user: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profileId: string;
    permissions: string[];
    sub: string;
    jti: string;
  };
}
