import { createContext, useContext } from "react";

export const TodoContext = createContext({
  // id: "1",
  todos: [
    {
      id: "1",
      todoItem: "NEw item",
      completed: false,
    },
  ],
  addTodo: () => {},
  editTodo: () => {},
  deleteTodo: () => {},
  toggleComplete: () => {},
});
export function useTodoContext() {
  return useContext(TodoContext);
}
export const TodoContextProvider = TodoContext.Provider;
