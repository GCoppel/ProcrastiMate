import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANPuh0cgcemTBuPfrsQkWyTteo2weeQqM",
  authDomain: "authenticationdemo-ff065.firebaseapp.com",
  projectId: "authenticationdemo-ff065",
  storageBucket: "authenticationdemo-ff065.appspot.com",
  messagingSenderId: "700043670996",
  appId: "1:700043670996:web:99572ca8013e795001d241"
};

// Initialize Firebase
let app;
if (firebase.getApps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}
else {
    app = firebase.getApp();
}

let auth
try{( auth = getAuth(app))}
catch(error){
  console.log(error)
}

const username = auth.currentUser

let database
try{( database = getFirestore(app))}
catch(error){
  console.log(error)
}

export { auth, username, database }