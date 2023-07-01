import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';

import { Size } from './button.types';

type IconButtonProps = {
  bordered?: boolean;
  rounded?: boolean;
  size?: Size;
};

const IconButton = styled('button')<IconButtonProps>(
  ({ bordered = false, rounded = false, size = 'md' }) => [
    tw`rounded-md text-black hover:bg-gray-100`,
    bordered && tw`shadow-sm ring-1 ring-inset ring-gray-300`,
    rounded && tw`rounded-full`,
    sizeToClasses[size],
  ],
);

export default IconButton;

const sizeToClasses: Record<Size, TwStyle> = {
  sm: tw`p-1.5`,
  md: tw`p-2`,
  lg: tw`p-2.5`,
};
