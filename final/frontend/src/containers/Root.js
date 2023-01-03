import React, { useState, useEffect } from 'react';
import { Layout, theme, Menu, message, Dropdown, Space, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Appointment from "./Appointment";
import Userinfo from "./Userinfo";
import Bookings from "./Bookings";
import TherapistProfile from "./TherapistProfile";
import Tab from "../components/Tab";
import Therapists from "../components/Therapists";
import TherapistDetail from "../components/TherapistDetail";

const { Header, Footer } = Layout;

const LogoContainer = styled.div`
  height: 100%;
  width: 150px;
  margin: 0;
  display: inline-block;
  background-color: #d9d9d9;
  cursor: pointer;
`;

const clientItems = [
  { label: '帳戶資訊', key: '0', },
  { label: '預約紀錄', key: '1', },
  { type: 'divider', },
  { label: '登出', key: 'logout', },
];

const therapistItems = [
  { label: '帳戶資訊', key: '0', },
  { label: '預約紀錄', key: '1', },
  { label: '個人主頁', key: 'profile', },
  { type: 'divider', },
  { label: '登出', key: 'logout', },
]

const Root = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [identity, setIdentity] = useState(undefined);
  const [items, setItems] = useState(undefined);

  useEffect(() => {
    if (loggedIn && identity === 'therapist') {
      setItems(therapistItems);
    } else if (loggedIn && identity === 'client') {
      setItems(clientItems);
    } else {
      setItems(undefined);
    }
  }, [loggedIn, identity]);

  const { token: { colorBgContainer } } = theme.useToken();

  const navigate = useNavigate();
  const toHome = () => { navigate('/') };
  const toMenu = (key) => { navigate('/' + key) };
  const toProfile = (username, loggedIn) => { navigate('/therapists/profile/' + username, { state: { loggedIn, username } }) };

  const [messageApi, contextHolder] = message.useMessage();
  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };
  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };
  const warning = (msg) => {
    messageApi.open({
      type: 'warning',
      content: msg,
    });
  };

  const onClick = (e) => {
    toMenu(e.key);
  };



  const onDropdownClick = ({ key }) => {
    if (key === 'logout') {
      setUsername(undefined);
      setName(undefined);
      setIdentity(undefined);
      setLoggedIn(false);
      toHome();
    } else if (key === 'profile') {
      toProfile(username, loggedIn);
    }
  };

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      {contextHolder}
      <Header style={{ background: colorBgContainer, display: 'flex', justifyContent: 'space-between' }}>
        <LogoContainer onClick={toHome}> logo </LogoContainer>
        {
          loggedIn
            ? <Dropdown
              menu={{ items, onClick: onDropdownClick }}
              overlayStyle={{ color: '#000000E0' }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Button>
                    你好，{name}
                    <DownOutlined />
                  </Button>
                </Space>
              </a>
            </Dropdown>
            : <Menu
              theme='light'
              mode='horizontal'
              onClick={onClick}
              items={[
                { key: 'signup', label: '註冊' },
                { key: 'login', label: '登入' }
              ]}
            />
        }


      </Header>

      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='' element={<Tab />} />
          <Route path='therapists' element={<Therapists />} />
        </Route>
        <Route path='login' element={<Login error={error} setLoggedIn={setLoggedIn} setUsername={setUsername} setName={setName} setIdentity={setIdentity} />} />
        <Route path='signup' element={<Signup success={success} warning={warning} error={error} />} />
        <Route path='therapists/:username' element={<TherapistDetail loggedIn={loggedIn} identity={identity} client={username} />} />
        <Route path='appointment/:id' element={<Appointment />} />
        <Route path='therapists/profile/:username' element={<TherapistProfile />} />
        <Route path='userinfo/:username' element={<Userinfo />} />
        <Route path='bookings' element={<Bookings />} />
      </Routes>


      <Footer style={{ textAlign: 'center', backgroundColor: '#E8E8E4' }}> Created by Group 15 | NTU Web Programmimg 111-1 </Footer>
    </Layout>
  );
};

export default Root;