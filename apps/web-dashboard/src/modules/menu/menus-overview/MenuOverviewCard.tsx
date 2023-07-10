import { Box, Button, Stack, Typography } from '@mui/material';

import { SquarePaper } from '../../../components/SquarePaper';

type MenuOverviewCardProps = {
  id: string;
  name: string;
  createdAt: string;
  onViewDetailsButtonClick: (menuId: string) => void;
  onDeleteButtonClick: (menuId: string) => void;
};

export const MenuOverviewCard = ({
  id,
  name,
  createdAt,
  onViewDetailsButtonClick: onEdit,
  onDeleteButtonClick: onDelete,
}: MenuOverviewCardProps) => {
  return (
    <SquarePaper>
      <Stack
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{
          mx: 'auto',
          width: '100%',
          height: '100%',
        }}
      >
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {name}
          </Typography>
          <Typography variant="caption">{createdAt}</Typography>
        </Stack>
        <Stack spacing={1} sx={{ mx: 'auto', width: '75%' }}>
          <Button fullWidth variant="outlined" onClick={() => onEdit(id)}>
            View Details
          </Button>
          <Button
            fullWidth
            variant="text"
            color="error"
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </SquarePaper>
  );
};
