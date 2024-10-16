
interface TaskInterface {
    taskName: string;
    taskDescription: string;
    taskProgress: string;
    taskDoneDate?: Date | null;
}

type EditTask = (params: { taskArray: TaskInterface[], rl: any }) => void;

const editTask: EditTask = ({ taskArray, rl }) => {
    const askItemName = () => {
        rl.question(`Which Task would you like to edit?: `, (itemNameInput) => {
            console.log(taskArray.map((items) => items.taskName));
        });
    };
    askItemName();
}

module.exports = editTask;
