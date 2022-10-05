import { combineReducers } from "redux";

import catagoriesReducer from "./features/categoriesSlice";
import TogglesReducer from "./features/toggleSlice";

const rootReducer = combineReducers({
    categories: catagoriesReducer,
    iande: TogglesReducer,
    modalValue: TogglesReducer
    
})

export default rootReducer