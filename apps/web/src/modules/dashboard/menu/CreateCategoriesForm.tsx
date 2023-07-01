import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';

export const CreateCategoriesForm = () => {
  return (
    <Form>
      <Form.List name="categories">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field) => (
              <Form.Item {...field}>
                <Input />
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                Add category
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};
