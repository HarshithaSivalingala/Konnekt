import { firebase } from '@firebase/app';
import '@firebase/firestore'

import '@firebase/auth';





const firebaseConfig = {
    apiKey: "AIzaSyD3NPjPvyjNQsFRnQeGm3JxRH-J4_ds21Y",
    authDomain: "slackclone-94ed8.firebaseapp.com",
    projectId: "slackclone-94ed8",
    storageBucket: "slackclone-94ed8.appspot.com",
    messagingSenderId: "172102310378",
    appId: "1:172102310378:web:050a14d5a9cce84f81fa93",
    measurementId: "G-Y7J8HPKJWE"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  var provider = new firebase.auth.GoogleAuthProvider();
  const auth = firebase.auth();
 export {firebase, auth,provider,db};
