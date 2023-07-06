import { z } from 'zod';

import {
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

export const priceCurrencies = ['MYR', 'USD'] as const;
export type RawPriceCurrency = (typeof priceCurrencies)[number];

const priceAmountSchema = z.number().nonnegative().brand<'PriceAmount'>();

const priceCurrencySchema = z.enum(priceCurrencies).brand<'PriceCurrency'>();

export const assertPriceAmountValid: Validate<typeof priceAmountSchema> =
  domainSchemaValidatorBuilder(priceAmountSchema);

export const assertPriceCurrencyValid: Validate<typeof priceCurrencySchema> =
  domainSchemaValidatorBuilder(priceCurrencySchema);

export type PriceAmount = z.infer<typeof priceAmountSchema>;

export type PriceCurrency = z.infer<typeof priceCurrencySchema>;

export type CreatePricePayload = {
  amount: number;
  currency: RawPriceCurrency;
};
