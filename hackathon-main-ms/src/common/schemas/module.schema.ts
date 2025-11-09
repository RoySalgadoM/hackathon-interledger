import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ModuleDocument = Module & Document;

@Schema({ collection: 'modules', versionKey: false, timestamps: true })
export class Module {
  @Prop({ type: Map, of: String, required: true })
  name: Map<string, string>;

  @Prop({ type: Map, of: String, default: {} })
  description: Map<string, string>;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: true, trim: true })
  route: string;

  @Prop({ required: true, trim: true })
  value: string;

  @Prop({ required: true, trim: true })
  key_module: string;

  @Prop({ type: [Object], default: [] })
  children: unknown[];

  @Prop({ default: 'main' })
  header: string;

  @Prop({ default: false })
  expanded: boolean;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true, trim: true })
  permission_value: string;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);

// Add indexes
ModuleSchema.index({ active: 1, deleted: 1 });
ModuleSchema.index({ routeName: 1 });
ModuleSchema.index({ value: 1 });
