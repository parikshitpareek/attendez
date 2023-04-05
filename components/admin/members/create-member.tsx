import { Button, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect } from 'react';

type Props = {
  isModalOpen: boolean;
  handleOk: any;
  handleCancel: any;
  onFinish: any;
  onFinishFailed: any;
  created: number;
};

function CreateMember({
  isModalOpen,
  onFinish,
  onFinishFailed,
  handleCancel,
  handleOk,
  created,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [created]);
  return (
    <>
      <Modal
        title="Create New Member"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <div className="w-full py-5 px-4">
          <Row typeof="flex" justify="center" align="middle">
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter the name' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please enter the email' }]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                label="Roll No"
                name="rollNo"
                rules={[
                  { required: true, message: 'Please enter the roll number' },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Year"
                name="year"
                rules={[{ required: true, message: 'Please enter the year' }]}
              >
                <Select>
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Team"
                name="team"
                rules={[{ required: true, message: 'Please enter the team' }]}
              >
                <Select>
                  <Select.Option value="TECH">tech</Select.Option>
                  <Select.Option value="PR">PR</Select.Option>
                  <Select.Option value="organizing">Org</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Desg"
                name="designation"
                rules={[
                  { required: true, message: 'Please enter the designation' },
                ]}
              >
                <Select>
                  <Select.Option value="head">Head</Select.Option>
                  <Select.Option value="coordinator">Coordinator</Select.Option>
                  <Select.Option value="executive">Executive</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    color: 'white',
                    backgroundColor: 'green',
                    // padding: '10px',
                    height: '40px',
                  }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </div>
      </Modal>
    </>
  );
}

export default CreateMember;
