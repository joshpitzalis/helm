import '@testing-library/cypress/add-commands';
import { attachCustomCommands } from 'cypress-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const fbConfig = {
  apiKey: 'AIzaSyD0_c1V4vvrHVwVD941n_KLnbj55f0c5gI',
  authDomain: 'decision-dev.firebaseapp.com',
  databaseURL: 'https://decision-dev.firebaseio.com',
  projectId: 'decision-dev',
  storageBucket: 'decision-dev.appspot.com',
  messagingSenderId: '1006893299756',
  appId: '1:1006893299756:web:0581850d4e51ba77',
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
