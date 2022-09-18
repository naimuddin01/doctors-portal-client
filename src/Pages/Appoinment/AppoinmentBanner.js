import chair from '../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

const AppoinmentBanner = ({date, setDate}) => {
    
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="max-w-sm rounded-lg shadow-2xl" alt="Dentist Chair" />
                <div className='m-7'>
                    <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    />
                    
                    <p className="text-center text-primary">You have Selected: {format(date, 'PP')}</p>

                </div>
            </div>
        </div>
    );
};

export default AppoinmentBanner;