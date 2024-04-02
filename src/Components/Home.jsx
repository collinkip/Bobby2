import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseconfig";
import { collection, doc, updateDoc,onSnapshot } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const [stolenCards, setStolenCards] = useState([]);

  const markStolen = async (id) => {
    try {
      setLoading(true);
      const docRef = doc(db, "UserProfile", id);
      await updateDoc(docRef, {
        isStolen: true,
      });
      setStolenCards([...stolenCards, id]);
      console.log("Device marked as stolen successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error marking device as stolen: ", error);
      setLoading(false);
    }
  };

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

  return (
    <div style={{ textAlign: "center" }}>
      <button style={{ margin: "20px auto" }} onClick={signout}>
        Sign out
      </button>
      {/* <img src={`https://api.multiavatar.com/${userId}.svg`} alt="" /> */}
      <h3>My Devices</h3>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {userData.map((user) => (
            <article className="card" key={user.id}>
              <div>
                <h2>Brand: {user.Brand}</h2>
                <p>Sim 1 Imei: {user.imei1}</p>
                <p>Sim 2 Imei: {user.imei2}</p>
                <p>Serial Number: 1234567890</p>
                <p>Processor: {user.Processor}</p>
                <p>Phones Model Number: {user.PhoneModel}</p>
                <p>{user.isStolen ? <h2>Stolen</h2> : <h2>Not Stolen</h2>}</p>
                <div>
                  {user.isStolen ? (
                    <></>
                  ) : (
                    <button
                      onClick={markStolen.bind(this, user.id)}
                      type="button"
                      style={{ marginRight: "10px" }}
                    >
                      Stolen
                    </button>
                  )}
                  <button
                    type="button"
                    className="delete"
                    style={{
                      background: "red",
                      boxShadow: "rgba(205, 70, 63, 0.5) 0 1px 30px",
                    }}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
