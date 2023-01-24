import {ADD_EXPENSES, ADD_INCOMES, ADD_TO_HIST, REMOVE_EXPENSES, REMOVE_HIST, REMOVE_INCOMES, EDIT_THIS_EVENT, SHOW_MONTHLY_DEBT_CATEGORIES, SHOW_MONTHLY_INCOME_CATEGORIES, SHOW_TOTAL_DEBT_CATEGORIES} from '../utils/actions'

const initialState = {
    incomes: [],
    expenses: [],
    monthlyIncomeperCategory: {},
    monthlyExpensesperCategory: {},
    totalDebtPerCategory: {},
    histEvents: [],
    currentEdit: []
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
        case EDIT_THIS_EVENT:
                return {
                    ...state,
                    currentEdit: [action.currentEdit]
                };
        case ADD_TO_HIST:
            return {
                ...state,
                histEvents: [...action.histEvents]
            };
        case SHOW_MONTHLY_DEBT_CATEGORIES:
            return {
                ...state,
                monthlyExpensesperCategory: {...action.monthlyExpensesperCategory}
            };
        case SHOW_MONTHLY_INCOME_CATEGORIES:
            return {
                ...state,
                monthlyIncomeperCategory: {...action.monthlyIncomeperCategory}
            }
        case SHOW_TOTAL_DEBT_CATEGORIES:
            return {
                ...state,
                totalDebtPerCategory: {...action.totalDebtPerCategory}
            }
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