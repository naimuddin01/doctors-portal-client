import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div class="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col ">
                {/* <!-- Page content here --> */}
                <h2 className='text-3xl font-bold text-purple-500'>Welcome to your DashBorad</h2>
                <Outlet></Outlet>
            </div>
            <div class="drawer-side">
                <label for="dashboard-sidebar" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to="/dashboard">My Appontment</Link></li>
                    <li><Link to="/dashboard/review">My Revied</Link></li>
                    <li><Link to="/dashboard/history">My History</Link></li>
                    {admin &&<li><Link to="/dashboard/users">All Users</Link></li>}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;