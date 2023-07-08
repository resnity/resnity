import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { PropsWithChildren } from 'react';

type FormModalProps = {
  isOpen: boolean;
  title: string;
  submitButton: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
};

export const FormModal = ({
  isOpen,
  title,
  submitButton,
  children,
  onClose,
  onSubmit,
}: PropsWithChildren<FormModalProps>) => {
  return (
    <Dialog open={isOpen} fullWidth maxWidth="sm">
      <DialogTitle>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" fontWeight={500}>
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <Box component="form" onSubmit={onSubmit}>
        <Stack spacing={2} py={4} px={3}>
          {children}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
          pb={2}
          px={3}
        >
          {submitButton}
        </Stack>
      </Box>
    </Dialog>
  );
};
