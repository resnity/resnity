import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

const STRIPE_API_KEY =
  'sk_test_51MziBSIOVbXNed92skw0UPofIQKz0qtpNazM7SYc70POFlheWadMsrBKQ9yjzehw1nRKmJ1GgzJoFOjVtz5wB5ZB00doGaAfCH';

@Injectable()
export class StripeClient extends Stripe {
  constructor() {
    super(STRIPE_API_KEY, { apiVersion: '2022-11-15' });
  }
}
