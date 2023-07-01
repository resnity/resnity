import { useContext } from 'react';

import { FlowContext } from './FlowContext';

export const useFlowContext = () => {
  const context = useContext(FlowContext);
  if (!context)
    throw new Error('useFlowContext must be used within a FlowProvider');
  return context;
};
