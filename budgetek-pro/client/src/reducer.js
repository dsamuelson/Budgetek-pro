import { combineReducers } from "redux";

import catagoriesReducer from "./features/categories/categoriesSlice";

const rootReducer = combineReducers({
    categories: catagoriesReducer
})

export default rootReducer