import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InstitutionDocument = Institution & Document;

@Schema({
  collection: 'institutions',
  versionKey: false
})
export class Institution {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  short_name: string;

  @Prop({ required: true })
  active: boolean;
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);
