interface TaskInterface {
  taskName: string;
  taskDescription: string;
  taskProgress: string;
  taskDoneDate?: Date | null;
}

type DeleteTask = (params: {
  taskArray: TaskInterface[];
  rl: any;
  MainMenuCallBack: () => void;
}) => void;

const deleteTask: DeleteTask = ({ taskArray, rl, MainMenuCallBack }) => {
  const deleteItem = () => {
    rl.question(
      `Which Task wouild you like to delete? [${taskArray
        .map((items) => items.taskName)
        .join(", ")}]: `,
      (itemNameInput) => {
        const itemIndex = taskArray.findIndex(
          (item) => item.taskName.toUpperCase() === itemNameInput.toUpperCase()
        );
        if (itemIndex > -1) {
          taskArray.splice(itemIndex, 1);
        }
        PrintArray();
      }
    );
  };
  // helper for DRY method.
  const PrintArray = () => {
    console.log("Current Task Array:\n", JSON.stringify(taskArray, null, 2));
    askToDeleteAnotherTask();
  };
  const askToDeleteAnotherTask = () => {
    rl.question(
      `Would you like to delete another task? (yes/no): `,
      (editNewTask) => {
        if (editNewTask.toUpperCase() === "YES") {
          deleteItem(); // Edit new task
        } else {
          console.log("Returning to Main Menu.");
          MainMenuCallBack();
        }
      }
    );
  };
  deleteItem();
};

module.exports = deleteTask;
