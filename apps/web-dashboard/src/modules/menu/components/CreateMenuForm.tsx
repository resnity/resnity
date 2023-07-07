import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { useFlowContext } from '../../flow/flow.hooks';
import { SetupMenuFormContainer } from './SetupMenuFormContainer';

export const CreateMenuForm = () => {
  const { nextStep } = useFlowContext();
  const { control, handleSubmit: withFormHandler } = useForm();

  const handleSubmit = withFormHandler((data) => {
    console.log('Data');
  });

  return (
    <SetupMenuFormContainer
      nextButton={
        <Button variant="contained" type="submit" disableElevation>
          Continue
        </Button>
      }
      onNextButtonClick={nextStep}
      onSubmit={handleSubmit}
    >
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            fullWidth
            label="Name"
            variant="filled"
            value={field.value ?? ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            inputRef={field.ref}
            error={fieldState.error !== undefined}
            helperText={fieldState.error?.message}
          />
        )}
      />
    </SetupMenuFormContainer>
  );
};
