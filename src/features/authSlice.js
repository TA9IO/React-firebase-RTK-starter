import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authState: false,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = JSON.parse(action.payload);
      console.log(state.user);
    },
    logoutUser: (state) => {
      state.user = null;
      // console.log(state.user);
      console.log("loggedOut");
    },

    authIsReady: (state, action) => {
      state.user = JSON.parse(action.payload);
      state.authState = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser, authIsReady } = authSlice.actions;

export default authSlice.reducer;
