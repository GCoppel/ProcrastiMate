import React from "react";
import * as firebase from "firebase/app";
import {
  updateDoc,
  deleteField,
} from "firebase/firestore";
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

export async function UpdateStudyStreak(newStreakValue){
  await setDoc(doc(database, auth.currentUser.uid, "Streak"), {
    SuccessiveWeeks: newStreakValue
  })
}

export async function GetStudyStreak(){
  const docRef = doc(database, auth.currentUser.uid, "Streak");
  const docSnap = await getDoc(docRef);
  let streakData;
  let streakValue;
  if (docSnap.exists()){
    streakData = docSnap.data();
    streakValue = streakData.SuccessiveWeeks;
  }
  else {
    streakData = null;
    console.log("No such document!");
  }
  return streakValue;
}

export async function UpdateSettings(
  language,
  darkMode,
  notifications,
  negativeReinforcement,
  weeklyStudyGoal
) {
  await setDoc(doc(database, auth.currentUser.uid, "Settings"), {
    Language: language,
    DarkMode: darkMode,
    Notifications: notifications,
    NegativeReinforcement: negativeReinforcement,
    WeeklyStudyGoal: weeklyStudyGoal,
  });
}

export async function GetSettings() {
  const docRef = doc(database, auth.currentUser.uid, "Settings");
  const docSnap = await getDoc(docRef);
  let settingsData;
  if (docSnap.exists()) {
    settingsData = docSnap.data();
  } else {
    settingsData = null;
    console.log("No such document!");
  }
  return settingsData;
}

export async function AddTaskToFirestore(taskID, taskName, taskPriority, newTaskDifficulty, newTaskEstimatedTime, newTaskDeadline, newTaskLocation, newTaskGroup, taskComplete) {
  if (taskPriority == null) {
    taskPriority = "None";
  }
  await setDoc(
    doc(database, auth.currentUser.uid, "Todos"),
    {
      [taskID]: {
        id: taskID,
        name: taskName,
        priority: taskPriority,
        difficulty: newTaskDifficulty,
        estimatedTime: newTaskEstimatedTime,
        deadline: newTaskDeadline,
        location: newTaskLocation,
        group: newTaskGroup,
        complete: taskComplete,
      },
    },
    { merge: true }
  );
  return;
}

export async function EditFirestoreTask(taskId, newTaskName, newTaskPriority, newTaskDifficulty, newTaskEstimatedTime, newTaskDeadline, newTaskLocation, newTaskGroup) {
  await updateDoc(doc(database, auth.currentUser.uid, "Todos"), {
    [`${taskId}.name`]: newTaskName,
    [`${taskId}.priority`]: newTaskPriority || "---", // Set to '---' if newTaskPriority is null
    [`${taskId}.difficulty`]: newTaskDifficulty || "---", // Set to '---' if newTaskDifficulty is null
    [`${taskId}.estimatedTime`]: newTaskEstimatedTime || "---", // Set to '---' if newTaskEstimatedTime is null
    [`${taskId}.deadline`]: newTaskDeadline || "---",
    [`${taskId}.location`]: newTaskLocation || "---",
    [`${taskId}.group`]: newTaskGroup || "--",
  });
}

export async function MarkFirestoreTaskComplete(taskId, complete){
  await updateDoc(doc(database, auth.currentUser.uid, "Todos"), {
    [`${taskId}.complete`]: complete,
  });
}

export async function DeleteFirestoreTask(taskId) {
  await updateDoc(doc(database, auth.currentUser.uid, "Todos"), {
    [`${taskId}`]: deleteField()
  });
}

export async function GetTasks() {
  const docRef = doc(database, auth.currentUser.uid, "Todos");
  const docSnap = await getDoc(docRef);
  let tasks;
  if (docSnap.exists()) {
    tasks = docSnap.data();
  } else {
    tasks = null;
    console.log("No such document!");
  }
  return tasks;
}

export async function AddStudySession(minutes, subject) {
  const msgID = Date.now();
  if (subject == null) {
    subject = "NONE";
  }
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
  );
}

export async function GetStudySessions() {
  const docRef = doc(database, auth.currentUser.uid, "Sessions");
  const docSnap = await getDoc(docRef);
  let sessions;
  if (docSnap.exists()) {
    sessions = docSnap.data();
  } else {
    sessions = null;
    console.log("No such document!");
  }
  return sessions;
}
