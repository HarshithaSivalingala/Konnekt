import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
// import { getDatabase } from 'https://www.gstatic.com/firebasejs/7.19.0/firebase-database.js';

const firebaseConfig = {

  apiKey: "AIzaSyCJa44VefR-CCrNdaFBy8Jkx_2eW66AZUs",

  authDomain: "konnect-eb4d8.firebaseapp.com",

  databaseURL: "https://konnect-eb4d8-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "konnect-eb4d8",

  storageBucket: "konnect-eb4d8.appspot.com",

  messagingSenderId: "514347469885",

  appId: "1:514347469885:web:f0bb116487d4d86f7eee54",

  measurementId: "G-P3W88GFH71"

};


firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default firebase;
