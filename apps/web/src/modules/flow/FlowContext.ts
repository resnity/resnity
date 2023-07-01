import { createContext } from 'react';

export type FlowContextValue = {
  stepIndex: number;
  nextStep: () => void;
  previousStep: () => void;
  exit: () => void;
  complete: () => void;
};

export const FlowContext = createContext<FlowContextValue>({
  stepIndex: 0,
  nextStep: () => undefined,
  previousStep: () => undefined,
  exit: () => undefined,
  complete: () => undefined,
});
