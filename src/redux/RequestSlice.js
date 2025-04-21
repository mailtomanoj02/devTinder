import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addrequests: (state, action) => action.payload,
    removerequests: (state, action) => null,
  },
});

export const { addrequests, removerequests } = requestSlice.actions;

export default requestSlice.reducer;
