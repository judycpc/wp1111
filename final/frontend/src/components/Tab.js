import React from 'react';
import { Row, Col, Tabs } from 'antd';
import TabContent from './TabContent';

const Tab = () => {
  return (
    <Row justify='center' style={{ backgroundColor: '#fff', padding: '60px', flex: 1 }}>
      <Col span={20}>
        <Tabs
          size='large'
          defaultActiveKey="1"
          animated={false}
          items={[
            { label: <p style={{ fontSize: 20, margin: 0 }}>類別 A</p>, key: '1', children: <TabContent />, },
            { label: <p style={{ fontSize: 20, margin: 0 }}>類別 B</p>, key: '2', children: <TabContent />, },
            { label: <p style={{ fontSize: 20, margin: 0 }}>類別 C</p>, key: '3', children: <TabContent />, },
            { label: <p style={{ fontSize: 20, margin: 0 }}>類別 D</p>, key: '4', children: <TabContent />, },
          ]}
        />
      </Col>
    </Row>
  );
};

export default Tab;