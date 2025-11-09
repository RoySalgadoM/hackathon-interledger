import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReportTypeDocument = ReportType & Document;

@Schema({
  collection: 'cat_report_type',
  versionKey: false
})
export class ReportType {
  @Prop({ required: true })
  id: number;

  @Prop({ type: Object, required: true })
  internationalization: {
    en: string;
    es: string;
  };

  @Prop({ required: true })
  activities_log: boolean;

  @Prop({ required: true })
  transactions_log: boolean;
}

export const ReportTypeSchema = SchemaFactory.createForClass(ReportType);
