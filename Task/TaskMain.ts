const TaskCreate = require('./createTask');
// not sure how importing works for interfaces.
interface TaskInterface {
    taskName: string;
    taskDescription: string;
    taskProgress: string;
    taskDoneDate?: Date | null;
}

const taskArray: TaskInterface[] = [];

const TaskMain = () => {
    TaskCreate({taskArray});
}

TaskMain();
