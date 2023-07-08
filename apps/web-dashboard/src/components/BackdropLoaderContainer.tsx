import { Backdrop, CircularProgress } from '@mui/material';
import { PropsWithChildren } from 'react';

type BackdropLoaderContainerProps = {
  isLoading: boolean;
};

export const BackdropLoaderContainer = ({
  isLoading,
  children,
}: PropsWithChildren<BackdropLoaderContainerProps>) => {
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
