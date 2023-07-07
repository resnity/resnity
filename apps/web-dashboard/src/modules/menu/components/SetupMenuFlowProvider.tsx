import { useState } from 'react';

import { FlowProvider } from '../../flow/FlowProvider';
import { Flow } from '../../flow/flow.types';
import { CreateCategoriesForm } from './CreateCategoriesForm';
import { CreateItemsForm } from './CreateItemsForm';
import { CreateMenuForm } from './CreateMenuForm';
import { MenuSummary } from './MenuSummary';
import { SetupMenuModal } from './SetupMenuModal';

const setupMenuFlow: Flow = {
  steps: [
    { title: 'Create Menu', component: CreateMenuForm },
    { title: 'Add Categories', component: CreateCategoriesForm },
    { title: 'Add Items', component: CreateItemsForm },
    { title: 'Menu Summary', component: MenuSummary },
  ],
};

type SetupMenuFlowProviderProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SetupMenuFlowProvider = ({
  isOpen,
  onClose,
}: SetupMenuFlowProviderProps) => {
  const [stepIndex, setStepIndex] = useState(0);

  const nextStep = () => setStepIndex(stepIndex + 1);

  const previousStep = () => setStepIndex(stepIndex - 1);

  const exit = () => {
    setStepIndex(0);
    onClose();
  };

  const complete = () => {
    setStepIndex(0);
    onClose();
  };

  const currentStep = setupMenuFlow.steps[stepIndex];
  const CurrentStepComponent = currentStep.component;

  const handleClose = () => {
    onClose();
    exit();
  };

  return (
    <FlowProvider
      value={{
        stepIndex,
        nextStep,
        previousStep,
        exit,
        complete,
      }}
    >
      <SetupMenuModal
        isOpen={isOpen}
        title={currentStep.title}
        onClose={handleClose}
      >
        <CurrentStepComponent />
      </SetupMenuModal>
    </FlowProvider>
  );
};
