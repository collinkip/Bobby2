import React, { useEffect, useState } from "react";
import { auth } from "../firebaseconfig";
import Login from "./Login";
import secureit from "../Assets/ecureit.jpg";
import Signup from "./Signup";
import MyImage from "./MyImage";
import loadingg from "../Assets/loadinggiffy.gif";

const AuthDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);

  const togleLogin = () => {
    if (login) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

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
    <>
      {loading ? (
        <img src={loadingg} alt="loading..." />
      ) : user ? (
        <>
          {/* <h1>Welcome {user.email}</h1> <br /> */}
          <MyImage/>
          {/* <Home /> */}
        </>
      ) : (
        <div className="container">
          <div className="leftside">
            <div className="textarea">
            
              <h1 className="heading">Transform Your Vision into Action</h1>
              <p className="subtext">
              
              </p>
              <p className="subtext">
              Unlock Your Potential and join the Community
              </p>
              <p className="subtext"> and Make it a safer Place.</p>
            </div>
            <img src={secureit} alt="" className="image" />
          </div>
          <div className="centered">
            <p>.</p>
          </div>
          <div className="rightside">
            <div className="right">
              <div className="topright">
                <h1>DeviceGuard </h1>
                <p>
                DeviceGuard  is a platform where you can share your ideas and get
                  it implemented by the community
                </p>
              </div>
              <div className="login-section">
                {login ? <Login /> : <Signup />}
              </div>
              <div className="bottomright" style={{width:'350px'}}>
                {login ? (
                  <p>
                    Don't have an account?{" "}
                    <span style={{cursor:'pointer',textDecoration:'underline'}} onClick={togleLogin}>Sign Up</span>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <span style={{cursor:'pointer',textDecoration:'underline'}} onClick={togleLogin}>Login</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthDetails;
