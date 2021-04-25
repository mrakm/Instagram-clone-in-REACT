//import { seedDatabase } from '../seed';
import firebasee from 'firebase';

const firebaseConfig = {
      apiKey: "AIzaSyC1MIR55EmC-37J7oDhQ3xNWct24HYzlNo",
      authDomain: "instagram-clone-9b6ce.firebaseapp.com",
      projectId: "instagram-clone-9b6ce",
      storageBucket: "instagram-clone-9b6ce.appspot.com",
      messagingSenderId: "590328505704",
      appId: "1:590328505704:web:a2d6af91107b56901422dd"
    };
    // Initialize Firebase
    //firebase.initializeApp(firebaseConfig);

    const firebase = window.firebasee.initializeApp(firebaseConfig);

    const { fieldValue } = window.firebasee.firestore;

    //seedDatabase(firebase);

    export { firebase, fieldValue };