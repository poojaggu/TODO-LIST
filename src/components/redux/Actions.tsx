import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./Actiontypes";

export const addTodo = (todo: {}) => {
  return {
    type: "ADD_TODO",
    payload: todo,
  };
};
export const deleteTodo = (id: string) => {
  return {
    type: "DELETE_TODO",
    payload: id,
  };
};
export const updateTodo = (newData: {}) => {
  return {
    type: "UPDATE_TODO",
    payload: newData,
  };
};
