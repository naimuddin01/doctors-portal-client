import React from 'react';
import doctor from '../../assets/images/doctor.png'
import appointment from '../../assets/images/appointment.png'
import PrimaryButton from '../Shared/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section style={{
            background: `url(${appointment})`
        }} 
        className='flex justify-center items-center'>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-120px]' src={doctor} alt="" />
            </div>

            {/* x okkho borabor padding dite chile */}
            <div className='flex-1 px-5'>
                <h3 className="text-xl text-primary font-bold">Appointment</h3>
                <h2 className="text-3xl text-white py-5">Make an Appointment Today</h2>
                <p className="text-white pb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem excepturi hic quos, fuga delectus voluptas tempora architecto provident. Repudiandae repellendus eius earum repellat blanditiis? Repudiandae libero recusandae, sit natus pariatur ducimus delectus ea possimus nihil vero ipsam quis sequi obcaecati.</p>
                <PrimaryButton>Get Started</PrimaryButton>
            </div>
            
        </section>
    );
};

export default MakeAppointment;