import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import { useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { ControlledTextField } from '../../../components/ControlledTextField';
import { SectionContainer } from '../../../components/SectionContainer';
import { LoadingProvider } from '../../../providers/LoadingProvider';
import { createRestaurantFormSchema } from '../restaurant.forms';
import { CreateRestaurantFormData } from '../restaurant.forms.types';
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
    if (isSuccess) navigate('/dashboard');
  }, [isSuccess, navigate]);

  return (
    <LoadingProvider isLoading={isLoading}>
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
    </LoadingProvider>
  );
};
