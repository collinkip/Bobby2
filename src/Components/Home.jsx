import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseconfig";
import { collection, doc,deleteDoc, updateDoc,onSnapshot } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import loadingit from "../Assets/loadinggiffy.gif";
import Swal from "sweetalert2";
import {getDoc } from "firebase/firestore";
import { getFirestore, query, where, getDocs } from "firebase/firestore";



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
      const deviceSnapshot = await getDoc(docRef);
      const currentIsStolen = deviceSnapshot.data().isStolen;
      await updateDoc(docRef, {
        isStolen: !currentIsStolen,
      });
      setStolenCards((prevStolenCards) => {
        if (currentIsStolen) {
          return prevStolenCards.filter((cardId) => cardId !== id);
        } else {
          return [...prevStolenCards, id];
        }
      });
      console.log(
        `Device marked as ${
          currentIsStolen ? "Found" : "Lost"
        } successfully`
      );
  
      // Change button text if it exists
      const stolenButton = document.querySelector(".stolen");
      if (stolenButton) {
        stolenButton.textContent = currentIsStolen ? "Lost" : "Found";
      }
    } catch (error) {
      console.error("Error marking device as Lost/Found: ", error);
    } finally {
      setLoading(false);
    }
  };
  

  
  const handleMarkStolenClick = (id) => {
    Swal.fire({
      title: userData.find(user => user.id === id)?.isStolen ? "Mark as Found" : "Mark as Lost",
      text: userData.find(user => user.id === id)?.isStolen ? "Are you sure you want to mark this device as Found?" : "Are you sure you want to mark this device as Lost?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: userData.find(user => user.id === id)?.isStolen ? "Yes, mark it as Found!" : "Yes, mark it as Lost!",
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
            // console.log(data);
            // console.log(Number);
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

  const transferDevice = async (id, email) => {
    try {
        setLoading(true);
        
        // Query Firestore to get all documents in the Userprofile collection
        const usersRef = collection(db, 'Userprofile');
        const querySnapshot = await getDocs(usersRef);

        // Loop through the documents in the query snapshot
        querySnapshot.forEach(doc => {
            const userData = doc.data();
            const emailAddress = userData.emailaddress;
            console.log(`Document ID: ${doc.id}, Email Address: ${emailAddress}`);
        });

        setLoading(false);
    } catch (error) {
        console.error("Error transferring device: ", error);
        setLoading(false);
    }
};

  const handleTransferClick = (id) => {
    Swal.fire({
      title: "Transfer Device",
      html: '<input id="email" class="swal2-input" placeholder="Enter email">',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Transfer",
      preConfirm: () => {
        const email = document.getElementById('email').value;
        if (!email) {
          Swal.showValidationMessage('Email is required');
        }
        return email;
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const email = result.value;
        transferDevice(id, email);
        console.log(id);
        console.log(email)
      }
    });
  };
  const handleDeleteClick = async (id) => {
    // Prompt the user to confirm deletion
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
          // Get the email of the user who is requesting the deletion
          const auth = getAuth();
          const email = auth.currentUser ? auth.currentUser.email : null;
  
          if (!email) {
            throw new Error("User not authenticated or email not found.");
          }
  
          // Get the UUID associated with this email from the UserProfile collection
          const userProfileDoc = doc(db, "UserProfile", email);
          const userProfileSnapshot = await getDoc(userProfileDoc);
  
          if (!userProfileSnapshot.exists()) {
            throw new Error("User profile not found for the provided email.");
          }
  
          const newUserId = userProfileSnapshot.data().uuid;
  
          // Update the userId value in the Devices collection for the specified device ID with the new UUID
          const deviceDoc = doc(db, "Devices", id);
          await updateDoc(deviceDoc, { userId: newUserId });
  
          // Notify the user about successful deletion
          Swal.fire("Deleted!", "Your device has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting device: ", error);
          Swal.fire("Error!", "An error occurred while deleting your device.", "error");
        }
      }
    });
  };
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
          <>
          {userData.map((user) => (
            <article className="card" key={user.id}>
              <div>
                <h2>Brand: {user.Brand}</h2>
                <p>Phones Model Number: {user.PhoneModel}</p>
                <p>Processor: {user.Processor}</p>
                <p>Sim 1 Imei: {user.imei1}</p>
                <p>Sim 2 Imei: {user.imei2}</p>
                <p>Serial No: {user.SerialNumber}</p>
                
                <p>{user.isStolen ? <h2>Device Lost</h2> : <h2></h2>}</p>
                <div>
                 
                    <button
                    onClick={() => handleMarkStolenClick(user.id)}
                      type="button"
                      className="stolen"
                      style={{ marginRight: "10px" }}
                    >
                      Lost
                    </button>
                    <button
        type="button"
        onClick={() => handleTransferClick(user.id)} // Added onClick handler for transfer button
        style={{ marginRight: "10px" }} // Added style for spacing
      >
        Transfer
      </button>
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
          </>
          
        </div>
      )}
    </div>
  );
};

export default Home;
