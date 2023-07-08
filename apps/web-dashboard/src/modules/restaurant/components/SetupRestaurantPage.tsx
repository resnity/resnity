import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import { useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { BackdropLoaderContainer } from '../../../components/BackdropLoaderContainer';
import { SectionContainer } from '../../../components/SectionContainer';
import { ControlledTextField } from '../../../components/form/ControlledTextField';
import {
  CreateRestaurantFormData,
  createRestaurantFormSchema,
} from '../restaurant.forms';
import { useCreateRestaurant } from '../restaurant.queries';

export const SetupRestaurantPage = () => {
  const navigate = useNavigate();

  const { control, handleSubmit: withFormHandler } =
    useForm<CreateRestaurantFormData>({
      defaultValues: { name: '' },
      resolver: zodResolver(createRestaurantFormSchema),
    });

  const { mutate, isLoading, isSuccess } = useCreateRestaurant();

  const handleSubmit = withFormHandler((data) => {
    mutate(data);
  });

  useLayoutEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  return (
    <BackdropLoaderContainer isLoading={isLoading}>
      <Stack
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        maxWidth="100%"
      >
        <Box mx="auto" width="100%" maxWidth="sm">
          <SectionContainer title="Setup Your Restaurant">
            <Stack
              component="form"
              alignItems="center"
              spacing={3}
              width="100%"
              onSubmit={handleSubmit}
            >
              <ControlledTextField
                name="name"
                control={control}
                label="Name"
                variant="filled"
                fullWidth
              />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </SectionContainer>
        </Box>
      </Stack>
    </BackdropLoaderContainer>
  );
};
