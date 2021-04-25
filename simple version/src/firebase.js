import firebase from "firebase";
//my mrakm
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCmbkr6K53ykZ2ZMol4dn3FEjs72GhToLU",
  authDomain: "react-instagram-clone-c0621.firebaseapp.com",
  databaseURL:
    "https://react-instagram-clone-c0621-default-rtdb.firebaseio.com",
  projectId: "react-instagram-clone-c0621",
  storageBucket: "react-instagram-clone-c0621.appspot.com",
  messagingSenderId: "367955288300",
  appId: "1:367955288300:web:068870e3b15f1ade38c5c9",
  measurementId: "G-E8JVZ9YRJ6",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
