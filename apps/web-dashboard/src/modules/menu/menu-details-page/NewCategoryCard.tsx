import AddIcon from '@mui/icons-material/Add';
import { Paper, Stack, useTheme } from '@mui/material';

import { FullSizeCardButton } from '../../../components/FullSizeCardButton';

type NewCategoryCardProps = {
  onClick: () => void;
};

export const NewCategoryCard = ({ onClick }: NewCategoryCardProps) => {
  const theme = useTheme();
  return (
    <Paper
      component={Stack}
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%', height: theme.spacing(20), p: 3 }}
    >
      <FullSizeCardButton size="large" endIcon={<AddIcon />} onClick={onClick}>
        New Category
      </FullSizeCardButton>
    </Paper>
  );
};
