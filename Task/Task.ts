/**     
 *      require instead of import, node.js doesn't support import at the moment.
 *      Visit this link for more information
 *      https://stackoverflow.com/questions/52046008/why-cant-i-import-as-readline-from-readline-in-nodejs-v10
 *
 *  */
const TaskProgress = require('./Constants/TaskProgress.ts');
const readLine = require('readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readLine.createInterface({ input, output });

rl.question(`What's the task name?: `, (taskNameInput) => {
    console.log(`Task name added: ${taskNameInput}`);
    rl.question(`What's the Task Description?: `, (taskNameDesc) => {
        console.log(`Task Description added: ${taskNameDesc}`);
        rl.question(`What is the current progress?(NOT STARTED, STARTED, COMPLETED): `, (taskProgress) => {
            const taskProgressUpper = taskProgress.toUpperCase();
            if (TaskProgress.NOT_STARTED.includes(taskProgressUpper)) {
                // do nothing
            } else if (taskProgressUpper === TaskProgress.STARTED) {
                // do nothing
            } else if (taskProgressUpper === TaskProgress.COMPLETED) {
                // do nothing
            } else {
                console.log("Invalid progress status");
                // ask the question again.
            }
            console.log(`Task Progress is: ${taskProgressUpper}`);
            rl.close();
        });
    });
});
