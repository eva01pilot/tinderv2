import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  
  apiKey: "AIzaSyBDMYgNLD4vFk0_y-jh5FUw9TvN47y1zwo",

  authDomain: "tindernative-2f2b4.firebaseapp.com",

  projectId: "tindernative-2f2b4",

  storageBucket: "tindernative-2f2b4.appspot.com",

  messagingSenderId: "606819043429",

  appId: "1:606819043429:web:6eff27761a6b5ac6f75e8c",

  measurementId: "G-91NQB8TLDN"


};

firebase.initializeApp(firebaseConfig)

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const auth:any = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const  arrayUnion = firebase.firestore.FieldValue.arrayUnion;
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;