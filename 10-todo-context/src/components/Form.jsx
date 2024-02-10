import { useTodoContext } from "../context/TodoContext";
import { useState } from "react";

function TodoForm() {
  const [todoItem, setTodoItem] = useState("");
  const { addTodo } = useTodoContext();
  const onAdd = (e) => {
    e.preventDefault();
    if (!todoItem) return;
    addTodo({ todoItem, completed: false });
  };
  return (
    <form onSubmit={onAdd} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        value={todoItem}
        onChange={(e) => {
          setTodoItem(e.target.value);
        }}
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
