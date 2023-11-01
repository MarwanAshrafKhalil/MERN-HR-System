import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employee/employee.slice";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});

export default store;
