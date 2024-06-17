import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
ip
import { db } from "../firebaseconfig"

const UserProfileList = () => {
  const [documentNames, setDocumentNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocumentNames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Userprofile"));
        const docNames = querySnapshot.docs.map((doc) => doc.id);
        setDocumentNames(docNames);
      } catch (error) {
        setError("Error fetching document names: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentNames();
  }, []);

  return (
    <div>
      <h3>User Profiles</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : documentNames.length > 0 ? (
        <ul>
          {documentNames.map((docName) => (
            <li key={docName}>{docName}</li>
          ))}
        </ul>
      ) : (
        <p>No documents found</p>
      )}
    </div>
  );
};

export default UserProfileList;
