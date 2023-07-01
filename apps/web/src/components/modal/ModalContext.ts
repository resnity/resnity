import { createContext } from 'react';

export type ModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const ModalContext = createContext<ModalContextValue>({
  isOpen: false,
  open: () => undefined,
  close: () => undefined,
  toggle: () => undefined,
});
