import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Info from '../Home/Info';

const MyAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    console.log(user)

    const navigate = useNavigate();


    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/booking?patient=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },

            })
                .then(res => {
                    //res er vitore status er ekta maan thake
                    console.log('res', res);

                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        navigate('/');
                    }

                    return res.json()
                })
                .then(data => {
                    // console.log('bookings', data);
                    setAppointments(data)
                })

        }
    }, [user])
    return (
        <div>
            <h2>My Appointments : {appointments.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((a, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{a.patientName}</td>
                                    <td>{a.date}</td>
                                    <td>{a.slot}</td>
                                    <td>{a.treatment}</td>
                                </tr>
                            )
                        }
                        {/* <!-- row 1 --> */}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;