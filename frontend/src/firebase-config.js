
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAMmF_FohqS60yLIVs3KNWAFTnH7EWAhMI",
    authDomain: "studysync-9ba73.firebaseapp.com",
    databaseURL: "https://studysync-9ba73-default-rtdb.firebaseio.com",
    projectId: "studysync-9ba73",
    storageBucket: "studysync-9ba73.firebasestorage.app",
    messagingSenderId: "390754530788",
    appId: "1:390754530788:web:103c93e185db0f1cad03f1",
    measurementId: "G-DEV9KS8CDG"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };