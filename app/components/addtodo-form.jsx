import { useState } from "react";

export default function TodoAppForm({ todo, settodo, handleAddTodo }) {
  let [newtodo, setNewTodo] = useState("");

  return (
    <div className="w-[100%] mx-auto p-4">
      <form className="todo-form">
        <div className="input-container">
          <input
            type="text"
            className="todo-input py-2 px-4 bg-gray-200 rounded-l-md focus:outline-none"
            placeholder="Add a new task..."
            value={newtodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            type="submit"
            className="py-2 px-3  bg-gray-500 text-white rounded-r-md "
            onClick={(e) => {
              e.preventDefault();
              // settodo([...todo, { title: newtodo }]);
              handleAddTodo(newtodo);
              setNewTodo("");
            }}
            disabled={!newtodo.trim()}
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
}
