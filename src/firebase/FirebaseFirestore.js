import React from "react";
import * as firebase from "firebase/app";
import { Timestamp, getFirestore } from "firebase/firestore";
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
  negativeReinforcement,
  weeklyStudyGoal,
) {
  await setDoc(doc(database, auth.currentUser.uid, "Settings"), {
    Language: language,
    DarkMode: darkMode,
    Notifications: notifications,
    NegativeReinforcement: negativeReinforcement,
    WeeklyStudyGoal: weeklyStudyGoal
  });
}

export async function GetSettings() {
  const docRef = doc(database, auth.currentUser.uid, "Settings");
  const docSnap = await getDoc(docRef)
  let settingsData;
  if (docSnap.exists()) {
    settingsData = docSnap.data()
  } else {
    settingsData = null
    console.log("No such document!");
  }
  return settingsData;
}

export async function AddTaskToFirestore(taskName, taskPriority) {
  const msgID = Date.now();
  if (taskPriority == null){taskPriority = 'None'}
  await setDoc(
    doc(database, auth.currentUser.uid, "Todos"),
    {
      [msgID]: {
        id: msgID,
        name: taskName,
        priority: taskPriority,
      },
    },
    { merge: true }
  );
  return;
}

export async function GetTasks() {
  const docRef = doc(database, auth.currentUser.uid, "Todos");
  const docSnap = await getDoc(docRef)
  let tasks
  if (docSnap.exists()){
    tasks = docSnap.data()
  }
  else {
    tasks = null
    console.log("No such document!")
  }
  return tasks;
}

export async function AddStudySession(minutes, subject){
  const msgID = Date.now();
  if (subject ==null) {subject = "NONE"}
  await setDoc(
    doc(database, auth.currentUser.uid, "Sessions"),
    {
      [msgID]: {
        timestamp: msgID,
        sessionLength: minutes,
        subjectName: subject, 
      },
    },
    { merge: true }
  )
}

export async function GetStudySessions() {
  const docRef = doc(database, auth.currentUser.uid, "Sessions");
  const docSnap = await getDoc(docRef)
  let sessions
  if (docSnap.exists()){
    sessions = docSnap.data()
  }
  else {
    sessions = null
    console.log("No such document!")
  }
  return sessions;
}
