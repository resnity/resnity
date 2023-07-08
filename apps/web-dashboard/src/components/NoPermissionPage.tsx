import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

export const NoPermissionPage = () => {
  const navigate = useNavigate();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{
        width: '100%',
        height: '100vh',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
        }}
      >
        No permission
      </Typography>
      <Button variant="outlined" onClick={() => navigate(-1)}>
        Back
      </Button>
    </Stack>
  );
};
