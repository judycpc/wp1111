import React from 'react';
import { Divider, Carousel, Card, Avatar } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import './carousel.css';

const { Meta } = Card;


const TherapistCarousel = () => {
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
                    new Array(16).fill(null).map((_, index) => (
                        <div key={index}><Card hoverable >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar size={128} src="https://img1.wsimg.com/isteam/ip/bc2e5cab-6169-4181-9e51-89df4fb88348/黃珮雯%20臨床心理師.jpg/:/cr=t:11.07%25,l:0%25,w:100%25,h:77.85%25/rs=w:365,h:365,cg:true" style={{ margin: '16px 0' }} />
                                <Meta description={<p style={{ color: 'black' }}>No.{index + 1} 治療師</p>} />
                            </div>
                        </Card></div>
                    ))
                }
            </Carousel>
        </>
    );
}

export default TherapistCarousel;