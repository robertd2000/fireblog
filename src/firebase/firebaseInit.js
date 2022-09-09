// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT03H1wGA-el17fjXxOynOg7jrgETpFHM",
  authDomain: "fir-blogs-154ae.firebaseapp.com",
  projectId: "fir-blogs-154ae",
  storageBucket: "fir-blogs-154ae.appspot.com",
  messagingSenderId: "605345732532",
  appId: "1:605345732532:web:2d1dd14ca89929884e84e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(app);
const auth = getAuth(app);
const timestamp = serverTimestamp;

export { projectFirestore, auth, timestamp };
