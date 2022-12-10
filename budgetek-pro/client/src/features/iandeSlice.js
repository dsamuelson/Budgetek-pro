import {ADD_EXPENSES, ADD_INCOMES, ADD_TO_HIST, REMOVE_EXPENSES, REMOVE_HIST, REMOVE_INCOMES} from '../utils/actions'

const initialState = {
    incomes: [],
    expenses: [],
    histEvents: [],
}

export default function iandeEntriesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_EXPENSES:
            return {
              ...state,
              expenses: [...action.expenses]
            };
        case ADD_INCOMES:
            return {
                ...state,
                incomes: [...action.incomes]
            };
        case ADD_TO_HIST:
            return {
                ...state,
                histEvents: [...action.histEvents]
            };
        case REMOVE_EXPENSES:
            let newStateE = state.expenses.filter(expense => {
              return expense._id !== action._id;
            });
      
            return {
              ...state,
              expenses: newStateE
            };
        case REMOVE_INCOMES:
            let newStateI = state.incomes.filter(income => {
                return income._id !== action._id;
            });
            return {
                ...state,
                incomes: newStateI
            };
        case REMOVE_HIST:
            let newStateH = state.histEvents.filter(histEvent => {
                return histEvent.histID !== action.histID;
            })
            return {
                ...state,
                histEvents: newStateH
            }
        default:
            return state;
    }
  }