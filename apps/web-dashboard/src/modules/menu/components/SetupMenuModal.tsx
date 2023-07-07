import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { PropsWithChildren } from 'react';

type SetupMenuModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
};

export const SetupMenuModal = ({
  isOpen,
  title,
  onClose,
  children,
}: PropsWithChildren<SetupMenuModalProps>) => {
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
      {children}
    </Dialog>
  );
};
