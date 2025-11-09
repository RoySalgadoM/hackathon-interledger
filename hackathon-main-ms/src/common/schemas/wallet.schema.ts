import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema({
  collection: 'wallets',
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})
export class Wallet {
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true, trim: true })
  wallet_name: string;

  @Prop({ type: String, required: true, trim: true })
  wallet_address: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true
  })
  user_id: Types.ObjectId;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

WalletSchema.index({ user_id: 1 });
WalletSchema.index({ wallet_address: 1 });
