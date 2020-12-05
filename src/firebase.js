//// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDw0XXXzVzHUouojksFgPhV54hai1jI4tg',
  authDomain: 'todo-app-9f35a.firebaseapp.com',
  projectId: 'todo-app-9f35a',
  storageBucket: 'todo-app-9f35a.appspot.com',
  messagingSenderId: '1025140927732',
  appId: '1:1025140927732:web:d17a3b7ba524b3e9fe42a1',
  measurementId: 'G-THJ1G1V5L0',
});
const db = firebaseApp.firestore();

export default db;
