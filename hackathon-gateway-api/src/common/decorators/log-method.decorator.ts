import { LoggerService } from '../logger/logger.service';

export function LogMethod(serviceName: string, methodName?: string) {
  return function (
    target: unknown,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    const actualMethodName = methodName || propertyName;

    descriptor.value = async function (...args: unknown[]) {
      const loggerService = this.loggerService as LoggerService;

      if (!loggerService) {
        console.warn(
          `LoggerService not found in ${serviceName}.${actualMethodName}`
        );
        return method.apply(this, args);
      }

      // Log de inicio
      loggerService.printDebug(
        `START process in ${serviceName} - ${actualMethodName}`
      );

      try {
        const result = await method.apply(this, args);

        // Log de fin exitoso
        loggerService.printDebug(
          `END process in ${serviceName} - ${actualMethodName}`
        );

        return result;
      } catch (error) {
        // Log de error
        loggerService.printError(
          `Error in ${serviceName} - ${actualMethodName}`,
          error instanceof Error ? error.stack : undefined
        );

        throw error;
      }
    };

    return descriptor;
  };
}
