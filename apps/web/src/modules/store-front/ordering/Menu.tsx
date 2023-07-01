import { Card, Col, Image, Row, Typography } from 'antd';

export const Menu = () => {
  return (
    <Row>
      <Col span={12}>
        <Card
          style={{ borderRadius: 0 }}
          cover={
            <Image
              style={{ borderRadius: 0 }}
              alt="example"
              src="https://images.pexels.com/photos/4062274/pexels-photo-4062274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          }
        >
          <Card.Meta
            title={<Typography.Text>American Cheese Burger</Typography.Text>}
            description="www.instagram.com"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card
          style={{ borderRadius: 0 }}
          cover={
            <Image
              style={{ borderRadius: 0 }}
              alt="example"
              src="https://images.pexels.com/photos/4062274/pexels-photo-4062274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          }
        >
          <Card.Meta
            title="Europe Street beat"
            description="www.instagram.com"
          />
        </Card>
      </Col>
    </Row>
  );
};
