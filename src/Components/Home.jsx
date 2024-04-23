import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseconfig";
import { collection, doc,deleteDoc, updateDoc,onSnapshot } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import loadingit from "../Assets/loadinggiffy.gif";
import Swal from "sweetalert2";


const Home = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Number, setNumber] = useState(1);
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const [stolenCards, setStolenCards] = useState([]);

  
  const markStolen = async (id) => {
    try {
      setLoading(true);
      const docRef = doc(db, "Devices", id);
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

  
  const handleMarkStolenClick = (id) => {
    Swal.fire({
      title: "Mark as Stolen",
      text: "Are you sure you want to mark this device as stolen?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it as stolen!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        markStolen(id);
      }
    });
  };

  useEffect(() => {
    if (userId) {
      const unsubscribe = onSnapshot(collection(db, "Devices"), (snapshot) => {
        const userDataArray = [];
        let newNumber = Number;
        snapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };
          if (data.userId === userId) {
            userDataArray.push(data);
            console.log(data);
            console.log(Number);
            newNumber = newNumber + 1; // Corrected assignment
          }
        });
        setUserData(userDataArray);
        setNumber(newNumber);
        setLoading(false);
      });
  
      return () => unsubscribe(); 
    }
  }, [userId]);

  const handleDeleteClick = (id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "Devices", id));
          Swal.fire("Deleted!", "Your device has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting device: ", error);
          Swal.fire("Error!", "An error occurred while deleting your device.", "error");
        }
      }
    });

  }

  return (
    <div style={{ textAlign: "center" }}>
    
      {/* <img src={`https://api.multiavatar.com/${userId}.svg`} alt="" /> */}
      <h3>My Devices</h3>

      {loading ? (
        <div>
          <img src={loadingit} alt=""/>
        </div>
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
                <p>Serial No: {user.SerialNumber}</p>
                <p>Processor: {user.Processor}</p>
                <p>Phones Model Number: {user.PhoneModel}</p>
                <p>{user.isStolen ? <h2>Stolen</h2> : <h2>Not Stolen</h2>}</p>
                <div>
                  {user.isStolen ? (
                    <></>
                  ) : (
                    <button
                    onClick={() => handleMarkStolenClick(user.id)}
                      type="button"
                      style={{ marginRight: "10px" }}
                    >
                      Stolen
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={()=> handleDeleteClick(user.id)}
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
