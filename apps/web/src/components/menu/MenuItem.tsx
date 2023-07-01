import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import tw from 'twin.macro';

const MenuItem = ({ children, ...props }: PropsWithChildren) => {
  return <Container {...props}>{children}</Container>;
};

export default MenuItem;

const Container = styled('li')(() => [tw`flex`]);
