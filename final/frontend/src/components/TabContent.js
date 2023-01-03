import React from 'react';
import TherapistCarousel from './TherapistCarousel';
import Videos from './Videos';

const TabContent = ({ disorder, videos }) => {
    return (
        <>
            <br />
            <TherapistCarousel disorder={disorder} />
            <br />
            <Videos videos={videos} />
        </>
    );
}

export default TabContent;