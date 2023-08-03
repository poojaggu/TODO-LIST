import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./Actiontypes";

const initialState = {
  todoList: [],
};

const Todoreducer: any = (
  state = initialState,
  action: { type: string; payload: {} | string }
) => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todoList: [...state.todoList, action.payload] };
    case "DELETE_TODO":
      return {
        ...state,
        todoList: state.todoList.filter(
          (each: any) => each.id !== action.payload
        ),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todoList: state.todoList.map((each: any) => {
          if (each.id === action.payload.activeTabid) {
            return { ...each, title: action.payload.title };
          } else {
            return each;
          }
        }),
      };

    default:
      return state;
  }
};

export default Todoreducer;
