import { Stack } from '@mui/material';
import { BaseSyntheticEvent, PropsWithChildren } from 'react';

type SetupMenuFormContainerProps = {
  backButton?: React.ReactNode;
  nextButton: React.ReactNode;
  onNextButtonClick: () => void;
  onSubmit: () => void;
};

export const SetupMenuFormContainer = ({
  backButton,
  nextButton,
  onNextButtonClick,
  onSubmit,
  children,
}: PropsWithChildren<SetupMenuFormContainerProps>) => {
  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    onSubmit();
    onNextButtonClick();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} py={4} px={3}>
        {children}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={2}
        pb={2}
        px={3}
      >
        {backButton}
        {nextButton}
      </Stack>
    </form>
  );
};
