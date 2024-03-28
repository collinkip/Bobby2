import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWGxY1fxjmlg8lCFLB6P7Po7UttwS0lS4",
  authDomain: "zebra-b9923.firebaseapp.com",
  projectId: "zebra-b9923",
  storageBucket: "zebra-b9923.appspot.com",
  messagingSenderId: "1037685049925",
  appId: "1:1037685049925:web:e718f83557a5ce204d312c",
  measurementId: "G-XTHD5DM3HD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);