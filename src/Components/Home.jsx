import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [userData, setUserData] = useState([]);
  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "UserProfile"));
      const userDataArray = [];
      querySnapshot.forEach((doc) => {
        userDataArray.push({ id: doc.id, ...doc.data() });
      });
      setUserData(userDataArray);
    } catch (error) {
      console.error("Error getting data: ", error);
    }
  };

  const auth = getAuth();
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
    <div>
      <button onClick={signout}>Sign out</button>
      <h3>My Devices</h3>
      <table style={{ borderCollapse: 'collapse', padding:'32px'}}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>
            <th>ID</th>
            <th>Brand</th>
            <th>Phone Model</th>
            <th>Processor</th>
            <th>Serial Number</th>
            <th>IMEI 1</th>
            <th>IMEI 2</th>
            <th>Username</th>
            <th>Email Address</th>
            <th>Full Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f2f2f2', borderBottom: '1px solid #ddd' }}>
              <td>{user.id}</td>
              <td>{user.Brand}</td>
              <td>{user.PhoneModel}</td>
              <td>{user.Processor}</td>
              <td>{user.SerialNumber}</td>
              <td>{user.imei1}</td>
              <td>{user.imei2}</td>
              <td>{user.username}</td>
              <td>{user.emailaddress}</td>
              <td>{user.fullname}</td>
              <td>{user.phonenumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  
};

export default Home;
