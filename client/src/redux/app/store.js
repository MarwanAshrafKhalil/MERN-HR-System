import { combineReducers, configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employee/employee.slice";
import punchReducer from "../features/punch/punch.slice";
import leaveReducer from "../features/leaves/leaves.slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistCofnig = {
  key: "root",
  storage,
  version: 2,
  whitelist: [],
};

const rootReducer = combineReducers({
  employee: employeeReducer,
  punch: punchReducer,
  leave: leaveReducer,
});
const persistedReducer = persistReducer(persistCofnig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
