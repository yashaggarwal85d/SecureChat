import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAgd8cyRT9FhodVAcKh6v1qan9gZGExxyY",
    authDomain: "blockchain-1-0.firebaseapp.com",
    databaseURL: "https://blockchain-1-0.firebaseio.com",
    projectId: "blockchain-1-0",
    storageBucket: "blockchain-1-0.appspot.com",
    messagingSenderId: "209541067505",
    appId: "1:209541067505:web:38dc88fa8276d2d2fe2f50",
    measurementId: "G-Z61XZ5FGML"
  };

let Firebase = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export default Firebase;