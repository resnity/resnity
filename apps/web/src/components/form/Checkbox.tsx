import styled from '@emotion/styled';
import React from 'react';
import tw from 'twin.macro';

import Caption from '../typography/Caption';

type CheckboxProps = {
  label?: string;
} & React.ComponentPropsWithoutRef<'input'>;

const Checkbox = ({ id, label, ...props }: CheckboxProps) => {
  return (
    <Container>
      <Input id={id} type="checkbox" {...props} />
      {label && <Label htmlFor={id}>{label}</Label>}
    </Container>
  );
};

export default Checkbox;

const Container = styled('div')(() => [tw`flex items-center space-x-2`]);

const Input = styled('input')(() => [
  tw`text-primary focus:ring-primary h-4 w-4 cursor-pointer rounded border-gray-300`,
]);

const Label = Caption.withComponent('label');
