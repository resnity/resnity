import Grid from '@mui/material/Unstable_Grid2';

import { PageContainer } from '../../../components/PageContainer';
import { useModal } from '../../../hooks/useModal';
import { CreateMenuCard } from './CreateMenuCard';
import { CreateMenuModal } from './CreateMenuModal';

export const MenusOverviewPage = () => {
  const { isOpen, open, close } = useModal();

  return (
    <PageContainer title="Menus Overview">
      <Grid container spacing={2} sx={{ width: '100%' }}>
        <Grid xs={12} md={6} xl={4}>
          <CreateMenuCard onClick={open} />
        </Grid>
      </Grid>
      <CreateMenuModal isOpen={isOpen} onClose={close} />
    </PageContainer>
  );
};
