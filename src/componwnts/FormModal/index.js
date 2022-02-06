import React, { useEffect, useState } from "react";
import SuccessFeedback from "../SuccessFeedback";
import axios from 'axios';
import './index.css';
import { Button, Input, Modal, Form } from 'antd';


const URL = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';



const FormModal = (props) => {
  const [visible, setVisible] = useState(props.visible);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  let [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };
    useEffect(() => {
    setVisible(props.visible)
    if(props.visible) {
      setError('');
      onReset();
    }
  }, [props.visible]);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(URL, values);
      if (res.status === 200) {
        setVisible(false);
        props.onCancel();
        setSuccessVisible(true);
      }
    } catch (error) {
      setError(error.response.data.errorMessage)
    }
    setLoading(false);
  }
   return(<div>
   <Modal visible={ visible } data-testid="form" onOk={() => setVisible(false)} onCancel={props.onCancel} footer={null}>
      <div className="m-title">Request an Invite</div>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="name" rules={[{
          required: true,
          message: 'Please input your Full Name!',
        }]}>
          <Input placeholder="Full Name" data-testid="name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid email!',
            },
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input placeholder="email" data-testid="email" />
        </Form.Item>
        <Form.Item
          name="confirm-email"
          dependencies={['email']}
          rules={[
            {
              required: true,
              message: 'Please confirm your email!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('email') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two emails that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input placeholder="confirm email" data-testid="confirm-email"  />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType="submit" data-testid="form-button" loading={loading}>
          Send
          </Button>
        </Form.Item>
        {error ? <Button danger type="text" className="err" role='error'>
          {error}
        </Button> : null }
      </Form>
    </Modal>
    <SuccessFeedback visible={successVisible} onOK={() => setSuccessVisible(false)}></SuccessFeedback>
    </div>
    )
}

export default FormModal;