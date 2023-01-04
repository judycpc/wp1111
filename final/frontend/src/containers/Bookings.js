import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import styled from 'styled-components';
import Booking from "../components/Booking";
import { getAppointments, updateAppointment } from '../api';


const { Content } = Layout;

const BookingsContainer = styled.div`
    margin-left: 50px
`;

const Bookings = ({identity}) => { 
  const { username } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  console.log("identity =", identity)

  useEffect(() => {
    const init = async () => {
      let app_res = undefined

      if (identity === 'client')
      {
        app_res = await getAppointments({ client: username });
      }
      else if (identity === 'therapist')
      {
        app_res = await getAppointments({ therapist: username });
      }
      
      if (app_res.message === 'GET_RESULTS') {
        setAppointments(app_res.appointments);
      } else {
        console.error('getAppointments failed: ' + app_res.message);
      }
    };

    init();
  }, []);

  const handleUpdateAppointment = async (therapist, client, time, rating, comment, status) => {
    console.log("handleUpdateAppointment", therapist, client, time, rating, comment, status)
      const { message } = await updateAppointment({ therapist, client, time, rating, comment, status });
      if (message !== 'SUCCESS_UPDATE') console.error('update appointment comment failed: ' + message);
      //else setIsUpdate(!isUpdate);
  }
    
  return (
    <Content style={{ display: 'flex', padding: '0', minHeight: 'auto' }}>
      <Row style={{ backgroundColor: '#fff', flex: 1 }}>
        <Col span={24}>
            <BookingsContainer>
                <h3>預約紀錄</h3>
                <h4>預約中</h4>
                {/* <Booking
                    mode = {'waiting'}
                /> */}
                {
                  appointments.filter(a => a.status === 'ACTIVE').map(({ therapist, client, time, meeting_code, comment, status }, i) => (
                    <Booking 
                      key={i} 
                      identity={identity} 
                      therapist={therapist} 
                      client={client} 
                      time={time} 
                      meeting_code={meeting_code} 
                      comment={comment} 
                      status={status} 
                      handleUpdateAppointment={handleUpdateAppointment}
                    />
                  ))
                }
                <h4>歷史預約</h4>
                {
                  appointments.filter(a => a.status !== 'ACTIVE').map(({ therapist, client, time, meeting_code, comment, status }, i) => (
                    <Booking 
                      key={i} 
                      identity={identity} 
                      therapist={therapist} 
                      client={client} 
                      time={time} 
                      meeting_code={meeting_code} 
                      comment={comment} 
                      status={status} 
                      handleUpdateAppointment={handleUpdateAppointment}
                    />
                  ))
                }
                {/* <Booking
                    mode = {'comment'}
                />
                <Booking
                    mode = {'done'}
                />
                <Booking
                    mode = {'done'}
                /> */}
            </BookingsContainer>
        </Col>
      </Row>
    </Content>
  );
};
    
export default Bookings;