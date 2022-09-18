import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [token] = useToken(user || gUser);


    let signInError;

    const navigate = useNavigate();
    const location = useLocation();
    //from e hosse= private routh e jokhon aste tokhon private routh er jothy kno children thake sei path ta payor jonno jothy children na thake tahole "/" e chole jabe
    let from = location.state?.from?.pathname || "/";

    //spinner ta always dekhar jonno, spiner er kaj korar somoy
    // if(true || loading || gLoading) {
    //     return <Loading/>
    // }


    //eki kaj
    //user er navigate

    //with out token
    // useEffect(() => {
    //     // if (user || gUser) {
    //     //     console.log(gUser || user);
    //     //     navigate(from, {replace: true});
    
    //     // }

    // },[user, gUser, from, navigate]); //upore ja ja use korce sob kisu e dependency er vitore diye disce karon useEffect ta chalanor jonno sob gulo e lagbe

    //with token
    useEffect(() => {
        if (token) {
            console.log(gUser || user);
            navigate(from, {replace: true});
    
        }

    },[token, from, navigate]);

    //eki kaj
    
    
    if(loading || gLoading) {
        return <Loading/>
    }

    if(error || gError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>
    }

    //eta korle crome console ekta error ase, eta korle o hobe......error asbe na seita upore kora useEffect er modde
    // if (user || gUser) {
    //     console.log(gUser || user);
    //     navigate(from, {replace: true});

    // }

    const onSubmit = (data) => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password)
    }
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">What is Email ?</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'error message' // JS only: <p>error message</p> TS only support string
                                    }
                                })
                                }
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                
                            </label>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="passwor"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "password is required"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer' // JS only: <p>error message</p> TS only support string
                                    }
                                })
                                }
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                
                            </label>
                        </div>
                        {signInError}
                        <input className='btn w-full max-w-xs text-white' type="submit" value="Login" />
                    </form> 

                    <p><small>New to Doctors Portal <Link to="/signUp" className='text-primary'>Create New Account</Link></small></p>

                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline">
                        Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;