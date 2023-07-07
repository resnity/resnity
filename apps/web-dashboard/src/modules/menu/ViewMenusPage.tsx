import { PlusOutlined } from '@ant-design/icons';
import { IconButton } from '@mui/material';

import { PageContainer } from '../../components/PageContainer';
import { useModal } from '../../hooks/useModal';
import { SetupMenuFlow } from './SetupMenuFlow';

export const ViewMenusPage = () => {
  const modal = useModal();

  return (
    <>
      <PageContainer
        title="Menus"
        headerActionButtons={[
          <IconButton onClick={modal.open}>
            <PlusOutlined />
          </IconButton>,
        ]}
      ></PageContainer>
      <SetupMenuFlow modal={modal} />
    </>
  );
};
