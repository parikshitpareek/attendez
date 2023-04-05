import { Button, Form, Input, Modal, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react';

type Props = {
  isModalOpen: boolean;
  handleOk: any;
  handleCancel: any;
  onFinish: any;
  onFinishFailed: any;
  created: number;
};

function AddEventModal({
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
        title="Create New Event"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <div className="w-full py-5 px-28">
          {/* <Row typeof="flex" justify="center" align="middle"> */}
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 650 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please enter the Title' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Desc"
              name="description"
              rules={[
                { required: true, message: 'Please enter the description' },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="Capacity"
              name="capacity"
              rules={[{ required: true, message: 'Please enter the capacity' }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Type"
              name="eventType"
              rules={[{ required: true, message: 'Please select the type' }]}
            >
              <Select>
                <Select.Option value="online">Online</Select.Option>
                <Select.Option value="offline">Offline</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Time"
              name="time"
              rules={[{ required: true, message: 'Please enter the Date' }]}
            >
              <Input type="datetime-local" />
            </Form.Item>

            <Form.Item
              label="Poster"
              name="poster"
              rules={[
                {
                  required: true,
                  message: 'Please enter the poster url from cosmic',
                },
              ]}
            >
              <Input type="url" />
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
          {/* </Row> */}
        </div>
      </Modal>
    </>
  );
}

export default AddEventModal;
