import React, { useState, useEffect } from 'react';
import { Layout, Col, Row, Cascader, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate, Outlet } from 'react-router-dom';
import { getDisorders, search } from '../api';


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
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    const initOptions = async () => {
      let response = await getDisorders();
      setOptions(response);
    };

    initOptions();
  }, []);


  const onChange = (value) => {
    let symptoms = value.map((v) => {
      if (v.length === 2) return v[v.length - 1];
      return options.filter((o) => o.label === v[0])[0].children.map(c => c.label);
    })
    symptoms = [...new Set(symptoms.flat())];
    setSymptoms(symptoms);
  };

  const navigate = useNavigate();
  const toTherapists = (therapists) => { navigate('/therapists', { state: therapists }) };

  const onClick = async () => {
    const { therapists, message } = await search(symptoms);
    if (message === 'SUCCESS_SEARCH') {
      toTherapists(therapists);
    } else {
      console.error('search error: ' + message);
    }
  }

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
              onClick={onClick}
            />
          </CascaderContainer>
        </Col>
      </Row>
      <Outlet />
    </Content>
  );
};

export default Home;