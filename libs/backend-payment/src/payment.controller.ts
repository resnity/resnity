import { Body, Controller, Post } from '@nestjs/common';

import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  createAccount() {
    return this.paymentService.createAccount();
  }

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() body: any) {
    const { accountID, priceID } = body;
    const session = await this.paymentService.checkout(accountID, priceID);
    return session.url;
  }
}
