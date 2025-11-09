import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProfileDocument = Profile &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({ collection: 'profiles', versionKey: false, timestamps: true })
export class Profile {
  @Prop({ required: true })
  institution_id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  permissions: string[];

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  created_by: Types.ObjectId;

  @Prop({ required: true })
  updated_by: Types.ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

// Add indexes
ProfileSchema.index({ active: 1, deleted: 1 });
ProfileSchema.index({ name: 1 });
