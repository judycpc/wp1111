import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Button, Form, Input, Tabs } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;

const LoginContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 160px;
`;

const Login = () => {
  const [identity, setIdentity] = useState('user');

  const navigete = useNavigate();
  const ToHome = () => { navigete('/') };

  const onFinish = (values) => {
    console.log(identity)
    console.log(values);
    ToHome();
  };

  const LoginForm = (
    <Form
      name="normal_login"
      className="login-form"
      size='large'
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '請輸入帳號' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="帳號"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '請輸入密碼' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密碼"
        />
      </Form.Item>
      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="default" htmlType="submit" className="login-form-button">登入</Button>
        </div>
      </Form.Item>
    </Form >
  )

  return (

    <Content style={{ display: 'flex', padding: '0', minHeight: 'auto' }}>
      <Row style={{ backgroundColor: '#fff', flex: 1 }}>
        <Col span={24}>
          <LoginContainer>
            <Tabs
              size='large'
              centered={true}
              defaultActiveKey="user"
              animated={false}
              onChange={(activeKey) => setIdentity(activeKey)}
              items={[
                {
                  label: <p style={{ fontSize: 20, margin: 0 }}>使用者</p>,
                  key: 'user',
                  children: LoginForm,
                },
                {
                  label: <p style={{ fontSize: 20, margin: 0 }}>治療師</p>,
                  key: 'therapist',
                  children: LoginForm
                }
              ]}
            />
          </LoginContainer>
        </Col>
      </Row>
    </Content>
  );
}

export default Login;
