import { useState } from "react";
import "./App.css";
import { AddTask } from "./Addtask";
import { Task } from "./task.models";

function App() {
  // Estado para saber si solo queremos ver tareas pendientes
  const [isOnlyPending, setIsOnlyPending] = useState(false);
  const [isOnlyCompleted, setIsOnlyCompleted] = useState(false);
  // Estado para almacenar las tareas, cada tarea tiene text, isCompleted (si está completada), y un id único
  const [tasks, setTasks] = useState<Task[]>([
    { text: "Tarea 1", isCompleted: false, id: Math.random() }, // Tarea pendiente
    { text: "Tarea 2", isCompleted: true, id: Math.random() }, // Tarea completada
  ]);

  // Función para eliminar una tarea, dado su id
  const deleteTask = (taskId: number) => {
    setTasks((currentTasks) => {
      // Filtramos todas las tareas y devolvemos aquellas cuyo id no coincida con el que queremos eliminar
      return currentTasks.filter((task) => task.id !== taskId);
    });
  };

  // Función para cambiar el estado de una tarea (completar/desmarcar)
  const toggleCompleteTask = (taskId: number) => {
    console.log("me estoy ejecutando", taskId);

    setTasks((currentTasks) => {
      // Mapear todas las tareas y cambiar el estado de la tarea con el id correspondiente
      return currentTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            isCompleted: !task.isCompleted, // Cambiamos el estado de isCompleted (de true a false o viceversa)
          };
        }
        return task; // Devolvemos las demás tareas tal cual están
      });
    });
  };

  // Función para cambiar el estado del filtro de tareas pendientes
  const handleIsOnlyPendingClick = () => {
    setIsOnlyPending(true);
    setIsOnlyCompleted(false); // Invertimos el valor de isOnlyPending (true/false)
  };
  const handleIsOnlyCompletedClick = () => {
    setIsOnlyPending(false);
    setIsOnlyCompleted(true);
  };

  const filteredTasks = tasks.filter((task) => {
    if (isOnlyPending) {
      return !task.isCompleted;
    }
    if (isOnlyCompleted) {
      return task.isCompleted;
    }
    return true;
  });

  return (
    <>
      <h1>TODO - LIST</h1>
      <AddTask tasks={tasks} setTasks={setTasks} />

      <div className="filters">
        <button
          className={isOnlyPending ? `filters__btn--selected` : ""} // Si isOnlyPending es true, aplicamos una clase extra para marcar el botón como seleccionado
          onClick={handleIsOnlyPendingClick} // Cambia el estado del filtro al hacer click
        >
          Show only pending
        </button>
        <button
          className={isOnlyPending ? "" : `filters__btn--selected`} // Si isOnlyPending es true, aplicamos una clase extra para marcar el botón como seleccionado
          onClick={handleIsOnlyCompletedClick} // Cambia el estado del filtro al hacer click
        >
          Show only completed
        </button>
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => {
          return (
            <div
              className={`task ${task.isCompleted ? "task--completed" : ""}`} // Si la tarea está completada, añadimos la clase task--completed
            >
              <div>
                <input
                  type="checkbox"
                  checked={task.isCompleted} // Si la tarea está completada, el checkbox se marca
                  onChange={() => {
                    toggleCompleteTask(task.id); // Al hacer click cambia el estado de la tarea
                  }}
                />
                <span>{task.text}</span>
              </div>
              <button
                onClick={() => {
                  deleteTask(task.id); // Eliminar tarea al hacer click en el botón
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
