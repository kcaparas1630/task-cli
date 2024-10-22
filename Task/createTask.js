var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Function to create a task
var createTask = function (_a) {
    var taskArray = _a.taskArray, rl = _a.rl, TaskProgress = _a.TaskProgress, MainMenuCallBack = _a.MainMenuCallBack;
    var taskName = "";
    var taskDescription = "";
    var taskProgress = "";
    var taskDoneDate = null;
    // function for taskName
    var askTaskName = function () {
        rl.question("What's the task name?: ", function (taskNameInput) {
            taskName = taskNameInput;
            askTaskDescription();
        });
    };
    // function for taskDescription
    var askTaskDescription = function () {
        rl.question("What's the Task Description?: ", function (taskNameDesc) {
            taskDescription = taskNameDesc;
            askTaskProgress(taskName, taskNameDesc);
        });
    };
    // function for taskProgress
    var askTaskProgress = function (taskName, taskDescription) {
        rl.question("What is the current progress? (NOT STARTED, STARTED, COMPLETED): ", function (taskProgressInput) {
            var taskProgressUpper = taskProgressInput.toUpperCase();
            var isValidInput = __spreadArray(__spreadArray([], TaskProgress.NOT_STARTED, true), [
                TaskProgress.STARTED,
                TaskProgress.COMPLETED,
            ], false).includes(taskProgressUpper);
            if (!isValidInput) {
                console.log("Wrong Input. Please try again.");
                return askTaskProgress(taskName, taskDescription);
            }
            if (TaskProgress.COMPLETED.includes(taskProgressUpper)) {
                taskProgress = taskProgressUpper;
                taskDoneDate = new Date(Date.now());
            }
            else {
                taskProgress = taskProgressUpper;
            }
            // Create and store new task
            var newTask = {
                taskName: taskName,
                taskDescription: taskDescription,
                taskProgress: taskProgress,
                taskDoneDate: taskDoneDate,
            };
            taskArray.push(newTask);
            PrintArray(newTask);
            askToAddAnotherTask();
        });
    };
    // helper for DRY method.
    var PrintArray = function (newTask) {
        console.log("Task Added Successfully!\n", JSON.stringify(newTask, null, 2));
        console.log("Current Task Array:\n", JSON.stringify(taskArray, null, 2));
        askToAddAnotherTask();
    };
    // function for asking another task
    var askToAddAnotherTask = function () {
        rl.question("Would you like to add another task? (yes/no): ", function (addNewTask) {
            if (addNewTask.toUpperCase() === "YES") {
                askTaskName(); // add new task
            }
            else if (addNewTask.toUpperCase() === "NO") {
                console.log("Returning to Main Menu.");
                MainMenuCallBack();
            }
            else {
                console.log("Wrong Input. Please try again.");
                askToAddAnotherTask();
            }
        });
    };
    askTaskName();
};
module.exports = createTask;
