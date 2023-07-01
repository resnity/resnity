import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import tw from 'twin.macro';

import { useMenuContext } from './menu.context';

const MenuItemList = ({ children, ...props }: PropsWithChildren) => {
  const menuContext = useMenuContext();

  if (!menuContext.isOpen) {
    return null;
  }
  return <Container {...props}>{children}</Container>;
};

export default MenuItemList;

const Container = styled('ul')(() => [
  tw`absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`,
]);
