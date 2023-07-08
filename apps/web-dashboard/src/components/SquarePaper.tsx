import { Box, Paper } from '@mui/material';
import { PropsWithChildren } from 'react';

export const SquarePaper = ({ children }: PropsWithChildren) => {
  return (
    <Paper
      sx={{
        width: '100%',
        height: 0,
        paddingTop: '100%',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};
