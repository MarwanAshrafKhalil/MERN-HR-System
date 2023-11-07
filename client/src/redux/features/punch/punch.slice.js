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
      state.punchIn = action.payload;
      state.punchInState = true;
      state.error = "";
    },
    fetchPunches: (state, action) => {
      state.punchIn = action.payload.punchInTime;
      state.punchOut = action.payload.punchOutTime;
      state.punchInState = true;
      state.punchOutState = true;
      state.error = "";
    },
    setPunchIn: (state, action) => {
      state.punchInState = true;
      state.error = "";
    },
    setPunchOut: (state, action) => {
      state.punchOutState = true;
      state.punchOut = action.payload;
      state.punchOutState = true;
      state.error = "";
    },
    catchError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default punchSlice.reducer;
