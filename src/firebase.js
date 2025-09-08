// Import the functions you need from the SDKs you need
import "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALNxS0KfxfNaKKFNmy0nVU-rlwdcLK_G4",
    authDomain: "react-disney-plus-app-5aee8.firebaseapp.com",
    projectId: "react-disney-plus-app-5aee8",
    storageBucket: "react-disney-plus-app-5aee8.firebasestorage.app",
    messagingSenderId: "192437954158",
    appId: "1:192437954158:web:05db1ade7d69229d87287f",
    measurementId: "G-BJGC0BDD5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;