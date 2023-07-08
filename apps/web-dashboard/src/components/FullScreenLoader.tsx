import { CircularProgress, Stack } from '@mui/material';

export const FullScreenLoader = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ color: '#fff', width: '100%', height: '100vh' }}
    >
      <CircularProgress color="primary" />
    </Stack>
  );
};
