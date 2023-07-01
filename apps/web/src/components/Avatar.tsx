import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';

type Size = 'sm' | 'md' | 'lg';

type AvatarProps = {
  size?: Size;
};

const Avatar = styled('img')<AvatarProps>(({ size = 'md' }) => [
  tw`inline-block rounded-full`,
  sizeToClasses[size],
]);

export default Avatar;

const sizeToClasses: Record<Size, TwStyle> = {
  sm: tw`h-10 w-10`,
  md: tw`h-12 w-12`,
  lg: tw`h-14 w-14`,
};
