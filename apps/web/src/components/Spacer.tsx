import styled from '@emotion/styled';
import tw from 'twin.macro';

type SpacerProps = {
  type: 'horizontal' | 'vertical';
  size: number;
};

const Spacer = styled('div')<SpacerProps>(({ type, size }) => [
  tw`block`,
  type === 'horizontal'
    ? tw`w-${String(size)} h-full`
    : tw`w-full h-${String(size)}`,
]);

export default Spacer;
