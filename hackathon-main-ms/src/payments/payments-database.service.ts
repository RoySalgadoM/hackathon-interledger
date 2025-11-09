import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from '../common/schemas/payment';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class PaymentsDatabaseService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
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
}
