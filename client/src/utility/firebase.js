import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_URI,
  authDomain: "goodmorning-db.firebaseapp.com",
  projectId: "goodmorning-db",
  storageBucket: "goodmorning-db.appspot.com",
  messagingSenderId: "707757262724",
  appId: "1:707757262724:web:feb747e64ac7f9ca797fd1",
  measurementId: "G-P7PKSCV0HG",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
