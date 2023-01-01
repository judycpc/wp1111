import React from 'react';
import { Row, Col, Tabs } from 'antd';
import TabContent from './TabContent';

const disorders = [
  '人格', '壓力', '強迫', '思覺失調', '憂鬱',
  '成癮', '焦慮', '發展', '神經', '躁鬱',
  '身體', '醒覺', '飲食'
];

const Tab = () => {
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
              children: <TabContent disorder={d} />
            }))
          }
        />
      </Col>
    </Row>
  );
};

export default Tab;