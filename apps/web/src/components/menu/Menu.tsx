import styled from '@emotion/styled';
import { PropsWithChildren, useState } from 'react';
import tw from 'twin.macro';

import { MenuProvider } from './menu.context';

const Menu = ({ children, ...props }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const close = () => setIsOpen(false);

  const open = () => setIsOpen(true);

  return (
    <MenuProvider value={{ isOpen, close, open }}>
      <Container {...props}>{children}</Container>
    </MenuProvider>
  );
};

export default Menu;

const Container = styled('div')(() => [tw`relative inline-block`]);
