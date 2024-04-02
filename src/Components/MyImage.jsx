import React, { useEffect, useReducer, useState } from "react";
import nobg from "../Assets/nobg.png";
import { auth,db } from "../firebaseconfig";

const MyImage = () => {
  const signout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const [userEmail, setUserEmail] = useState("");
  const [username,setUsername]=useState(" ");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });
    return () => unsubscribe();
  }, []);

 
  return (
    <div
      className="Dashboard"
      style={{
        backgroundColor: "honeydew",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        className="Drawer"
        style={{
          width: "[20%]",
          display: "flex",
          flexDirection: "column",
          border: "5px solid #eae9f5",
        }}
      >
        <div
          className="Logo"
          style={{
            display: "flex",
            flexDirection: "row",
            paddingRight: "50px",
          }}
        >
          <img src={nobg} alt="" style={{ width: "50px", height: "50px" }} />
          <h2>Gerrit</h2>
        </div>
      </div>
      <div className="DetailsTab">
        <div className="Details">
          <h2>Details :John Doe</h2>
          <p>Username: {username}</p>
          <p>Email:{userEmail} </p>
        </div>
      </div>
      <button
        onClick={signout}
        style={{ position: "absolute", top: 20, right: 20 }}
      >
        Logout
      </button>
    </div>
  );
};

export default MyImage;
