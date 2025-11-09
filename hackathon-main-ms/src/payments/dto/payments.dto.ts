import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Merchant Account',
    example: '1234567890'
  })
  @IsString()
  @IsNotEmpty()
  merchant_account: string;

  @ApiProperty({
    description: 'Password',
    example: '1234567890'
  })
  @IsString()
  @IsNotEmpty()
  client_account: string;

  @ApiProperty({
    description: 'Amount',
    example: 100
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class PaymentCallbackDto {
  @ApiProperty({
    description: 'Merchant Account',
    example: '1234567890'
  })
  @IsString()
  @IsNotEmpty()
  interact_ref: string;

  @ApiProperty({
    description: 'Password',
    example: '1234567890'
  })
  @IsString()
  @IsNotEmpty()
  request_id: string;

  @ApiProperty({
    description: 'Hash',
    example: '1234567890'
  })
  @IsString()
  @IsNotEmpty()
  hash: string;
}
