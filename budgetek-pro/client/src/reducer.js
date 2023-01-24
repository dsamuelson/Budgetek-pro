import { combineReducers } from "redux";

import catagoriesReducer from "./features/categoriesSlice";
import TogglesReducer from "./features/toggleSlice";
import iandeEntriesReducer from "./features/iandeSlice";

const rootReducer = combineReducers({
    categories: catagoriesReducer,
    toggles: TogglesReducer,
    internalEvents: iandeEntriesReducer,
})

export default rootReducer