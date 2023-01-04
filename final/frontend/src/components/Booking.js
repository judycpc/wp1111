import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Rate, Typography, message } from 'antd';
import styled from 'styled-components';
import { getInfo } from '../api';

const { TextArea } = Input;

const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  width: 600px;
  border-radius: 10px;
  background: #FFE5D9;
  margin-bottom: 20px;
`;

const BookingDetailContainer = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

const Booking = ({ identity, therapist, client, time, meeting_code, comment, status, handleUpdateAppointment }) => {

  const [newComment, setNewComment] = useState(false);
  const [newStatus, setNewStatus] = useState('COMMENTED');
  const [name, setName] = useState('');

  const getName = async (username) => {
    let { message, info } = await getInfo(username);

    if (message === "SUCCESS_GET") {
      const { name } = info;
      setName(name);
    } else {
      console.error('getBookingName failed: ' + message)
    }
  }

  const convertTime = (time) => {
    let date = time.substring(0, 10)
    let hour = Number(time.substring(11, 13))
    let tempTime = ''
    console.log("convertTime", date + " " + hour.toString() + ":00 - " + (hour + 1).toString() + ":00")
    if (hour <= 8) {
      tempTime = date + " 0" + hour.toString() + ":00 - 0" + (hour + 1).toString() + ":00"
    }
    else if (hour === 9) {
      tempTime = date + " 0" + hour.toString() + ":00 - " + (hour + 1).toString() + ":00"
    }
    else {
      tempTime = date + " " + hour.toString() + ":00 - " + (hour + 1).toString() + ":00"
    }
    return tempTime
  }

  const onFinish = (values) => {
    console.log('Success:', values);
    console.log(therapist, client, time, values.rating, values.comment, newStatus)
    handleUpdateAppointment(therapist, client, time, values.rating, values.comment, newStatus)
    setNewComment(!newComment)
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  //convertTime()
  if (identity === 'client') {
    getName(therapist)
    if (status === 'ACTIVE') {
      return (
        <BookingContainer>
          <BookingDetailContainer>心理師 : {name}</BookingDetailContainer>
          <BookingDetailContainer>預約時段 : {convertTime(time)}</BookingDetailContainer>
          <BookingDetailContainer style={{ marginBottom: '10px' }}>晤談室連結 : {meeting_code}</BookingDetailContainer>
        </BookingContainer>
      );
    }

    else if (status === 'UNCOMMENTED') {
      return (
        <BookingContainer>
          <BookingDetailContainer>心理師 : {name}</BookingDetailContainer>
          <BookingDetailContainer>預約時段 : {convertTime(time)}</BookingDetailContainer>
          {
            newComment ?
              <BookingDetailContainer style={{ marginBottom: '10px', color: 'gray' }}>已填寫評論</BookingDetailContainer>
              :
              <>
                <BookingDetailContainer>請留下您的寶貴意見 :</BookingDetailContainer>
                <BookingDetailContainer>
                  <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item name="rating" rules={[{ required: true, message: '請填寫評分' }]}>
                      <Rate />
                    </Form.Item>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Form.Item name="comment" rules={[{ required: true, message: '請填寫評論內容' }]}>
                        <Input.TextArea showCount maxLength={100} style={{ width: '475px' }} />
                      </Form.Item>
                      <Form.Item>
                        <Button type="default" htmlType="submit" style={{ marginLeft: '10px' }} >確認送出</Button>
                      </Form.Item>
                    </div>
                  </Form>
                </BookingDetailContainer>
              </>
          }
        </BookingContainer>
      );
    }
    // () => handleUpdateAppointment(therapist, client, time, newRate, newComment)

    else if (status === 'COMMENTED') {
      return (
        <BookingContainer>
          <BookingDetailContainer>心理師 : {name}</BookingDetailContainer>
          <BookingDetailContainer>預約時段 : {convertTime(time)}</BookingDetailContainer>
          <BookingDetailContainer style={{ marginBottom: '10px', color: 'gray' }}>已填寫評論</BookingDetailContainer>
        </BookingContainer>
      );
    }
  }

  else if (identity === 'therapist') {
    getName(client)
    if (status === 'ACTIVE') {
      return (
        <BookingContainer>
          <BookingDetailContainer>晤談者 : {name}</BookingDetailContainer>
          <BookingDetailContainer>預約時段 : {convertTime(time)}</BookingDetailContainer>
          <BookingDetailContainer style={{ marginBottom: '10px' }}>晤談室連結 : {meeting_code}</BookingDetailContainer>
        </BookingContainer>
      );
    }

    else if (status === 'UNCOMMENTED') {
      return (
        <BookingContainer>
          <BookingDetailContainer>晤談者 : {name}</BookingDetailContainer>
          <BookingDetailContainer>預約時段 : {convertTime(time)}</BookingDetailContainer>
          <BookingDetailContainer style={{ marginBottom: '10px', color: 'gray' }}>晤談評價 : 未填寫評論</BookingDetailContainer>
        </BookingContainer>
      );
    }

    else if (status === 'COMMENTED') {
      return (
        <BookingContainer>
          <BookingDetailContainer>晤談者 : {name}</BookingDetailContainer>
          <BookingDetailContainer>預約時段 : {convertTime(time)}</BookingDetailContainer>
          <BookingDetailContainer style={{ marginBottom: '10px' }}>晤談評價 : {comment}</BookingDetailContainer>
        </BookingContainer>
      );
    }
  }

};

export default Booking;