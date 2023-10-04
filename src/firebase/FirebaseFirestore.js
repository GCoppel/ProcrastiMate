import React from "react";
import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { auth, database } from "./FirebaseInitialize";
import { setDoc, doc, getDoc, collection } from "firebase/firestore";

export async function SetDefaultSettings() {
  await setDoc(doc(database, auth.currentUser.uid, "Settings"), {
    Language: "English",
    DarkMode: false,
    Notifications: true,
    NegativeReinforcement: false,
  });
}

export async function UpdateSettings(
  language,
  darkMode,
  notifications,
  negativeReinforcement
) {
  await setDoc(doc(database, auth.currentUser.uid, "Settings"), {
    Language: language,
    DarkMode: darkMode,
    Notifications: notifications,
    NegativeReinforcement: negativeReinforcement,
  });
}

export async function GetSettings() {
  const docRef = doc(database, auth.currentUser.uid, "Settings");
  const docSnap = await getDoc(docRef)
  let settingsData;
  if (docSnap.exists()) {
    settingsData = docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  return settingsData;
}

export async function AddTaskToFirestore(taskName, taskPriority, counter) {
  const msgID = "msg_" + counter;
  await setDoc(
    doc(database, auth.currentUser.uid, "Todos"),
    {
      [msgID]: {
        name: taskName,
        priority: taskPriority,
      },
    },
    { merge: true }
  );
  return;
}
