import TaskCard from "./TaskCard";

export default function TaskList({ tasks, editTask, deleteTask }) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">Aucune tâche à afficher</p>;
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} editTask={editTask} deleteTask={deleteTask} />
      ))}
    </div>
  );
}
