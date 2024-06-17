import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig"; // Import your Firestore instance

const Transfer = () => {
    const [userData, setUserData] = useState([]); // State to store user data
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Query Firestore to get all documents in the Userprofile collection
                const usersRef = collection(db, 'Userprofile');
                const querySnapshot = await getDocs(usersRef);
                
                // Extract user data from query snapshot and update state
                const userDataArray = [];
                querySnapshot.forEach(doc => {
                    userDataArray.push(doc.data());
                });
                setUserData(userDataArray);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData(); // Call the function to fetch user data
    }, []); // Empty dependency array to ensure the effect runs only once on component mount
    
    return (
        <div>
            <h1>User Profiles</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        {/* Add more table headings as needed */}
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td> {/* Assuming 'name' is a field in your user profile */}
                            <td>{user.email}</td> {/* Assuming 'email' is a field in your user profile */}
                            {/* Add more table cells for other user data fields */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transfer;
