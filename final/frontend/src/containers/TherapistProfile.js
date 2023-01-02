import React, { useState } from 'react';
import { Layout, Row, Col, Typography, Card, Avatar, Button, Table, Tag, Input, Form } from 'antd';
import { EditOutlined, PlusOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;
const { TextArea } = Input;
const { CheckableTag } = Tag;




const data = [
  {
    key: 0,
    '一': [9, 10, 11],
    '二': [11, 12, 13],
    '三': [13, 14, 15],
    '四': [16, 17, 18],
    '五': [19, 20, 21],
    '六': [8, 9, 10],
    '日': [11, 12, 13],
  }
];

// fake intro
const _intro = "治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介";

const _exp = [
  { title: 'XX單位XX諮商師', time: '2022.12.01 - 2022.12.30', content: '具體工作內容' }
]

const TherapistProfile = () => {
  const [intro, setIntro] = useState(_intro);
  const [editIntro, setEditIntro] = useState(false);
  const [exp, setExp] = useState(_exp);
  const [editExpIdx, setEditExpIdx] = useState(undefined);
  const [editTime, setEditTime] = useState(false);
  const [dataSource, setDataSource] = useState([{
    key: 0,
    '一': [9, 10, 11],
    '二': [11, 12, 13],
    '三': [13, 14, 15],
    '四': [16, 17, 18],
    '五': [19, 20, 21],
    '六': [8, 9, 10],
    '日': [11, 12, 13],
  }]);

  const handleCreateExp = () => {
    let newExp = exp;
    newExp[newExp.length] = { title: undefined, time: undefined, content: undefined };
    setExp(newExp);
    setEditExpIdx(exp.length - 1);
  };

  const onFinish = (values) => {
    let newExp = [...exp];
    newExp[editExpIdx] = values;
    setExp(newExp);
    setEditExpIdx(undefined);
  };

  const onCancel = () => {
    let newExp = [...exp];
    newExp = newExp.slice(0, -1);
    setExp(newExp);
    setEditExpIdx(undefined);
  }

  const deleteExp = (i) => {
    let newExp = [...exp];
    newExp.splice(i, 1);
    setExp(newExp);
  }

  const handleEditTime = () => {
    // if (editTime) put
    setEditTime(!editTime);
  };

  const handleTagChange = (day, time, checked) => {
    let newData = JSON.parse(JSON.stringify(dataSource));
    if (checked && !newData[0][day].includes(time)) {
      newData[0][day] = [...newData[0][day], time];
    } else if (!checked && newData[0][day].includes(time)) {
      newData.splice(newData[0][day].indexOf(time), 1);
    }
    setDataSource(newData);
  }

  const columns = ['一', '二', '三', '四', '五', '六', '日'].map((e) => ({
    title: e,
    index: e,
    align: 'center',
    render: (input) => {
      const intervals = input[e];

      if (editTime) {
        return new Array(24).fill(null).map((_, i) => (
          <CheckableTag key={i} checked={intervals.includes(i)}
            onChange={checked => handleTagChange(e, i, checked)}
            style={{
              // backgroundColor: (intervals.includes(i) ? '#d9f7be' : '#f0f0f0'),
              // color: '#000000E0',
              width: '70%',
              margin: '5px 0'
            }}>
            {("0" + (i)).slice(-2) + ':00 - ' + ("0" + (i + 1)).slice(-2) + ':00'}
          </CheckableTag>
        ));
      }

      return new Array(24).fill(null).map((_, i) => (
        <Tag key={i} style={{
          backgroundColor: (intervals.includes(i) ? '#d9f7be' : '#f0f0f0'),
          width: '70%',
          margin: '5px 0'
        }}>
          {("0" + (i)).slice(-2) + ':00 - ' + ("0" + (i + 1)).slice(-2) + ':00'}
        </Tag>
      ));
    }
  }));

  return (
    <Content style={{ backgroundColor: '#fff' }}>
      <Row justify="center" style={{ marginTop: 30 }}>
        <Col span={20}>
          <Title level={2} style={{ color: '#000000E0', margin: '30px 0' }}>個人主頁</Title>
          <Card>
            <Meta
              avatar={
                <div style={{ display: 'flex', alignItems: 'flex-end', margin: 10 }}>
                  <Avatar
                    src="https://img1.wsimg.com/isteam/ip/bc2e5cab-6169-4181-9e51-89df4fb88348/黃珮雯%20臨床心理師.jpg/:/cr=t:11.07%25,l:0%25,w:100%25,h:77.85%25/rs=w:365,h:365,cg:true"
                    size={128}
                  />
                  <Button shape='circle'><EditOutlined /></Button>
                </div>
              }
              title={
                <Title
                  level={3}
                  color='#000000E0'
                  style={{ margin: '10px 0 8px 0' }}
                >XXX 治療師
                </Title>
              }
              description={
                <>
                  <Text color='#000000A0' style={{ fontSize: 18 }}>已完成 100 堂諮詢</Text>
                  <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0' }}>
                    <Text color='#000000E0' style={{ fontSize: 20 }}>簡介</Text>
                    <Button
                      shape='circle'
                      type={editIntro ? 'primary' : 'default'}
                      style={{ marginLeft: 8 }}
                      onClick={() => {
                        // if (editIntro) send to backend
                        setEditIntro(!editIntro);
                      }}
                    >
                      {editIntro ? <CheckOutlined /> : <EditOutlined />}
                    </Button>
                  </div>
                  <Paragraph style={{ marginTop: 12, fontSize: 18, color: '#000000A0' }}>
                    {editIntro
                      ? <TextArea
                        showCount
                        autoSize
                        maxLength={200}
                        defaultValue={intro}
                        onChange={(e) => setIntro(e.target.value)}
                      />
                      : intro}
                  </Paragraph>
                </>
              }
            />
          </Card>
        </Col>
      </Row>

      <Row justify='center' style={{ marginTop: 20 }}>
        <Col span={20} style={{ padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', wigth: '100%' }}>
            <Title
              level={3}
              color='#000000E0'
            >
              治療師簡歷
            </Title>
            <Button type='default' style={{ margin: '12px 0' }} onClick={handleCreateExp} disabled={editExpIdx !== undefined}>
              <PlusOutlined style={{ marginRight: 4 }} />新增
            </Button>
          </div>
          {
            exp.map(({ title, time, content }, i) => (
              <Card key={i} style={{ margin: '10px 0' }}>
                <Meta
                  description={
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      {
                        i === editExpIdx
                          ? (
                            <Form
                              initialValues={(title && time && content) ? { title, time, content } : null}
                              onFinish={onFinish}
                              style={{ width: '50%' }}
                            >
                              <Form.Item
                                label="職稱"
                                name="title"
                                rules={[
                                  {
                                    required: true,
                                    message: '請填寫職稱',
                                  },
                                ]}
                              >
                                <Input placeholder='XX單位XX諮商師' />
                              </Form.Item>
                              <Form.Item
                                label="在職期間"
                                name="time"
                                rules={[
                                  {
                                    required: true,
                                    message: '請填寫在職期間',
                                  },
                                ]}
                              >
                                <Input placeholder='2022.12.01 - 2022.12.30' />
                              </Form.Item>
                              <Form.Item
                                label="職務內容"
                                name="content"
                                rules={[
                                  {
                                    required: true,
                                    message: '請填寫職務內容',
                                  },
                                ]}
                              >
                                <Input placeholder='具體工作事項、專業項目' />
                              </Form.Item>
                              <Form.Item
                              >
                                {(!title && !time && !content) ? <Button onClick={onCancel} style={{ marginRight: 20 }}>取消</Button> : null}
                                <Button type="primary" htmlType="submit">
                                  儲存
                                </Button>
                              </Form.Item>
                            </Form>
                          ) : (
                            <>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Text color='#000000A0' style={{ fontSize: 18 }}>{title}</Text>
                                <Text color='#000000A0' style={{ fontSize: 18 }}>{time}</Text>
                                <Text color='#000000A0' style={{ fontSize: 18 }}>{content}</Text>
                              </div>
                              <div>
                                <Button shape='circle' size='large' onClick={() => deleteExp(i)} style={{ marginRight: 8 }}><DeleteOutlined /></Button>
                                <Button shape='circle' size='large' onClick={() => setEditExpIdx(i)} ><EditOutlined /></Button>
                              </div>
                            </>
                          )
                      }
                    </div>
                  }
                />
              </Card>
            ))
          }
        </Col>
      </Row>

      <Row justify='center' style={{ margin: '20px 0 80px 0' }}>
        <Col span={20} style={{ padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', wigth: '100%' }}>
            <Title level={3} color='#000000E0' > 諮詢時段 </Title>
            <Button type='default' onClick={handleEditTime} style={{ margin: '12px 0' }}>
              {
                editTime
                  ? <><CheckOutlined style={{ marginRight: 12 }} />儲存</>
                  : <><EditOutlined style={{ marginRight: 12 }} />修改</>
              }
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </Col>
      </Row>
    </Content >
  );
};

export default TherapistProfile;