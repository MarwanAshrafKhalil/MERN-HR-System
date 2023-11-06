import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  punchIn: "",
  punchInState: false,
  punchOutState: false,
  punchListExist: false,
  isLoading: false,
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
  },
});
