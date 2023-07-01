import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import tw from 'twin.macro';

const MenuItemButton = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>;
};

export default MenuItemButton;

const Container = styled('button')(() => [
  tw`w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black`,
]);
