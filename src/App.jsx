import { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import "./App.css";

const STORAGE_KEY = "hermes_tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isStorageReady, setIsStorageReady] = useState(false);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);

      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);

        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        }
      }
    } catch (error) {
      console.error("Erreur de lecture localStorage :", error);
    } finally {
      setIsStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isStorageReady) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, isStorageReady]);

  function addTask(title) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
      created_at: new Date().toISOString(),
    };

    setTasks((previousTasks) => [newTask, ...previousTasks]);
  }

  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id),
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }
    if (filter === "pending") {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="page">
      <main className="app">
        <h1 className="app-title">Hermes</h1>
        <p className="app-subtitle">Organise tes taches quotidiennes simplement.</p>
        <TaskInput onAddTask={addTask} />
        <Filter currentFilter={filter} onChangeFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;

