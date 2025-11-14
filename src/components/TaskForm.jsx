import { useState, useEffect, startTransition } from "react";

const categories = ["Travail", "Personnel", "Urgent"];

export default function TaskForm({ addTask, updateTask, taskToEdit }) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      startTransition(() => {
        setDescription(taskToEdit.description);
        setCategory(taskToEdit.category || "");
        setDueDate(taskToEdit.dueDate || "");
      });
    }
  }, [taskToEdit]);

  const validate = () => {
    const newErrors = {};
    if (!description || !description.trim()) newErrors.description = "La description est requise.";
    if (!category) newErrors.category = "La catégorie est requise.";
    if (!dueDate) newErrors.dueDate = "La date d'échéance est requise.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const taskData = { description: description.trim(), category, dueDate };

    if (taskToEdit) {
      updateTask({ ...taskToEdit, ...taskData });
    } else {
      addTask(taskData);
    }

    setDescription("");
    setCategory("");
    setDueDate("");
    setErrors({});
  };

  const isValid = description && description.trim() && category && dueDate;

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto space-y-4" noValidate>
      <div className="space-y-1">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Nouvelle tâche..."
          required
          aria-invalid={errors.description ? "true" : "false"}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.description ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      <div className="space-y-1">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          aria-invalid={errors.category ? "true" : "false"}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.category ? 'border-red-400' : 'border-gray-300'}`}
        >
          <option value="">-- Sélectionner une catégorie --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>

      <div className="space-y-1">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          aria-invalid={errors.dueDate ? "true" : "false"}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.dueDate ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full p-3 rounded-lg font-semibold transition ${isValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-300 text-white cursor-not-allowed opacity-70'}`}
      >
        {taskToEdit ? "Modifier la tâche" : "Ajouter la tâche"}
      </button>
    </form>
  );
}
