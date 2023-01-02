import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Carousel, Card, Avatar } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getTherapists } from '../api';
import './carousel.css';

const { Meta } = Card;


const TherapistCarousel = ({ disorder }) => {
  const [therapists, setTherapists] = useState([]);

  const navigate = useNavigate();
  const toTherapist = (username) => navigate('/therapists/' + username);

  useEffect(() => {
    const initTherapists = async () => {
      let response = await getTherapists(disorder);
      setTherapists(response);
    };

    initTherapists();
  }, []);

  return (
    <>
      <Divider style={{ fontSize: 18 }}>治療師</Divider>
      <Carousel
        slidesToShow={4}
        dots={false}
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
      >
        {
          therapists.map(({ username, name, avatar }) => {
            return (
              <div key={username}><Card hoverable onClick={() => toTherapist(username)}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar size={128} src={avatar} style={{ margin: '16px 0' }} />
                  <Meta description={<p style={{ color: 'black' }}>{name} 治療師</p>} />
                </div>
              </Card></div>
            )
          })
        }
      </Carousel>
    </>
  );
}

export default TherapistCarousel;