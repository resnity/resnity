import { Grid, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

type PageContainerProps = {
  actions?: React.ReactNode[];
  title: string;
};

export const PageContainer = ({
  actions,
  title,
  children,
}: PropsWithChildren<PageContainerProps>) => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={1} px={1}>
        <Typography component="h1" variant="h4" fontWeight={500}>
          {title}
        </Typography>
        {actions}
      </Stack>
      <Grid container px={1}>
        {children}
      </Grid>
    </Stack>
  );
};
