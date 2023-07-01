import { Button, Divider, Layout, Menu, MenuProps, theme } from 'antd';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

import { useAuth } from '../modules/auth/auth.hooks';

type MenuItem = Required<MenuProps>['items'][number];

const sidebarMenuItems: MenuItem[] = [
  {
    key: 'restaurant',
    label: <Link to="/dashboard/restaurants">Restaurant</Link>,
  },
  {
    key: 'menu',
    label: <Link to="/dashboard/menus">Menu</Link>,
  },
  {
    key: 'order',
    label: <Link to="/dashboard/orders">Order</Link>,
  },
];

export const DashboardLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Layout.Header
        style={{
          background: colorBgContainer,
        }}
      >
        <Menu mode="horizontal" items={[]} />
      </Layout.Header>
      <Divider style={{ margin: 0 }} />
      <Layout style={{ height: '100vh' }}>
        <Layout.Sider width={200}>
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 1 }}
            items={sidebarMenuItems}
          />
        </Layout.Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Layout.Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
