import React, { useState } from 'react';
import { Layout, Row, Col,Button, Form, Input, } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';


const { Content } = Layout;

const UserinfoContainer = styled.div`
    width: 600px;
    margin-left: 50px
`;


const Userinfo = () => { 
const [identity, setIdentity] = useState('user');
const [isEditPassword, setIsEditPassword] = useState(false);
const [isEditMail, setIsEditMail] = useState(false);

const handleEditPassword = () => {
    setIsEditPassword(!isEditPassword)
}

const handleEditMail = () => {
    setIsEditMail(!isEditMail)
}

  return (
    <Content style={{ display: 'flex', padding: '0', minHeight: 'auto' }}>
      <Row style={{ backgroundColor: '#fff', flex: 1 }}>
        <Col span={24}>
            <UserinfoContainer>
                <h3>帳戶資訊</h3>
                <div style={{display: 'flex', justifyContent: 'space-between' }}>
                    <p>姓名 : user1</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between' }}>
                    <p>帳號 : user1</p>
                </div>
                <div>
                {
                    isEditPassword?
                    <>
                    <Form.Item
                        name="password"
                        label="舊密碼"
                        rules={[{ required: true, message: '請輸入您的舊密碼' }]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                   <Form.Item
                        name="password"
                        label="新密碼"
                        rules={[{ required: true, message: '請輸入您的新密碼' }]}
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
                        { required: true, message: '請確認您的新密碼' },
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
                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <Button type="default" htmlType="submit" className="login-form-button" onClick={() => handleEditPassword()}>取消</Button>
                        <Button type="default" htmlType="submit" className="login-form-button" style={{marginLeft: '5px'}} onClick={() => handleEditPassword()}>確認</Button>
                        </div>
                    </Form.Item>
                    </>
                    :
                    <div style={{display: 'flex', justifyContent: 'space-between' }}>
                        <p>密碼 : 已設定</p>
                        <EditOutlined onClick={() => handleEditPassword()}/>
                    </div>
                }
                </div>

                <div>
                {
                    isEditMail?
                    <>
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
                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="default" htmlType="submit" className="login-form-button" onClick={() => handleEditMail()}>取消</Button>
                        <Button type="default" htmlType="submit" className="login-form-button" style={{marginLeft: '5px'}} onClick={() => handleEditMail()}>確認</Button>
                        </div>
                    </Form.Item>
                    </>
                    :
                    <div style={{display: 'flex', justifyContent: 'space-between' }}>
                        <p>電子信箱 : user1@gmail.com</p>
                        <EditOutlined onClick={() => handleEditMail()}/>
                    </div>
                }
                </div>
                
            </UserinfoContainer>
        </Col>
      </Row>
    </Content>
  );
};

export default Userinfo;