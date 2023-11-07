import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  punchIn: "",
  punchInState: false,
  punchOutState: false,
  punchListExist: false,
  isLoading: false,
  error: "",
};

export const punchSlice = createSlice({
  name: "punchRX",
  initialState,
  reducers: {
    openLoader: (state) => {
      state.isLoading = true;
    },
    closeLoader: (state) => {
      state.isLoading = false;
    },
    fetchPunch: (state, action) => {
      state.punchIn = action.payload;
      state.error = "";
    },
    setPunchIn: (state, action) => {
      state.punchInState = true;
      state.error = "";
    },
    setPunchOut: (state, action) => {
      state.punchOutState = true;
      state.error = "";
    },
    catchError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default punchSlice.reducer;
