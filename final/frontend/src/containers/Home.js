import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, theme, Col, Row, Cascader, Button, Dropdown, Space } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import options from '../assets/cascaderOptions';
import Tab from '../components/Tab';
import Therapists from '../components/Therapists';

const { Header, Footer, Content } = Layout;

const LogoContainer = styled.div`
  height: 100%;
  width: 150px;
  margin: 0;
  display: inline-block;
  background-color: #d9d9d9;
`

const CascaderContainer = styled.div`
  margin: 60px 80px;
`

const StyledCascader = styled(Cascader)`
  width: 50%;
  background-color: #fff;
  border-radius: 8px;
`;


const Home = () => {
  const [showSearch, setShowSearch] = useState(false);

  const { token: { colorBgContainer } } = theme.useToken();

  const navigate = useNavigate();
  const toMenu = (key) => { navigate('/' + key) };

  const onClick = (e) => {
    // console.log('click', e.key);
    toMenu(e.key);
  };

  const onChange = (value) => {
    console.log(value);
  };

  const items = [
    { label: '帳戶資訊', key: '0', },
    { label: '預約紀錄', key: '1', },
    { type: 'divider', },
    { label: '登出', key: '3', },
  ];

  return (

    // <Layout className="layout" style={{ minHeight: "100vh" }}>
    //   <Header style={{ background: colorBgContainer, display: 'flex', justifyContent: 'space-between' }}>
    //     <LogoContainer> logo </LogoContainer>
    //     <Menu
    //       theme='light'
    //       mode='horizontal'
    //       onClick={onClick}
    //       items={[
    //         { key: 'signup', label: '註冊' },
    //         { key: 'login', label: '登入' }
    //       ]}
    //     />
    //   <Dropdown 
    //     menu={{ items, }}
    //     trigger={['click']}
    //     overlayStyle={{ color: '#000000E0' }}
    //   >
    //     <a onClick={(e) => e.preventDefault()}>
    //       <Space>
    //         <Button>
    //           你好，XXX
    //           <DownOutlined />
    //         </Button>
    //       </Space>
    //     </a>
    //   </Dropdown>*/}
    // </Header>
    <Content style={{ padding: '0', minHeight: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Row>
        <Col span={24} style={{ backgroundColor: '#fff2df', minHeight: '160px' }}>
          <CascaderContainer>
            <StyledCascader
              multiple
              size='large'
              options={options}
              bordered={false}
              maxTagCount="responsive"
              placeholder='您有什麼煩惱？'
              onChange={onChange}
            />
            <Button
              type="default"
              icon={<SearchOutlined />}
              size='large'
              style={{ marginLeft: '8px', border: 'none', color: '#575757' }}
              onClick={() => setShowSearch(!showSearch)}
            />
          </CascaderContainer>
        </Col>
      </Row>
      {
        showSearch ? <Therapists /> : <Tab />
      }
    </Content>
    //   <Footer style={{ textAlign: 'center' }}> Created by Group 15 | NTU Web Programmimg 111-1 </Footer>
    // </Layout>
  );
};

export default Home;