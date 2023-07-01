import { PropsWithChildren, createContext, useContext } from 'react';

type MenuContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const MenuContext = createContext<MenuContextValue>({
  isOpen: false,
  close: () => undefined,
  open: () => undefined,
});

type MenuProviderProps = {
  value: MenuContextValue;
};

const MenuProvider = ({
  children,
  value,
}: PropsWithChildren<MenuProviderProps>) => {
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};

export { MenuProvider, useMenuContext };
