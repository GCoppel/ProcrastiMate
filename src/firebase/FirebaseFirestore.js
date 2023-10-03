import React from "react";
import * as firebase from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { auth, database } from './FirebaseInitialize'
import { setDoc, doc, getDoc, collection } from "firebase/firestore";

export async function SetDefaultSettings() {
  await setDoc(doc(database, auth.currentUser.uid, "Settings"), {
    language: "English",
    notifications: true,
    darkMode: false,
    negativeReinforcement: false
  })
}

export async function UpdateSettings(language, notifications, darkMode, negativeReinforcement) {
  await setDoc(doc(database, auth.currentUser.uid, "Settings"), {
    Language: language,
    Notifications: notifications,
    DarkMode: darkMode,
    NegativeReinforcement: negativeReinforcement
  })
}

export async function AddTaskToFirestore(taskName, taskPriority, counter){
    const msgID = "msg_"+counter
    await setDoc(doc(database, auth.currentUser.uid, "Todos"), {
      [msgID]: {
        name: taskName,
        priority: taskPriority
      }
    }, {merge: true})
    return;
  }