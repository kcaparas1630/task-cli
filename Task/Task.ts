const TaskProgress = require('./Constants/TaskProgress.ts');
const readLine = require('readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readLine.createInterface({ input, output });

// not sure how importing works on this one.
interface TaskInterface {
    taskName: string;
    taskDescription: string;
    taskProgress: string;
}
const taskArray: TaskInterface[] = []; // task array

const createTask = () => {
    let taskName: string = '';
    let taskDescription: string = '';
    let taskProgress: string = '';

    rl.question(`What's the task name?: `, (taskNameInput) => {
        taskName = taskNameInput;

        rl.question(`What's the Task Description?: `, (taskNameDesc) => {
            taskDescription = taskNameDesc;

            rl.question(`What is the current progress?(NOT STARTED, STARTED, COMPLETED): `, (taskProgress) => {
                const taskProgressUpper = taskProgress.toUpperCase();
                
                if (TaskProgress.NOT_STARTED.includes(taskProgressUpper) ||
                    taskProgressUpper === TaskProgress.STARTED ||
                    taskProgressUpper === TaskProgress.COMPLETED) {
                    taskProgress = taskProgressUpper;
                } else {
                    taskProgress = 'INVALID STATUS';
                }

                 const newTask: TaskInterface = {
                    taskName,
                    taskDescription,
                    taskProgress
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

rl.on('close', () => {
    console.log('Task manager closed.');
});
