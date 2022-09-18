import React, { useState } from 'react';
import Footer from '../Shared/Footer';
import AppoinmentBanner from './AppoinmentBanner';
import AvailableAppontments from './AvailableAppontments';

const Appoinment = () => {
    //datepicker er modde onclick er system thake (onSelect) tai r onclick er maddome date ta jana lagtese na
    const [date, setDate] = useState(new Date())
    return (
        <div>
            <AppoinmentBanner date={date} setDate={setDate}></AppoinmentBanner>
            <AvailableAppontments date={date}></AvailableAppontments>
            <Footer></Footer>
        </div>
    );
};

export default Appoinment;