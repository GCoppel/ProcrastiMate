import React from "react";
import { StyleSheet, StatusBar } from "react-native";

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "100%",
    height: "12%",
    borderBottomWidth: 1,
    marginTop: StatusBar.currentHeight,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "600",
  },
  progressWidget: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  streakWrapper: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginRight: 15,
  },
  streakCounter: {
    fontSize: 30,
    fontWeight: "bold",
  },
  streakSubText: {
    fontWeight: "bold",
  },
  taskWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  addTask: {
    marginTop: 10,
  },
  addTaskButtonWrapper: {
    borderRadius: 15,
    marginLeft: 15,
  },
  addTaskButton: {
    borderWidth: 3,
    borderRadius: 15,
    padding: 3,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskItem: {
    flexDirection: "row",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tasksHeader: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    borderBottomWidth: 3,
    marginTop: 15,
  },
  taskList: {
    marginHorizontal: 20,
  },
  body: {},
  emptyTaskList: {
    alignSelf: "center",
    marginTop: 50,
  },
  btnNormal: {
    color: "black",
  },
  btnPress: {
    color: "white",
  },
  btnText: {
    color: "black",
    fontSize: 24,
    fontWeight: 'bold'
  },
  studyButtonWrapper: {
    borderRadius: 5,
    alignContent: "center",
    justifyContent: "center",
  },
  studyButton: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "lightgrey",
  },
});

export default HomeStyles;
