import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Activity, ActivitySchema } from './activity.schema';
import { Payment, PaymentSchema } from './payment';
import { Wallet, WalletSchema } from './wallet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Activity.name, schema: ActivitySchema },
      { name: Payment.name, schema: PaymentSchema },
      { name: Wallet.name, schema: WalletSchema }
    ])
  ],
  exports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Activity.name, schema: ActivitySchema },
      { name: Payment.name, schema: PaymentSchema },
      { name: Wallet.name, schema: WalletSchema }
    ])
  ]
})
export class SchemasModule {}
