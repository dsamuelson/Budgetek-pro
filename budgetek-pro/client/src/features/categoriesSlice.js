import {
    UPDATE_CATEGORIES,
  } from "../utils/actions";

const initialState = {
    categories: [],
    currentCategory: ''
  }

  export default function catagoriesReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CATEGORIES:
            return {
              ...state,
              categories: [...action.categories],
            };

        default:
            return state;
    }
  }