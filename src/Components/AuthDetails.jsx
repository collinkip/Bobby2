import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseconfig';
import Login from './Login';
import Home from './Home';

const AuthDetails = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            {loading ? <h1>Loading...</h1> : user ? <><h1>Welcome {user.email}</h1> <br/> 
            <Home/></> : <><h1>Please Login</h1> <br /><Login/></>}
        </div>
    );
}

export default AuthDetails;
