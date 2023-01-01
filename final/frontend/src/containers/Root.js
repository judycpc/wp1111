import { Layout, theme, Menu, message, Dropdown, Space, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Appointment from "./Appointment";
import TherapistProfile from "./TherapistProfile";
import Tab from "../components/Tab";
import Therapists from "../components/Therapists";
import TherapistDetail from "../components/TherapistDetail";
import { useState } from "react";

const { Header, Footer } = Layout;

const LogoContainer = styled.div`
  height: 100%;
  width: 150px;
  margin: 0;
  display: inline-block;
  background-color: #d9d9d9;
`;

const Root = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [identity, setIdentity] = useState(undefined);

  const { token: { colorBgContainer } } = theme.useToken();

  const navigate = useNavigate();
  const toMenu = (key) => { navigate('/' + key) };

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

  const items = [
    { label: '帳戶資訊', key: '0', },
    { label: '預約紀錄', key: '1', },
    { type: 'divider', },
    { label: '登出', key: 'logout', },
  ];

  const onDropdownClick = ({ key }) => {
    if (key === 'logout') {
      setUsername(undefined);
      setName(undefined);
      setIdentity(undefined);
      setLoggedIn(false);
    }
  };

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      {contextHolder}
      <Header style={{ background: colorBgContainer, display: 'flex', justifyContent: 'space-between' }}>
        <LogoContainer> logo </LogoContainer>
        {
          loggedIn
            ? <Dropdown
              menu={{ items, onClick: onDropdownClick }}
              // trigger={['click']}
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
        <Route path='therapists/:id' element={<TherapistDetail />} />
        <Route path='appointment/:id' element={<Appointment />} />
        <Route path='therapists/profile/:id' element={<TherapistProfile />} />
      </Routes>


      <Footer style={{ textAlign: 'center' }}> Created by Group 15 | NTU Web Programmimg 111-1 </Footer>
    </Layout>
  );
};

export default Root;