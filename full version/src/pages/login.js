import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../context/firebase';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function Login(){
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = emailAddress === '' || password === '';

    const handleChange = async (e) => {
        e.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            history.push(ROUTES.DASHBOARD);
        }catch(err){
            setEmailAddress('');
            setPassword('');
            setError(err.message)
        }
    }

    useEffect(() => {
        document.title = 'Login - Instagram';
    }, [])
    
    return(
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src='./images/iphone-with-profile.jpg' alt="phone with IG profile" />
            </div>

            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border mb-4">
                    <h1 className="flex justify-center w-full">
                        <img src="./images/logo.png" alt="instagram" className="mt-2 w-6/12 mb-4" />
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-500">{error}</p>}

                    <form onSubmit={handleChange} method="POST">
                        <input 
                            aria-label="Enter your email address" 
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2" 
                            type="text"
                            value={emailAddress} 
                            placeholder="Email address"
                            onChange = {({ target }) => setEmailAddress(target.value)} 
                        />

                        <input 
                            aria-label="Enter your password" 
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2" 
                            type="password" 
                            value={password}
                            placeholder="Password" 
                            onChange = {({ target }) => setPassword(target.value)}
                        />

                        <button 
                            type="submit" 
                            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${isInvalid && 'cursor-not-allowed opacity-50'}`}
                            disabled={isInvalid}
                        >
                            Log in
                        </button>
                    </form>
                </div>
                
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
                    <p className="text-sm">
                        Don't have an account? {' '}
                        <Link to={ROUTES.SIGN_UP} className="font-bold">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}