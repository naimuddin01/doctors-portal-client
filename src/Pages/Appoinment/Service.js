import React from 'react';

const Service = ({ service, setTreatement }) => {
    const {name, slots} = service;
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-xl text-bold text-secondary">{name}</h2>
                <p>
                    {
                        slots.length > 0
                        ? <span>{slots[0]}</span> 
                        : <span className='text-red-500'>Try another day</span>
                    }
                </p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space' }available</p>
                <div className="card-actions justify-center">
                    <label 
                        // (for / htmlFor eki ="booking-modal") dara bojasse kon modal ta open korbe ==> same name diye bookingModal.js e id diye rackce
                        htmlFor="booking-modal"
                        disabled={slots.length === 0}
                        onClick={() => setTreatement (service)}
                        className="btn btn-sm btn-secondary text-white uppercase bg-gradient-to-r from-secondary to-primary"
                        >Book Appointment
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Service;