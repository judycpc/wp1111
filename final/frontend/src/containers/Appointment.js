import React, { useState } from 'react';
import { Layout, Row, Col, Card, Button, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const { Content } = Layout;
const { Text } = Typography;

const Appointment = () => {
  const { state } = useLocation();
  const { date, day, time } = state;
  const { id } = useParams();
  const appointment = date + '（' + day + '）' + time;

  const navigate = useNavigate();
  const goBack = () => navigate('/therapists/' + id);

  return (
    <Content style={{ backgroundColor: '#fff', padding: '0' }}>
      <Row justify="center">
        <Col span={10}>
          <Card
            bordered={false}
            style={{ backgroundColor: '#fff2df', marginTop: 160 }}
          >
            <div>
              <Button type="text" onClick={goBack} style={{ padding: '4px 8px' }}>
                <LeftOutlined />
              </Button>
              <div
                style={{
                  width: '100%',
                  padding: '0 60px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <Text color='#0000E0' style={{ fontSize: 18, margin: '5px 0' }}>治療師姓名：XXX</Text>
                <Text color='#0000E0' style={{ fontSize: 18, margin: '5px 0' }}> 預約時段：{appointment}</Text>
                <Text color='#0000E0' style={{ fontSize: 18, margin: '5px 0' }}> 諮商價格：NT XXX</Text>
                <Text color='#0000E0' style={{ fontSize: 18, margin: '5px 0' }}> 一些預約規則</Text>
              </div>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
              <Button size='large'>確認預約</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Appointment