import { PlusOutlined } from '@ant-design/icons';
import React from 'react';

import { DashboardPageContainer } from '../../../components/dashboard/DashboardPageContainer';
import { useModal } from '../../../components/modal/useModal';
import { SetupMenuFlow } from './SetupMenuFlow';

export const ViewMenusPage = () => {
  const modal = useModal();

  return (
    <>
      <DashboardPageContainer
        title="Menus"
        headerButton={{
          icon: <PlusOutlined />,
          text: 'Create Menu',
          onClick: () => modal.open(),
        }}
      ></DashboardPageContainer>
      <SetupMenuFlow modal={modal} />
    </>
  );
};
