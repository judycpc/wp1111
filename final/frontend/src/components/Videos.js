import React from 'react';
import ReactPlayer from 'react-player'
import { Divider, List, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 0 16px 0;
`;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const Videos = () => {
  return (
    <>
      <Divider style={{ fontSize: 18 }}>推薦影片</Divider>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Container>
              <Title level={5} style={{ margin: 16, width: '80%' }}>{item.title}</Title>
              <div style={{ width: '90%', height: '60vh' }}>
                <ReactPlayer controls width='100%' height='100%' url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
              </div>
            </Container>
          </List.Item>
        )}
      />
    </>
  );
}

export default Videos;