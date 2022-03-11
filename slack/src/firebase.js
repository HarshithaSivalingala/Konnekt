import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD3NPjPvyjNQsFRnQeGm3JxRH-J4_ds21Y",
    authDomain: "slackclone-94ed8.firebaseapp.com",
    projectId: "slackclone-94ed8",
    storageBucket: "slackclone-94ed8.appspot.com",
    messagingSenderId: "172102310378",
    appId: "1:172102310378:web:050a14d5a9cce84f81fa93",
    measurementId: "G-Y7J8HPKJWE"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
