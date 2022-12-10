import { combineReducers } from "redux";

import catagoriesReducer from "./features/categoriesSlice";
import TogglesReducer from "./features/toggleSlice";
import iandeEntriesReducer from "./features/iandeSlice";

const rootReducer = combineReducers({
    categories: catagoriesReducer,
    iande: TogglesReducer,
    calcontVal: TogglesReducer,
    modalValue: TogglesReducer,
    incomes: iandeEntriesReducer,
    expenses: iandeEntriesReducer,
    histEvents: iandeEntriesReducer
})

export default rootReducer