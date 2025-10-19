// Todo Listesi Ana Uygulama
import React, { useState } from "react";

// Temel bir Todo Bileşeni
const TodoItem = ({ todo, onToggle, onDelete }) => (
  <li className="flex items-center justify-between p-2 border-b last:border-b-0">
    <span
      className={`text-lg transition duration-200 ${
        todo.completed ? "line-through text-gray-500" : "text-gray-800"
      }`}
      data-cy="todo-text"
    >
      {todo.text}
    </span>
    <div className="flex space-x-2">
      <button
        onClick={() => onToggle(todo.id)}
        data-cy="toggle-button"
        className={`py-1 px-3 rounded-full text-sm font-semibold transition duration-200 ${
          todo.completed
            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        {todo.completed ? "Yenile" : "Tamamla"}
      </button>
      <button
        onClick={() => onDelete(todo.id)} // Yeni Silme Butonu
        data-cy="delete-button"
        className="py-1 px-3 rounded-full text-sm font-semibold transition duration-200 bg-red-600 hover:bg-red-700 text-white"
      >
        Sil
      </button>
    </div>
  </li>
);

// Ana Uygulama Bileşeni
const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Marketi ziyaret et", completed: false },
    { id: 2, text: "Test senaryolarını yaz", completed: true },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Yeni Silme Fonksiyonu
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    // ID'yi güvenli bir şekilde bulma
    const newId =
      todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    setTodos([...todos, { id: newId, text: newTodo.trim(), completed: false }]);
    setNewTodo("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-8">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          Todo Listesi
        </h1>

        {/* Input Bar ve Ekleme Formu */}
        <form onSubmit={handleAddTodo} className="flex space-x-2 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            maxLength={25}
            placeholder="Yeni görev ekle..."
            data-cy="new-todo-input"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            data-cy="add-todo-button"
            disabled={newTodo.trim() === ""}
            className={`p-3 rounded-lg font-bold transition duration-150 ${
              newTodo.trim() === ""
                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Ekle
          </button>
        </form>

        {/* Todo Listesi */}
        <ul
          data-cy="todo-list"
          className="border border-gray-200 rounded-lg divide-y divide-gray-200"
        >
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete} // Silme fonksiyonu eklendi
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
