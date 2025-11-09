import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Activity, ActivitySchema } from './activity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Activity.name, schema: ActivitySchema }
    ])
  ],
  exports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Activity.name, schema: ActivitySchema }
    ])
  ]
})
export class SchemasModule {}
