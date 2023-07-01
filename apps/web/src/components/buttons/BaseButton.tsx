import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';

import { Size } from './button.types';

type BaseButtonProps = {
  fullWidth?: boolean;
  size?: Size;
};

const BaseButton = styled('button')<BaseButtonProps>(
  ({ fullWidth = false, size = 'md' }) => [
    tw`inline-flex items-center justify-center gap-x-2 rounded-md text-sm font-semibold`,
    sizeToClasses[size],
    fullWidth && tw`w-full`,
  ],
);

export default BaseButton;

const sizeToClasses: Record<Size, TwStyle> = {
  sm: tw`px-2.5 py-1.5`,
  md: tw`px-3 py-2`,
  lg: tw`px-3.5 py-2.5`,
};
