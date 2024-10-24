var TaskCreate = require('./createTask');
var TaskEdit = require('./editTask');
var TaskDelete = require('./deleteTask');
var TaskProgress = require('./Constants/TaskProgress.ts');
var readLine = require('readline');
var _a = require('node:process'), input = _a.stdin, output = _a.stdout;
var rl = readLine.createInterface({ input: input, output: output });
var taskArray = [];
var TaskMain = function () {
    var askProcess = function () {
        rl.question("What would you like to do? (Add, Edit, Delete, Exit): ", function (processInput) {
            if (processInput.toUpperCase() === 'ADD') {
                TaskCreate({ taskArray: taskArray, rl: rl, TaskProgress: TaskProgress, MainMenuCallBack: askProcess });
            }
            else if (processInput.toUpperCase() === 'EDIT') {
                TaskEdit({ taskArray: taskArray, rl: rl, TaskProgress: TaskProgress, MainMenuCallBack: askProcess });
            }
            else if (processInput.toUpperCase() === 'DELETE') {
                TaskDelete({ taskArray: taskArray, rl: rl, MainMenuCallBack: askProcess });
            }
            else if (processInput.toUpperCase() === 'EXIT') {
                console.log('Task manager closed');
                rl.close();
            }
            else {
                console.log('Wrong Input. Please try again.');
                askProcess();
            }
        });
    };
    askProcess();
};
TaskMain();
