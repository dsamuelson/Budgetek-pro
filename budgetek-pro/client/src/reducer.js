import { combineReducers } from "redux";

import catagoriesReducer from "./features/categoriesSlice";

const rootReducer = combineReducers({
    categories: catagoriesReducer
})

export default rootReducer