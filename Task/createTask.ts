const TaskProgress = require('./Constants/TaskProgress.ts');
const readLine = require('readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readLine.createInterface({ input, output });

// not sure how importing works for interfaces.
interface TaskInterface {
    taskName: string;
    taskDescription: string;
    taskProgress: string;
    taskDoneDate?: Date | null;
}

const taskArray: TaskInterface[] = [];

// Function to create a task
const createTask = () => {
    let taskName: string = '';
    let taskDescription: string = '';
    let taskProgress: string = '';
    let taskDoneDate: Date | null = null;

    rl.question(`What's the task name?: `, (taskNameInput) => {
        taskName = taskNameInput;

        rl.question(`What's the Task Description?: `, (taskNameDesc) => {
            taskDescription = taskNameDesc;

            rl.question(`What is the current progress? (NOT STARTED, STARTED, COMPLETED): `, (taskProgressInput) => {
                const taskProgressUpper = taskProgressInput.toUpperCase();
                
                if (TaskProgress.NOT_STARTED.includes(taskProgressUpper) ||
                    taskProgressUpper === TaskProgress.STARTED) {
                    taskProgress = taskProgressUpper;
                } else if (taskProgressUpper === TaskProgress.COMPLETED) {
                    taskProgress = taskProgressUpper;
                    taskDoneDate = new Date(Date.now());
                } else {
                    taskProgress = 'INVALID STATUS';
                }

                const newTask: TaskInterface = {
                    taskName,
                    taskDescription,
                    taskProgress,
                    taskDoneDate,
                };

                taskArray.push(newTask);

                console.log("Task Added Successfully!\n", JSON.stringify({
                    taskName: newTask.taskName,
                    taskDescription: newTask.taskDescription,
                    taskProgress: newTask.taskProgress,
                    currentTaskArray: taskArray
                }, null, 2));

                // function call to add new task
                askToAddAnotherTask();
            });
        });
    });
}

// function for asking another task
const askToAddAnotherTask = () => {
    rl.question(`Would you like to add another task? (yes/no): `, (addNewTask) => {
        if (addNewTask.toUpperCase() === 'YES') {
            createTask(); // add new task
        } else {
            console.log('Task manager closed.');
            rl.close(); // Close the readline interface
        }
    });
}

createTask();
