import { Form, Input } from 'antd';

import { createRestaurant } from './restaurant.services';
import { RestaurantRegistrationFormData } from './restaurant.types';

const RestaurantRegistrationForm = () => {
  const [form] = Form.useForm<RestaurantRegistrationFormData>();

  const handleSubmit = async (data: RestaurantRegistrationFormData) => {
    await createRestaurant(data);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default RestaurantRegistrationForm;
