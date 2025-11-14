import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import CategoryFilter from "./components/CategoryFilter";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState("Toutes");

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), ...task }]);
    toast.success("Tâche ajoutée !");
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setTaskToEdit(null);
    toast.success("Tâche modifiée !");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.error("Tâche supprimée !");
  };

  const editTask = (task) => {
    setTaskToEdit(task);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 p-4 md:p-8">
    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
      Gestionnaire de Tâches
    </h1>
    <TaskForm addTask={addTask} updateTask={updateTask} taskToEdit={taskToEdit} />
    <CategoryFilter filter={filter} setFilter={setFilter} />
    <TaskList
      tasks={filter === "Toutes" ? tasks : tasks.filter(t => t.category === filter)}
      editTask={editTask}
      deleteTask={deleteTask}
    />
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        duration: 3000,
        style: {
          fontSize: "16px",
          borderRadius: "10px",
          padding: "10px",
          background: "#fff",
          color: "#333",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        },
        success: { duration: 2500 },
        error: { duration: 2500 },
      }}
    />
  </div>
  );
}

export default App;
