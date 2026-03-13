// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD2zEBCmVRRVBKroDWKsJ9S7oXBPuzGgs",
  authDomain: "dnd-curse-of-strahd.firebaseapp.com",
  projectId: "dnd-curse-of-strahd",
  storageBucket: "dnd-curse-of-strahd.firebasestorage.app",
  messagingSenderId: "1003543560913",
  appId: "1:1003543560913:web:7eea96491d237038bc7bf0",
  measurementId: "G-0V2V3CQ8K5"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
