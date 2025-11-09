import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Profile, ProfileSchema } from './profile.schema';
import {
  Module as ModuleSchema,
  ModuleSchema as ModuleMongooseSchema
} from './module.schema';
import { Activity, ActivitySchema } from './activity.schema';
import { System, SystemSchema } from './system.schema';
import { ApiKey, ApiKeySchema } from './api-key.schema';
import { ReportType, ReportTypeSchema } from './report-type';
import { Institution, InstitutionSchema } from './institution.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: ModuleSchema.name, schema: ModuleMongooseSchema },
      { name: Activity.name, schema: ActivitySchema },
      { name: System.name, schema: SystemSchema },
      { name: ApiKey.name, schema: ApiKeySchema },
      { name: ReportType.name, schema: ReportTypeSchema },
      { name: Institution.name, schema: InstitutionSchema }
    ])
  ],
  exports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: ModuleSchema.name, schema: ModuleMongooseSchema },
      { name: Activity.name, schema: ActivitySchema },
      { name: System.name, schema: SystemSchema },
      { name: ApiKey.name, schema: ApiKeySchema },
      { name: ReportType.name, schema: ReportTypeSchema },
      { name: Institution.name, schema: InstitutionSchema }
    ])
  ]
})
export class SchemasModule {}
