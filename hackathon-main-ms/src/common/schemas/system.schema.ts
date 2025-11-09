import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SystemDocument = System & Document;

@Schema({
  collection: 'systems',
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})
export class System {
  @Prop({ required: true })
  system_name: string;

  @Prop({ type: [String], default: [] })
  domain: string[];

  @Prop({ required: true })
  company: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  delete: boolean;

  @Prop({ required: true })
  created_by: string;

  @Prop({ required: true })
  updated_by: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const SystemSchema = SchemaFactory.createForClass(System);

// Add indexes
SystemSchema.index({ system_name: 1 });
SystemSchema.index({ domain: 1 });
SystemSchema.index({ company: 1 });
SystemSchema.index({ active: 1, delete: 1 });
