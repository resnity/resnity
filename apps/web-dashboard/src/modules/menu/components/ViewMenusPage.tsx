import { PlusOutlined } from '@ant-design/icons';
import { IconButton } from '@mui/material';

import { PageContainer } from '../../../components/PageContainer';
import { useModal } from '../../../hooks/useModal';
import { SetupMenuFlowProvider } from './SetupMenuFlowProvider';

export const ViewMenusPage = () => {
  const { isOpen, close, open } = useModal();

  return (
    <>
      <PageContainer
        title="Menus"
        actions={[
          <IconButton key="add-menu" onClick={open}>
            <PlusOutlined />
          </IconButton>,
        ]}
      ></PageContainer>
      <SetupMenuFlowProvider isOpen={isOpen} onClose={close} />
    </>
  );
};
