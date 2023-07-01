import { validateOrThrowDomainError } from '@resnity/backend-common';

import { Price } from '../value-objects/price.value-object';
import {
  ModifierId,
  ModifierIsRepeatable,
  ModifierMaxSelection,
  ModifierMinSelection,
  ModifierName,
  ModifierPrice,
} from './modifier.entity.types';

type AssertModifierId = (id: string) => asserts id is ModifierId;
export const assertModifierId: AssertModifierId = (value: string) =>
  validateOrThrowDomainError(ModifierId, value);

type AssertModifierName = (name: string) => asserts name is ModifierName;
export const assertModifierName: AssertModifierName = (value: string) =>
  validateOrThrowDomainError(ModifierName, value);

type AssertModifierMinSelection = (
  minSelection: number,
) => asserts minSelection is ModifierMinSelection;
export const assertModifierMinSelection: AssertModifierMinSelection = (
  value: number,
) => validateOrThrowDomainError(ModifierMinSelection, value);

type AssertModifierMaxSelection = (
  maxSelection: number,
) => asserts maxSelection is ModifierMaxSelection;
export const assertModifierMaxSelection: AssertModifierMaxSelection = (
  value: number,
) => validateOrThrowDomainError(ModifierMaxSelection, value);

type AssertModifierIsRepeatable = (
  isRepeatable: boolean,
) => asserts isRepeatable is ModifierIsRepeatable;
export const assertModifierIsRepeatable: AssertModifierIsRepeatable = (
  value: boolean,
) => validateOrThrowDomainError(ModifierIsRepeatable, value);

type AssertModifierPrice = (price: Price) => asserts price is ModifierPrice;
export const assertModifierPrice: AssertModifierPrice = (value: Price) =>
  validateOrThrowDomainError(ModifierPrice, value);
