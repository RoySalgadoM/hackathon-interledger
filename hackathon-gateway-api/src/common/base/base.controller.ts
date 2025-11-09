import { Controller, UseGuards } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PermissionGuard } from '../guards/permission.guard';

/**
 * Base controller with common decorators and patterns
 * Reduces boilerplate in all controllers
 */
export abstract class BaseController {
  /**
   * Common method to handle proxy requests
   * @param request Fastify request
   * @param reply Fastify reply
   * @param serviceMethod Service method to call
   * @param serviceName Name of the service for logging
   */
  protected async handleProxyRequest(
    request: FastifyRequest,
    reply: FastifyReply,
    serviceMethod: (req: FastifyRequest, res: FastifyReply) => Promise<void>,
    _serviceName: string
  ): Promise<void> {
    try {
      await serviceMethod(request, reply);
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Decorator for controllers that require authentication
 */
export function AuthenticatedController(route: string) {
  return function (target: Function) {
    Controller(route)(target);
    UseGuards(JwtAuthGuard)(target);
  };
}

/**
 * Decorator for controllers that require authentication and permissions
 */
export function AuthenticatedWithPermissionsController(route: string) {
  return function (target: Function) {
    Controller(route)(target);
    UseGuards(JwtAuthGuard, PermissionGuard)(target);
  };
}
