import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';

import { BackdropLoaderContainer } from '../../../components/BackdropLoaderContainer';
import { ControlledTextField } from '../../../components/form/ControlledTextField';
import { FormModal } from '../../../components/form/FormModal';
import { CreateMenuFormData, createMenuFormSchema } from '../menu.forms';
import { MENUS_QUERY_KEY, useCreateMenu } from '../menu.queries';

type CreateMenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateMenuModal = ({ isOpen, onClose }: CreateMenuModalProps) => {
  const { control, handleSubmit: withFormHandleSubmit } =
    useForm<CreateMenuFormData>({
      defaultValues: { name: '' },
      resolver: zodResolver(createMenuFormSchema),
    });
  const queryClient = useQueryClient();

  const { isLoading, isSuccess, mutate } = useCreateMenu();

  const handleSubmit = withFormHandleSubmit((data) => {
    mutate(data);
  });

  useLayoutEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries([MENUS_QUERY_KEY]);
      onClose();
    }
  }, [isSuccess, queryClient, onClose]);

  return (
    <BackdropLoaderContainer isLoading={isLoading}>
      <FormModal
        title="Create Menu"
        isOpen={isOpen}
        submitButton={
          <Button variant="contained" type="submit" disableElevation>
            Create
          </Button>
        }
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <ControlledTextField
          control={control}
          name="name"
          label="Name"
          variant="filled"
        />
      </FormModal>
    </BackdropLoaderContainer>
  );
};
