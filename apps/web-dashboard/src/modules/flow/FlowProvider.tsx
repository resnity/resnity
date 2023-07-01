import { PropsWithChildren } from 'react';

import { FlowContext, FlowContextValue } from './FlowContext';

type FlowProviderProps = PropsWithChildren<{
  value: FlowContextValue;
}>;

export const FlowProvider = ({ value, children }: FlowProviderProps) => {
  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
};
