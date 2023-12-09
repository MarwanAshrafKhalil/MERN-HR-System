import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leavesData: [],
  leaveSubmitted: false,
  leaveDeleted: false,
  leaveApproved: false,
  isLoading: false,
  error: "",
};

export const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    openLoader: (state) => {
      state.isLoading = true;
    },
    closeLoader: (state) => {
      state.isLoading = false;
    },
    fetchLeaves: (state, action) => {
      state.leavesData = action.payload;
      state.error = "";
    },
    submitLeave: (state) => {
      state.leaveSubmitted = true;
      state.leaveDeleted = false;
      state.leaveApproved = false;

      state.error = "";
    },
    deleteLeave: (state) => {
      state.leaveDeleted = true;
      state.leaveSubmitted = false;

      state.leaveApproved = false;
      state.error = "";
    },
    approveLeave: (state) => {
      state.leaveApproved = true;
      state.leaveDeleted = false;
      state.leaveSubmitted = false;
      state.error = "";
    },
    catchError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default leaveSlice.reducer;
