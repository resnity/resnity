import { Module } from '@nestjs/common';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { StripeClient } from './stripe/stripe.client';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, StripeClient],
})
export class PaymentModule {}
