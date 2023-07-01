import { PlusOutlined } from '@ant-design/icons';

import { PageContainer } from '../../components/PageContainer';
import { useModal } from '../../hooks/useModal';
import { SetupMenuFlow } from './SetupMenuFlow';

export const ViewMenusPage = () => {
  const modal = useModal();

  return (
    <>
      <PageContainer
        title="Menus"
        headerButton={{
          icon: <PlusOutlined />,
          text: 'Create Menu',
          onClick: () => modal.open(),
        }}
      ></PageContainer>
      <SetupMenuFlow modal={modal} />
    </>
  );
};
