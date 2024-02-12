import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/features/todo/todoSlice";

const AddTodo = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    if (!input) return;
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <>
      <div className="flex flex-row w-full justify-center align-items-center mt-8">
        <form onSubmit={addTodoHandler}>
          <input
            className="mx-4 p-1 border"
            type="text"
            placeholder="Add a todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-gray-500 rounded-sm p-1">Add Todo</button>
        </form>
      </div>
    </>
  );
};

export default AddTodo;
