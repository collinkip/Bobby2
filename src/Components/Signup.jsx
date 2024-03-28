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
      <form onSubmit={signup}>
        <h1>Signup</h1>
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
          onChange={(e) => {
            Setpassword(e.target.value);
          }}
        />

        <button type="submit">Sign up</button>
        <h4>{error ? <p>{error}</p> : null}</h4>

        <div>
           {user ? (
            <>
              <h1>Welcome {user.email}</h1> <br />
            </>
          ) 
          : null}
        </div>
      </form>
    </div>
  );
};

export default Signup;
