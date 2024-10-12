const TaskProgress = require('./Constants/TaskProgress.ts');
const readLine = require('readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readLine.createInterface({ input, output });

interface TaskInterface {
    taskName: string;
    taskDescription: string;
    taskProgress: string;
    taskDoneDate?: Date | null;
}

type CreateTask = (params: { taskArray: TaskInterface[] }) => void;

// Function to create a task
const createTask: CreateTask = ({ taskArray }) => {
    let taskName: string = '';
    let taskDescription: string = '';
    let taskProgress: string = '';
    let taskDoneDate: Date | null = null;
    
    // function for taskName
    const askTaskName = () => {
        rl.question(`What's the task name?: `, (taskNameInput) => {
            taskName = taskNameInput;
            askTaskDescription();
        });
    };

    // function for taskDescription
    const askTaskDescription = () => {
        rl.question(`What's the Task Description?: `, (taskNameDesc) => {
            taskDescription = taskNameDesc;
            askTaskProgress(taskName, taskNameDesc);
        });
    };
    // function for taskProgress
    const askTaskProgress = (taskName: string, taskDescription: string) => {
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
            
            // move this to a different helper function.
            const newTask: TaskInterface = {
                taskName,
                taskDescription,
                taskProgress,
                taskDoneDate,
            };

            taskArray.push(newTask);
            console.log("Task Added Successfully!\n", JSON.stringify(newTask, null, 2));
            console.log("Current Task Array:\n", JSON.stringify(taskArray, null, 2));

            askToAddAnotherTask();
        });
    };
    // function for asking another task
    const askToAddAnotherTask = () => {
        rl.question(`Would you like to add another task? (yes/no): `, (addNewTask) => {
            if (addNewTask.toUpperCase() === 'YES') {
                askTaskName(); // add new task
            } else {
                console.log('Task manager closed.');
                rl.close(); // Close the readline interface
            }
        });
    };
    askTaskName();
};

module.exports = createTask;
