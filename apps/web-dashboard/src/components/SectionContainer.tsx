import { Box, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

type SectionContainerProps = {
  title: string;
};

export const SectionContainer = ({
  title,
  children,
}: PropsWithChildren<SectionContainerProps>) => {
  return (
    <Stack spacing={3} width="100%">
      <Box>
        <Typography component="h1" variant="h5" fontWeight={500}>
          {title}
        </Typography>
      </Box>
      {children}
    </Stack>
  );
};
