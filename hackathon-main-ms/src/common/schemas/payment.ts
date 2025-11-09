import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ _id: false })
export class PaymentGrant {
  @Prop({ type: String, default: '' })
  uri: string;

  @Prop({ type: String, default: '' })
  access_token: string;

  @Prop({ type: String, default: '' })
  finish: string;
}

@Schema({ _id: false })
export class ClientObj {
  @Prop({ type: String, default: '' })
  id: string;

  @Prop({ type: String, default: '' })
  resource_server: string;
}

@Schema({
  collection: 'payments',
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})
export class Payment {
  _id?: Types.ObjectId;

  @Prop({ type: String, default: '' })
  client_account: string;

  @Prop({ type: String, default: '' })
  merchant_account: string;

  @Prop({ type: String, required: true })
  amount: string;

  @Prop({ type: Number, required: true })
  formatted_amount: number;

  @Prop({ type: String, required: true })
  time: string;

  @Prop({ type: String, required: true })
  date: string;

  @Prop({ type: Date, required: true })
  request_timestamp: Date;

  @Prop({ type: Date, default: Date.now })
  response_timestamp: Date;

  @Prop({ type: String, default: '' })
  request_id: string;

  @Prop({ type: PaymentGrant, default: () => ({}) })
  payment_grant: PaymentGrant;

  @Prop({ type: ClientObj, default: () => ({}) })
  client_obj: ClientObj;

  @Prop({ type: String, default: '' })
  quote_id: string;

  @Prop({ type: String, default: '' })
  payment_status: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
