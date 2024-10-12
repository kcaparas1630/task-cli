var TaskProgress = require('./Constants/TaskProgress.ts');
var readLine = require('readline');
var _a = require('node:process'), input = _a.stdin, output = _a.stdout;
var rl = readLine.createInterface({ input: input, output: output });
// Function to create a task
var createTask = function (_a) {
    var taskArray = _a.taskArray;
    var taskName = '';
    var taskDescription = '';
    var taskProgress = '';
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
            var taskProgress;
            var taskDoneDate = null;
            if (TaskProgress.NOT_STARTED.includes(taskProgressUpper) ||
                taskProgressUpper === TaskProgress.STARTED) {
                taskProgress = taskProgressUpper;
            }
            else if (taskProgressUpper === TaskProgress.COMPLETED) {
                taskProgress = taskProgressUpper;
                taskDoneDate = new Date(Date.now());
            }
            else {
                taskProgress = 'INVALID STATUS';
            }
            var newTask = {
                taskName: taskName,
                taskDescription: taskDescription,
                taskProgress: taskProgress,
                taskDoneDate: taskDoneDate,
            };
            taskArray.push(newTask);
            console.log("Task Added Successfully!\n", JSON.stringify(newTask, null, 2));
            console.log("Current Task Array:\n", JSON.stringify(taskArray, null, 2));
            askToAddAnotherTask();
        });
    };
    // function for asking another task
    var askToAddAnotherTask = function () {
        rl.question("Would you like to add another task? (yes/no): ", function (addNewTask) {
            if (addNewTask.toUpperCase() === 'YES') {
                askTaskName(); // add new task
            }
            else {
                console.log('Task manager closed.');
                rl.close(); // Close the readline interface
            }
        });
    };
    askTaskName();
};
module.exports = createTask;
