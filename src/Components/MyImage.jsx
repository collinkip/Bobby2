import React, { useEffect, useState } from "react";
import nobg from "../Assets/nobg.png";
import { db } from "../firebaseconfig";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import Home from "./Home";

const MyImage = () => {
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [userData, setUserData] = useState(['']);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

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
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledUp((prevScrollState) => {
        // If the page is scrolled up, hide the signout button
        return window.scrollY < prevScrollState ? true : false;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (userId) {
      const unsubscribe = onSnapshot(collection(db, "UserProfile"), (snapshot) => {
        const userDataArray = [];
        snapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };
          if (data.id === userId) {
            userDataArray.push(data);
          }
        });
        setUserData(userDataArray);
        setLoading(false);
      });

      return () => unsubscribe(); 
    }
  }, [userId]);

  return (
    <div
      className="Dashboard"
      style={{
        backgroundColor: "honeydew",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
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

      <div className="DetailsTab" style={{ flex: 1, overflowY: "auto" }}>
        {loading ? (
          <p>Loading...</p>
        ) : 
        
        <Home/>
        }
      </div>
      {!isScrolledUp && (
          <button
            onClick={signout}
            style={{ position: "absolute", top: 20, right: 20 }}
          >
            Logout
          </button>
        )}
    </div>
  );
};

export default MyImage;
