import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';

const BookingModal = ({ treatment, setTreatement, date }) => {
    const { _id, name, slots } = treatment;
    const [user, loading, error] = useAuthState(auth);


    //date ta ke ekta format e kore neyor jonno ( format(date, 'pp'); = April 29th 2022 ) ei vabe kora....r ei format ta nisce (date.fns) thake
    // const formattedDate = format(date, 'pp'); //soto hater (pp) dile je time e submit kora hobe sei somoy ta asbe
    const formattedDate = format(date, 'PP'); //boro hater (PP) dile mas tarik r year asbe

    const handleBooking = event => {

        event.preventDefault();
        const slot = event.target.slot.value;
        console.log(_id, name, slot);

        //Mongo  database e  data pathanor jonno = Object toyri
        const booking = {
            treatmentId: _id, //_id ta onno component thake astese == jekhan thake treatment ta astece
            treatment: name, //name ta onno component thake astese == jekhan thake treatment ta astece
            date: formattedDate, //const formattedDate = format(date, 'pp');
            // slot: slot
            //object er naam r value er object er naam eki tai ei vabe lekha
            slot, //const slot = event.target.slot.value;
            paitent: user.email, // firebase thake je user astese sei user er email
            patientName: user.displayName,// firebase thake je user astese sei user er name
            // phone: event.target.phone.value //phone number ta nicher from thake neyo hosse

        }
        //Mongo  database e data pathanor jonno = Object toyri

        //Object ta Mongote Pathanor jonno
        fetch('http://localhost:5000/booking',{
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => { 

            console.log(data);
            if(data.success){
                toast(`Appointment is set, ${formattedDate} at ${slot}}`)
            }
            else{
                toast.error(`Already have an Appointment, ${data.booking?.date} at ${data.booking?.slot}}`)
            }
            //setTeatment(null) hosse jate modal ta empty hoye chole jay
            setTreatement(null)

        })
        //Object ta Mongote Pathanor jonno

        
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-secondary">Booking for : {name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-col-1 gap-3 justify-items-center mt-2'>
                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" />
                        <select name='slot' className="select select-bordered w-full max-w-xs">
                            {
                                //index ta na dile o hoto, sudu error ta na asar jonno disce. index ta hosse database er data er vitor potita slot alada index e thake tai index ta key hisebe bebohar korte partece 
                                slots.map((slot, index) => <option 
                                    key={index}
                                    value={slot}
                                >{slot}</option>)
                            }
                        </select>
                        <input type="text" name='name' disabled value={user?.displayName || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="email" name='email' disabled value={user?.email || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="phone" placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
                        
                        <input type="submit" value="Submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </div >
    );
};

export default BookingModal;