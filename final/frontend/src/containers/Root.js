import { Layout, theme, Menu } from "antd";
import styled from "styled-components";
import { useNavigate, Routes, Route, Router } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

const { Header, Footer } = Layout;

const LogoContainer = styled.div`
  height: 100%;
  width: 150px;
  margin: 0;
  display: inline-block;
  background-color: #d9d9d9;
`;

const Root = () => {
  const { token: { colorBgContainer } } = theme.useToken();

  const navigate = useNavigate();
  const toMenu = (key) => { navigate('/' + key) };

  const onClick = (e) => {
    // console.log('click', e.key);
    toMenu(e.key);
  };

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header style={{ background: colorBgContainer, display: 'flex', justifyContent: 'space-between' }}>
        <LogoContainer> logo </LogoContainer>
        <Menu
          theme='light'
          mode='horizontal'
          onClick={onClick}
          items={[
            { key: 'signup', label: '註冊' },
            { key: 'login', label: '登入' }
          ]}
        />
      </Header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Routes>
      <Footer style={{ textAlign: 'center' }}> Created by Group 15 | NTU Web Programmimg 111-1 </Footer>
    </Layout>
  );
};

export default Root;