import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
    getUser: (state) => state,
  },
});

export const { setUser, clearUser, getUser } = userSlice.actions;
export default userSlice.reducer;