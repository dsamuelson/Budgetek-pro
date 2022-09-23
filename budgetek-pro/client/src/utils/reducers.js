import { useReducer } from "react";
import {
  UPDATE_CATEGORIES,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
}