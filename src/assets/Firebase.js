import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/firestore";
const firebaseConfig = {
   apiKey: "AIzaSyDq25U8tbqza08m_av7Lx5mHgvAblOvflQ",
   authDomain: "school-2db06.firebaseapp.com",
   projectId: "school-2db06",
   storageBucket: "school-2db06.appspot.com",
   messagingSenderId: "420405684490",
   appId: "1:420405684490:web:3a6a29adfc8d12700db2f3",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const dataRef = firebase.database();
export default firebase;
