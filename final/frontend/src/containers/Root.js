import { Layout, theme, Menu } from "antd";
import styled from "styled-components";
import { useNavigate, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Appointment from "./Appointment";
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
`;

const Root = () => {
  const { token: { colorBgContainer } } = theme.useToken();

  const navigate = useNavigate();
  const toMenu = (key) => { navigate('/' + key) };

  const onClick = (e) => {
    // console.log('click', e.key);
    toMenu(e.key);
  };

  // const items = [
  //   { label: '帳戶資訊', key: '0', },
  //   { label: '預約紀錄', key: '1', },
  //   { type: 'divider', },
  //   { label: '登出', key: '3', },
  // ];

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
        {/* <Dropdown
          menu={{ items, }}
          trigger={['click']}
          overlayStyle={{ color: '#000000E0' }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Button>
                你好，XXX
                <DownOutlined />
              </Button>
            </Space>
          </a>
        </Dropdown> */}
      </Header>

      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='' element={<Tab />} />
          <Route path='therapists' element={<Therapists />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='therapists/:id' element={<TherapistDetail />} />
        <Route path='appointment/:id' element={<Appointment />} />
      </Routes>

      <Footer style={{ textAlign: 'center' }}> Created by Group 15 | NTU Web Programmimg 111-1 </Footer>
    </Layout>
  );
};

export default Root;