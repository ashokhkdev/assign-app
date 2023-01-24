import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCTMZ8o5zx6QFU3tVDmYmPmsiDkB0-N5os",
  authDomain: "assignment-e4021.firebaseapp.com",
  databaseURL: "https://assignment-e4021-default-rtdb.firebaseio.com",
  projectId: "assignment-e4021",
  storageBucket: "assignment-e4021.appspot.com",
  messagingSenderId: "465740863598",
  appId: "1:465740863598:web:7e30acdbef0aa08b362e7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export default app;