This to-do-app have 3 state:

    Incomplete: Todo task has not been completed
    Completed: The todo task has been mark as completed
    In-progress: The todo task is currently being worked on

How-to-use:

    1. Clone the git repo to your local
    2. Open terminal and run "npm i" to install dependencies
    3. Run "npm run start" to start the app

Define transition:

    Incomplete -> In-progress -> Completed
    In-progress -> Incomplete
    Completed -> Incomplete

    1. Press "Start" -> change task's status from Incomplete -> In-progress
    2. Press "Un-start" -> change task's status from In-progress -> Incomplete
    3. Tick "check-box" to mark task's status from In-progress -> Complete
    4. Un-tick "check-box" to mark task's status from Complete -> Incomplete

Functionalities:

    1. Add new todo items by typing in the input field and press "Add" button
    2. Clear completed items by pressing "Clear Completed Task" button
    3. Clear all items by pressing "Clear All" button
    4. Mark todo items from Incomplete -> In-progress by pressing "Start" button
    5. Mark todo items back from In-progress -> Incomplete by pressing "Un-start" button
    6. Mark todo items from In-progress -> Completed by ticking check-box
    7. Mark todo item from Completed -> Incomplete by un-tick check-box
    8. Change the order of the todo items by pressing button "Up" or "Down"
    9. Delete the todo items by pressing "Delete" button
    10. Todo items persist between page-reload via local storage.
