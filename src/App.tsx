import { ChangeEvent, useState } from "react";
import "./App.css";

interface Task {
  text: string;
  isCompleted: boolean;
  id: number;
}

function App() {
  const [taskText, setTaskText] = useState("");
  const [isOnlyPending, setIsOnlyPending] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { text: "Tarea 1", isCompleted: false, id: Math.random() },
    { text: "Tarea 2", isCompleted: true, id: Math.random() },
  ]);

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { text: taskText, isCompleted: false, id: Math.random() },
    ]);
    setTaskText("");
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskText(event.target.value);
  };

  const deleteTask = (taskId: number) => {
    setTasks((currentTasks) => {
      return currentTasks.filter((task) => {
        return task.id != taskId;
      });
    });
  };

  const toggleCompleteTask = (taskId: number) => {
    console.log("me estoy ejecutando", taskId);

    setTasks((currentTasks) => {
      return currentTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          };
        }
        return task;
      });
    });
  };

  const handleIsOnlyPendingClick = () => {
    setIsOnlyPending(!isOnlyPending);
  };

  const filteredTasks = isOnlyPending
    ? tasks.filter((task) => {
        return !task.isCompleted;
      })
    : tasks;

  return (
    <>
      <h1>TODO - LIST</h1>
      <div className="add-task">
        <input type="text" onChange={handleInput} value={taskText} />
        <button onClick={handleAddTask} disabled={!taskText.trim().length}>
          Añadir tarea
        </button>
      </div>
      <div className="filters">
        <button
          className={isOnlyPending ? `filters__btn--selected` : ""}
          onClick={handleIsOnlyPendingClick}
        >
          Show only pending
        </button>
      </div>
      <div className="task-list">
        {filteredTasks.map((task) => {
          return (
            <div
              className={`task ${task.isCompleted ? "task--completed" : ""}`}
            >
              <div>
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => {
                    toggleCompleteTask(task.id);
                  }}
                />
                <span>{task.text}</span>
              </div>
              <button
                onClick={() => {
                  deleteTask(task.id);
                }}
              >
                Eliminar
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
