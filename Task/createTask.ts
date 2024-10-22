// const TaskProgress = require('./Constants/TaskProgress.ts');
interface TaskInterface {
  taskName: string;
  taskDescription: string;
  taskProgress: string;
  taskDoneDate?: Date | null;
}

type CreateTask = (params: {
  taskArray: TaskInterface[];
  rl: any;
  TaskProgress: any;
  MainMenuCallBack: () => void;
}) => void;

// Function to create a task
const createTask: CreateTask = ({
  taskArray,
  rl,
  TaskProgress,
  MainMenuCallBack,
}) => {
  let taskName: string = "";
  let taskDescription: string = "";
  let taskProgress: string = "";
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
    rl.question(
      `What is the current progress? (NOT STARTED, STARTED, COMPLETED): `,
      (taskProgressInput) => {
        const taskProgressUpper = taskProgressInput.toUpperCase();
        const isValidInput = [
          ...TaskProgress.NOT_STARTED,
          TaskProgress.STARTED,
          TaskProgress.COMPLETED,
        ].includes(taskProgressUpper);
        if (!isValidInput) {
          console.log("Wrong Input. Please try again.");
          return askTaskProgress(taskName, taskDescription);
        }

        if (TaskProgress.COMPLETED.includes(taskProgressUpper)) {
          taskProgress = taskProgressUpper;
          taskDoneDate = new Date(Date.now());
        } else {
          taskProgress = taskProgressUpper;
        }

        // Create and store new task
        const newTask: TaskInterface = {
          taskName,
          taskDescription,
          taskProgress,
          taskDoneDate,
        };
        taskArray.push(newTask);
        PrintArray(newTask);
        askToAddAnotherTask();
      }
    );
  };
  // helper for DRY method.
  const PrintArray = (newTask: any) => {
    console.log("Task Added Successfully!\n", JSON.stringify(newTask, null, 2));
    console.log("Current Task Array:\n", JSON.stringify(taskArray, null, 2));
    askToAddAnotherTask();
  };
  // function for asking another task
  const askToAddAnotherTask = () => {
    rl.question(
      `Would you like to add another task? (yes/no): `,
      (addNewTask) => {
        if (addNewTask.toUpperCase() === "YES") {
          askTaskName(); // add new task
        } else if (addNewTask.toUpperCase() === "NO") {
          console.log("Returning to Main Menu.");
          MainMenuCallBack();
        } else {
          console.log("Wrong Input. Please try again.");
          askToAddAnotherTask();
        }
      }
    );
  };
  askTaskName();
};

module.exports = createTask;
