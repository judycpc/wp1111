import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Button, Typography, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getInfo, createAppointment } from '../api';

const { Content } = Layout;
const { Text } = Typography;

const Appointment = () => {
  const { state } = useLocation();
  const { client, date, day, time } = state;
  const [name, setName] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const init = async () => {
      const { info: { name }, message } = await getInfo(id);
      if (message === "SUCCESS_GET") {
        setName(name);
      } else {
        console.error('getInfo failed: ' + message);
      }
    };

    init()
  }, []);

  const appointment = date + '（' + day + '）' + time;
  const reqTime = date + '_' + time.slice(0, 2);

  const navigate = useNavigate();
  const goBack = () => navigate('/therapists/' + id);
  // const goBack = () => navigate(-1);
  const toHome = () => navigate('/');

  const onClick = async () => {
    const res = await createAppointment({
      therapist: id,
      client,
      time: reqTime,
      meeting_code: "hdm-iwxa-fwi"
    });
    if (res.message === 'SUCCESS_APPOINTMENT_CREATION') {
      message.success({ content: '預約成功' })
      toHome();
    } else {
      console.error('create appointment error: ' + res.message);
      message.error({ content: '發生錯誤' });
      goBack();
    }
  }

  return (
    <Content style={{ backgroundColor: '#fff', padding: '0' }}>
      <Row justify="center">
        <Col span={10}>
          <Card
            bordered={false}
            style={{ backgroundColor: '#F8EDEB', margin: '160px 0' }}
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
                <Text color='#0000E0' style={{ fontSize: 18, margin: '5px 0' }}>心理師姓名：{name}</Text>
                <Text color='#0000E0' style={{ fontSize: 18, margin: '5px 0' }}> 預約時段：{appointment}</Text>
                <Text color='#0000E0' style={{ fontSize: 18, margin: '5px 0' }}> 晤談價格：NT 500</Text>
                <Text color='#0000E0' style={{ fontSize: 18, margin: '5px 0' }}> 初次晤談請您提早 5~10 分鐘至晤談室，方便了解您的晤談權益。</Text>
                <Text color='#0000E0' style={{ fontSize: 18, margin: '5px 0' }}> 後續晤談計畫，將由心理師與您共同討論。</Text>
              </div>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
              <Button size='large' type='text' onClick={onClick} style={{ backgroundColor: '#FFD7BA' }}>確認預約</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Appointment