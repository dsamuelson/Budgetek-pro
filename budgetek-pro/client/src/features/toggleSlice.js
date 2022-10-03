import {
    TOGGLE_IANDE,
    TOGGLE_EXPENSE_MODAL,
    TOGGLE_INCOME_MODAL
  } from "../utils/actions";

const initialState = {
    iande: true,
    incomeModal: false,
    expenseModal: false,
  }

  export default function TogglesReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_IANDE:
            return {
              ...state,
              iande: action.iande
            };
        case TOGGLE_EXPENSE_MODAL:
            return {
                ...state,
                expenseModal: action.expenseModal
            };
        case TOGGLE_INCOME_MODAL:
            return {
                ...state,
                incomeModal: action.incomeModal
            };
        default:
            return state;
    }
  }