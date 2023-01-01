import React from 'react';
import TherapistCarousel from './TherapistCarousel';
import Videos from './Videos';



const TabContent = ({ disorder }) => {
    return (
        <>
            <br />
            <TherapistCarousel disorder={disorder} />
            <br />
            <Videos />
        </>
    );
}

export default TabContent;