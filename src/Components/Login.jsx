import React, { useState } from "react";
import { auth } from "../firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div
      className="signin"
    >
      <div className="headerpart">
        <h1>Login</h1>
        <p>Welcome back Please enter your details</p>
      </div>
      <form
            onSubmit={login}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "340px",
              borderRadius: "16px 0px 0px 16px",
              border: "3px",
            }}
          >
            
              <input
                type="email"
                placeholder="Enter Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "350px", marginBottom: "10px" }}
              />
        
          
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "350px", marginBottom: "10px" }}
              />
        
            
              <button style={{ width: "350px", marginBottom: "10px" }}>
                Login
              </button>

    
          
          </form>
    

            {error ? <p style={{color:'red'}}>{error}</p> :<></> }
    </div>
  );
};

export default Login;
