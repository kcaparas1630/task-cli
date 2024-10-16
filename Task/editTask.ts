interface TaskInterface {
  taskName: string;
  taskDescription: string;
  taskProgress: string;
  taskDoneDate?: Date | null;
}

type EditTask = (params: {
  taskArray: TaskInterface[];
  rl: any;
  TaskProgress: any;
  MainMenuCallBack: () => void;
}) => void;

const editTask: EditTask = ({
  taskArray,
  rl,
  TaskProgress,
  MainMenuCallBack,
}) => {
  const askItemName = () => {
    rl.question(
      `Which Task would you like to edit? [${taskArray
        .map((items) => items.taskName)
        .join(", ")}]: `,
      (itemNameInput) => {
        const itemIndex = taskArray.findIndex(
          (item) => item.taskName.toUpperCase() === itemNameInput.toUpperCase()
        );
        askItemEdit(itemIndex);
      }
    );
  };
  const askItemEdit = (itemIndex: number) => {
    rl.question(
      `What would you like to edit? [Name, Description, Progress]: `,
      (itemEditInput) => {
        if (itemEditInput.toUpperCase() === "NAME") {
          rl.question(`What should be the task name?: `, (itemEditName) => {
            taskArray[itemIndex].taskName = itemEditName;
          });
        } else if (itemEditInput.toUpperCase() === "DESCRIPTION") {
          rl.question(
            `What should be the task description?: `,
            (itemEditDescription) => {
              taskArray[itemIndex].taskDescription = itemEditDescription;
            }
          );
        } else if (itemEditInput.toUpperCase() === "PROGRESS") {
          rl.question(
            `What should be the task progress?: `,
            (itemEditProgress) => {
              taskArray[itemIndex].taskProgress = itemEditProgress;
              if (itemEditProgress.toUpperCase() === TaskProgress.COMPLETED) {
                taskArray[itemIndex].taskDoneDate = new Date(Date.now());
              }
            }
          );
        } else {
          console.log("Wrong input. Task Manager closed.");
          rl.close();
        }
      }
    );
  };
  askItemName();
};

module.exports = editTask;
