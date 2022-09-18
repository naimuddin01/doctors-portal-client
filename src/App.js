import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Pages/About/About';
import Appoinment from './Pages/Appoinment/Appoinment';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import RequireAuth from './Pages/Login/RequireAuth';
import SignUp from './Pages/Login/SignUp';
import Navbar from './Pages/Shared/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyAppointments from './Pages/Dashboard/MyAppointments';
import MyReview from './Pages/Dashboard/MyReview';
import History from './Pages/Dashboard/History';
import Users from './Pages/Dashboard/Users';
import RequireAdmin from './Pages/Login/RequireAdmin';


function App() {
  return (
    <div className='max-w-7xl mx-auto px-12'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='appointment' element={
          <RequireAuth>
            <Appoinment />
          </RequireAuth>
        }></Route>

        {/* Dashboard holo ekta page er vitore akadik page rakha */}
        <Route path='dashboard' element={<RequireAuth> <Dashboard/> </RequireAuth>}>
          {/* index ta holo default vabe je page ta thakbe */}
          <Route index element={<MyAppointments/>}></Route>
          <Route path='review' element={<MyReview/>}></Route>
          <Route path='history' element={<History/>}></Route>
          <Route path='users' element={<RequireAdmin><Users/></RequireAdmin>}></Route>
        </Route>

        <Route path='about' element={<About></About>}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='signUp' element={<SignUp />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
