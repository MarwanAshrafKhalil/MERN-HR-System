import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentEmployee: {},
  createdEmployee: false,
  updatedEmployee: {},
  deletedEmployee: false,
  isLoading: false,
  signedIn: false,
  error: "",
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    openLoader: (state) => {
      state.isLoading = true;
    },
    fetchEmployee: (state, action) => {
      state.currentEmployee = action.payload;
      state.error = "";
      state.signedIn = true;
    },
    createEmployee: (state, action) => {
      state.createdEmployee = true;
    },
    deleteEmployee: (state) => {
      state.deletedEmployee = true;
    },
    updatedEmployee: (state, action) => {
      state.updatedEmployee = action.payload;
    },
    catchError: (state, action) => {
      state.error = action.payload.message;
    },
    closeLoader: (state) => {
      state.isLoading = false;
    },
  },
});

export default employeeSlice.reducer;
