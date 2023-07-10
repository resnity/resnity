import { Unstable_Grid2 as Grid } from '@mui/material';
import { useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { isNil } from '@resnity/web-common';

import { PageContainer } from '../../../components/PageContainer';
import { useModal } from '../../../hooks/useModal';
import { useGetMenuById } from '../menu.queries';
import { CategoryOverviewCard } from './CategoryCard';
import { CreateCategoryModal } from './CreateCategoryModal';
import { NewCategoryCard } from './NewCategoryCard';

type MenuDetailsPageParams = {
  menuId: string;
};

export const MenuDetailsPage = () => {
  const navigate = useNavigate();
  const { menuId } = useParams<MenuDetailsPageParams>();

  const { isOpen, open, close } = useModal();

  const { data, isLoading } = useGetMenuById(menuId as string, {
    enabled: !isNil(menuId),
  });

  useLayoutEffect(() => {
    if (!menuId) navigate('/menus');
  }, [menuId, navigate]);

  return (
    <PageContainer title={data?.name ?? ''} isLoading={isLoading}>
      <Grid container spacing={2} sx={{ width: '100%' }}>
        {data?.categories.map((category) => (
          <Grid key={category.id} xs={12}>
            <CategoryOverviewCard title={category.name} />
          </Grid>
        ))}
        <Grid xs={12}>
          <NewCategoryCard onClick={open} />
        </Grid>
      </Grid>
      <CreateCategoryModal
        menuId={menuId as string}
        isOpen={isOpen}
        onClose={close}
      />
    </PageContainer>
  );
};
