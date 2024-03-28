import React, { useState } from 'react';
import { auth } from '../firebaseconfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import Signup from './Signup';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            }).catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className='signin'>
            <form onSubmit={login}>
                <input
                    type="email"
                    placeholder="Enter Email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); }}
                />
                <button>Login</button>
                <p>{error ? <><p>{error}</p><br /> <Signup /> </> : null}</p>
            </form>
        </div>
    );
};

export default Login;
