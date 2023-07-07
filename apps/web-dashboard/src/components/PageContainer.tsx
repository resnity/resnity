import { Divider, Grid, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

type PageContainerProps = {
  title: string;
  headerActionButtons?: React.ReactNode[];
};

export const PageContainer = ({
  title,
  headerActionButtons,
  children,
}: PropsWithChildren<PageContainerProps>) => {
  return (
    <Stack spacing={2} divider={<Divider flexItem />}>
      <Stack direction="row" alignItems="center" spacing={1} px={1}>
        <Typography component="h1" variant="h4" fontWeight={500}>
          {title}
        </Typography>
        {headerActionButtons}
      </Stack>
      <Grid container xs={12} px={1}>
        {children}
      </Grid>
    </Stack>
  );
};
