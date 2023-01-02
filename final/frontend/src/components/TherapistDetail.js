import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Row, Col, Avatar, Card, Typography, Table, Button, Rate, Tag } from "antd";
import { getInfo } from "../api";


const { Content } = Layout;
const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;

const zh_day = ['日', '一', '二', '三', '四', '五', '六'];

const data = [
  {
    key: 0,
    '12/30': [{ hour: 9, available: false }, { hour: 10, available: true }, { hour: 11, available: true }],
    '12/31': [{ hour: 9, available: false }, { hour: 10, available: true }, { hour: 11, available: true }],
    '1/1': [{ hour: 9, available: false }, { hour: 10, available: true }, { hour: 11, available: true }],
    '1/2': [{ hour: 9, available: false }, { hour: 10, available: true }, { hour: 11, available: true }],
    '1/3': [{ hour: 9, available: false }, { hour: 10, available: true }, { hour: 11, available: true }],
    '1/4': [{ hour: 9, available: false }, { hour: 10, available: true }, { hour: 11, available: true }],
    '1/5': [{ hour: 9, available: false }, { hour: 10, available: true }, { hour: 11, available: true }],
  }
];

const getData = (time) => {
  console.log(time);
  let data = { key: 0 };

  for (let i = 0; i < 7; i++) {
    let d = new Date();
    d.setDate(d.getDate() + i + 1);
    const date = d.toLocaleDateString().slice(5);
    if (!time[d.getDay()]) {
      data[date] = [];
    } else {
      data[date] = time[d.getDay()].map((hour) => ({ hour, available: true }))
    }
  }

  return data;
};

const TherapistDetail = () => {
  const { username } = useParams();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [disorders, setDisorders] = useState([]);
  const [introduction, setIntroduction] = useState('');
  const [exp, setExp] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    const init = async () => {
      let { message, info } = await getInfo(username);

      if (message === "SUCCESS_GET") {
        const { name, introduction, experiences, avatar, disorder_categories, available_time } = info;
        setName(name);
        setAvatar(avatar)
        setDisorders(disorder_categories);
        setIntroduction(introduction);
        setExp(experiences);
        setTime(available_time);
      } else {
        console.error('getInfo failed: ' + message)
      }
    };

    init();
  }, []);

  console.log(getData(time));

  const columns = new Array(7).fill(null).map((_, i) => {
    let d = new Date();
    d.setDate(d.getDate() + i + 1);
    const date = d.toLocaleDateString();
    const day = zh_day[d.getDay()];
    return ({
      title: date.slice(5) + '(' + day + ')',
      dataIndex: date.slice(5),
      align: 'center',
      render: (_, input) => {
        const intervals = input[date.slice(5)];
        // if (!intervals) return;

        const output = intervals.map(({ hour, available }) => {
          const time = ("0" + hour).slice(-2) + ':00 - ' + ("0" + (hour + 1)).slice(-2) + ':00';
          return (
            <div key={date + '-' + hour}>
              <Button
                type="text"
                disabled={!available}
                onClick={() => toAppointment(username, date, day, time)}
                style={{ margin: '5px 0', backgroundColor: (available ? '#FEC89A' : '#fff1f0') }}
              >{time}</Button>
            </div>
          )
        });

        return output;
      }
    })
  });



  const navigete = useNavigate();
  const toAppointment = (username, date, day, time) => navigete('/appointment/' + username, { replace: true, state: { date, day, time } });

  return (
    <Content style={{ backgroundColor: '#fff' }}>
      <Row justify='center' style={{ marginTop: 80 }}>
        <Col span={20} >
          <Card>
            <Meta
              avatar={
                <Avatar
                  src={avatar}
                  size={128}
                  style={{ margin: '10px 40px 10px 10px' }}
                />
              }
              title={
                <Title
                  level={3}
                  color='#000000E0'
                  style={{ margin: '10px 0 8px 0' }}
                >{name} 治療師
                </Title>
              }
              description={
                <>
                  {disorders.map(c => (<Tag key={c} color="#ECE4DB" style={{ fontSize: 18, padding: '5px 10px', color: '#000000E0' }}>{c}</Tag>))}
                  <Paragraph style={{ marginTop: 12, fontSize: 18, color: '#000000A0' }}>
                    {introduction}
                  </Paragraph>
                </>
              }
            />
          </Card>
        </Col>
      </Row>

      <Row justify='center' style={{ marginTop: 20 }}>
        <Col span={20} style={{ padding: '10px 30px' }}>
          <Title
            level={3}
            color='#000000E0'
          >
            治療師簡歷
          </Title>
          {
            exp.map(({ title, time, content }, i) => (
              <Card key={i} style={{ margin: '10px 0' }}>
                <Meta
                  description={
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text color='#000000A0' style={{ fontSize: 18 }}>{title}</Text>
                      <Text color='#000000A0' style={{ fontSize: 18 }}>{time}</Text>
                      <Text color='#000000A0' style={{ fontSize: 18 }}>{content}</Text>
                    </div>
                  }
                />
              </Card>
            ))
          }
        </Col>
      </Row>

      <Row justify='center' style={{ marginTop: 20 }}>
        <Col span={20} style={{ padding: '10px 30px' }}>
          <Title
            level={3}
            color='#000000E0'
          >
            諮詢時段
          </Title>
          <Text color='#0000E0' style={{ fontSize: 18, margin: 20 }}>您可以預約未來一週的時段，橘色為可諮詢時段，點擊進入預約</Text>
          <Table
            columns={columns}
            dataSource={[getData(time)]}
            pagination={false}
            style={{ margin: '20px' }}
          />
        </Col>
      </Row>

      <Row justify='center' style={{ margin: '20px 0 80px 0' }}>
        <Col span={20} style={{ padding: '10px 30px' }}>
          <Title
            level={3}
            color='#000000E0'
          >
            諮詢評價
          </Title>
          <Card style={{ margin: 20 }}>
            <Meta
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Title level={4} color='#000000E0' style={{ margin: 0 }} >帳號名稱</Title>
                  <div style={{ marginLeft: 20 }}>
                    <Rate disabled allowHalf defaultValue={4.5} style={{ color: '#FEC89A' }} />
                    <span className="ant-rate-text" color="#000000E0">{4.5}</span>
                  </div>
                </div>
              }
              description={
                <Paragraph style={{ fontSize: 18, color: '#000000A0' }}>
                  諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價
                </Paragraph>}
            />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default TherapistDetail;