"use client";

import TodoAppForm from "./components/addtodo-form";
import { useState, useEffect, use } from "react";
import { CheckCircle2 } from "lucide-react";
import CreateTodo from "./api/createTodo";
import getTodos from "./api/getTodos";
import updateTodos from "./api/updateTodo";
import deleteTodos from "./api/deleteTodo";
export default function Home() {
  let [todo, settodo] = useState([]);
  let apiEndpoint = process.env.NEXT_PUBLIC_BASE_API_URL;

  const removeItem = async (index) => {
    let data = await deleteTodos(apiEndpoint, todo[index]._id);
    if (data === null) {
      return;
    }
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    settodo(newTodo);
  };

  const updateTodo = (index, id) => {
    let uptodo = updateTodos(apiEndpoint, { status: !todo[index].status }, id);
    let newtodo = [...todo];
    if (uptodo) {
      newtodo[index].status = !newtodo[index].status;
      settodo(newtodo);
    }
  };

  const handleAddTodo = async (newTodo) => {
    if (newTodo) {
      let already = todo.find((item) => item.title === newTodo);
      if (already) {
        alert("Todo already exists");
        return;
      }
    }
    let todonew = { title: newTodo, status: false };
    let data = await CreateTodo(apiEndpoint, todonew);
    settodo([...todo, data]);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos(apiEndpoint);
      if (Array.isArray(data)) {
        settodo(data);
      }
    };
    fetchTodos();
  }, [apiEndpoint]);

  return (
    <>
      <div className="min-h-screen content-center bg-gray-100 py-8">
        <div className="w-[500px] mx-auto text-center mb-8  p-6 rounded-md shadow-lg">
          <TodoAppForm
            todo={todo}
            settodo={settodo}
            handleAddTodo={handleAddTodo}
          />
          <div className="h-full max-h-[400px] overflow-y-auto ">
            {todo.reverse().map((item, index) => (
              <div key={index} className="w-[100%] mx-auto p-4">
                <li className="todo-item  list-none  py-3 px-4 bg-gray-200 rounded-md w-full flex items-center justify-between">
                  <span
                    className={`mx-2 capitalize ${
                      item.status ? "line-through" : ""
                    }`}
                  >
                    {" "}
                    {item.title}{" "}
                  </span>
                  <div className="flex items-center">
                    <button onClick={() => updateTodo(index, item._id)}>
                      {" "}
                      <CheckCircle2
                        fill={item.status ? "green" : "none"}
                        color={item.status ? "white" : "black"}
                      />{" "}
                    </button>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700 ml-4 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
