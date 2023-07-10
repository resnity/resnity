import { Button, styled } from '@mui/material';

export const FullSizeCardButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '100%',
  border: `1px dashed ${theme.palette.divider}`,
}));
