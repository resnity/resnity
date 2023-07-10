import { Button, Unstable_Grid2 as Grid, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { BackdropLoaderContainer } from '../../../components/BackdropLoaderContainer';
import { ControlledTextField } from '../../../components/form/ControlledTextField';
import { FormModal } from '../../../components/form/FormModal';
import {
  CreateCategoryFormData,
  defaultCreateCategoryFormData,
  mapCreateCategoryFormDataToCreateCategoryRequestDto,
} from '../menu.forms';
import { MENUS_QUERY_KEY, useCreateCategory } from '../menu.queries';

const serviceScheduleFields = [
  {
    label: 'Monday',
    startTimeName: 'mondayStartTime',
    endTimeName: 'mondayEndTime',
  },
  {
    label: 'Tuesday',
    startTimeName: 'tuesdayStartTime',
    endTimeName: 'tuesdayEndTime',
  },
  {
    label: 'Wednesday',
    startTimeName: 'wednesdayStartTime',
    endTimeName: 'wednesdayEndTime',
  },
  {
    label: 'Thursday',
    startTimeName: 'thursdayStartTime',
    endTimeName: 'thursdayEndTime',
  },
  {
    label: 'Friday',
    startTimeName: 'fridayStartTime',
    endTimeName: 'fridayEndTime',
  },
  {
    label: 'Saturday',
    startTimeName: 'saturdayStartTime',
    endTimeName: 'saturdayEndTime',
  },
  {
    label: 'Sunday',
    startTimeName: 'sundayStartTime',
    endTimeName: 'sundayEndTime',
  },
] as const;

type CreateCategoryModalProps = {
  menuId: string;
  isOpen: boolean;
  onClose: () => void;
};

export const CreateCategoryModal = ({
  menuId,
  isOpen,
  onClose,
}: CreateCategoryModalProps) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit: withFormSubmit } =
    useForm<CreateCategoryFormData>({
      defaultValues: defaultCreateCategoryFormData,
    });

  const { mutate, isLoading } = useCreateCategory();

  const handleSubmit = withFormSubmit((data) => {
    const dto = mapCreateCategoryFormDataToCreateCategoryRequestDto(data);
    mutate(
      { menuId, ...dto },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([MENUS_QUERY_KEY, menuId]);
          onClose();
        },
      },
    );
  });

  return (
    <BackdropLoaderContainer isLoading={isLoading}>
      <FormModal
        title="Create Category"
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
        {serviceScheduleFields.map((field) => (
          <Grid key={field.label} container spacing={1}>
            <Grid xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {field.label}
              </Typography>
            </Grid>
            <Grid xs={12} sm={6}>
              <ControlledTextField
                fullWidth
                control={control}
                name={field.startTimeName}
                label="Start Time"
                placeholder="10:00"
                variant="filled"
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <ControlledTextField
                fullWidth
                control={control}
                name={field.endTimeName}
                label="End Time"
                placeholder="22:00"
                variant="filled"
              />
            </Grid>
          </Grid>
        ))}
      </FormModal>
    </BackdropLoaderContainer>
  );
};
