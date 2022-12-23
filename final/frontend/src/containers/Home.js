import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme, Col, Row, Cascader, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import options from '../assets/cascaderOptions';
import Tab from '../components/Tab';
import SearchResult from '../components/SearchResult';

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

  const onClick = (e) => {
    console.log('click', e.key);
  };

  const onChange = (value) => {
    console.log(value);
  };

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header style={{ background: colorBgContainer }}>
        <LogoContainer> logo </LogoContainer>
        <Menu
          theme='light'
          mode='horizontal'
          onClick={onClick}
          items={[
            { key: 'signup', label: '註冊' },
            { key: 'login', label: '登入' }
          ]}
          style={{ float: 'right' }}
        />
      </Header>
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
          showSearch ? <SearchResult /> : <Tab />
        }
      </Content>
      <Footer style={{ textAlign: 'center' }}> Created by Group 15 | NTU Web Programmimg 111-1 </Footer>
    </Layout>
  );
};

export default Home;