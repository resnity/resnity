import styled from '@emotion/styled';
import { forwardRef } from 'react';
import tw from 'twin.macro';
import 'twin.macro';

import Caption from '../typography/Caption';

type TextFieldProps = {
  label?: string;
  StartIcon?: React.ComponentType;
} & React.ComponentPropsWithoutRef<'input'>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, label, StartIcon, ...inputProps }, ref) => {
    return (
      <Container>
        {label !== undefined && <Label htmlFor={id}>{label}</Label>}
        <InputContainer>
          {StartIcon && (
            <InputStartIconContainer>
              <StartIcon tw="h-5 w-5" />
            </InputStartIconContainer>
          )}
          <Input
            hasStartIcon={StartIcon !== undefined}
            ref={ref}
            {...inputProps}
          />
        </InputContainer>
      </Container>
    );
  },
);

export default TextField;

const Container = styled('div')(() => [tw`w-full space-y-1`]);

const Label = Caption.withComponent('label');

const InputContainer = styled('div')(() => [tw`relative`]);

const InputStartIconContainer = styled('div')(() => [
  tw`pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center px-3 text-gray-400`,
]);

const Input = styled('input')<{ hasStartIcon?: boolean }>(
  ({ hasStartIcon = false }) => [
    tw`focus:ring-primary block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset`,
    hasStartIcon && tw`pl-10`,
  ],
);
