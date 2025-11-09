import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest, FastifyReply } from 'fastify';

import { ResponseService } from '../services/response.service';
import { LoggerService } from '../logger/logger.service';
import path from 'path';
import fs from 'fs';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
    private readonly responseService: ResponseService
  ) {}

  /**
   * Detecta si un Content-Type corresponde a un archivo binario
   */
  private isBinaryContentType(contentType: string): boolean {
    if (!contentType) return false;

    const binaryTypes = [
      // Documentos Office
      'application/vnd.openxmlformats-officedocument',
      'application/vnd.ms-excel',
      'application/vnd.ms-office',
      // PDF
      'application/pdf',
      // Imágenes
      'image/',
      // Archivos comprimidos
      'application/zip',
      'application/x-zip-compressed',
      'application/x-rar-compressed',
      'application/octet-stream',
      // Archivos ejecutables
      'application/x-msdownload',
      'application/x-executable',
      // Otros binarios comunes
      'application/x-binary',
      'application/binary'
    ];

    return binaryTypes.some((type) => contentType.includes(type));
  }

  /**
   * Convierte ArrayBuffer a Buffer si es necesario
   */
  private convertToBuffer(data: any): Buffer | string {
    if (data instanceof ArrayBuffer) {
      return Buffer.from(data);
    }
    if (data instanceof Buffer) {
      return data;
    }
    // Si es string, devolverlo como string
    return data;
  }

  /**
   * Detecta si los datos son binarios
   */
  private isBinaryData(data: any): boolean {
    return data instanceof Buffer || data instanceof ArrayBuffer;
  }

  async proxyRequest(
    request: FastifyRequest,
    reply: FastifyReply,
    targetUrl: string,
    serviceName: string
  ): Promise<void> {
    const requestId = request.headers['x-request-id'] as string;
    this.loggerService.setUUID(requestId);

    try {
      this.loggerService.printInfo(
        `Starting proxy request to ${serviceName} - URL: ${targetUrl}`
      );

      this.loggerService.printDebug(`Request method: ${request.method}`);
      this.loggerService.printDebug(
        `Request headers: ${JSON.stringify(request.headers, null, 2)}`
      );
      this.loggerService.printDebug(
        `Request query: ${JSON.stringify(request.query)}`
      );

      if ((request as any).user) {
        request.headers['api-key-data'] = JSON.stringify((request as any).user);
      }

      const response = await this.makeHttpRequest(request, targetUrl);

      // Convertir ArrayBuffer a Buffer si es necesario
      const responseData = this.convertToBuffer(response.data);
      const isBinary = this.isBinaryData(responseData);

      this.loggerService.printDebug(`Response status: ${response.status}`);
      this.loggerService.printDebug(
        `Response headers: ${JSON.stringify(response.headers, null, 2)}`
      );

      // Evitar logging de datos binarios para prevenir corrupción
      if (isBinary) {
        this.loggerService.printDebug(
          `Response data: [Binary data - ${
            (responseData as Buffer).length
          } bytes]`
        );
      } else {
        this.loggerService.printDebug(`Response data: ${responseData}`);
      }
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.location;
        if (location) {
          this.loggerService.printDebug(
            `Redirect detected: ${response.status} to ${location}`
          );

          reply.status(response.status);
          reply.header('location', location);
          reply.send(responseData);
          return;
        }
      }

      reply.status(response.status);

      const contentType = response.headers['content-type'] || '';
      const contentDisposition = response.headers['content-disposition'];

      // Si es binario, enviarlo directamente como Buffer
      if (isBinary || this.isBinaryContentType(contentType)) {
        // Copiar headers relevantes
        if (contentDisposition) {
          reply.header('content-disposition', contentDisposition);
        }

        // Establecer Content-Type
        reply.type(contentType || 'application/octet-stream');

        // Enviar como Buffer
        reply.send(responseData);
        return;
      }

      // Manejar tipos de texto/JSON/XML
      if (contentType.includes('application/json')) {
        // Convertir Buffer a string si es necesario
        const jsonData = isBinary
          ? (responseData as Buffer).toString('utf8')
          : responseData;

        try {
          // Intentar parsear JSON para validar
          const parsed =
            typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
          reply.type('application/json').send(parsed);
        } catch (_e) {
          // Si falla el parseo, enviar como string
          reply.type('application/json').send(jsonData);
        }
      } else if (contentType.includes('text/html')) {
        const htmlData = isBinary
          ? (responseData as Buffer).toString('utf8')
          : responseData;
        reply.type('text/html; charset=utf-8').send(htmlData);
      } else if (contentType.includes('text/')) {
        const textData = isBinary
          ? (responseData as Buffer).toString('utf8')
          : responseData;
        reply.type('text/plain; charset=utf-8').send(textData);
      } else if (
        contentType.includes('application/xml') ||
        contentType.includes('text/xml')
      ) {
        const xmlData = isBinary
          ? (responseData as Buffer).toString('utf8')
          : responseData;
        reply.type('application/xml').send(xmlData);
      } else {
        // Fallback: intentar detectar por contenido
        const stringData = isBinary
          ? (responseData as Buffer).toString('utf8')
          : responseData;

        if (
          typeof stringData === 'string' &&
          stringData.trim().startsWith('<!DOCTYPE html>')
        ) {
          reply.type('text/html; charset=utf-8').send(stringData);
        } else if (
          typeof stringData === 'string' &&
          (stringData.trim().startsWith('{') ||
            stringData.trim().startsWith('['))
        ) {
          // Parece JSON
          try {
            const parsed = JSON.parse(stringData);
            const apiResponse = this.responseService.generateResponseOk(
              request,
              {
                statusCode: response.status,
                body: parsed
              }
            );
            this.responseService.sendResponse(reply, apiResponse);
          } catch (_e) {
            // No es JSON válido, enviar como respuesta genérica
            const apiResponse = this.responseService.generateResponseOk(
              request,
              {
                statusCode: response.status,
                body: stringData
              }
            );
            this.responseService.sendResponse(reply, apiResponse);
          }
        } else {
          // Generate custom API response for successful requests
          const apiResponse = this.responseService.generateResponseOk(request, {
            statusCode: response.status,
            body: stringData
          });
          this.responseService.sendResponse(reply, apiResponse);
        }
      }

      this.loggerService.printInfo(
        `Proxy request to ${serviceName} completed successfully`
      );
    } catch (error) {
      this.loggerService.printError(
        `Proxy request to ${serviceName} failed: ${error.message}`,
        error.stack
      );

      // Generate custom error response
      let apiResponse;
      if (error.response) {
        apiResponse = this.responseService.generateResponseOk(request, {
          statusCode: error.response.status,
          body: error.response.data
        });
      } else if (error.code === 'ECONNREFUSED') {
        apiResponse = this.responseService.generateResponseServiceUnavailable(
          request,
          'Service temporarily unavailable'
        );
      } else if (error.code === 'ETIMEDOUT') {
        apiResponse = this.responseService.generateResponseGatewayTimeout(
          request,
          'Request timeout'
        );
      } else {
        apiResponse = this.responseService.generateResponseError(
          request,
          error.message
        );
      }

      this.responseService.sendResponse(reply, apiResponse);
    }
  }

  private async makeHttpRequest(request: FastifyRequest, targetUrl: string) {
    const axios = require('axios');
    const FormData = require('form-data');

    let data = request.body;
    let headers = { ...request.headers };

    // Handle multipart/form-data requests
    if (request.headers['content-type']?.includes('multipart/form-data')) {
      const formData = new FormData();

      // Add files if present
      if ((request as any).files) {
        const files = (request as any).files;

        if (files.key_file) {
          formData.append('key_file', files.key_file.buffer, {
            filename: files.key_file.originalname,
            contentType: files.key_file.mimetype
          });
        }

        if (files.cert_file) {
          formData.append('cert_file', files.cert_file.buffer, {
            filename: files.cert_file.originalname,
            contentType: files.cert_file.mimetype
          });
        }
      }

      // Add DTO fields
      if ((request as any).dto) {
        const dto = (request as any).dto;
        Object.keys(dto).forEach((key) => {
          // Convert boolean values to string for FormData
          const value =
            typeof dto[key] === 'boolean' ? String(dto[key]) : dto[key];
          formData.append(key, value);
        });
      }

      // Add other form fields from body
      if (request.body && typeof request.body === 'object') {
        Object.keys(request.body).forEach((key) => {
          if (!['key_file', 'cert_file'].includes(key)) {
            // Convert boolean values to string for FormData
            const value =
              typeof request.body[key] === 'boolean'
                ? String(request.body[key])
                : request.body[key];
            formData.append(key, value);
          }
        });
      }

      data = formData;
      headers = {
        ...headers,
        ...formData.getHeaders()
      };
    }

    // Usar arraybuffer para poder manejar tanto texto como binario correctamente
    // Esto evita la corrupción de datos binarios
    // Siempre usamos arraybuffer para recibir los datos correctamente,
    // luego convertiremos a Buffer o string según el Content-Type recibido
    const config = {
      method: request.method,
      url: targetUrl,
      headers,
      data,
      params: request.query,
      validateStatus: () => true,
      maxRedirects: 0,
      timeout: 30000,
      withCredentials: true,
      maxContentLength: 50 * 1024 * 1024,
      maxBodyLength: 50 * 1024 * 1024,
      // Usar arraybuffer para poder manejar binarios correctamente
      // Luego convertiremos a Buffer o string según el Content-Type recibido
      responseType: 'arraybuffer' as const,
      decompress: true
    };

    delete config.headers.host;
    delete config.headers['content-length'];
    delete config.headers['transfer-encoding'];

    if (request.headers['user-agent']) {
      config.headers['user-agent'] = request.headers['user-agent'];
    }
    config.headers['x-forwarded-for'] =
      request.ip || request.headers['x-forwarded-for'] || 'unknown';
    config.headers['x-forwarded-proto'] =
      request.headers['x-forwarded-proto'] || 'http';
    config.headers['x-forwarded-host'] = request.headers.host;

    const response = await axios(config);

    return {
      status: response.status,
      headers: response.headers,
      data: response.data // Será ArrayBuffer si responseType es 'arraybuffer'
    };
  }

  private createErrorResponse(error: any, serviceName: string) {
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.response?.data?.message || error.message || 'Internal server error';

    this.loggerService.printError(
      `Creating error response for ${serviceName}: ${message}`,
      error.stack
    );

    return {
      status,
      data: {
        success: false,
        message: `Error communicating with ${serviceName}: ${message}`,
        timestamp: new Date().toISOString()
      }
    };
  }

  async handleRedirect(
    request: FastifyRequest,
    reply: FastifyReply,
    redirectUrl: string,
    serviceName: string
  ): Promise<void> {
    this.loggerService.printDebug(`Handling redirect to: ${redirectUrl}`);
    return this.proxyRequest(request, reply, redirectUrl, serviceName);
  }
}
