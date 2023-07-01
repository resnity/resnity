import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';

import BaseButton from './BaseButton';
import { Color } from './button.types';

type TextButtonProps = {
  color?: Color;
};

const TextButton = styled(BaseButton)<TextButtonProps>(
  ({ color = 'primary' }) => [colorToClasses[color]],
);

export default TextButton;

const colorToClasses: Record<Color, TwStyle> = {
  primary: tw`text-primary hover:text-primary-light`,
};
