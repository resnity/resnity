import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';

import BaseButton from './BaseButton';
import { Color } from './button.types';

type ContainedButtonProps = {
  color?: Color;
};

const ContainedButton = styled(BaseButton)<ContainedButtonProps>(
  ({ color = 'primary' }) => [colorToClasses[color]],
);

export default ContainedButton;

const colorToClasses: Record<Color, TwStyle> = {
  primary: tw`bg-primary hover:bg-primary-light focus-visible:outline-primary-light text-white`,
};
