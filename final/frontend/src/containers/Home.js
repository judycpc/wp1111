import React, { useState, useEffect } from 'react';
import { Layout, Col, Row, Cascader, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate, Outlet } from 'react-router-dom';
import { getDisorders } from '../api';


const { Content } = Layout;

const CascaderContainer = styled.div`
  margin: 60px 80px;
`

const StyledCascader = styled(Cascader)`
  width: 50%;
  background-color: #fff;
  border-radius: 8px;
`;




const Home = () => {
  const [options, setOptions] = useState([]);


  useEffect(() => {
    const initOptions = async () => {
      let response = await getDisorders();
      setOptions(response);
    };

    initOptions();
  }, []);


  const onChange = (value) => {
    console.log(value);
  };

  const navigate = useNavigate();
  const toTherapists = () => { navigate('/therapists') };

  return (
    <Content style={{ padding: '0', minHeight: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Row>
        <Col span={24} style={{ backgroundColor: '#FFE5D9', minHeight: '160px' }}>
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
              onClick={toTherapists}
            />
          </CascaderContainer>
        </Col>
      </Row>
      <Outlet />
    </Content>
  );
};

export default Home;