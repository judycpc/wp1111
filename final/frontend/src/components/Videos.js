import React from 'react';
import ReactPlayer from 'react-player'
import { Divider, List } from 'antd';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 0 16px 0;
`;

const Videos = ({ videos }) => {
  return (
    <>
      <Divider style={{ fontSize: 18 }}>推薦影片</Divider>
      <List
        itemLayout="horizontal"
        dataSource={videos}
        renderItem={(item) => (
          <List.Item>
            <Container>
              <div style={{ width: '90%', height: '60vh', margin: '40px 0' }}>
                <ReactPlayer controls width='100%' height='100%' url={item} />
              </div>
            </Container>
          </List.Item>
        )}
      />
    </>
  );
}

export default Videos;