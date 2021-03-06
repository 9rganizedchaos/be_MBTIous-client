import { combineReducers } from "redux";
import testReducer from "./testReducer";
import viewReducer from "./viewReducer";

// const persistConfig = {
//   key: "root",
//   whitelist: [
//     "testReducer",
//     "viewReducer",
//   ]
// }

const rootReducer = combineReducers({
  testReducer,
  viewReducer
})
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;