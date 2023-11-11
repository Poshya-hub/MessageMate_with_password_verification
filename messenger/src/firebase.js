import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAIlLrQPVk9VnGfMzAwO8w04CEw6KTNJUM",
  authDomain: "fb-messenger-2d554.firebaseapp.com",
  projectId: "fb-messenger-2d554",
  storageBucket: "fb-messenger-2d554.appspot.com",
  messagingSenderId: "1027725561727",
  appId: "1:1027725561727:web:6e2865e1b9afcc37bf544a",
});
const db = firebaseApp.firestore();

export default db;
