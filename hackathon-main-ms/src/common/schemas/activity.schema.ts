import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ActivityDocument = Activity & Document;

@Schema({ collection: 'activities_log', versionKey: false })
export class Activity {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({
    type: Object,
    required: true
  })
  module: {
    es: string;
    en: string;
  };

  @Prop({
    type: Object,
    required: true
  })
  submodule: {
    es: string;
    en: string;
  };

  @Prop({
    type: Object,
    required: true
  })
  action: {
    es: string;
    en: string;
  };

  @Prop({
    type: Object,
    required: true
  })
  description: {
    es: string;
    en: string;
  };

  @Prop({ required: true, default: Date.now })
  creation_date: Date;

  @Prop({ required: true })
  uuid: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);

// Add indexes
ActivitySchema.index({ user: 1 });
ActivitySchema.index({ creation_date: -1 });
