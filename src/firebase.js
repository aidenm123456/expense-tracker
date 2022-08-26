import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAK8oxcSw1YP3Kzcdqw8ll5OoMizyhiH7o",
  authDomain: "expense-tracker-5642e.firebaseapp.com",
  projectId: "expense-tracker-5642e",
  storageBucket: "expense-tracker-5642e.appspot.com",
  messagingSenderId: "109738485170",
  appId: "1:109738485170:web:1d3de5c1ba65f0d06130ab",
  databaseURL: "https://expense-tracker-5642e-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);