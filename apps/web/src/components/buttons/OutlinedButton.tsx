import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';

import BaseButton from './BaseButton';
import { Color } from './button.types';

type OutlinedButtonProps = {
  color?: Color | 'default';
};

const OutlinedButton = styled(BaseButton)<OutlinedButtonProps>(
  ({ color = 'default' }) => [
    tw`shadow-sm ring-1 ring-inset`,
    colorToClasses[color],
  ],
);

export default OutlinedButton;

const colorToClasses: Record<
  NonNullable<OutlinedButtonProps['color']>,
  TwStyle
> = {
  default: tw`text-black ring-gray-300 hover:bg-gray-100`,
  primary: tw`text-primary hover:text-primary-light ring-primary hover:bg-offwhite`,
};
