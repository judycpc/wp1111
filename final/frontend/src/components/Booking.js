import React, { useState } from 'react';
import { Button, Form, Input, Rate } from 'antd';
import styled from 'styled-components';

const { TextArea } = Input;

const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  width: 600px;
  border-radius: 10px;
  background: #FFF2DF;
  margin-bottom: 20px;
`;

const BookingDetailContainer = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

const Booking = ({identity, therapist, client, time, meeting_code, comment, status, handleUpdateAppointment}) => {
  
  const [newRate, setNewRate] = useState(0);
  const [newComment, setNewComment] = useState('');
  
  if(identity === 'client'){
    if(status === 'ACTIVE'){
      return (
        <BookingContainer>
          <BookingDetailContainer>治療師 : {therapist}</BookingDetailContainer>
          <BookingDetailContainer>預約時段 : {time}</BookingDetailContainer>
          <BookingDetailContainer style={{ marginBottom: '10px' }}>諮詢室連結 : {meeting_code}</BookingDetailContainer>
        </BookingContainer>
      );
    }
  
    else if(status === 'UNCOMMENTED'){
      return (
        <BookingContainer>
          <BookingDetailContainer>治療師 : {therapist}</BookingDetailContainer>
          <BookingDetailContainer>預約時段 : {time}</BookingDetailContainer>
          <BookingDetailContainer>請留下您的寶貴意見 :</BookingDetailContainer>
          <BookingDetailContainer>
            <Rate onChange={(e) => setNewRate(e.target.value)}/>
          </BookingDetailContainer>
          <BookingDetailContainer>
          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px'}}>
            <TextArea rows={1} onChange={(e) => setNewComment(e.target.value)}/>
            <Button type="default" htmlType="submit" className="login-form-button" style={{marginLeft: '10px'}} onclick={() => handleUpdateAppointment(therapist, client, time, newRate, newComment)}>確認送出</Button>
          </div>
          </BookingDetailContainer>  
        </BookingContainer>
      );
    } 
  
    else if(status === 'COMMENTED'){
      return (
        <BookingContainer>
          <BookingDetailContainer>治療師姓名 : {therapist}</BookingDetailContainer>
          <BookingDetailContainer>預約時段 : {time}</BookingDetailContainer>
          <BookingDetailContainer style={{ marginBottom: '10px', color: 'gray' }}>已填寫評論</BookingDetailContainer>
        </BookingContainer>
      );
    }
  }

  else if(identity === 'therapist'){
    if(status === 'ACTIVE'){
      return (
        <BookingContainer>
          <BookingDetailContainer>諮詢者 : {client}</BookingDetailContainer>
          <BookingDetailContainer>預約時段 : {time}</BookingDetailContainer>
          <BookingDetailContainer style={{ marginBottom: '10px' }}>諮詢室連結 : {meeting_code}</BookingDetailContainer>
        </BookingContainer>
      );
    }
  
    else if(status === 'UNCOMMENTED'){
      return (
        <BookingContainer>
          <BookingDetailContainer>諮詢者 : {client}</BookingDetailContainer>
          <BookingDetailContainer>預約時段 : {time}</BookingDetailContainer>
          <BookingDetailContainer style={{ marginBottom: '10px', color: 'gray' }}>諮詢評價 : 未填寫評論</BookingDetailContainer>
        </BookingContainer>
      );
    } 
  
    else if(status === 'COMMENTED'){
      return (
        <BookingContainer>
          <BookingDetailContainer>諮詢者 : {client}</BookingDetailContainer>
          <BookingDetailContainer>預約時段 : {time}</BookingDetailContainer>
          <BookingDetailContainer>諮詢評價 : {comment}</BookingDetailContainer>
        </BookingContainer>
      );
    }
  }
  
};
  
 export default Booking;