var editTask = function (_a) {
    var taskArray = _a.taskArray, rl = _a.rl;
    var askItemName = function () {
        rl.question("Which Task would you like to edit?: ", function (itemNameInput) {
            console.log(taskArray.map(function (items) { return items.taskName; }));
        });
    };
    askItemName();
};
module.exports = editTask;
