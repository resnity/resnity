import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Unstable_Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { useModal } from '../../../hooks/useModal';
import { NewItemCard } from './NewItemCard';

type CategoryCardProps = {
  title: string;
};

export const CategoryOverviewCard = ({ title }: CategoryCardProps) => {
  const { open } = useModal();

  return (
    <Paper component={Stack} spacing={2} sx={{ p: 3, width: '100%' }}>
      <Stack direction="row" alignItems="center" spacing={3}>
        <Typography component="h2" variant="h6" fontWeight={500}>
          {title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button variant="text" endIcon={<EditIcon />} size="large">
            Edit
          </Button>
          <Button
            variant="text"
            color="error"
            endIcon={<DeleteIcon />}
            size="large"
          >
            Delete
          </Button>
        </Stack>
      </Stack>
      <Grid container rowGap={2} columnGap={2}>
        <Grid xs={12} sm={6}>
          <NewItemCard onClick={open} />
        </Grid>
      </Grid>
    </Paper>
  );
};
