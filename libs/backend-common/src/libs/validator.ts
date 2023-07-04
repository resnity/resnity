import { z } from 'zod';

import { CreateDomainErrorPayload, DomainError } from '../domain/domain-error';

export const getFirstIssueFromZodError = (error: z.ZodError) => error.issues[0];
export const getRemainingIssuesFromZodError = (error: z.ZodError) =>
  error.issues.slice(1);

export const getContextFromZodIssue = (error: z.ZodIssue) =>
  error.path.join('.');
export const getMessageFromZodIssue = (error: z.ZodIssue) => error.message;
export const getCodeFromZodIssue = (error: z.ZodIssue) => error.code;

export const mapZodErrorToDomainErrorPayload = (
  error: z.ZodError,
): CreateDomainErrorPayload => {
  const firstIssue = getFirstIssueFromZodError(error);
  const remainingIssues = getRemainingIssuesFromZodError(error);

  const code = getCodeFromZodIssue(firstIssue);
  const message = getMessageFromZodIssue(firstIssue);
  const context = getContextFromZodIssue(firstIssue);

  const additionalErrors =
    remainingIssues.length > 0
      ? remainingIssues.map((issue) => ({
          code: getCodeFromZodIssue(issue),
          message: getMessageFromZodIssue(issue),
        }))
      : undefined;

  return { code, context, message, additionalErrors };
};

type ValidateOrThrowDomainError = <T extends z.ZodTypeAny>(
  schema: T,
  input: unknown,
) => asserts input is z.infer<T>;

export const validateOrThrowDomainError: ValidateOrThrowDomainError = <
  T extends z.ZodTypeAny,
>(
  schema: T,
  input: unknown,
) => {
  const result = schema.safeParse(input);
  if (!result.success)
    throw new DomainError(mapZodErrorToDomainErrorPayload(result.error));
};

export type Validate<TSchema extends z.ZodTypeAny> = (
  input: unknown,
) => asserts input is z.infer<TSchema>;

export type SchemaValidatorErrorHandler = (error: z.ZodError) => void;

export type SchemaValidatorBuilder = <TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  onError: SchemaValidatorErrorHandler,
) => Validate<TSchema>;

export const schemaValidatorBuilder: SchemaValidatorBuilder =
  <TSchema extends z.ZodTypeAny>(
    schema: TSchema,
    onError: SchemaValidatorErrorHandler,
  ) =>
  (input: unknown) => {
    const result = schema.safeParse(input);
    if (!result.success) onError(result.error);
  };

export type DomainSchemaValidatorBuilder = <TSchema extends z.ZodTypeAny>(
  schema: TSchema,
) => Validate<TSchema>;

export const domainSchemaValidatorBuilder: DomainSchemaValidatorBuilder =
  <TSchema extends z.ZodTypeAny>(schema: TSchema) =>
  (input: unknown) =>
    schemaValidatorBuilder(schema, (error) => {
      throw new DomainError(mapZodErrorToDomainErrorPayload(error));
    })(input);
