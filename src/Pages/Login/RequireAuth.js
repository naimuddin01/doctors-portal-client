import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const RequireAuth = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    //Loading korar karon = jokhon user login thakbe tokhon jothy private route ta reload kori kothon firebase e check korte pathabe user ase kina , jothy loading na ditam check kore asar age e abar login page(private route) e chole jeto
    if(loading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate to="/login" state={{from: location}} replace></Navigate>
    }
    return children;
};

export default RequireAuth;