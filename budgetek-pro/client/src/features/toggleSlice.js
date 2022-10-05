import {
    TOGGLE_IANDE,
    TOGGLE_MODAL
  } from "../utils/actions";

const initialState = {
    iande: true,
    modalValue: 'None'
  }

  export default function TogglesReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_IANDE:
            return {
              ...state,
              iande: action.iande
            };
        case TOGGLE_MODAL:
            return {
                ...state,
                modalValue: action.modalValue
            };
        default:
            return state;
    }
  }