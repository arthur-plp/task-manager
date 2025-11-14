import React from "react";

const CategoryFilter = ({ filter, setFilter, categories = ["Toutes", "Travail", "Personnel", "Urgent"] }) => {
  return (
    <div className="max-w-md mx-auto mb-4 flex justify-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          className={`px-3 py-1 rounded-full font-medium ${
            filter === cat ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          } transition`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
