import { FormOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Layout, Row, Typography, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { Container } from '../components/Container';

export const PlatformLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleCartButtonClick = () => navigate('/cart');

  const handleBackButtonClick = () => navigate('/ordering');

  const isCartPage = pathname === '/cart';

  return (
    <Layout>
      <Layout.Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <Container>
          <Row align="middle">
            <Col flex={'auto'}>
              <Typography.Title
                level={4}
                style={{
                  margin: 0,
                }}
              >
                RESNITY
              </Typography.Title>
            </Col>
            <Col flex="none">
              {isCartPage ? (
                <Button
                  type="primary"
                  size="large"
                  icon={<FormOutlined />}
                  onClick={handleBackButtonClick}
                >
                  Continue Ordering
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={handleCartButtonClick}
                  size="large"
                  icon={<ShoppingCartOutlined />}
                >
                  Cart
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </Layout.Header>
      <Divider style={{ margin: 0 }} />

      <Outlet />
    </Layout>
  );
};
