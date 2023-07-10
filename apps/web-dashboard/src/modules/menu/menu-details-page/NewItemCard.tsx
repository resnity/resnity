import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';

import { FullSizeCardButton } from '../../../components/FullSizeCardButton';

type NewItemCardProps = {
  onClick: () => void;
};

export const NewItemCard = ({ onClick }: NewItemCardProps) => {
  return (
    <Stack sx={{ width: '100%' }}>
      <FullSizeCardButton size="large" endIcon={<AddIcon />} onClick={onClick}>
        New Item
      </FullSizeCardButton>
    </Stack>
  );
};
