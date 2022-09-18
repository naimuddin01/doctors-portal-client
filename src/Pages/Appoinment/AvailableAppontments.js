import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from './BookingModal';
import Service from './Service';

const AvailableAppontments = ({date}) => {
    const [services, setServices] = useState([])
    const [treatment, setTreatement] = useState(null)

    const formattedDate = format(date, 'PP');

    useEffect(() => {
        fetch(`http://localhost:5000/available?date=${formattedDate}`)
        .then(res => res.json())
        .then(data => setServices(data))
    },[formattedDate])

    return (
        <div>
            <h4 className="text-center text-xl text-secondary my-12 ">Available Appointment on {format(date, 'PP')}</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services.map(service => <Service
                        key={service._id}
                        service={service}
                        setTreatement={setTreatement}
                    ></Service>)
                }
            </div>
            {/* treatment jothy thake tahole (&&) dara bojasse */}
            {treatment && <BookingModal 
                treatment={treatment} 
                date={date}
                setTreatement={setTreatement}
                ></BookingModal>}
        </div>
    );
};

export default AvailableAppontments;