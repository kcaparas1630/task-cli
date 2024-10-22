var editTask = function (_a) {
    var taskArray = _a.taskArray, rl = _a.rl, TaskProgress = _a.TaskProgress, MainMenuCallBack = _a.MainMenuCallBack;
    if (taskArray.length == 0) {
        console.log("Task is empty. Add an item first");
        MainMenuCallBack();
    }
    else {
        var askItemName_1 = function () {
            rl.question("Which Task would you like to edit? [".concat(taskArray
                .map(function (items) { return items.taskName; })
                .join(", "), "]: "), function (itemNameInput) {
                var itemIndex = taskArray.findIndex(function (item) {
                    return item.taskName.toUpperCase() === itemNameInput.toUpperCase();
                });
                if (itemIndex > -1) {
                    return askItemEdit_1(itemIndex);
                }
                console.log("Wrong Input. Please try again.");
                askItemName_1();
            });
        };
        var askItemEdit_1 = function (itemIndex) {
            rl.question("What would you like to edit? [Name, Description, Progress]: ", function (itemEditInput) {
                if (itemEditInput.toUpperCase() === "NAME") {
                    rl.question("What should be the task name?: ", function (itemEditName) {
                        taskArray[itemIndex].taskName = itemEditName;
                        PrintArray_1(itemIndex);
                    });
                }
                else if (itemEditInput.toUpperCase() === "DESCRIPTION") {
                    rl.question("What should be the task description?: ", function (itemEditDescription) {
                        taskArray[itemIndex].taskDescription = itemEditDescription;
                        PrintArray_1(itemIndex);
                    });
                }
                else if (itemEditInput.toUpperCase() === "PROGRESS") {
                    rl.question("What should be the task progress?: ", function (itemEditProgress) {
                        taskArray[itemIndex].taskProgress = itemEditProgress;
                        if (itemEditProgress.toUpperCase() === TaskProgress.COMPLETED) {
                            taskArray[itemIndex].taskDoneDate = new Date(Date.now());
                        }
                        PrintArray_1(itemIndex);
                    });
                }
                else {
                    console.log("Wrong input. Please try again.");
                    askItemEdit_1(itemIndex);
                }
            });
        };
        // helper for DRY method.
        var PrintArray_1 = function (itemIndex) {
            console.log("Task Edited Successfully!\n", JSON.stringify(taskArray[itemIndex], null, 2));
            console.log("Current Task Array:\n", JSON.stringify(taskArray, null, 2));
            askToEditAnotherTask_1();
        };
        var askToEditAnotherTask_1 = function () {
            rl.question("Would you like to edit another task? (yes/no): ", function (editNewTask) {
                if (editNewTask.toUpperCase() === "YES") {
                    askItemName_1(); // Edit new task
                }
                else if (editNewTask.toUpperCase() === "NO") {
                    console.log("Returning to Main Menu.");
                    MainMenuCallBack();
                }
                else {
                    console.log("Wrong Input. Please try again.");
                    askToEditAnotherTask_1();
                }
            });
        };
        askItemName_1();
    }
};
module.exports = editTask;
