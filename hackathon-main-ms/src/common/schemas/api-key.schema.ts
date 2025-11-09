import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ApiKeyDocument = ApiKey & Document;

@Schema({
  collection: 'api-keys',
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})
export class ApiKey {
  @Prop({ required: true })
  api_key_name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'System', required: true })
  system: Types.ObjectId;

  @Prop({ required: true, unique: true })
  api_key: string;

  @Prop({ type: [String], default: [] })
  permissions: string[];

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

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);

// Add indexes
ApiKeySchema.index({ api_key_name: 1 });
ApiKeySchema.index({ system: 1 });
ApiKeySchema.index({ permissions: 1 });
ApiKeySchema.index({ active: 1, delete: 1 });
