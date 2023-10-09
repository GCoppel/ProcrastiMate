import * as firebase from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";

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

// let auth

// if (firebase.auth)
// try{
//   alert("oh shit")
//   (
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
//   })
// )}
// catch(error){
//   alert("fuck you")
//   auth = getAuth(app)
// }

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })

let database
try{( database = getFirestore(app))}
catch(error){
  console.log(error)
}

export { auth, database }