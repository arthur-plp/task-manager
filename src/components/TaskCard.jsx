import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const categoryColors = {
  Travail: "bg-green-100 text-green-800",
  Personnel: "bg-yellow-100 text-yellow-800",
  Urgent: "bg-red-100 text-red-800",
};

export default function TaskCard({ task, editTask, deleteTask }) {
  return (
    <div
      className={`p-4 rounded-lg shadow-md flex justify-between items-center transition transform hover:scale-105 animate-fadeIn ${categoryColors[task.category]}`}
    >
      <div>
        <p className="font-semibold text-lg">{task.description}</p>
        <div className="flex gap-2 text-sm italic">
          <span>{task.category}</span>
          {task.dueDate && <span>| 📅 {task.dueDate}</span>}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => editTask(task)}
          className="p-2 rounded hover:bg-blue-500 hover:text-white transition cursor-pointer"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-2 rounded hover:bg-red-500 hover:text-white transition cursor-pointer"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
