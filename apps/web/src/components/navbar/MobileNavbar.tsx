import styled from '@emotion/styled';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

import Divider from '../Divider';
import { ResnityLogo } from '../ResnityLogo';
import IconButton from '../buttons/IconButton';
import TextField from '../form/TextField';
import Menu from '../menu/Menu';
import MenuButton from '../menu/MenuButton';
import MenuItem from '../menu/MenuItem';
import MenuItemList from '../menu/MenuItemList';

const MobileNavbar = () => {
  return (
    <Container>
      <LogoContainer>
        <ResnityLogo />
      </LogoContainer>
      <SearchBarContainer>
        <TextField
          type="text"
          placeholder="Search"
          StartIcon={MagnifyingGlassIcon}
        />
      </SearchBarContainer>
      <Dropdown>
        <MenuIconButton>
          <BurgerIcon />
        </MenuIconButton>
        <DropdownItemList>
          <DropdownItemLink to="/restaurants">Restaurant</DropdownItemLink>
          <DropdownItemLink to="/order">Order</DropdownItemLink>
          <DropdownItemListDivider lineColor="gray-200" />
          <DropdownItemLink to="/restaurants">Restaurant</DropdownItemLink>
          <DropdownItemLink to="/order">Order</DropdownItemLink>
        </DropdownItemList>
      </Dropdown>
    </Container>
  );
};

export default MobileNavbar;

const Container = styled('nav')(() => [
  tw`flex h-16 w-full items-center justify-between bg-white px-4 shadow`,
]);

const LogoContainer = styled('div')(() => [tw`h-8`]);

const SearchBarContainer = styled('div')(() => [tw`flex-1 pl-6 pr-3`]);

const MenuIconButton = IconButton.withComponent(MenuButton);

const BurgerIcon = styled(Bars3Icon)(() => [tw`h-5 w-5 text-gray-700`]);

const Dropdown = styled(Menu)(() => [tw`static`]);

const DropdownItemList = styled(MenuItemList)(() => [
  tw`inset-x-0 top-16 m-0 w-screen rounded-none ring-0`,
]);

const DropdownItemListDivider = styled(Divider)(() => [tw`py-2`]);

const DropdownItem = styled(MenuItem)(() => [
  tw`hover:text-primary flex gap-x-3 rounded-md px-4 py-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-100`,
]);

const DropdownItemLink = DropdownItem.withComponent(Link);
