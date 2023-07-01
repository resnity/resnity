import { Modal } from 'antd';
import { useState } from 'react';

import { useModal } from '../../hooks/useModal';
import { FlowProvider } from '../flow/FlowProvider';
import { Flow } from '../flow/flow.types';
import { CreateCategoriesForm } from './CreateCategoriesForm';
import { CreateItemsForm } from './CreateItemsForm';
import { CreateMenuForm } from './CreateMenuForm';
import { MenuSummary } from './MenuSummary';

const setupMenuFlow: Flow = {
  steps: [
    { title: 'Create Menu', component: CreateMenuForm },
    { title: 'Add Categories', component: CreateCategoriesForm },
    { title: 'Add Items', component: CreateItemsForm },
    { title: 'Menu Summary', component: MenuSummary },
  ],
};

type SetupMenuFlowProps = {
  modal: ReturnType<typeof useModal>;
};

export const SetupMenuFlow = ({ modal }: SetupMenuFlowProps) => {
  const [stepIndex, setStepIndex] = useState(0);

  const nextStep = () => setStepIndex(stepIndex + 1);

  const previousStep = () => setStepIndex(stepIndex - 1);

  const exit = () => setStepIndex(0);

  const complete = () => setStepIndex(0);

  const currentStep = setupMenuFlow.steps[stepIndex];
  const CurrentStepComponent = currentStep.component;

  const handleOk = () => {
    nextStep();
  };

  const handleClose = () => {
    modal.close();
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
      <Modal
        open={modal.isOpen}
        onOk={handleOk}
        onCancel={handleClose}
        title={currentStep.title}
      >
        <CurrentStepComponent />
      </Modal>
    </FlowProvider>
  );
};
