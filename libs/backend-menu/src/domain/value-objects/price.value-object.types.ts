import { z } from 'zod';

export const PriceAmount = z.number().nonnegative().brand<'PriceAmount'>();
export type PriceAmount = z.infer<typeof PriceAmount>;

export const priceCurrencies = ['MYR', 'USD'] as const;
export type RawPriceCurrency = (typeof priceCurrencies)[number];

export const PriceCurrency = z.enum(priceCurrencies).brand<'PriceCurrency'>();
export type PriceCurrency = z.infer<typeof PriceCurrency>;

export type CreatePricePayload = {
  amount: number;
  currency: RawPriceCurrency;
};
