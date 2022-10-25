// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABzU7gR5LyHY0S5M4DKVbNluTDSths5Gg",
  authDomain: "clip-sharing-749b3.firebaseapp.com",
  projectId: "clip-sharing-749b3",
  storageBucket: "clip-sharing-749b3.appspot.com",
  messagingSenderId: "886606883782",
  appId: "1:886606883782:web:11263925e9387dbe95e0c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db, app };
