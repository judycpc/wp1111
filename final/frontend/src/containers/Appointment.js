import React, { useState } from 'react';
import { Layout, Row, Col, Card, Button, Typography, DatePicker } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

const { Content } = Layout;
const { Text } = Typography;
const { RangePicker } = DatePicker;

const Appointment = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const disabledDate = (current) => {
    if (!dates || !dates[0]) {
      return (current && current < dayjs().endOf('day')) || current > dayjs().endOf('day').add(28, 'day');
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 0;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 0;
    return !!tooEarly || !!tooLate;

  };
  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  const onOk = (value) => {
    console.log('onOk: ', value);
  };


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
              <div style={{ width: '100%', padding: '0 60px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text color='#0000E0' style={{ fontSize: 18, margin: '10px 0' }}>
                  治療師姓名：XXX</Text>
                <Text color='#0000E0' style={{ fontSize: 18, margin: '5px 0' }}>
                  預約時段</Text>
                <RangePicker
                  size="large"
                  showTime={{ format: 'HH:00' }}
                  format="YYYY-MM-DD HH:00"
                  onOk={onOk}
                  value={dates || value}
                  disabledDate={disabledDate}
                  onCalendarChange={(val) => setDates(val)}
                  onChange={(val) => setValue(val)}
                  onOpenChange={onOpenChange}
                  style={{ fontSize: 18, margin: '5px 0' }}
                />
                <Text color='#0000E0' style={{ fontSize: 18, margin: '5px 0' }}>
                  諮商價格：NT XXX</Text>
                <Text color='#0000E0' style={{ fontSize: 18, margin: '5px 0' }}>
                  一些預約規則</Text>
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