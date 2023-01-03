import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Card, Avatar, Typography, Button, Tag } from 'antd';
import { StarFilled, ProfileFilled } from '@ant-design/icons';
import styled from 'styled-components';

const { Meta } = Card;
const { Title, Text } = Typography;

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

const Therapists = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const toDetail = (id) => { navigate('/therapists/' + id) };
  return (
    <Row justify='center' style={{ backgroundColor: '#fff', padding: '60px', flex: 1 }}>
      <Col span={20}>
        {
          state.map(({ name, avatar, experiences, disorder_categories, username }, i) => (
            <Card key={i} style={{ marginTop: 20 }}>
              <div style={{ display: 'flex' }}>
                <Meta
                  style={{ flex: 3 }}
                  avatar={
                    <Avatar
                      src={avatar}
                      size={96}
                      style={{ margin: '10px' }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      color='#000000E0'
                      style={{ margin: '20px 0 8px 0' }}
                    >{name} 治療師
                    </Title>}
                  description={
                    <DescriptionContainer>
                      <div>
                        {
                          disorder_categories.map(c => (<Tag key={c} color="#FCD5CE" style={{ fontSize: 18, padding: '5px 10px', color: '#000000E0' }}>{c}</Tag>))
                        }
                      </div>
                      <div style={{ marginTop: 12 }}><ProfileFilled style={{ marginRight: 12 }} />簡歷</div>
                      {
                        experiences.map(({ title }, i) => (
                          <Text key={i} style={{ fontSize: 18, color: '#000000A0' }}>{title}</Text>
                        ))
                      }
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
                    type="primary"
                    onClick={() => toDetail(username)}
                    style={{ background: "#FEC5BB", boxShadow: 'none' }}
                  ><p style={{ margin: '0 20px', color: '#000000E0' }}>預約諮詢</p></Button>
                </SideContainer>
              </div>
            </Card>
          ))
        }

      </Col>
    </Row>

  );
};

export default Therapists;