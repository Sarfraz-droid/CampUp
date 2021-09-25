import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAuW0DMouaFYReDMF_x7EbPOQOyNiGdMtk",
  authDomain: "campup-327018.firebaseapp.com",
  projectId: "campup-327018",
  storageBucket: "campup-327018.appspot.com",
  messagingSenderId: "832907407839",
  appId: "1:832907407839:web:455dcdc8698016451dd46a",
  measurementId: "G-06S2W0JNK7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;