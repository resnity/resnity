import { Backdrop, CircularProgress } from '@mui/material';
import { PropsWithChildren } from 'react';

type LoadingProviderProps = {
  isLoading: boolean;
};

export const LoadingProvider = ({
  isLoading,
  children,
}: PropsWithChildren<LoadingProviderProps>) => {
  return (
    <>
      {children}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
