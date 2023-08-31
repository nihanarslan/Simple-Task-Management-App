import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAzjYvdye9K3Wcu9cOL_-B8UPm9E7nez8w",
  authDomain: "simple-task-management-a-1a968.firebaseapp.com",
  projectId: "simple-task-management-a-1a968",
  storageBucket: "simple-task-management-a-1a968.appspot.com",
  messagingSenderId: "228695672002",
  appId: "1:228695672002:web:5e6bb9a0e34f54e637675b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

