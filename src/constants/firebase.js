import firebase from 'firebase';

// global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
require('firebase/firestore');

const config = {
  apiKey: 'AIzaSyC8cNQvlurWl_10dixHAzDRhuefpCtiXWo',
  authDomain: 'peerplus-staging.firebaseapp.com',
  databaseURL: 'https://peerplus-staging.firebaseio.com',
  projectId: 'peerplus-staging',
  storageBucket: 'peerplus-staging.appspot.com',
  messagingSenderId: '972618418370',
};

firebase.initializeApp(config);

firebase
  .firestore()
  .enablePersistence()
  .then(() => {
    // Initialize Cloud Firestore through firebase
    const db = firebase.firestore();
  })
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });

export const db = firebase.firestore();
export const database = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const messaging = firebase.messaging();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
facebookAuthProvider.addScope('user_friends');
