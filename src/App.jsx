import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  const [tasks, setTasks] = useState(() => {
    const localValue = localStorage.getItem("items");
    return JSON.parse(localValue);
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(tasks));
  }, [tasks]);

  function handleProgress(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id && task.progress == "Incomplete") {
        return { ...task, progress: "In-progress" };
      } else if (task.id === id && task.progress == "In-progress") {
        return { ...task, progress: "Incomplete" };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  function handleComplete(id) {
    const updatedTask = tasks.map((task) => {
      if (task.id === id && task.progress == "In-progress") {
        return { ...task, progress: "Completed" };
      }
      return task;
    });
    setTasks(updatedTask);
  }

  function toggleComplete(id, completed) {
    const updatedTask = tasks.map((task) => {
      if (task.id === id && task.progress == "In-progress") {
        return { ...task, progress: "Completed", completed };
      } else if (task.id === id && task.progress == "Completed") {
        return { ...task, progress: "Incomplete", completed };
      }
      return task;
    });
    setTasks(updatedTask);
    // setTasks((currentTodos) => {
    //   return currentTodos.map((todo) => {
    //     if (todo.id === id) {
    //       return { ...todo, completed };
    //     }
    //     return todo;
    //   });
    // });
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task, i) => task.id !== id);
    setTasks(updatedTasks);
  }

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
  function clearTask() {
    setTasks([]);
  }

  function moveTaskUp(id) {
    if (id > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[id], updatedTasks[id - 1]] = [
        updatedTasks[id - 1],
        updatedTasks[id],
      ];
      setTasks(updatedTasks);
    }
  }
  function moveTaskDown(id) {
    if (id < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[id], updatedTasks[id + 1]] = [
        updatedTasks[id + 1],
        updatedTasks[id],
      ];
      setTasks(updatedTasks);
    }
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
              className="clear-button btn btn-warning btn-lg"
              onClick={clearTask}
            >
              Clear
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

              <button
                className="start-button btn btn-secondary"
                onClick={() => handleProgress(task.id)}
              >
                Start
              </button>
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
                onClick={() => deleteTask(task)}
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
