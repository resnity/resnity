import { PropsWithChildren } from 'react';

import { ModalContext, ModalContextValue } from './ModalContext';

export type ModalProviderProps = PropsWithChildren<{
  value: ModalContextValue;
}>;

export const ModalProvider = ({ value, children }: ModalProviderProps) => {
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
