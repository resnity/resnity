import AddIcon from '@mui/icons-material/Add';
import { Button, Stack } from '@mui/material';

import { SquarePaper } from '../../../components/SquarePaper';

type CreateMenuCardProps = {
  onClick: () => void;
};

export const CreateMenuCard = ({ onClick }: CreateMenuCardProps) => {
  return (
    <SquarePaper>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%', height: '100%' }}
      >
        <Button size="large" endIcon={<AddIcon />} onClick={onClick}>
          Create Menu
        </Button>
      </Stack>
    </SquarePaper>
  );
};
