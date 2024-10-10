var TaskProgress = require('./Constants/TaskProgress.ts');
var readLine = require('readline');
var _a = require('node:process'), input = _a.stdin, output = _a.stdout;
var rl = readLine.createInterface({ input: input, output: output });
var taskArray = []; // task array
function createTask() {
    var taskName = '';
    var taskDescription = '';
    var taskProgress = '';
    rl.question("What's the task name?: ", function (taskNameInput) {
        taskName = taskNameInput;
        rl.question("What's the Task Description?: ", function (taskNameDesc) {
            taskDescription = taskNameDesc;
            rl.question("What is the current progress?(NOT STARTED, STARTED, COMPLETED): ", function (taskProgress) {
                var taskProgressUpper = taskProgress.toUpperCase();
                if (TaskProgress.NOT_STARTED.includes(taskProgressUpper) ||
                    taskProgressUpper === TaskProgress.STARTED ||
                    taskProgressUpper === TaskProgress.COMPLETED) {
                    taskProgress = taskProgressUpper;
                }
                else {
                    taskProgress = 'INVALID STATUS';
                }
                var newTask = {
                    taskName: taskName,
                    taskDescription: taskDescription,
                    taskProgress: taskProgress
                };
                taskArray.push(newTask);
                // Single console.log statement with all information
                console.log("Task Added Successfully!\n", JSON.stringify({
                    taskName: newTask.taskName,
                    taskDescription: newTask.taskDescription,
                    taskProgress: newTask.taskProgress,
                    currentTaskArray: taskArray
                }, null, 2));
                rl.close();
            });
        });
    });
}
createTask();
rl.on('close', function () {
    console.log('Task manager closed.');
});
