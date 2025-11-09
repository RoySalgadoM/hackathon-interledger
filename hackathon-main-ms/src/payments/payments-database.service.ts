import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Payment, PaymentDocument } from '../common/schemas/payment';
import { Wallet, WalletDocument } from '../common/schemas/wallet.schema';
import { Rule, RuleDocument } from '../common/schemas/rule.schema';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class PaymentsDatabaseService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    @InjectModel(Rule.name) private ruleModel: Model<RuleDocument>,
    private readonly loggerService: LoggerService
  ) {}

  async createPayment(payment: Partial<Payment>): Promise<PaymentDocument> {
    this.loggerService.printDebug(
      `Creating payment in database: ${JSON.stringify(payment, null, 2)}`
    );

    try {
      const result = await this.paymentModel.create(payment);
      this.loggerService.printInfo(
        `Payment created successfully with ID: ${result._id}`
      );
      return result;
    } catch (error) {
      this.loggerService.printError(
        'Error in createPayment database method',
        error instanceof Error ? error.stack : String(error)
      );
      throw error;
    }
  }

  async getPayment(request_id: string): Promise<PaymentDocument | null> {
    return await this.paymentModel.findOne({ request_id: request_id }).exec();
  }

  async updatePayment(
    request_id: string,
    payment: Partial<Payment>
  ): Promise<void> {
    this.loggerService.printDebug(
      `Updating payment in database: ${JSON.stringify(payment, null, 2)}`
    );

    try {
      await this.paymentModel
        .updateOne({ request_id: request_id }, { $set: payment })
        .exec();
      this.loggerService.printInfo(
        `Payment updated successfully with ID: ${request_id}`
      );
    } catch (error) {
      this.loggerService.printError(
        'Error in updatePayment database method',
        error instanceof Error ? error.stack : String(error)
      );
      throw error;
    }
  }

  async getWallet(userId: string): Promise<WalletDocument[] | null> {
    this.loggerService.printDebug(`Getting wallets for user_id: ${userId}`);

    try {
      const userObjectId = new Types.ObjectId(userId);
      const wallets = await this.walletModel
        .find({ user_id: userObjectId })
        .exec();

      if (wallets.length === 0) {
        this.loggerService.printDebug(
          `No wallets found for user_id: ${userId}`
        );
        return null;
      }

      this.loggerService.printInfo(
        `Found ${wallets.length} wallet(s) for user_id: ${userId}`
      );
      return wallets;
    } catch (error) {
      this.loggerService.printError(
        'Error in getWallet database method',
        error instanceof Error ? error.stack : String(error)
      );
      throw error;
    }
  }

  async getRulesByWallet(walletAddress: string): Promise<RuleDocument[]> {
    this.loggerService.printDebug(`Getting rules for wallet: ${walletAddress}`);

    try {
      const rules = await this.ruleModel
        .find({
          wallets: walletAddress,
          state: true
        })
        .exec();

      this.loggerService.printInfo(
        `Found ${rules.length} rule(s) for wallet: ${walletAddress}`
      );
      return rules;
    } catch (error) {
      this.loggerService.printError(
        'Error in getRulesByWallet database method',
        error instanceof Error ? error.stack : String(error)
      );
      throw error;
    }
  }
}
