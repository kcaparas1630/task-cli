var deleteTask = function (_a) {
    var taskArray = _a.taskArray, rl = _a.rl, MainMenuCallBack = _a.MainMenuCallBack;
    var deleteItem = function () {
        rl.question("Which Task wouild you like to delete? [".concat(taskArray
            .map(function (items) { return items.taskName; })
            .join(", "), "]: "), function (itemNameInput) {
            var itemIndex = taskArray.findIndex(function (item) { return item.taskName.toUpperCase() === itemNameInput.toUpperCase(); });
            if (itemIndex > -1) {
                taskArray.splice(itemIndex, 1);
            }
            PrintArray();
        });
    };
    // helper for DRY method.
    var PrintArray = function () {
        console.log("Current Task Array:\n", JSON.stringify(taskArray, null, 2));
        askToDeleteAnotherTask();
    };
    var askToDeleteAnotherTask = function () {
        rl.question("Would you like to delete another task? (yes/no): ", function (editNewTask) {
            if (editNewTask.toUpperCase() === "YES") {
                deleteItem(); // Edit new task
            }
            else {
                console.log("Returning to Main Menu.");
                MainMenuCallBack();
            }
        });
    };
    deleteItem();
};
module.exports = deleteTask;
