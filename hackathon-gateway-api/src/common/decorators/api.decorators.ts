import { applyDecorators, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { HybridAuthGuard } from '../guards/hybrid-auth.guard';
import { PermissionGuard } from '../guards/permission.guard';
import { RequirePermissions } from './permissions.decorator';

/**
 * Decorator for authenticated endpoints (JWT only)
 */
export function ApiAuthEndpoint() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}

/**
 * Decorator for authenticated endpoints (JWT or API Key)
 */
export function ApiHybridAuthEndpoint() {
  return applyDecorators(UseGuards(HybridAuthGuard));
}

/**
 * Decorator for authenticated endpoints with permissions (JWT only)
 */
export function ApiAuthWithPermissionsEndpoint(permissions: string | string[]) {
  const permissionArray = Array.isArray(permissions)
    ? permissions
    : [permissions];
  return applyDecorators(
    UseGuards(JwtAuthGuard, PermissionGuard),
    RequirePermissions(...permissionArray)
  );
}

/**
 * Decorator for authenticated endpoints with permissions (JWT or API Key)
 */
export function ApiHybridAuthWithPermissionsEndpoint(permissions: string | string[]) {
  const permissionArray = Array.isArray(permissions)
    ? permissions
    : [permissions];
  return applyDecorators(
    UseGuards(HybridAuthGuard, PermissionGuard),
    RequirePermissions(...permissionArray)
  );
}

/**
 * Decorator for public endpoints
 */
export function ApiPublicEndpoint() {
  return applyDecorators();
}

/**
 * Decorator for CRUD operations with common patterns (JWT only)
 */
export function ApiCrudEndpoint(
  operation: 'create' | 'read' | 'update' | 'delete' | 'list',
  resource: string,
  permissions?: string | string[]
) {
  const decorators = [];

  if (permissions) {
    const permissionArray = Array.isArray(permissions)
      ? permissions
      : [permissions];
    decorators.push(
      UseGuards(JwtAuthGuard, PermissionGuard),
      RequirePermissions(...permissionArray)
    );
  } else {
    decorators.push(UseGuards(JwtAuthGuard));
  }

  return applyDecorators(...decorators);
}

/**
 * Decorator for CRUD operations with common patterns (JWT or API Key)
 */
export function ApiHybridCrudEndpoint(
  operation: 'create' | 'read' | 'update' | 'delete' | 'list',
  resource: string,
  permissions?: string | string[]
) {
  const decorators = [];

  if (permissions) {
    const permissionArray = Array.isArray(permissions)
      ? permissions
      : [permissions];
    decorators.push(
      UseGuards(HybridAuthGuard, PermissionGuard),
      RequirePermissions(...permissionArray)
    );
  } else {
    decorators.push(UseGuards(HybridAuthGuard));
  }

  return applyDecorators(...decorators);
}

/**
 * Decorator for endpoints with path parameters
 */
export function ApiWithParam(
  _paramName: string,
  _paramType: string = 'string',
  _description?: string
) {
  return applyDecorators();
}

/**
 * Decorator for endpoints with query parameters
 */
export function ApiWithQuery(
  _queryName: string,
  _required: boolean = false,
  _description?: string
) {
  return applyDecorators();
}
