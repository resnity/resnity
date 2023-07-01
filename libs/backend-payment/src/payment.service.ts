import { Injectable } from '@nestjs/common';

import { StripeClient } from './stripe/stripe.client';

@Injectable()
export class PaymentService {
  constructor(private readonly stripe: StripeClient) {}

  async createAccount() {
    const account = await this.stripe.accounts.create({
      type: 'standard',
      country: 'MY',
      email: 'example@example.com',
      business_type: 'individual',
      individual: {
        first_name: 'John',
        last_name: 'Doe',
        dob: {
          day: 1,
          month: 1,
          year: 1980,
        },
        address: {
          line1: '123 Main St',
          city: 'Anytown',
          state: 'Selangor',
          postal_code: '12345',
        },
        phone: '+60167178068',
        email: 'example@example.com',
        id_number: '123456789',
      },
    });
    const accountLink = await this.stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'http://localhost:3000/checkout',
      return_url: 'http://localhost:3000/checkout',
      type: 'account_onboarding',
    });
    return accountLink;
  }

  async checkout(accountID: string, priceID: string) {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceID, quantity: 1 }],
      payment_intent_data: {
        application_fee_amount: 1000,
        transfer_data: { destination: accountID },
      },
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    return session;
  }
}
