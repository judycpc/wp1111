import React from 'react';
import { Row, Col, Card, Avatar, Typography, Button } from 'antd';
import { StarFilled, ProfileFilled } from '@ant-design/icons';
import styled from 'styled-components';

const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #000000A0;
  font-size: 18px;
`;

const SideContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const SearchResult = () => {
  return (
    <Row justify='center' style={{ backgroundColor: '#fff', padding: '60px', flex: 1 }}>
      <Col span={20}>
        <Card style={{ marginTop: 20 }}>
          <div style={{ display: 'flex' }}>
            <Meta
              style={{ flex: 3 }}
              avatar={
                <Avatar
                  src="https://img1.wsimg.com/isteam/ip/bc2e5cab-6169-4181-9e51-89df4fb88348/黃珮雯%20臨床心理師.jpg/:/cr=t:11.07%25,l:0%25,w:100%25,h:77.85%25/rs=w:365,h:365,cg:true"
                  size={96}
                  style={{ margin: '10px' }}
                />
              }
              title={
                <Title
                  level={4}
                  color='#000000E0'
                  style={{ margin: '20px 0 8px 0' }}
                >XXX 治療師
                </Title>}
              description={
                <DescriptionContainer>
                  <div><StarFilled style={{ marginRight: 12 }} />4.5 - 10 則評論</div>
                  <div style={{ marginTop: 12 }}><ProfileFilled style={{ marginRight: 12 }} />簡歷</div>
                  <Text style={{ fontSize: 16, color: '#000000A0' }}>Ant Design is a design language for background applications.</Text>
                  <Text style={{ fontSize: 16, color: '#000000A0' }}>Ant Design is a design language for background applications.</Text><Text style={{ fontSize: 16, color: '#000000A0' }}>Ant Design is a design language for background applications.</Text><Text style={{ fontSize: 16, color: '#000000A0' }}>Ant Design is a design language for background applications.</Text>
                </DescriptionContainer>
              }
            />
            <SideContainer>
              <Title
                level={4}
                color='#000000E0'
                style={{ margin: '20px 10px', textAlign: 'right' }}
              >NT 100 / 60 分鐘
              </Title>
              <Button
                size='large'
                type="primary" style={{ background: "#FFF2DF", boxShadow: 'none' }}
              ><p style={{ margin: '0 20px', color: '#000000E0' }}>預約諮詢</p></Button>
            </SideContainer>
          </div>
        </Card>
      </Col>
    </Row>

  );
};

export default SearchResult;