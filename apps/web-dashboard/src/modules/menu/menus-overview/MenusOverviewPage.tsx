import Grid from '@mui/material/Unstable_Grid2';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { PageContainer } from '../../../components/PageContainer';
import { useModal } from '../../../hooks/useModal';
import {
  MENUS_QUERY_KEY,
  useDeleteMenuById,
  useGetMenus,
} from '../menu.queries';
import { CreateMenuCard } from './CreateMenuCard';
import { CreateMenuModal } from './CreateMenuModal';
import { MenuOverviewCard } from './MenuOverviewCard';

export const MenusOverviewPage = () => {
  const { isOpen, open, close } = useModal();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: menus, isLoading: isGetMenusLoading } = useGetMenus();
  const { mutate, isLoading: isDeleteMenuByIdLoading } = useDeleteMenuById();

  const handleDeleteMenuById = (menuId: string) => {
    mutate(menuId, {
      onSuccess: () => queryClient.invalidateQueries([MENUS_QUERY_KEY]),
    });
  };

  const handleViewMenuDetailsById = (menuId: string) => {
    navigate(`/menus/${menuId}`);
  };

  return (
    <PageContainer
      title="Menus Overview"
      isLoading={isGetMenusLoading || isDeleteMenuByIdLoading}
    >
      <Grid container spacing={2} sx={{ width: '100%' }}>
        {menus?.map((menu) => (
          <Grid xs={12} md={6} xl={4}>
            <MenuOverviewCard
              key={menu.id}
              id={menu.id}
              name={menu.name}
              createdAt={menu.createdAt}
              onViewDetailsButtonClick={handleViewMenuDetailsById}
              onDeleteButtonClick={handleDeleteMenuById}
            />
          </Grid>
        ))}
        <Grid xs={12} md={6} xl={4}>
          <CreateMenuCard onClick={open} />
        </Grid>
      </Grid>
      <CreateMenuModal isOpen={isOpen} onClose={close} />
    </PageContainer>
  );
};
