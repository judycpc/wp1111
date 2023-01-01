import React from 'react';
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

const Booking = ({mode}) => {
  if(mode === 'waiting'){
    return (
      <BookingContainer>
        <BookingDetailContainer>治療師姓名 : XXX</BookingDetailContainer>
        <BookingDetailContainer>預約時段 : 12/15 (四) 10:00 ~11:00</BookingDetailContainer>
        <BookingDetailContainer style={{ marginBottom: '10px' }}>諮詢室連結 : weq-rew-vdfg</BookingDetailContainer>
      </BookingContainer>
    );
  }

  else if(mode === 'comment'){
    return (
      <BookingContainer>
        <BookingDetailContainer>治療師姓名 : XXX</BookingDetailContainer>
        <BookingDetailContainer>預約時段 : 12/15 (四) 10:00 ~11:00</BookingDetailContainer>
        <BookingDetailContainer>請留下您的寶貴意見 :</BookingDetailContainer>
        <BookingDetailContainer><Rate /></BookingDetailContainer>
        <BookingDetailContainer>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px'}}>
          <TextArea rows={1} />
          <Button type="default" htmlType="submit" className="login-form-button" style={{marginLeft: '10px'}}>確認送出</Button>
        </div>
        </BookingDetailContainer>  
      </BookingContainer>
    );
  } 

  else if(mode === 'done'){
    return (
      <BookingContainer>
        <BookingDetailContainer>治療師姓名 : XXX</BookingDetailContainer>
        <BookingDetailContainer>預約時段 : 12/15 (四) 10:00 ~11:00</BookingDetailContainer>
        <BookingDetailContainer style={{ marginBottom: '10px', color: 'gray' }}>已填寫評論</BookingDetailContainer>
      </BookingContainer>
    );
  }
};
  
 export default Booking;