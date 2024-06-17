import React, { Component, useState } from "react";
import { auth } from "../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Home from "./Home";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, Setpassword] = useState("");
  const [error, SetError] = useState("");

  const signup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        SetError(error.message);
      });
  };

  return (
    <div className="signin">
      <div className="headerpart">
        <h1>Signup </h1>
        <p>Welcome to our site. Please enter your details</p>
      </div>
      <form onSubmit={signup}>
        <input
          type="email"
          placeholder="Enter Email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          style={{ width: "350px", marginBottom: "10px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => {
            Setpassword(e.target.value);
          }}
          style={{ width: "350px", marginBottom: "10px" }}
        />
        <br />
        <button type="submit" style={{ width: "350px", marginBottom: "10px" }}>
          Sign up
        </button>
        <h4>{error ? <p style={{color:'red'}}>{error}</p> : null}</h4>

        <div>
          {user ? (
            <>
              <h1>Welcome {user.email}</h1> <br />
            </>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Signup;
