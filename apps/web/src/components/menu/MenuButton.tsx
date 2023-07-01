import { PropsWithChildren } from 'react';

import { useMenuContext } from './menu.context';

const MenuButton = ({ children, ...props }: PropsWithChildren) => {
  const menuContext = useMenuContext();

  const handleClick = () => {
    if (menuContext.isOpen) {
      menuContext.close();
    } else {
      menuContext.open();
    }
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export default MenuButton;
