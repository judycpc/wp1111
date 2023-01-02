import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col, Typography, Card, Avatar, Button, Table, Tag, Input, Form, Checkbox } from 'antd';
import { EditOutlined, PlusOutlined, CheckOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { getInfo, updateInfo } from '../api';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;
const { TextArea } = Input;
const { CheckableTag } = Tag;

const checkboxOptions = [
  '人格', '壓力', '強迫', '思覺失調', '憂鬱',
  '成癮', '焦慮', '發展', '神經', '躁鬱',
  '身體', '醒覺', '飲食'
];

const Day = ['日', '一', '二', '三', '四', '五', '六'];

const TherapistProfile = () => {
  const { username } = useParams();

  const [name, setName] = useState('');
  const [disorders, setDisorders] = useState([])
  const [editDisorder, setEditDisorder] = useState(false);
  const [intro, setIntro] = useState('');
  const [editIntro, setEditIntro] = useState(false);
  const [exp, setExp] = useState([]);
  const [editExpIdx, setEditExpIdx] = useState(undefined);
  const [editTime, setEditTime] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const init = async () => {
      let { message, info } = await getInfo(username);

      if (message === "SUCCESS_GET") {
        const { name, introduction, experiences, avatar, disorder_categories, available_time } = info;
        setName(name);
        setDisorders(disorder_categories);
        setIntro(introduction);
        setExp(experiences);
        setDataSource(available_time);
      } else {
        console.error('getInfo failed: ' + message)
      }
    };

    init();
  }, []);

  const handleEditDisorder = async () => {
    if (editDisorder) {
      const { message } = await updateInfo({ username, disorder_categories: disorders });
      if (message !== 'SUCCESS_UPDATE') console.error('update disorder categories failed: ' + message);
    }
    setEditDisorder(!editDisorder);
  }

  const handleEditIntro = async () => {
    if (editIntro) {
      const { message } = await updateInfo({ username, introduction: intro });
      if (message !== 'SUCCESS_UPDATE') console.error('update introduction failed: ' + message);
    }
    setEditIntro(!editIntro);
  }

  const handleCreateExp = () => {
    let newExp = [...exp];
    newExp = [...newExp, { title: undefined, time: undefined, content: undefined }];
    setExp(newExp);
    setEditExpIdx(newExp.length - 1);
  };

  const onFinish = async (values) => {
    let newExp = [...exp];
    newExp[editExpIdx] = values;
    const { message } = await updateInfo({ username, experiences: newExp });
    if (message !== 'SUCCESS_UPDATE') {
      console.error('update experience failed: ' + message);
    } else {
      setExp(newExp);
    }
    setEditExpIdx(undefined);
  };

  const onCancel = () => {
    let newExp = [...exp];
    newExp = newExp.slice(0, -1);
    setExp(newExp);
    setEditExpIdx(undefined);
  };

  const deleteExp = async (i) => {
    let newExp = [...exp];
    newExp.splice(i, 1);
    const { message } = await updateInfo({ username, experiences: newExp });
    if (message !== 'SUCCESS_UPDATE') {
      console.error('delete experience failed: ' + message);
    } else {
      setExp(newExp);
    }
  };

  const handleEditTime = async () => {
    if (editTime) {
      const { message } = await updateInfo({ username, available_time: dataSource });
      if (message !== 'SUCCESS_UPDATE') console.error('update available time failed: ' + message);
    }
    setEditTime(!editTime);
  };

  const handleTagChange = (day, time, checked) => {
    let newData = JSON.parse(JSON.stringify(dataSource));
    if (!newData[day]) newData[day] = [];

    if (checked && !newData[day].includes(time)) {
      newData[day] = [...newData[day], time].sort();
    } else if (!checked && newData[day].includes(time)) {
      newData[day].splice(newData[day].indexOf(time), 1);
    }

    setDataSource(newData);
  }

  const columns = [0, 1, 2, 3, 4, 5, 6].map((e) => ({
    title: Day[e],
    index: e,
    align: 'center',
    render: (input) => {
      let intervals = input[e];
      if (!intervals) intervals = [];

      if (editTime) {
        return new Array(24).fill(null).map((_, i) => (
          <CheckableTag key={i} checked={intervals.includes(i)}
            onChange={checked => handleTagChange(e, i, checked)}
            style={{
              // backgroundColor: (intervals.includes(i) ? '#D8E2DC' : '#f0f0f0'),
              // color: '#000000E0',
              border: 'none',
              width: '70%',
              margin: '5px 0'
            }}>
            {("0" + (i)).slice(-2) + ':00 - ' + ("0" + (i + 1)).slice(-2) + ':00'}
          </CheckableTag>
        ));
      }

      return new Array(24).fill(null).map((_, i) => (
        <Tag key={i} style={{
          backgroundColor: (intervals.includes(i) ? '#FFD7BA' : null),
          border: 'none',
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
                  <Button shape='circle'><UploadOutlined /></Button>
                </div>
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
                  <div style={{ display: 'flex', alignItems: (editDisorder ? 'flex-start' : 'center'), margin: '15px 0' }}>
                    <Text color='#000000E0' style={{ fontSize: 20, marginRight: 12 }}>專業領域</Text>
                    {
                      editDisorder
                        ? (
                          <Checkbox.Group defaultValue={disorders} onChange={(values) => setDisorders(values)} style={{ width: '50%', margin: '0 20px' }}>
                            <Row>
                              {
                                checkboxOptions.map(e => (
                                  <Col span={8} key={e}>
                                    <Checkbox value={e} style={{ fontSize: 18 }}>{e}</Checkbox>
                                  </Col>
                                ))
                              }
                            </Row>
                          </Checkbox.Group>
                        ) : (
                          disorders.map(c => (<Tag key={c} color="#ECE4DB" style={{ fontSize: 18, padding: '5px 10px', color: '#000000E0' }}>{c}</Tag>))
                        )
                    }
                    <Button
                      shape='circle'
                      type={editDisorder ? 'primary' : 'default'}
                      style={{ marginLeft: 8 }}
                      onClick={handleEditDisorder}
                    >
                      {editDisorder ? <CheckOutlined /> : <EditOutlined />}
                    </Button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0' }}>
                    <Text color='#000000E0' style={{ fontSize: 20 }}>簡介</Text>
                    <Button
                      shape='circle'
                      type={editIntro ? 'primary' : 'default'}
                      style={{ marginLeft: 8 }}
                      onClick={handleEditIntro}
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
            <Button type={editTime ? 'primary' : 'default'} onClick={handleEditTime} style={{ margin: '12px 0' }}>
              {
                editTime
                  ? <><CheckOutlined style={{ marginRight: 12 }} />儲存</>
                  : <><EditOutlined style={{ marginRight: 12 }} />修改</>
              }
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={[{ key: 0, ...dataSource }]}
            pagination={false}
          />
        </Col>
      </Row>
    </Content >
  );
};

export default TherapistProfile;