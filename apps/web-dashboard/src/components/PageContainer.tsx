import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Unstable_Grid2 as Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';

type PageContainerProps = {
  title: string;
  actions?: React.ReactNode[];
  isLoading?: boolean;
};
export const PageContainer = ({
  title,
  children,
  actions,
  isLoading = false,
}: PropsWithChildren<PageContainerProps>) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => navigate(-1);

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={1} px={1}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          onClick={handleBackButtonClick}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography component="h1" variant="h4" fontWeight={500}>
          {title}
        </Typography>
        {actions}
      </Stack>
      <Grid container px={1}>
        {isLoading ? (
          <Grid sm={12}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Grid>
        ) : (
          children
        )}
      </Grid>
    </Stack>
  );
};
