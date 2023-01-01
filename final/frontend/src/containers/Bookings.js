import Booking from "../components/Booking";
import { Layout, Row, Col } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';


const { Content } = Layout;

const BookingsContainer = styled.div`
    margin-left: 50px
`;

const Bookings = () => { 
    const [identity, setIdentity] = useState('user');
    
      return (
        <Content style={{ display: 'flex', padding: '0', minHeight: 'auto' }}>
          <Row style={{ backgroundColor: '#fff', flex: 1 }}>
            <Col span={24}>
                <BookingsContainer>
                    <h3>預約紀錄</h3>
                    <h4>預約中</h4>
                    <Booking
                        mode = {'waiting'}
                    />
                    <h4>歷史預約</h4>
                    <Booking
                        mode = {'comment'}
                    />
                    <Booking
                        mode = {'done'}
                    />
                    <Booking
                        mode = {'done'}
                    />
                </BookingsContainer>
            </Col>
          </Row>
        </Content>
      );
    };
    
export default Bookings;