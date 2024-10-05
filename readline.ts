// transitioning to typescript in task.ts
// const readLine = require('readline');
// const { stdin: input, stdout: output } = require('node:process');
// const rl = readLine.createInterface({ input, output });

rl.question(`What's your age?: `, (input) => {
    console.log(`Your age is ${input}`);
    rl.close();
});
