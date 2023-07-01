import { validateOrThrowDomainError } from '@resnity/backend-common';

import {
  PriceAmount,
  PriceCurrency,
  RawPriceCurrency,
} from './price.value-object.types';

type AssertPriceAmount = (value: number) => asserts value is PriceAmount;
export const assertPriceAmount: AssertPriceAmount = (value: number) =>
  validateOrThrowDomainError(PriceAmount, value);

type AssertPriceCurrency = (
  value: RawPriceCurrency,
) => asserts value is PriceCurrency;
export const assertPriceCurrency: AssertPriceCurrency = (
  value: RawPriceCurrency,
) => validateOrThrowDomainError(PriceCurrency, value);
