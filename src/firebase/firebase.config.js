// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCagTUSoDdcwrBGDGdlT0JNdWAczJvpf2g",
  authDomain: "name-email-pass-auth-d81bb.firebaseapp.com",
  projectId: "name-email-pass-auth-d81bb",
  storageBucket: "name-email-pass-auth-d81bb.appspot.com",
  messagingSenderId: "662190837934",
  appId: "1:662190837934:web:2dc494d5fb5d3921d75d3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth