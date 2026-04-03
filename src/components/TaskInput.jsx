import { useState } from "react";

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddTask(trimmedTitle);
    setTitle("");
  }

  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ajouter une tâche"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default TaskInput;

