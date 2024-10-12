var TaskCreate = require('./createTask');
var taskArray = [];
var TaskMain = function () {
    TaskCreate({ taskArray: taskArray });
};
TaskMain();
