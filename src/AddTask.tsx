import { ChangeEvent, useState } from "react";
import { Task } from "./task.models";

interface AddTaskProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const AddTask = (props: AddTaskProps) => {
  const { setTasks, tasks } = props;
  const [taskText, setTaskText] = useState("");

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

  return (
    <div className="add-task">
      <input type="text" onChange={handleInput} value={taskText} />
      <button onClick={handleAddTask} disabled={!taskText.trim().length}>
        Añadir tarea
      </button>
    </div>
  );
};
