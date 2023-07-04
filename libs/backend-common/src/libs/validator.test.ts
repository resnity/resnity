import { z } from 'zod';

import { DomainError } from '../domain/domain-error';
import { Validate, domainSchemaValidatorBuilder } from './validator';

describe('domainSchemaValidatorBuilder', () => {
  test('when the input is valid, it should not throw domain error', () => {
    const mockSchema = z.string();
    const mockInput = 'mockInput';
    const validate = domainSchemaValidatorBuilder(mockSchema);
    expect(() => validate(mockInput)).not.toThrow();
  });

  test('when the input is not valid, it should throw domain error', () => {
    const mockSchema = z.string();
    const mockInput = 12345;
    const validate: Validate<typeof mockSchema> =
      domainSchemaValidatorBuilder(mockSchema);
    expect(() => validate(mockInput)).toThrow(DomainError);
  });
});
