import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, theme, Row, Col, Button, Form, Input, Tabs } from 'antd';
import styled from 'styled-components';

const { Header, Footer, Content } = Layout;

const SignupContainer = styled.div`
	width: 100%;
  padding: 0 360px;
	margin-top: 120px;
`;

const LogoContainer = styled.div`
	height: 100%;
	width: 150px;
	margin: 0;
	display: inline-block;
	background-color: #d9d9d9;
`

const Signup = () => {
  const [identity, setIdentity] = useState('user');

  const [form] = Form.useForm();
  const { token: { colorBgContainer } } = theme.useToken();

  const navigete = useNavigate();
  const ToHome = () => { navigete('/') };

  const onFinish = (values) => {
    console.log(identity)
    console.log(values);
    ToHome();
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
        tooltip="建議輸入真實姓名"
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
        name="account"
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
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header style={{ background: colorBgContainer, display: 'flex', justifyContent: 'space-between' }}>
        <LogoContainer> logo </LogoContainer>
      </Header>
      <Content style={{ display: 'flex', padding: '0', minHeight: 'auto' }}>
        <Row style={{ backgroundColor: '#fff', flex: 1 }}>
          <Col span={24}>
            <SignupContainer>
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
      <Footer style={{ textAlign: 'center' }}>
        Created by Group 15 | NTU Web Programmimg 111-1
      </Footer>
    </Layout>
  );
};

export default Signup;
