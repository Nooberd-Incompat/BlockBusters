// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQcOp7bA9RGWeuiP3Y2z8zQAwzA72DKFY",
  authDomain: "hackathon-web3ssh.firebaseapp.com",
  projectId: "hackathon-web3ssh",
  storageBucket: "hackathon-web3ssh.appspot.com",
  messagingSenderId: "911852491517",
  appId: "1:911852491517:web:6a44f8267515078214a494",
  measurementId: "G-XTYPE69VDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };