import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';

import { Color } from './typography.types';

type BaseTextProps = {
  color?: Color;
};

const BaseText = styled('p')<BaseTextProps>(({ color = 'black' }) => [
  colorClasses[color],
]);

export default BaseText;

const colorClasses: Record<Color, TwStyle> = {
  primary: tw`text-primary`,
  black: tw`text-black`,
  gray: tw`text-gray-500`,
};
