import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const localValue = localStorage.getItem("items");
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((currentTask) => [
        ...currentTask,
        {
          id: crypto.randomUUID(),
          name: newTask,
          completed: false,
          progress: "Incomplete",
        },
      ]);
      setNewTask("");
    }
  }

  function clearCompletedTask() {
    const updatedTasks = tasks.filter((task) => task.progress !== "Completed");
    setTasks(updatedTasks);
  }

  function clearAllTask() {
    setTasks([]);
  }

  function toggleProgress(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id && task.progress === "Incomplete") {
        return { ...task, progress: "In-progress" };
      } else if (task.id === id && task.progress === "In-progress") {
        return { ...task, progress: "Incomplete" };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function toggleComplete(id, completed) {
    const updatedTask = tasks.map((task) => {
      if (task.id === id && task.progress === "In-progress") {
        return { ...task, progress: "Completed", completed };
      } else if (task.id === id && task.progress === "Completed") {
        return { ...task, progress: "Incomplete", completed };
      }
      return task;
    });
    setTasks(updatedTask);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <div className="to-do-list">
      <div className="container">
        <h1>To Do List</h1>
        <div className="input-task">
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={handleInputChange}
          />
          <div class="input-group-append">
            {" "}
            <button
              className="add-button btn btn-primary btn-lg"
              onClick={addTask}
            >
              Add
            </button>
            <button
              className="clear-completed-button btn btn-outline-warning btn-lg"
              onClick={clearCompletedTask}
            >
              Clear Completed Task
            </button>
            <button
              className="clear-all-button btn btn-warning btn-lg"
              onClick={clearAllTask}
            >
              Clear All
            </button>
          </div>
        </div>
        <ol>
          {tasks.length === 0 && "No todos"}
          {tasks.map((task, index) => (
            <li key={index}>
              <input
                className="check-box"
                type="checkbox"
                checked={task.completed}
                onChange={(e) => toggleComplete(task.id, e.target.checked)}
              ></input>
              <span className="text">{task.name}</span>
              <span className="text">{task.progress}</span>
              {task.progress === "Incomplete" ? (
                <button
                  className="start-button btn btn-success"
                  onClick={() => toggleProgress(task.id)}
                >
                  Start
                </button>
              ) : (
                <button
                  className="start-button btn btn-info"
                  onClick={() => toggleProgress(task.id)}
                >
                  Un-start
                </button>
              )}
              <button
                className="up-button btn btn-outline-secondary"
                onClick={() => moveTaskUp(index)}
              >
                Up
              </button>
              <button
                className="down-button btn btn-outline-secondary"
                onClick={() => moveTaskDown(index)}
              >
                Down
              </button>
              <button
                className="delete-button btn btn-danger"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
