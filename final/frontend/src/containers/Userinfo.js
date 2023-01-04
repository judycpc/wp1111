import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col,Button, Form, Input, } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getInfo, updateInfo } from '../api';


const { Content } = Layout;

const UserinfoContainer = styled.div`
    width: 600px;
    margin-left: 50px
`;


const Userinfo = ({error, password, setPassword}) => { 
  //const [identity, setIdentity] = useState('user');
  const { username } = useParams();

  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  //const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [mail, setMail] = useState('');
  const [newMail, setNewMail] = useState('');

  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditMail, setIsEditMail] = useState(false);

  useEffect(() => {
    const init = async () => {
      let { message, info } = await getInfo(username);

      if (message === "SUCCESS_GET") {
        const { name, email } = info;
        console.log("info =", info)
        setName(name);
        setAccount(username);
        //setPassword(password);
        setMail(email);
      } else {
        console.error('getInfo failed: ' + message)
      }
    };

    init();
  }, []);

  const handleEditPassword = () => {
    setIsEditPassword(!isEditPassword)
  }

  const handleUpdatePassword = async () => {
    if (isEditPassword) {
      console.log("oldPassword =", oldPassword)
      console.log("password =", password)
        if(oldPassword === password){
            const { message } = await updateInfo({ username, password: newPassword });
            if (message !== 'SUCCESS_UPDATE') console.error('update introduction failed: ' + message);
            else {
              setPassword(newPassword);
              setIsEditPassword(!isEditPassword);
            }
        }
        else{
            error("舊密碼不正確")
        }
    }
  }

  const handleEditMail = () => {
    setIsEditMail(!isEditMail)
  }

  const handleUpdateMail = async () => {
    if (isEditMail) {
      const { message } = await updateInfo({ username, email: newMail });
      if (message !== 'SUCCESS_UPDATE') console.error('update introduction failed: ' + message);
      else setMail(newMail);
    }
    setIsEditMail(!isEditMail);
  }

  return (
    <Content style={{ display: 'flex', padding: '0', minHeight: 'auto' }}>
      <Row style={{ backgroundColor: '#fff', flex: 1 }}>
        <Col span={24}>
            <UserinfoContainer>
                <h3>帳戶資訊</h3>
                <div style={{display: 'flex', justifyContent: 'space-between' }}>
                    <p>姓名 : {name}</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between' }}>
                    <p>帳號 : {account}</p>
                </div>
                <div>
                {
                    isEditPassword?
                    <Form>
                    <Form.Item
                        name="oldpassword"
                        label="舊密碼"
                        rules={[{ required: true, message: '請輸入您的舊密碼' }]}
                        hasFeedback
                        onChange={(e) => setOldPassword(e.target.value)}
                    >
                        <Input />
                    </Form.Item>

                   <Form.Item
                        name="password"
                        label="新密碼"
                        rules={[{ required: true, message: '請輸入您的新密碼' }]}
                        hasFeedback
                        onChange={(e) => setNewPassword(e.target.value)}
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
                        <Button type="default" htmlType="buttom" className="login-form-button" onClick={() => handleEditPassword()}>取消</Button>
                        <Button type="default" htmlType="submit" className="login-form-button" style={{marginLeft: '5px'}} onClick={() => handleUpdatePassword()}>確認</Button>
                        </div>
                    </Form.Item>
                    </Form>
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
                    <Form>
                    <Form.Item
                        name="email"
                        label="電子信箱"
                        rules={[
                        { type: 'email', message: '輸入為無效電子信箱' },
                        { required: true, message: '請輸入您的電子信箱' }
                        ]}
                        onChange={(e) => setNewMail(e.target.value)} //?
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="default" htmlType="buttom" onClick={() => handleEditMail()}>取消</Button>
                        <Button type="default" htmlType="submit" className="login-form-button" style={{marginLeft: '5px'}} onClick={() => handleUpdateMail()}>確認</Button>
                        </div>
                    </Form.Item>
                    </Form>
                    :
                    <div style={{display: 'flex', justifyContent: 'space-between' }}>
                        <p>電子信箱 : {mail}</p>
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