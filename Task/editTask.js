var editTask = function (_a) {
    var taskArray = _a.taskArray, rl = _a.rl, TaskProgress = _a.TaskProgress, MainMenuCallBack = _a.MainMenuCallBack;
    var askItemName = function () {
        rl.question("Which Task would you like to edit? [".concat(taskArray
            .map(function (items) { return items.taskName; })
            .join(", "), "]: "), function (itemNameInput) {
            var itemIndex = taskArray.findIndex(function (item) { return item.taskName.toUpperCase() === itemNameInput.toUpperCase(); });
            askItemEdit(itemIndex);
        });
    };
    var askItemEdit = function (itemIndex) {
        rl.question("What would you like to edit? [Name, Description, Progress]: ", function (itemEditInput) {
            if (itemEditInput.toUpperCase() === "NAME") {
                rl.question("What should be the task name?: ", function (itemEditName) {
                    taskArray[itemIndex].taskName = itemEditName;
                    PrintArray(itemIndex);
                });
            }
            else if (itemEditInput.toUpperCase() === "DESCRIPTION") {
                rl.question("What should be the task description?: ", function (itemEditDescription) {
                    taskArray[itemIndex].taskDescription = itemEditDescription;
                    PrintArray(itemIndex);
                });
            }
            else if (itemEditInput.toUpperCase() === "PROGRESS") {
                rl.question("What should be the task progress?: ", function (itemEditProgress) {
                    taskArray[itemIndex].taskProgress = itemEditProgress;
                    if (itemEditProgress.toUpperCase() === TaskProgress.COMPLETED) {
                        taskArray[itemIndex].taskDoneDate = new Date(Date.now());
                    }
                    PrintArray(itemIndex);
                });
            }
            else {
                console.log("Wrong input. Task Manager closed.");
                rl.close();
            }
        });
    };
    // helper for DRY method.
    var PrintArray = function (itemIndex) {
        console.log("Task Edited Successfully!\n", JSON.stringify(taskArray[itemIndex], null, 2));
        console.log("Current Task Array:\n", JSON.stringify(taskArray, null, 2));
        askToEditAnotherTask();
    };
    var askToEditAnotherTask = function () {
        rl.question("Would you like to edit another task? (yes/no): ", function (editNewTask) {
            if (editNewTask.toUpperCase() === "YES") {
                askItemName(); // Edit new task
            }
            else {
                console.log("Returning to Main Menu.");
                MainMenuCallBack();
            }
        });
    };
    askItemName();
};
module.exports = editTask;
