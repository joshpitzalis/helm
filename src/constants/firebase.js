import firebase from "firebase";

// global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyD0_c1V4vvrHVwVD941n_KLnbj55f0c5gI",
  authDomain: "decision-dev.firebaseapp.com",
  databaseURL: "https://decision-dev.firebaseio.com",
  projectId: "decision-dev",
  storageBucket: "decision-dev.appspot.com",
  messagingSenderId: "1006893299756",
  appId: "1:1006893299756:web:0581850d4e51ba77"
};

firebase.initializeApp(config);

// firebase
//   .firestore()
//   .enablePersistence()
//   .then(() => {
//     // Initialize Cloud Firestore through firebase
//     const db = firebase.firestore();
//   })
//   .catch((err) => {
//     if (err.code === 'failed-precondition') {
//       // Multiple tabs open, persistence can only be enabled
//       // in one tab at a a time.
//       // ...
//     } else if (err.code === 'unimplemented') {
//       // The current browser does not support all of the
//       // features required to enable persistence
//       // ...
//     }
//   });

export const db = firebase.firestore();
export const database = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const messaging = firebase.messaging();
export const facebookAuthProvider = new firebase.auth.GoogleAuthProvider();
// facebookAuthProvider.addScope("user_friends");
