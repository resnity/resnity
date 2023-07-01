import { Button, Divider, Space, Typography } from 'antd';
import React, { PropsWithChildren } from 'react';

type HeaderButtonProps = {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
};

type DashboardPageContainerProps = PropsWithChildren<{
  title: string;
  headerButton?: HeaderButtonProps;
}>;

export const DashboardPageContainer = ({
  title,
  headerButton,
  children,
}: DashboardPageContainerProps) => {
  return (
    <>
      <Space size="large">
        <Typography.Title
          level={3}
          style={{
            margin: 0,
          }}
        >
          {title}
        </Typography.Title>
        {headerButton && (
          <Button
            onClick={headerButton.onClick}
            type="dashed"
            size="large"
            icon={headerButton.icon}
          >
            {headerButton.text}
          </Button>
        )}
      </Space>
      <Divider />
      {children}
    </>
  );
};
