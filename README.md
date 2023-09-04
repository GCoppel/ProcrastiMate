# ProcrastiMate
### Author: George Coppel
__This project fulfills the University of Alabama in Huntsville Honors Thesis requirement.__
___
## CURRENT PROJECT STATE
- A visual overhaul of the entire application is coming, but functionality is the current focus.
- The "Login" screen is functional.
  - Users can create a new account using email and password.
  - Users can logo into their existing account using email and password.
  - Accounts are managed by Google's FireBase cloud system.
  - Account Requirements:
    - Cannot use emails already associated with an account.
    - Emails must be in the form of ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov)$
    - Passwords must be at least 6 characters
- Upon successful login, the user is taken to the "Home" screen.
  - This is where the user's To-Do list will live. Users can use the input field and "add" button to add tasks to the list.
    - There is currently no way to save, edit, or delete tasks.
  - There is a header panel which holds information about the user's Study Streak and weekly study progress.
    - Currently, there is a counter which can be incremented using the "Study" buton.
    - This will be completely changed soon, for now it is just a placeholder.
___
## How to Test Using Expo
ProcrastiMate is built using Expo. Expo is a populat React Native build tool, allowing for faster and easier testing with real devices. 
It does provide an all-in-one Android and iOS build tool for producing .apk and .ipa files, but it also allows for real-time streaming to a physical mobile device as changes are made to the source code. 
This allows for much easier and faster development as it eliminates the need to constantly make builds or use device emulators. If you've ever used Vite with a web framework/library, like React (non-native), Expo is essentially the React Native version of that.

__To test the app on your mobile device, do the following:__
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
  - The application will ask the user to follow that study plan each week and occasionally give
them reminder notifications if they haven’t completed the current week’s plan.
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
    - Time – How long it should take to complete in minutes
    - Difficulty – On a 1-10 scale, how hard and mentally taxing it will be to complete
    - Importance – On a 1-5 scale, how quickly does this need to be done
    - Deadline – The date that the task must be completed by
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

## Stretch Goals and Bonus Features
- A web version of the application.
  - Because user data will be stored remotely, a web application would also be able to access
the data.
  - Additionally, because the mobile app is likely going to use React Native, creating a React
web application should be a fairly straightforward port.
    - Most of the work would have to do with styling the web version and making it
responsive for both desktop and mobile.
  - A web version would be useful because it is much easier to type on a physical keyboard
then on a smartphone keyboard. Users would be able to add new tasks through a
laptop/desktop and view them on their smartphone.
  - This is unlikely to be finished by the project deadline, but, if there is extra time, I think
getting even a very basic version of the application connected to the database would be
considered a success.
- Ability for users to upload “evidence” of having studied in the form of pictures.
  - I’m unlikely to add this one, but if I finish REALLY early, then I may include this feature. I’m not sure how it would work quite yet, but it would be interesting if I can refine it more.
  - Pictures are associated with each week’s study plan.
  - Cleared out each semester?
  - Problem: I am not planning to carry over any information other than the banked time, Study
Streak score, and uncompleted tasks from week-to-week. For this feature to make sense,
that would have to change so that there is some history of what work was done each week.
