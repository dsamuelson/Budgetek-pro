import {ADD_EXPENSES, ADD_INCOMES, REMOVE_EXPENSES, REMOVE_INCOMES} from '../utils/actions'
import { useQuery } from '@apollo/client';
import { QUERY_INCOMES } from '../utils/queries';

const initialState = {
    incomes: [],
    expenses: [],
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
        default:
            return state;
    }
  }