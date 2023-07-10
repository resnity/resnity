import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';

import { FullSizeCardButton } from '../../../components/FullSizeCardButton';
import { SquarePaper } from '../../../components/SquarePaper';

type NewMenuCardProps = {
  onClick: () => void;
};

export const NewMenuCard = ({ onClick }: NewMenuCardProps) => {
  return (
    <SquarePaper>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%', height: '100%', p: 3 }}
      >
        <FullSizeCardButton endIcon={<AddIcon />} onClick={onClick}>
          New Menu
        </FullSizeCardButton>
      </Stack>
    </SquarePaper>
  );
};
