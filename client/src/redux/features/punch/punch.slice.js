import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  punchIn: "",
  punchOut: "",
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
    fetchPunchIn: (state, action) => {
      state.punchIn = action.payload.punchIn;
      state.punchInState = true;
      state.punchListExist = true;
      state.error = "";
    },
    fetchPunches: (state, action) => {
      state.punchIn = action.payload.punchIn;
      state.punchOut = action.payload.punchOut;
      state.punchInState = false;
      state.punchOutState = true;
      state.punchListExist = true;

      state.error = "";
    },
    fetchNewPunch: (state, action) => {
      state.punchListExist = false;
    },
    setPunchIn: (state, action) => {
      state.punchIn = action.payload;
      state.punchOut = "";

      state.punchInState = true;
      state.punchOutState = false;
      state.punchListExist = true;
      state.error = "";
    },
    setPunchOut: (state, action) => {
      state.punchOut = action.payload;
      state.punchIn = "";

      state.punchOutState = true;
      state.punchInState = false;
      state.punchListExist = true;
      state.error = "";
    },
    catchError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default punchSlice.reducer;
