import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  collection: 'users',
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})
export class User {
  _id?: Types.ObjectId;

  @Prop({ required: true, trim: true })
  first_name: string;

  @Prop({ required: true, trim: true })
  last_name: string;

  @Prop({ required: true, trim: true })
  role: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Profile',
    required: true
  })
  profile_id: Types.ObjectId;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'Institution'
  })
  institution_id: Types.ObjectId;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  created_by: string;

  @Prop({ required: true })
  updated_by: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;

  @Prop({ default: Date.now })
  last_access_date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 });
UserSchema.index({ profile_id: 1 });
UserSchema.index({ active: 1, deleted: 1 });
UserSchema.index({ first_name: 1, last_name: 1 });
UserSchema.index({ role: 1 });
