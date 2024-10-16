const TaskCreate = require('./createTask');
const TaskEdit = require('./editTask');
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

const TaskMain = () => {
    const askProcess = () => {
        rl.question(`What would you like to do? (Add, Edit, Delete, Exit): `, (processInput) => {
            if(processInput.toUpperCase() === 'ADD') {
                TaskCreate({taskArray, rl, MainMenuCallBack: askProcess});
            } else if (processInput.toUpperCase() === 'EDIT') {
                TaskEdit({taskArray, rl, MainMenuCallBack: askProcess});
            } else if (processInput.toUpperCase() === 'DELETE') {
                // Delete
            } else if (processInput.toUpperCase() === 'EXIT') {
                console.log('Task manager closed');
                rl.close();
            } else {
                console.log('Wrong Input. Task manager closed.');
                rl.close(); // close command line
            }
        });
    };
    askProcess();
    
}

TaskMain();
