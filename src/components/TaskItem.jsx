function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className={`task-item ${task.completed ? "is-completed" : ""}`}>
      <button
        type="button"
        className={`toggle-btn ${task.completed ? "done" : ""}`}
        onClick={() => onToggleTask(task.id)}
      >
        {task.completed ? "Terminée" : "En cours"}
      </button>

      <div className="task-content">
        <p className={`task-title ${task.completed ? "completed" : ""}`}>
          {task.title}
        </p>
      </div>

      <button
        type="button"
        className="delete-btn"
        onClick={() => onDeleteTask(task.id)}
      >
        Supprimer
      </button>
    </li>
  );
}

export default TaskItem;

