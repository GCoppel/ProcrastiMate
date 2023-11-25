# ProcrastiMate - Your Study-Buddy for Getting Things Done
### Author: George Coppel
__This project is in partial fulfillment of the University of Alabama in Huntsville Honors Capstone.__
___
![ProcrastiMate logo image with cyan background.](/assets/Logo_Variants/ProcrastiMate-logos.jpeg)
___
## How to Test Using Expo
ProcrastiMate is built using Expo. Expo is a populat React Native build tool, allowing for faster and easier testing with real devices. 
It does provide an all-in-one Android and iOS build tool for producing .apk and .ipa files, but it also allows for real-time streaming to a physical mobile device as changes are made to the source code. 
This allows for much easier and faster development as it eliminates the need to constantly make builds or use device emulators. If you've ever used Vite with a web framework/library, like React (non-native), Expo is essentially the React Native version of that.

__To test the app on your mobile device, do the following:__
<br/>_Note: iOS currently has a bug where users cannot collapse the keyboard after focusing on a textfield. This will maybe be fixed soon, but also maybe not since Android is the main target platform._
1. Download the Expo Go app on your mobile device.
2. Clone this repository to a Windows or Linux computer.
3. Navigate to the project's root directory.
4. Run the command: `npx expo start`
   - This will start a server on your local network.
   - A QR code should appear in the terminal (you may need to scroll up a bit).
   - If you run into any issues, you may need to install Node
     - There should be no need to install Expo. The Expo CLI is deprecated, so all required files should already be included in the project when you clone.
5. On your mobile device, scan the QR code.
   - For Android, scan the code inside of the Expo Go app.
   - For iOS, scan the code using the camera app.
   - Your machine should recognize the type of device (iOS or Android) and build the appropriate package.
   - The application should then open on your device.

_Note: The final deliverable will be an APK (Android Package Kit) file._
___

## Description
ProcrastiMate is a to-do list smartphone app with extra features to help users maintain a study
plan and build a productive weekly rhythm. By rewarding users with a Study Streak score for each
week that they stick with their study plan, ProcrastiMate can help reduce long-term procrastination. It’s
still a to-do list application at its core, meaning that users can add tasks to their list and check them off
as they are completed. Tasks can, optionally, be given additional information to help ProcrastiMate put
together a suggested plan of action for how to complete the tasks. That’s just another way
ProcrastiMate helps users to keep productive and stop procrastinating.

## Features
- Users can create their own account with an associated username and password.
  - All data will be tied to the user’s account and only accessible by them.
-Users can create a weekly study plan that they want to follow.
  - This plan can be modified at any time.
  - The user can complete their study plan by starting a timer when they begin studying. When
they are done, they stop the timer. The elapsed time is saved as a “Study Session” and
applied to the user’s study plan for the current week.
    - Each study session progresses the completion of the study plan based on how much time
was spent studying.
  - When the user completes their study plan for the week, their “Study Streak” score is
incremented.
  - If a user studies more than their study plan asks them to, it will bank the extra time and
apply it when the next week starts. This encourages students to continue studying even if
they’ve already met their goal for the week.
- Users will have a “Study Streak” score tied to their account. This score represents the number
of successive weeks that the user has completed their chosen study plan.
  - If the study plan is not met for a week, the score resets back to zero.
- Users can add individual tasks to a to-do list.
  - Each task will have a checkbox that allows the user to mark tasks as completed.
  - Tasks can have the following associated information with them:
    - Estimated Time – How long it should take to complete in minutes
    - Difficulty – On a 0-9 scale, how hard and mentally taxing it will be to complete
    - Priority – On a 0-9 scale, how quickly does this need to be done
  - This information will be used to suggest the order that the tasks should be completed in.
    - I may have it suggest multiple orders that the student can choose from.
  - Each task detail will be assigned a weight that will contribute to the total “Importance
Score” used to order the items.
  - To-Do list tasks are not connected to the study plan, but the user can consider a task as
studying and start the timer when they are working on it. However, no link between the to-
do list and study plan is being planned.
-User data (username, password, study plan, tasks, etc.) will all be stored remotely.
  - The current plan is to use Google Firebase’s real-time NoSQL database.
  - Banked time, Study Streak score, and UNCOMPLETED tasks will carry over from week-
to-week. All other information (besides the username and passcode) will be reset at the
beginning of each week.

## Rationale
I am a tutor for computer science and math at UAH and, I believe, that most students who come
to tutoring could solve their problems by having a better study system. Specifically, the time
management skills and motivation of many students seems to put them further and further behind in
courses. Only when they feel completely lost do many students finally book tutoring appointments and
begin the process of catching back up.

An application like EverNote or Google Tasks can help with this because it organizes the
students tasks and allows them to check them off as they are completed. However, simply having better
organization does not prevent many students from procrastinating. To help solve this issue, I will create
a to-do list application like EverNote or Google Tasks but with extra features designed to help students
stop procrastinating.

The main feature I will add is very similar to what the Duolingo language learning app does.
Duolingo asks its users to complete at least one lesson every day, giving them a “Language Learning
Streak” score with each successive day they study. Miss a day, and the score resets back to zero. I
believe this method of encouraging users to complete their work could be a very effective supplement
to a standard to-do list application. Once users build up even a small score, they are less likely to quit
because they don’t want to lose the score. Additionally, like Duolingo, the app will send users
occasional notifications reminding them to study or complete tasks on their to-do list. This will make it
much harder for the user to forget about or ignore their work.
___
## Screenshots - Dark Mode vs Light Mode
![The login page in dark mode. Contains a text field for the user's email address, a text field for the user's password, a "Login" button, and a "Register" button.](/Demo_Screenshots/Login_Dark.jpg)
![The login page in light mode. Contains a text field for the user's email address, a text field for the user's password, a "Login" button, and a "Register" button.](/Demo_Screenshots/Login_Light.jpg)
<br/>__Login Page.__

![The homepage in dark mode. Contains a vertically-scrollable list of tasks. Each task has a name, edit button, and a checkbox to mark it as complete or incomplete. At the top are a pair of text fields which the user can use to create a new task.](/Demo_Screenshots/Tasks_Dark.jpg)
![The homepage in light mode. Contains a vertically-scrollable list of tasks. Each task has a name, edit button, and a checkbox to mark it as complete or incomplete. At the top are a pair of text fields which the user can use to create a new task.](/Demo_Screenshots/Tasks_Light.jpg)
<br/>__Homepage, contains the to-do list__

![The study page in dark mode. Shows the user's study streak score, the number of minutes they have studied this week, and their percentage towards completing their goal. There is a button labeled "Study" in the center to take the user to the session page.](/Demo_Screenshots/Study_Dark.jpg)
![The study page in light mode. Shows the user's study streak score, the number of minutes they have studied this week, and their percentage towards completing their goal. There is a button labeled "Study" in the center to take the user to the session page.](/Demo_Screenshots/Study_Light.jpg)
<br/>__Study page, shows progress towards completing the user's weekly goal and is used as the entrypoint to the session page.__

![The session page in dark mode. Contains a timer with start, pause, resume, and reset buttons.](/Demo_Screenshots/Session_Dark.jpg)
![The session page in light mode. Contains a timer with start, pause, resume, and reset buttons.](/Demo_Screenshots/Session_Light.jpg)
<br/>__Session page, contains a timer that the user starts when they begin studying. Time adds to the user's weekly total. When the student meets their weekly goal, their study score is incremented.__

![The settings page in dark mode. Contains a toggle for the dark mode to be enabled or disabled, a textbox where the user can input their weekly study goal in minutes, and a dropdown menu where the user can choose between english and french.](/Demo_Screenshots/Settings_Dark.jpg)
![The settings page in light mode. Contains a toggle for the dark mode to be enabled or disabled, a textbox where the user can input their weekly study goal in minutes, and a dropdown menu where the user can choose between english and french.](/Demo_Screenshots/Settings_Light.jpg)
<br/>__Settings page.__