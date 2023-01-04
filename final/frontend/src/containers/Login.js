import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { login } from '../api';

const { Content } = Layout;

const LoginContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 240px;
`;

const Login = ({ error, setLoggedIn, setUsername, setName, setIdentity, setPassword }) => {
  const navigete = useNavigate();
  const toHome = () => { navigete('/') };
  const toProfile = (username) => { navigete('/therapists/profile/' + username, { state: { loggedIn: true, username } }) };

  const onFinish = async (values) => {
    const { message, username, name, identity } = await login(values);
    if (message === 'SUCCESS_LOGIN') {
      setLoggedIn(true);
      setUsername(username);
      setName(name);
      setPassword(values.password)
      setIdentity(identity)
      if (identity === 'client') {
        toHome();
      } else {
        toProfile(username)
      }
    } else if (message === 'WRONG_PASSWORD') {
      error('密碼錯誤');
    } else if (message === 'ACCOUNT_DOESNT_EXIST') {
      error('帳號不存在');
    } else {
      error('發生錯誤')
    }

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
            {LoginForm}
          </LoginContainer>
        </Col>
      </Row>
    </Content>
  );
}

export default Login;
