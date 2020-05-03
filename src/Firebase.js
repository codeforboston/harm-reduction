import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyC0f6lcJwEnRmMorUn-vvEXBsk2Lz-un-A',
  authDomain: 'cfb-harm-reduction.firebaseapp.com',
  databaseURL: 'https://cfb-harm-reduction.firebaseio.com',
  projectId: 'cfb-harm-reduction',
  storageBucket: 'cfb-harm-reduction.appspot.com',
  messagingSenderId: '29743874428',
  appId: '1:29743874428:web:8b175d2160841897bde4f9',
  measurementId: 'G-1CJFEKBKWV',
});

export const db = firebase.firestore();
export const auth = firebase.auth();
