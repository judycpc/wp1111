import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Button, Form, Input, Tabs } from 'antd';
import styled from 'styled-components';
import { signup } from '../api';

const { Content } = Layout;

const SignupContainer = styled.div`
	width: 100%;
  padding: 0 360px;
	margin-top: 120px;
`;


const Signup = ({ success, warning, error }) => {
  const [identity, setIdentity] = useState('client');

  const [form] = Form.useForm();

  const navigate = useNavigate();
  const toHome = () => { navigate('/') }
  const toLogin = () => { navigate('/login') };

  const onFinish = async (values) => {
    const { message } = await signup({ ...values, identity });
    console.log(message)
    if (message === 'SUCCESS_ACCOUNT_CREATION') {
      success('註冊成功');
      toLogin();
    } else if (message === 'ACCOUNT_EXIST') {
      warning('此帳號已存在');
      toHome();
    } else {
      error('發生錯誤');
      toHome();
    }
  };

  const formItemLayout = { labelCol: { span: 4, }, wrapperCol: { span: 16 } };

  const SignupForm = (
    <Form
      {...formItemLayout}
      form={form}
      name="signup"
      size='large'
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="姓名"
        tooltip={identity === 'client' ? "諮商前需驗證您的健保卡資訊，請務必確實填寫您的真實姓名" : "請填寫真實姓名"}
        rules={[
          {
            required: true,
            message: '請輸入您的姓名',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="username"
        label="帳號"
        rules={[{ required: true, message: '請輸入您的帳號' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密碼"
        rules={[{ required: true, message: '請輸入您的密碼' }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="確認密碼"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: '請確認您的密碼' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('密碼不相符'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="email"
        label="電子信箱"
        rules={[
          { type: 'email', message: '輸入為無效電子信箱' },
          { required: true, message: '請輸入您的電子信箱' }
        ]}
      >
        <Input />
      </Form.Item>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Form.Item >
          <Button type="primary" htmlType="submit"> 註冊 </Button>
        </Form.Item>
      </div>
    </Form>
  );



  return (
    <Content style={{ display: 'flex', padding: '0', minHeight: 'auto' }}>
      <Row style={{ backgroundColor: '#fff', flex: 1 }}>
        <Col span={24}>
          <SignupContainer>
            <Tabs
              size='large'
              centered={true}
              defaultActiveKey="client"
              animated={false}
              onChange={(activeKey) => setIdentity(activeKey)}
              items={[
                {
                  label: <p style={{ fontSize: 20, margin: 0 }}>使用者</p>,
                  key: 'client',
                  children: SignupForm,
                },
                {
                  label: <p style={{ fontSize: 20, margin: 0 }}>治療師</p>,
                  key: 'therapist',
                  children: SignupForm
                }
              ]}
            />
          </SignupContainer>
        </Col>
      </Row>
    </Content>
  );
};

export default Signup;
