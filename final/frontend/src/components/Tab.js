import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs } from 'antd';
import TabContent from './TabContent';
import { getVideos } from '../api';

const disorders = [
  '人格', '壓力', '強迫', '思覺失調', '憂鬱',
  '成癮', '焦慮', '發展', '神經', '躁鬱',
  '身體', '醒覺', '飲食'
];

const Tab = () => {
  const [videos, setVideos] = useState({});

  useEffect(() => {
    const init = async () => {
      let v = await getVideos();
      setVideos(v);
    };

    init();
  }, []);

  return (
    <Row justify='center' style={{ backgroundColor: '#fff', padding: '60px', flex: 1 }}>
      <Col span={20}>
        <Tabs
          size='large'
          defaultActiveKey="1"
          animated={false}
          items={
            disorders.map((d, i) => ({
              label: <p style={{ fontSize: 20, margin: 0 }}>{d}</p>,
              key: i,
              children: <TabContent disorder={d} videos={videos[d]} />
            }))
          }
        />
      </Col>
    </Row>
  );
};

export default Tab;