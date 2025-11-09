import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Activity, ActivityDocument } from '../schemas/activity.schema';
import { LoggerService } from '../logger/logger.service';
import { ExcelService } from './excel.service';

export interface CreateActivityDto {
  userId: string;
  module: {
    es: string;
    en: string;
  };
  submodule: {
    es: string;
    en: string;
  };
  action: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  uuid: string;
}

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
    private readonly loggerService: LoggerService,
    private readonly excelService: ExcelService
  ) {}

  async createActivity(activityData: CreateActivityDto): Promise<void> {
    try {
      const activity = new this.activityModel({
        user: new Types.ObjectId(activityData.userId),
        module: activityData.module,
        submodule: activityData.submodule,
        action: activityData.action,
        description: activityData.description,
        creation_date: new Date(),
        uuid: activityData.uuid
      });

      await activity.save();

      this.loggerService.printDebug(
        `Activity logged: ${activityData.module.es} - ${activityData.action.es}`
      );
    } catch (error) {
      this.loggerService.printError(
        `Failed to log activity: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  getActionByHttpMethod(method: string): { es: string; en: string } {
    const methodUpper = method.toUpperCase();

    switch (methodUpper) {
      case 'GET':
        return { es: 'Consultar', en: 'Query' };
      case 'POST':
        return { es: 'Crear', en: 'Create' };
      case 'PATCH':
      case 'PUT':
        return { es: 'Actualizar', en: 'Update' };
      case 'DELETE':
        return { es: 'Eliminar', en: 'Delete' };
      default:
        return { es: 'Ejecutar', en: 'Execute' };
    }
  }
}
